package com.imb.km_system.tickets.repository;

import com.imb.km_system.tickets.entity.TicketItems;
import com.imb.km_system.tickets.entity.Tickets;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TicketItemRepository extends JpaRepository<TicketItems, Long> {

    @Query(value =
            "SELECT * FROM ticket_items WHERE ticket_id = :ticketId ", nativeQuery = true)
    Optional<List<TicketItems>> findAllByTicketId(@Param("ticketId") Long ticketId);
}
