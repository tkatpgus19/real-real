package com.imb.km_system.users.dto.response;

import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.users.entity.Users;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CheckLoginStatusResponse {
    private String username;
    private String userDVCD;
    private Departments department;

    @Builder
    public CheckLoginStatusResponse(String username, String userDVCD, Departments department) {
        this.username = username;
        this.userDVCD = userDVCD;
        this.department = department;
    }

    public static CheckLoginStatusResponse from(Users user) {
        return builder()
                .username(user.getUsername())
                .userDVCD(user.getUserDVCD())
                .department(user.getDeptId())
                .build();
    }
}
