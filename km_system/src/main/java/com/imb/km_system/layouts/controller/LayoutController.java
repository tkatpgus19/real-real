package com.imb.km_system.layouts.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.layouts.dto.request.CreateLayoutRequest;
import com.imb.km_system.layouts.service.LayoutService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/layout")
public class LayoutController {

    private final LayoutService layoutService;

    // 배치도 전체 조회
    @GetMapping("/list/{dept-id}")
    public ApiResponseDto<?> selectLayoutList(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(layoutService.selectAll(deptId), MsgType.SELECT_LAYOUT_LIST_SUCCESSFULLY);
    }

    // 배치도 추가
    @PostMapping("/{dept-id}")
    public ApiResponseDto<?> createLayout(@PathVariable(name = "dept-id") Long deptId, @RequestBody CreateLayoutRequest request) {
        return ResponseUtils.ok(layoutService.insert(deptId, request), MsgType.SELECT_LAYOUT_LIST_SUCCESSFULLY);
    }

    // 배치도 삭제
    @DeleteMapping("/{layout-id}")
    public ApiResponseDto<?> deleteLayout(@PathVariable(name = "layout-id") Long layoutId) {
        return ResponseUtils.ok(layoutService.delete(layoutId), MsgType.SELECT_LAYOUT_LIST_SUCCESSFULLY);
    }


}
