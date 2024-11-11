package com.imb.km_system.buttons.dto;

import com.imb.km_system.buttons.entity.ButtonItems;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ButtonItemDto {

    private String title;
    private String color;
    private String textColor;
    private boolean isActive;

    @Builder
    public ButtonItemDto(String title, String color, String textColor, boolean isActive) {
        this.title = title;
        this.color = color;
        this.textColor = textColor;
        this.isActive = isActive;
    }

    public static ButtonItemDto from(ButtonItems buttonItem) {
        return builder()
                .title(buttonItem.getTitle())
                .color(buttonItem.getColor())
                .textColor(buttonItem.getTextColor())
                .isActive(buttonItem.isActive())
                .build();
    }
}
