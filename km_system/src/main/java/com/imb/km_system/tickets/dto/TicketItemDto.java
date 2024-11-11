package com.imb.km_system.tickets.dto;

import com.imb.km_system.tickets.entity.TicketItems;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TicketItemDto {

    private String type;
    private String content;
    private int left;
    private int top;
    private int fontSize;
    private String fontWeight;
    private boolean visible;

    @Builder
    public TicketItemDto(String type, String content, int left, int top, int fontSize, String fontWeight, boolean visible) {
        this.type = type;
        this.content = content;
        this.left = left;
        this.top = top;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.visible = visible;
    }

    public static TicketItemDto from(TicketItems ticketItem) {
        return builder()
                .type(ticketItem.getType())
                .content(ticketItem.getContent())
                .left(ticketItem.getLeft())
                .top(ticketItem.getTop())
                .fontSize(ticketItem.getFontSize())
                .fontWeight(ticketItem.getFontWeight())
                .visible(ticketItem.isVisible())
                .build();
    }
}
