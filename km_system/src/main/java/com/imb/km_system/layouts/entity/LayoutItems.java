package com.imb.km_system.layouts.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class LayoutItems {

    @Id
    @Column(name = "LAYOUT_ITEM_ID")
    private Long id;

    @Column(name = "LAYOUT_TYPE")
    private String type;

    @Column(name = "POS_LEFT")
    private int left;

    @Column(name = "POS_TOP")
    private int top;

    @Column(name = "WIDTH")
    private int width;

    @Column(name = "HEIGHT")
    private int height;

    @Column(name = "CONTENT")
    private String content;

    @Column(name = "TEXT_COLOR")
    private String textColor;

    @Column(name = "COLOR")
    private String color;

    @ManyToOne
    @JoinColumn(name = "LAYOUT_ID")
    private Layouts layoutId;

    @Builder
    public LayoutItems(Long id, String type, int left, int top, int width, int height, String content, String textColor, String color, Layouts layoutId) {
        this.id = id;
        this.type = type;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.content = content;
        this.textColor = textColor;
        this.color = color;
        this.layoutId = layoutId;
    }

    public void updateLayoutId(Layouts layoutId) {
        this.layoutId = layoutId;
    }
}
