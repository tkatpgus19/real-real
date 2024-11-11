package com.imb.km_system.users.dto.request;

import lombok.Getter;

@Getter
public class RegisterRequestDto {
    private String id;
    private String password;
    private String userDVCD;
    private String username;
    private Long deptId;
}
