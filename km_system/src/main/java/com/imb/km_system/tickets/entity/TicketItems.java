package com.imb.km_system.tickets.entity;

import com.imb.km_system.tickets.dto.TicketItemDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class TicketItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TICKET_ITEM_ID")
    private Long id;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "POS_LEFT")
    private int left;

    @Column(name = "POS_TOP")
    private int top;

    @Column(name = "FONT_SIZE")
    private int fontSize;

    @Column(name = "FONT_WEIGHT")
    private String fontWeight;

    @Column(name = "VISIBLE")
    private boolean visible;

    @ManyToOne
    @JoinColumn(name = "TICKET_ID")
    private Tickets ticketId;

    @Builder
    public TicketItems(String type, String content, int left, int top, int fontSize, String fontWeight, boolean visible, Tickets ticketId) {
        this.type = type;
        this.content = content;
        this.left = left;
        this.top = top;
        this.fontSize = fontSize;
        this.fontWeight = fontWeight;
        this.visible = visible;
        this.ticketId = ticketId;
    }

    public static TicketItems of(String type, String content, int left, int top, int fontSize, String fontWeight, boolean visible, Tickets ticketId) {
        return builder()
                .type(type)
                .content(content)
                .left(left)
                .top(top)
                .fontSize(fontSize)
                .fontWeight(fontWeight)
                .visible(visible)
                .ticketId(ticketId)
                .build();
    }

    public static TicketItems from(TicketItemDto ticketItemDto, Tickets ticketId) {
        return builder()
                .type(ticketItemDto.getType())
                .content(ticketItemDto.getContent())
                .left(ticketItemDto.getLeft())
                .top(ticketItemDto.getTop())
                .fontSize(ticketItemDto.getFontSize())
                .fontWeight(ticketItemDto.getFontWeight())
                .ticketId(ticketId)
                .visible(ticketItemDto.isVisible())
                .build();
    }
}
