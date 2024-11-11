package com.imb.km_system.users.dto.response;

import com.imb.km_system.users.entity.Users;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginResponseDto {
    private String id;
    private String username;
    private String userDVCD;

    @Builder
    private LoginResponseDto(String id, String username, String userDVCD) {
        this.id = id;
        this.username = username;
        this.userDVCD = userDVCD;
    }

    public static LoginResponseDto from(Users user) {
        return builder()
                .id(user.getId())
                .username(user.getUsername())
                .userDVCD(user.getUserDVCD())
                .build();
    }
}
