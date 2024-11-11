package com.imb.km_system.analysis.repository;

import com.imb.km_system.analysis.entity.Windows;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface WindowsRepository extends JpaRepository<Windows, Long> {
    @Query(
            value = "SELECT 'target' AS label, COUNT(DISTINCT USER_ID) AS cnt " +
                    "FROM WINDOWS " +
                    "WHERE DEPT_ID = :deptId " +
                    "UNION ALL " +
                    "SELECT 'average' AS label, AVG(employee_count) AS cnt " +
                    "FROM ( " +
                    "    SELECT DEPT_ID, COUNT(DISTINCT USER_ID) AS employee_count " +
                    "    FROM WINDOWS " +
                    "    GROUP BY DEPT_ID " +
                    ") AS dept_employee_counts",
            nativeQuery = true)
    List<Object[]> findDeptEmployeeCountAndAvg(Long deptId);


    @Query(value =
            "SELECT " +
                    "    DEPT_ID, " +
                    "    WD_DVCD, " +
                    "    COUNT(DISTINCT USER_ID) AS employee_count " +
                    "FROM " +
                    "    WINDOWS " +
                    "WHERE " +
                    "    DEPT_ID = :deptId " +
                    "GROUP BY " +
                    "    DEPT_ID, WD_DVCD " +
                    "UNION ALL " +
                    "SELECT " +
                    "    NULL AS DEPT_ID, " +
                    "    WD_DVCD, " +
                    "    AVG(employee_count) AS employee_count " +
                    "FROM (" +
                    "    SELECT " +
                    "        DEPT_ID, " +
                    "        WD_DVCD, " +
                    "        COUNT(DISTINCT USER_ID) AS employee_count " +
                    "    FROM " +
                    "        WINDOWS " +
                    "    GROUP BY " +
                    "        DEPT_ID, WD_DVCD" +
                    ") AS dept_counts " +
                    "WHERE DEPT_ID != 1 " +
                    "GROUP BY WD_DVCD", nativeQuery = true)
    List<Object[]> findEmployeeDistributionByDeptIdAndWdDvc(Long deptId);




}
