package com.imb.km_system.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class DeptEmployeeCountDto {
    private Integer 해당지점;
    private Integer 지점평균;

    public static DeptEmployeeCountDto fromObjectArray(List<Object[]> results) {
        Integer target = null;
        Integer average = null;

        for (Object[] row : results) {
            String label = (String) row[0];
            Number value = (Number) row[1];

            if ("target".equals(label)) {
                target = value.intValue();
            } else if ("average".equals(label)) {
                average = value.intValue();
            }
        }

        return new DeptEmployeeCountDto(target, average);
    }
}

