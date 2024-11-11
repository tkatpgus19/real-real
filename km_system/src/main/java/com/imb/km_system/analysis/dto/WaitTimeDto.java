package com.imb.km_system.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WaitTimeDto {
    private String name;        // 업무명
    private Double 해당지점;    // 해당 부서 평균 대기시간
    private Double 지점평균;    // 전체 지점 평균 대기시간
}
