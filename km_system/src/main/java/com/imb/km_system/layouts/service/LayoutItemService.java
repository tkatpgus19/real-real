package com.imb.km_system.layouts.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.layouts.dto.request.UpdateLayoutItemsRequest;
import com.imb.km_system.layouts.entity.LayoutItems;
import com.imb.km_system.layouts.entity.Layouts;
import com.imb.km_system.layouts.repository.LayoutItemRepository;
import com.imb.km_system.layouts.repository.LayoutRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LayoutItemService {

    private final LayoutItemRepository layoutItemRepository;
    private final LayoutRepository layoutRepository;

    @Transactional
    public String updateItems (Long layoutId, UpdateLayoutItemsRequest request) {
        List<LayoutItems> targetList = layoutItemRepository.findAllByLayoutId(layoutId);
        layoutItemRepository.deleteAll(targetList);

        Layouts layout = layoutRepository.findById(layoutId)
                .orElseThrow(() -> new CustomException(ErrorType.LAYOUT_NOT_FOUND));
        layout.updateLayoutName(request.getLayoutName());
        layoutRepository.save(layout);

        List<LayoutItems> requestList = request.getLayoutItemList();
        for(LayoutItems layoutItem: requestList) {
            layoutItem.updateLayoutId(layout);
        }

        layoutItemRepository.saveAll(requestList);

        return "";
    }

    public List<LayoutItems> selectItems(Long layoutId) {
        return layoutItemRepository.findAllByLayoutId(layoutId);
    }
}
