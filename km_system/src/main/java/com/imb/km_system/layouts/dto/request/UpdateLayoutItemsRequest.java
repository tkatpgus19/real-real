package com.imb.km_system.layouts.dto.request;

import com.imb.km_system.layouts.entity.LayoutItems;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class UpdateLayoutItemsRequest {
    private String layoutName;
    private List<LayoutItems> layoutItemList;
}
