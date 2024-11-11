package com.imb.km_system.analysis.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WindowCSNLTimeStatsDTO {
    public WindowCSNLTimeStatsDTO(String windowDvcd, Double avgCSNLTime) {
        this.windowDvcd = windowDvcd;
        this.avgCSNLTime = avgCSNLTime;
    }

    private String windowDvcd; // 업무 코드
    private Double avgCSNLTime; // 대기 시간 평균
}
