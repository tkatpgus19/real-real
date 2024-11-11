package com.imb.km_system.analysis.service;

import com.imb.km_system.analysis.dto.*;
import com.imb.km_system.analysis.repository.CounselsRepository;
import com.imb.km_system.analysis.repository.WindowsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnalysisService {
    private final WindowsRepository windowsRepository;
    private final CounselsRepository counselsRepository;

    public DeptEmployeeCountDto getDeptEmployeeCount(Long deptId) {
        List<Object[]> results = windowsRepository.findDeptEmployeeCountAndAvg(deptId);
        return DeptEmployeeCountDto.fromObjectArray(results);
    }

    public List<EmployeeDistributionDTO> chart2(Long deptId) {
        List<Object[]> result = windowsRepository.findEmployeeDistributionByDeptIdAndWdDvc(deptId);
        List<EmployeeDistributionDTO> employeeDistribution = new ArrayList<>();

        for (Object[] row : result) {
            Long id = (Long) row[0]; // DEPT_ID
            String wdDvcd = (String) row[1];   // WD_DVCD
            BigDecimal employeeCount = (BigDecimal) row[2]; // employee_count

            // DTO 객체로 변환
            employeeDistribution.add(new EmployeeDistributionDTO(id, wdDvcd, employeeCount.intValue()));
        }

        return employeeDistribution;
    }

    public List<WaitTimeDto> getWaitTimeAnalysis(Long deptId) {
        return counselsRepository.getWaitTimeAnalysis(deptId);
    }

    public List<CSNLTimeDto> getCSNLTimeAnalysis(Long deptId) {
        return counselsRepository.getCSNLTimeAnalysis(deptId);
    }

    // 당일
    public List<HourlyConsultationDto> getAverageHourlyConsultations(Long deptId, String range) {
        LocalDateTime startDate;
        LocalDateTime endDate = LocalDateTime.now();

        switch (range) {
            case "week":
                startDate = endDate.minusDays(7);
                break;
            case "month":
                startDate = endDate.minusMonths(1);
                break;
            case "year":
                startDate = endDate.minusYears(1);
                break;
            default: // today
                startDate = endDate.withHour(0).withMinute(0).withSecond(0);
        }

        return counselsRepository.findAverageHourlyConsultations(deptId, startDate, endDate);
    }

    // 8번째
    public List<Map<String, Object>> getTop10ConsultCountData() {
        List<Object[]> results = counselsRepository.findTop10ConsultCount();

        return results.stream()
                .map(row -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("name", row[0]);  // user_nm
                    data.put("value", ((Number) row[1]).longValue());  // count
                    return data;
                })
                .collect(Collectors.toList());
    }

    public List<KioskConsultationDto> getKioskConsultations(Long deptId, String range) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate;

        switch (range) {
            case "week":
                startDate = endDate.minusDays(7);
                break;
            case "month":
                startDate = endDate.minusMonths(1);
                break;
            case "year":
                startDate = endDate.minusYears(1);
                break;
            default: // today
                startDate = endDate.withHour(0).withMinute(0).withSecond(0);
        }

        List<Object[]> results = counselsRepository.findConsultationCountByKiosk(deptId, startDate, endDate);
        return results.stream()
                .map(row -> new KioskConsultationDto(
                        (String) row[0],
                        ((Number) row[1]).longValue()
                ))
                .collect(Collectors.toList());
    }

}
