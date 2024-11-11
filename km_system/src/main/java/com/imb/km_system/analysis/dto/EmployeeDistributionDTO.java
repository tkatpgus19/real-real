package com.imb.km_system.analysis.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class EmployeeDistributionDTO {
    private Long deptId;
    private String wdDvcd;
    private int employeeCount;

    public EmployeeDistributionDTO(Long deptId, String wdDvcd, int employeeCount) {
        this.deptId = deptId;
        this.wdDvcd = wdDvcd;
        this.employeeCount = employeeCount;
    }
}
