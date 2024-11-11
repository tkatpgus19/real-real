package com.imb.km_system.buttons.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.buttons.dto.ButtonItemDto;
import com.imb.km_system.buttons.dto.request.UpdateButtonItemsRequest;
import com.imb.km_system.buttons.dto.response.SelectButtonItemsResponse;
import com.imb.km_system.buttons.entity.ButtonItems;
import com.imb.km_system.buttons.entity.Buttons;
import com.imb.km_system.buttons.repository.ButtonItemRepository;
import com.imb.km_system.buttons.repository.ButtonRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ButtonItemService {
    private final ButtonItemRepository buttonItemRepository;
    private final ButtonRepository buttonRepository;

    public SelectButtonItemsResponse selectAllButtons(Long btnId) {
        return SelectButtonItemsResponse.from(buttonItemRepository.findAllByBtnId(btnId));
    }

    @Transactional
    public SelectButtonItemsResponse updateButtons(Long btnId, UpdateButtonItemsRequest request) {
        List<ButtonItems> targetList = buttonItemRepository.findAllByBtnId(btnId);

        buttonItemRepository.deleteAll(targetList);

        List<ButtonItemDto> requestMap = request.getButtonItemDtoList();

        Buttons buttons = buttonRepository.findById(btnId).orElseThrow(() -> new CustomException(ErrorType.KIOSK_NOT_FOUND));

        for(ButtonItemDto buttonItemDto: requestMap) {
            buttonItemRepository.save(ButtonItems.of(buttons, buttonItemDto));
        }

        return selectAllButtons(btnId);
    }
}
