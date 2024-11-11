package com.imb.km_system.tickets.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.tickets.dto.request.UpdateTicketItemListRequest;
import com.imb.km_system.tickets.service.TicketItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ticket-item")
public class TicketItemController {

    private final TicketItemService ticketItemService;

    // 번호표 요소 조회
    @GetMapping("/{ticket-id}")
    public ApiResponseDto<?> selectTicketItemList(@PathVariable(name = "ticket-id") Long ticketId) {
        return ResponseUtils.ok(ticketItemService.selectAll(ticketId), MsgType.SELECT_TICKET_ITEM_LIST_SUCCESSFULLY);
    }

    // 번호표 요소 변경
    @PutMapping("/{ticket-id}")
    public ApiResponseDto<?> updateTicketItemList(@PathVariable(name = "ticket-id") Long ticketId, @RequestBody UpdateTicketItemListRequest request) {
        return ResponseUtils.ok(ticketItemService.updateList(ticketId, request), MsgType.SELECT_TICKET_LIST_SUCCESSFULLY);
    }
}
