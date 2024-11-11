package com.imb.km_system.kiosks.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.kiosks.entity.request.CreateKioskRequest;
import com.imb.km_system.kiosks.service.KioskService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kiosk")
@AllArgsConstructor
public class KioskController {

    private final KioskService kioskService;

    // 키오스크 리스트 조회
    @GetMapping("/list/{dept-id}")
    public ApiResponseDto<?> selectKioskList(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(kioskService.selectAll(deptId), MsgType.SELECT_KIOSK_LIST_SUCCESSFULLY);
    }

    // 키오스크 추가
    @PostMapping("/{dept-id}")
    public ApiResponseDto<?> insertKiosk(@PathVariable(name = "dept-id") Long deptId, @RequestBody CreateKioskRequest request ) {
        return ResponseUtils.ok(kioskService.insert(deptId, request), MsgType.INSERT_KIOSK_SUCCESSFULLY);
    }

    // 키오스크 삭제
    @DeleteMapping("/{dept-id}/{kiosk-id}")
    public ApiResponseDto<?> deleteKiosk(@PathVariable(name = "dept-id") Long deptId, @PathVariable(name = "kiosk-id") String kioskId ) {
        return ResponseUtils.ok(kioskService.delete(deptId, kioskId), MsgType.DELETE_KIOSK_SUCCESSFULLY);
    }
}