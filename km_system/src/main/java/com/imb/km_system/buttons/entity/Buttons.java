package com.imb.km_system.buttons.entity;

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
public class Buttons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BTN_ID")
    private Long id;

    @Column(name = "BTN_TITLE")
    private String title;

    @ManyToOne
    @JoinColumn(name = "DEPT_ID")
    private Departments deptId;

    @OneToMany(mappedBy = "btnId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("btnId") // "parent" 필드를 무시하여 순환 참조 방지
    private List<ButtonItems> buttonItemId;

    @Builder
    public Buttons(Departments deptId, List<ButtonItems> buttonItemId, String title) {
        this.deptId = deptId;
        this.buttonItemId = buttonItemId;
        this.title = title;
    }

    public static Buttons of(Departments deptId, List<ButtonItems> buttonItemId, String title) {
        return builder()
                .deptId(deptId)
                .buttonItemId(buttonItemId)
                .title(title)
                .build();
    }

    public void updateTitle(String btnTitle) {
        this.title = btnTitle;
    }
}
