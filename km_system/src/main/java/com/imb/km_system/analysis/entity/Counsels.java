package com.imb.km_system.analysis.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "CSNL_LOG")
public class Counsels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CSNL_ID")
    private Long csnlId;

    @Column(name = "CRDT")
    private String crdt;
    @Column(name = "CSNL_CD")
    private String csnlCD;
    @Column(name = "TICKET_STIME")
    private LocalDateTime ticketStime;
    @Column(name = "CSNL_START_DT")
    private LocalDateTime csnlStartDt;
    @Column(name = "CSNL_END_DT")
    private LocalDateTime csnlEndDt;
    @Column(name = "WAIT_TIME")
    private int waitTime;
    @Column(name = "CSNL_TIME")
    private int csnlTime;
    @Column(name = "KIOSK_ID")
    private String kioskId;

    @Column(name = "DEPT_ID")
    private Long deptId;

    @Column(name = "WINDOW_ID")
    private Long windowId;

    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "WINDOW_DVCD")
    private String windowDVCD;
}
