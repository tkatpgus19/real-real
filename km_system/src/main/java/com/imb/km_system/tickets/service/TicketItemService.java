package com.imb.km_system.tickets.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.tickets.dto.TicketItemDto;
import com.imb.km_system.tickets.dto.request.UpdateTicketItemListRequest;
import com.imb.km_system.tickets.dto.response.UpdateTicketItemListResponse;
import com.imb.km_system.tickets.entity.TicketItems;
import com.imb.km_system.tickets.entity.Tickets;
import com.imb.km_system.tickets.repository.TicketItemRepository;
import com.imb.km_system.tickets.repository.TicketRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TicketItemService {

    private final TicketItemRepository ticketItemRepository;
    private final TicketRepository ticketRepository;

    @Transactional
    public UpdateTicketItemListResponse updateList(Long ticketId, UpdateTicketItemListRequest request) {
        log.warn(request.toString());
        // 조회결과가 있으면 있는거 수정
        // 없으면 삽입
        List<TicketItems> targetList = ticketItemRepository.findAllByTicketId(ticketId)
                .orElseThrow(null);
        if(targetList != null) {
            ticketItemRepository.deleteAll(targetList);
        }

        List<TicketItemDto> requestList = request.getTicketItemDtoList();
        Tickets ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new CustomException(ErrorType.TICKET_NOT_FOUND));

        List<TicketItems> newTicketItemsList = requestList.stream()
                .map(dto -> TicketItems.from(dto, ticket))
                .toList();
        ticketItemRepository.saveAll(newTicketItemsList);

        return UpdateTicketItemListResponse.from(newTicketItemsList);
    }

    public UpdateTicketItemListResponse selectAll(Long ticketId) {
        List<TicketItems> targetList = ticketItemRepository.findAllByTicketId(ticketId)
                .orElse(null);
        return UpdateTicketItemListResponse.from(targetList);
    }
}
