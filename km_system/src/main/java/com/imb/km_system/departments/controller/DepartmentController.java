package com.imb.km_system.departments.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.departments.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/department")
public class DepartmentController {

    private final DepartmentService departmentService;

    // 지점 정보 조회
    @GetMapping("/{dept-id}")
    public ApiResponseDto<?> selectDepartmentList(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(departmentService.select(deptId), MsgType.SELECT_DEPARTMENT_SUCCESSFULLY);
    }

    // 모든 지점 정보 조회
    @GetMapping("/list")
    public ApiResponseDto<?> selectDepartmentAll() {
        return ResponseUtils.ok(departmentService.selectAll(), MsgType.SELECT_DEPARTMENT_SUCCESSFULLY);
    }

}
