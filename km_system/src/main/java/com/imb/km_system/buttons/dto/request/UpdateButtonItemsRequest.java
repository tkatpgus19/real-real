package com.imb.km_system.buttons.dto.request;

import com.imb.km_system.buttons.dto.ButtonItemDto;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class UpdateButtonItemsRequest {
    private List<ButtonItemDto> buttonItemDtoList;
}
