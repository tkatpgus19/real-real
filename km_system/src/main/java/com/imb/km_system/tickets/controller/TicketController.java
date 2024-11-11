package com.imb.km_system.tickets.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.buttons.dto.request.UpdateButtonTitleRequest;
import com.imb.km_system.tickets.dto.request.UpdateTicketTitleRequest;
import com.imb.km_system.tickets.service.TicketService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/ticket")
public class TicketController {

    private final TicketService ticketService;

    // 번호표 리스트 조회
    @GetMapping("/list/{dept-id}")
    public ApiResponseDto<?> selectTicketList(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(ticketService.selectAll(deptId), MsgType.SELECT_TICKET_LIST_SUCCESSFULLY);
    }

    // 메인 번호표 조회
    @GetMapping("/{dept-id}")
    public ApiResponseDto<?> selectMainTicket(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(ticketService.select(deptId), MsgType.SELECT_MAIN_TICKET_SUCCESSFULLY);
    }

    // 메인 번호표 등록
    @GetMapping("/{dept-id}/{ticket-id}")
    public ApiResponseDto<?> updateMainTicket(@PathVariable(name = "dept-id") Long deptId, @PathVariable(name = "ticket-id") Long ticketId) {
        return ResponseUtils.ok(ticketService.update(deptId, ticketId), MsgType.UPDATE_MAIN_TICKET_SUCCESSFULLY);
    }

    // 번호표 추가
    @PostMapping("/{dept-id}")
    public ApiResponseDto<?> registerTicket(@PathVariable(name = "dept-id") Long deptId) {
        return ResponseUtils.ok(ticketService.insert(deptId), MsgType.INSERT_TICKET_SUCCESSFULLY);
    }

    // 번호표 삭제
    @DeleteMapping("/{dept-id}/{ticket-id}")
    public ApiResponseDto<?> unRegisterTicket(@PathVariable(name = "dept-id") Long deptId, @PathVariable(name = "ticket-id") Long ticketId) {
        return ResponseUtils.ok(ticketService.delete(deptId, ticketId), MsgType.DELETE_TICKET_SUCCESSFULLY);
    }

    // 번호표 이름 변경
    @PutMapping("/{ticket-id}")
    public ApiResponseDto<?> updateTicketTitle(@PathVariable(name = "ticket-id") Long ticketId, @RequestBody UpdateTicketTitleRequest request) {
        return ResponseUtils.ok(ticketService.updateTitle(ticketId, request), MsgType.UPDATE_TICKET_TITLE_SUCCESSFULLY);
    }
}
