package com.imb.km_system.buttons.dto.response;

import com.imb.km_system.buttons.dto.ButtonItemDto;
import com.imb.km_system.buttons.entity.ButtonItems;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class SelectButtonItemsResponse {

    private List<ButtonItemDto> buttonItemDtoList;
    private int activatedBtnCnt;

    @Builder
    public SelectButtonItemsResponse(List<ButtonItemDto> buttonItemDtoList, int activatedBtnCnt) {
        this.buttonItemDtoList = buttonItemDtoList;
        this.activatedBtnCnt = activatedBtnCnt;
    }


    public static SelectButtonItemsResponse from(List<ButtonItems> buttonItemList) {
        List<ButtonItemDto> buttonItemDtoList
                = buttonItemList.stream()
                .map(ButtonItemDto::from)
                .toList();

        int activatedBtnCnt = (int) buttonItemList.stream()
                .filter(ButtonItems::isActivate)
                .count();

        return builder()
                .buttonItemDtoList(buttonItemDtoList)
                .activatedBtnCnt(activatedBtnCnt)
                .build();
    }
}
