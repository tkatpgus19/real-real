package com.imb.km_system.tickets.repository;

import com.imb.km_system.tickets.entity.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TicketRepository extends JpaRepository<Tickets, Long> {
    @Query(value =
            "SELECT * FROM tickets WHERE dept_id = :deptId ", nativeQuery = true)
    List<Tickets> findAllByDeptId(@Param("deptId") Long deptId);
}
