package com.imb.km_system.tickets.dto.request;

import com.imb.km_system.tickets.dto.TicketItemDto;
import lombok.Getter;

import java.util.List;

@Getter
public class UpdateTicketItemListRequest {
    private List<TicketItemDto> ticketItemDtoList;
}
