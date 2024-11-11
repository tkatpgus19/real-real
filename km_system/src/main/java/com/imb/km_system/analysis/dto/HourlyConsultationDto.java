package com.imb.km_system.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class HourlyConsultationDto {
    private String time;
    private double cardAvg;
    private double generalAvg;
    private double loanAvg;
    private double otherAvg;
}
