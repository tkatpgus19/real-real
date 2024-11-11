package com.imb.km_system.analysis.repository;

import com.imb.km_system.analysis.dto.*;
import com.imb.km_system.analysis.entity.Counsels;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public interface CounselsRepository extends JpaRepository<Counsels, Long> {

    @Query(value = """
            SELECT
                CASE w.wd_dvcd
                    WHEN '01' THEN '카드 업무'
                    WHEN '02' THEN '일반 업무'
                    WHEN '03' THEN '대출 업무'
                    WHEN '04' THEN '기타 업무'
                END as name,
                ROUND(AVG(c.wait_time)) as dept_avg,
                ROUND((
                    SELECT AVG(c2.wait_time)
                    FROM csnl_log c2
                    JOIN windows w2 ON c2.window_id = w2.window_id
                    WHERE w2.wd_dvcd = w.wd_dvcd
                )) as other_dept_avg
            FROM csnl_log c
            JOIN windows w ON c.window_id = w.window_id
            WHERE w.dept_id = :deptId
            GROUP BY w.wd_dvcd
            ORDER BY w.wd_dvcd
            """, nativeQuery = true)
    List<Object[]> findWaitTimesByDeptId(Long deptId);

    default List<WaitTimeDto> getWaitTimeAnalysis(Long deptId) {
        List<Object[]> results = findWaitTimesByDeptId(deptId);
        return results.stream()
                .map(row -> new WaitTimeDto(
                        (String) row[0],                    // name
                        ((Number) row[1]).doubleValue(),    // dept_avg (반올림된 평균)
                        ((Number) row[2]).doubleValue()     // other_dept_avg (반올림된 평균)
                ))
                .collect(Collectors.toList());
    }


    @Query(value = """
            SELECT
                CASE w.wd_dvcd
                    WHEN '01' THEN '카드 업무'
                    WHEN '02' THEN '일반 업무'
                    WHEN '03' THEN '대출 업무'
                    WHEN '04' THEN '기타 업무'
                END as name,
                ROUND(AVG(c.csnl_time)) as dept_avg,
                ROUND((
                    SELECT AVG(c2.csnl_time)
                    FROM csnl_log c2
                    JOIN windows w2 ON c2.window_id = w2.window_id
                    WHERE w2.wd_dvcd = w.wd_dvcd
                )) as other_dept_avg
            FROM csnl_log c
            JOIN windows w ON c.window_id = w.window_id
            WHERE w.dept_id = :deptId
            GROUP BY w.wd_dvcd
            ORDER BY w.wd_dvcd
            """, nativeQuery = true)
    List<Object[]> findCSNLTimesByDeptId(Long deptId);

    default List<CSNLTimeDto> getCSNLTimeAnalysis(Long deptId) {
        List<Object[]> results = findCSNLTimesByDeptId(deptId);
        return results.stream()
                .map(row -> new CSNLTimeDto(
                        (String) row[0],                    // name
                        ((Number) row[1]).doubleValue(),    // dept_avg (반올림된 평균)
                        ((Number) row[2]).doubleValue()     // other_dept_avg (반올림된 평균)
                ))
                .collect(Collectors.toList());
    }


    @Query(value = """
            SELECT u.user_nm as userNm, COUNT(*) as consultCount
            FROM csnl_log c
            JOIN users u ON c.user_id = u.user_id
            GROUP BY u.user_id, u.user_nm
            ORDER BY COUNT(*) DESC
            LIMIT 10
            """, nativeQuery = true)
    List<Object[]> findTop10ConsultCount();



    // 하루, 일주일, 한달 치 정보 조회
    @Query(value = """
    WITH RECURSIVE hours AS (
        SELECT 9 as hour
        UNION ALL
        SELECT hour + 1 FROM hours WHERE hour < 17
    ),
    formatted_hours AS (
        SELECT CONCAT(LPAD(hour, 2, '0'), ':00') as time FROM hours
    ),
    daily_counts AS (
        SELECT 
            DATE_FORMAT(c.csnl_end_dt, '%H:00') as hour,
            w.wd_dvcd,
            COUNT(*) as cnt
        FROM csnl_log c
        JOIN windows w ON c.window_id = w.window_id
        WHERE w.dept_id = :deptId
            AND c.csnl_end_dt BETWEEN :startDate AND :endDate
        GROUP BY DATE_FORMAT(c.csnl_end_dt, '%H:00'), w.wd_dvcd
    )
    SELECT 
        h.time,
        ROUND(AVG(CASE WHEN d.wd_dvcd = '01' THEN d.cnt ELSE 0 END), 1) as card_avg,
        ROUND(AVG(CASE WHEN d.wd_dvcd = '02' THEN d.cnt ELSE 0 END), 1) as general_avg,
        ROUND(AVG(CASE WHEN d.wd_dvcd = '03' THEN d.cnt ELSE 0 END), 1) as loan_avg,
        ROUND(AVG(CASE WHEN d.wd_dvcd = '04' THEN d.cnt ELSE 0 END), 1) as other_avg
    FROM formatted_hours h
    LEFT JOIN daily_counts d ON h.time = d.hour
    GROUP BY h.time
    ORDER BY h.time
    """, nativeQuery = true)
    List<Object[]> findAverageHourlyConsultationData(
            Long deptId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );

    // Object[]를 DTO로 변환하는 default 메소드 추가
    default List<HourlyConsultationDto> findAverageHourlyConsultations(
            Long deptId,
            LocalDateTime startDate,
            LocalDateTime endDate
    ) {
        return findAverageHourlyConsultationData(deptId, startDate, endDate)
                .stream()
                .map(row -> new HourlyConsultationDto(
                        (String) row[0],
                        ((Number) row[1]).longValue(),
                        ((Number) row[2]).longValue(),
                        ((Number) row[3]).longValue(),
                        ((Number) row[4]).longValue()
                ))
                .collect(Collectors.toList());
    }



    // 키오스크 사용량 측정
    @Query(value = """
    SELECT 
        CAST(c.kiosk_id AS CHAR) as kiosk_id,
        COUNT(*) as count
    FROM csnl_log c
    JOIN windows w ON c.window_id = w.window_id
    WHERE w.dept_id = :deptId
        AND c.csnl_end_dt BETWEEN :startDate AND :endDate
    GROUP BY c.kiosk_id
    ORDER BY c.kiosk_id
    """, nativeQuery = true)
    List<Object[]> findConsultationCountByKiosk(
            Long deptId,
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}
