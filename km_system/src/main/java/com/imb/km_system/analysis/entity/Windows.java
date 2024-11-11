package com.imb.km_system.analysis.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Windows {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "WINDOW_ID")
    private Long windowId;

    @Column(name = "WD_DVCD")
    private String wdDVCD;

    @Column(name = "DEPT_ID")
    private Long deptId;

    @Column(name = "USER_ID")
    private String userId;
}
