package com.imb.km_system.analysis.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Employees {

    @Id
    @Column(name = "EMPLOYEE_ID")
    private String employeeId;

    @Column(name = "NAME")
    private String name;

}
