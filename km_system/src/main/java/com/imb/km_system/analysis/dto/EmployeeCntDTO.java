package com.imb.km_system.analysis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeCntDTO {
    private String label;
    private Integer cnt;

    public EmployeeCntDTO(String label, Integer cnt) {
        this.label = label;
        this.cnt = cnt;
    }
}
