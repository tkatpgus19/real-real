package com.imb.km_system.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KioskConsultationDto {
    private String kioskId;  // int에서 String으로 변경
    private long consultationCount;
}