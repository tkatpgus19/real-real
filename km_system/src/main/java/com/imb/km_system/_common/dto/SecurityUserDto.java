package com.imb.km_system._common.dto;

import com.imb.km_system.users.entity.Users;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SecurityUserDto {
    private String id;
    private String username;
    private String userDVCD;

    @Builder
    private SecurityUserDto(String id, String username, String userDVCD) {
        this.id = id;
        this.username = username;
        this.userDVCD = userDVCD;
    }

    public static SecurityUserDto from(Users user) {
        return builder()
                .id(user.getId())
                .username(user.getUsername())
                .userDVCD(user.getUserDVCD())
                .build();
    }
}
