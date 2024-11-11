package com.imb.km_system.tickets.service;

import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.tickets.dto.request.UpdateTicketTitleRequest;
import com.imb.km_system.tickets.entity.Tickets;
import com.imb.km_system.tickets.repository.TicketRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;
    private final DepartmentRepository departmentRepository;

    public List<Tickets> selectAll(Long deptId) {
        List<Tickets> targetList = ticketRepository.findAllByDeptId(deptId);
        return targetList;
    }

    public Tickets select(Long deptId) {
        Long id = departmentRepository.findById(deptId).orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND)).getMainTicketId();
        if(id == null) {
            return null;
        }
        return ticketRepository.findById(id).orElse(null);
    }

    @Transactional
    public List<Tickets> insert(Long deptId) {
        Departments department = departmentRepository.findById(deptId)
                .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));

        Tickets ticket = Tickets.of(department, null, null);
        ticketRepository.save(ticket);

        return selectAll(deptId);
    }

    @Transactional
    public List<Tickets> delete(Long deptId, Long ticketId) {
        Tickets ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new CustomException(ErrorType.TICKET_NOT_FOUND));
        ticketRepository.delete(ticket);

        return selectAll(deptId);
    }

    public String update(Long deptId, Long ticketId) {
        Departments department = departmentRepository.findById(deptId).orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));
        department.updateMainTicketId(ticketId);
        departmentRepository.save(department);
        return "";
    }

    public String updateTitle(Long ticketId, UpdateTicketTitleRequest request) {
        Tickets ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new CustomException(ErrorType.TICKET_NOT_FOUND));
        ticket.updateTitle(request.getTicketTitle());
        log.warn(request.getTicketTitle());
        ticketRepository.save(ticket);

        return "";
    }
}
