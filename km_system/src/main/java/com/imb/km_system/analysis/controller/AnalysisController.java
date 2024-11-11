package com.imb.km_system.analysis.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.analysis.dto.KioskConsultationDto;
import com.imb.km_system.analysis.service.AnalysisService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/analysis")
public class AnalysisController {

    private final AnalysisService analysisService;


    // 1번 통계 조회(지점별 인원 수)
    @GetMapping("/chart1/{dept-id}")
    public ApiResponseDto<?> selectChart1(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(analysisService.getDeptEmployeeCount(deptId), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 2번 통계 조회(지점별 업무별 인원 수)
    @GetMapping("/chart2/{dept-id}")
    public ApiResponseDto<?> selectChart2(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(analysisService.chart2(deptId), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 3번 통계 조회(업무별 대기시간)
    @GetMapping("/chart3/{dept-id}")
    public ApiResponseDto<?> selectChart3(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(analysisService.getWaitTimeAnalysis(deptId), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 4번 통계 조회(업무별 상담시간)
    @GetMapping("/chart4/{dept-id}")
    public ApiResponseDto<?> selectChart4(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(analysisService.getCSNLTimeAnalysis(deptId), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 5번 통계 조회(시간대별 업무 상담 수(당일))
    @GetMapping("/chart5/{dept-id}")
    public ApiResponseDto<?> selectChart5(@PathVariable(name = "dept-id") Long deptId, @RequestParam(defaultValue = "today") String range) {
        return ResponseUtils.ok(analysisService.getAverageHourlyConsultations(deptId, range), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 8번 통계 조회(직원별 상담 처리수)
    @GetMapping("/chart8/{dept-id}")
    public ApiResponseDto<?> selectChart8(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(analysisService.getTop10ConsultCountData(), MsgType.SELECT_DATA_SUCCESSFULLY);
    }

    // 7번 통계 조회(키오스크당 상담 처리수)
    @GetMapping("/chart7/{dept-id}")
    public ApiResponseDto<?> selectChart8(@PathVariable(name = "dept-id") Long deptId, @RequestParam(defaultValue = "today") String range) {
        List<KioskConsultationDto> data = analysisService.getKioskConsultations(deptId, range);
        return ResponseUtils.ok(data, MsgType.SELECT_DATA_SUCCESSFULLY);
    }

}
