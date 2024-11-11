package com.imb.km_system._common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private String roomId;
    private String message;

    public MessageDto(String message) {
        this.message = message;
    }
}
