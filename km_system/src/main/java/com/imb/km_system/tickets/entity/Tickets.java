package com.imb.km_system.tickets.entity;

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
public class Tickets {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TICKET_ID")
    private Long id;

    @Column(name = "TICKET_TITLE")
    private String title;

    @ManyToOne
    @JoinColumn(name = "DEPT_ID")
    private Departments deptId;

    @OneToMany(mappedBy = "ticketId", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("ticketId")
    List<TicketItems> ticketItemList;

    @Builder
    public Tickets(Departments deptId, List<TicketItems> ticketItemList, String title) {
        this.deptId = deptId;
        this.ticketItemList = ticketItemList;
        this.title = title;
    }

    public static Tickets of(Departments deptId, List<TicketItems> ticketItemList, String title) {
        return builder()
                .deptId(deptId)
                .ticketItemList(ticketItemList)
                .title(title)
                .build();
    }

    public void updateTitle(String title) {
        this.title = title;
    }
}
