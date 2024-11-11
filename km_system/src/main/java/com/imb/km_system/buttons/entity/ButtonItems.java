package com.imb.km_system.buttons.entity;

import com.imb.km_system.buttons.dto.ButtonItemDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ButtonItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BTN_ITEM_ID")
    private Long id;

    @Column(name = "BTN_TITLE")
    private String title = "";

    @Column(name = "BTN_COLOR")
    private String color = "#9acd32";

    @Column(name = "BTN_TEXT_COLOR")
    private String textColor = "#000000";

    @Column(name = "IS_ACTIVE")
    private boolean isActive = false;

    @ManyToOne
    @JoinColumn(name = "BTN_ID")
    private Buttons btnId;

    @Builder
    public ButtonItems(String title, String color, String textColor, Buttons btnId, boolean isActive) {
        this.title = title;
        this.color = color;
        this.textColor = textColor;
        this.btnId = btnId;
        this.isActive = isActive;
    }

    public static ButtonItems from(Buttons btnId) {
        return builder()
                .btnId(btnId)
                .build();
    }

    public static ButtonItems of(Buttons btnId, ButtonItemDto kioskButton) {
        return builder()
                .btnId(btnId)
                .title(kioskButton.getTitle())
                .color(kioskButton.getColor())
                .textColor(kioskButton.getTextColor())
                .isActive(kioskButton.isActive())
                .build();
    }

    public boolean isActivate() {
        return isActive;
    }
}
