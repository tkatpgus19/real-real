package com.imb.km_system.users.entity;

import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.users.dto.request.RegisterRequestDto;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Users {
    @Id
    @Column(name = "USER_ID")
    private String id;

    @Column(name = "USER_PASSWORD", nullable = false)
    private String password;

    @Column(name = "USER_NM", nullable = false)
    private String username;

    @Column(name = "USER_DVCD")
    private String userDVCD;

    @ManyToOne
    @JoinColumn(name = "DEPT_ID")
    private Departments deptId;

    @Builder
    public Users(String id, String password, String username, String userDVCD, Departments deptId) {
        this.id = id;
        this.password = password;
        this.username = username;
        this.userDVCD = userDVCD;
        this.deptId = deptId;
    }

    public static Users of(String id, String password, String username, String userDVCD, Departments deptId) {
        return builder()
                .id(id)
                .password(password)
                .username(username)
                .userDVCD(userDVCD)
                .deptId(deptId)
                .build();
    }

    public static Users from(RegisterRequestDto request, Departments depthId) {
        return builder()
                .id(request.getId())
                .password(request.getPassword())
                .username(request.getUsername())
                .userDVCD(request.getUserDVCD())
                .deptId(depthId)
                .build();
    }

    public boolean checkPassword(String plainPassword, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(plainPassword, this.password);
    }

    public void encodePassword(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }
}
