package com.imb.km_system.layouts.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.imb.km_system.departments.entity.Departments;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Layouts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LAYOUT_ID")
    private Long id;

    @Column(name = "LAYOUT_NAME")
    private String layoutName;

    @ManyToOne
    @JoinColumn(name = "DEPT_ID")
    private Departments deptId;

    @OneToMany(mappedBy = "layoutId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("layoutId")
    private List<LayoutItems> layoutItemId;

    @Builder
    public Layouts(String layoutName, Departments deptId, List<LayoutItems> layoutItemId) {
        this.layoutName = layoutName;
        this.deptId = deptId;
        this.layoutItemId = layoutItemId;
    }

    public static Layouts of(String name, Departments deptId, List<LayoutItems> layoutItemId) {
        return Layouts.builder()
                .layoutName(name)
                .deptId(deptId)
                .layoutItemId(layoutItemId)
                .build();
    }

    public void updateLayoutName(String name) {
        this.layoutName = name;
    }
}
