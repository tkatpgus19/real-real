package com.imb.km_system.buttons.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.buttons.dto.request.UpdateButtonItemsRequest;
import com.imb.km_system.buttons.service.ButtonItemService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/button-items")
public class ButtonItemController {

    private final ButtonItemService buttonItemService;

    // 버튼 리스트 반환
    @GetMapping("/{btn-id}")
    public ApiResponseDto<?> selectKioskButtonList(@PathVariable(name = "btn-id") Long btnId) {
        return ResponseUtils.ok(buttonItemService.selectAllButtons(btnId), MsgType.SELECT_BUTTON_ITEM_LIST_SUCCESSFULLY);
    }

    // 버튼 커스텀
    @PutMapping("/{btn-id}")
    public ApiResponseDto<?> updateKioskButtonList(@PathVariable(name = "btn-id") Long btnId, @RequestBody UpdateButtonItemsRequest request) {
        return ResponseUtils.ok(buttonItemService.updateButtons(btnId, request), MsgType.UPDATE_BUTTON_ITEM_LIST_SUCCESSFULLY);
    }
}
