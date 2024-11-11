package com.imb.km_system.kiosks.entity;

import com.imb.km_system.departments.entity.Departments;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Kiosks {

    @Id
    @Column(name = "KIOSK_ID")
    private String id;

    @Column(name = "CREATED_AT")
    private LocalDate createdAt;

    @ManyToOne
    @JoinColumn(name = "DEPT_ID")
    private Departments deptId;

    @Builder
    public Kiosks(String id, LocalDate createdAt, Departments deptId) {
        this.id = id;
        this.createdAt = createdAt;
        this.deptId = deptId;
    }

    public static Kiosks of(String id, Departments deptId) {
        return Kiosks.builder()
                .id(id)
                .createdAt(LocalDate.now())
                .deptId(deptId)
                .build();
    }
}
