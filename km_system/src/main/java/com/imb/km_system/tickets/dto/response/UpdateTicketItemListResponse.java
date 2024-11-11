package com.imb.km_system.tickets.dto.response;

import com.imb.km_system.tickets.entity.TicketItems;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class UpdateTicketItemListResponse {
    private List<TicketItems> ticketItemList;

    @Builder
    public UpdateTicketItemListResponse(List<TicketItems> ticketItemList) {
        this.ticketItemList = ticketItemList;
    }

    public static UpdateTicketItemListResponse from(List<TicketItems> ticketItemList) {
        return builder()
                .ticketItemList(ticketItemList)
                .build();
    }
}
