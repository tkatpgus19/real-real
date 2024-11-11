package com.imb.km_system.departments.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imb.km_system.kiosks.entity.Kiosks;
import com.imb.km_system.users.entity.Users;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Departments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DEPT_ID")
    private Long id;

    @Column(name = "DEPT_NM", nullable = false)
    private String deptName;

    @Column(name = "STIME")
    private Integer sTime;

    @Column(name = "ETIME")
    private Integer eTime;

    @Column(name = "MAIN_BTN_ID")
    private Long mainBtnId;

    @Column(name = "MAIN_TICKET_ID")
    private Long mainTicketId;

    @Column(name = "MAIN_LAYOUT_ID")
    private Long mainLayoutId;

    @OneToMany(mappedBy = "deptId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("deptId")
    private List<Kiosks> kioskId;

    @OneToMany(mappedBy = "deptId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("deptId")
    private List<Users> userId;

    @Builder
    public Departments(String deptName, Integer sTime, Integer eTime, Long mainBtnId, Long mainTicketId, Long mainLayoutId, List<Kiosks> kioskId, List<Users> userId) {
        this.deptName = deptName;
        this.sTime = sTime;
        this.eTime = eTime;
        this.mainBtnId = mainBtnId;
        this.mainTicketId = mainTicketId;
        this.mainLayoutId = mainLayoutId;
        this.kioskId = kioskId;
        this.userId = userId;
    }

    public static Departments of(String deptName, Integer sTime, Integer eTime, Long mainBtnId, Long mainTicketId, Long mainLayoutId, List<Kiosks> kioskId, List<Users> userId) {
        return builder()
                .deptName(deptName)
                .sTime(sTime)
                .eTime(eTime)
                .mainBtnId(mainBtnId)
                .mainTicketId(mainTicketId)
                .mainLayoutId(mainLayoutId)
                .kioskId(kioskId)
                .userId(userId)
                .build();
    }

    public void updateMainBtnId(Long btnId) {
        this.mainBtnId = btnId;
    }

    public void updateMainTicketId(Long ticketId) { this.mainTicketId = ticketId; }

}
