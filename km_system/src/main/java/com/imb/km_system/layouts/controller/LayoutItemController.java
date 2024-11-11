package com.imb.km_system.layouts.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.layouts.dto.request.UpdateLayoutItemsRequest;
import com.imb.km_system.layouts.service.LayoutItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/layout-item")
public class LayoutItemController {

    private final LayoutItemService layoutItemService;

    // 배치도 요소들 조회
    @GetMapping("/{layout-id}")
    public ApiResponseDto<?> selectLayoutItemList(@PathVariable(name = "layout-id") Long layoutId) {
        return ResponseUtils.ok(layoutItemService.selectItems(layoutId), MsgType.SELECT_LAYOUT_ITEM_LIST_SUCCESSFULLY);
    }

    // 배치도 요소들 저장
    @PutMapping("/{layout-id}")
    public ApiResponseDto<?> updateLayoutItems(@PathVariable(name = "layout-id") Long layoutId, @RequestBody UpdateLayoutItemsRequest request) {
        return ResponseUtils.ok(layoutItemService.updateItems(layoutId, request), MsgType.UPDATE_LAYOUT_ITEMS_SUCCESSFULLY);
    }


}
