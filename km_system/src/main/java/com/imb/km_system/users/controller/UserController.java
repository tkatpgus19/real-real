package com.imb.km_system.users.controller;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system.users.dto.request.LoginRequestDto;
import com.imb.km_system.users.dto.request.RegisterRequestDto;
import com.imb.km_system.users.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/register")
    public ApiResponseDto<?> register(@RequestBody RegisterRequestDto request) {
        return ResponseUtils.ok(userService.registerUser(request), MsgType.SIGNUP_SUCCESSFULLY);
    }

    // 로그인 여부 체크
    @GetMapping("/check-login-status")
    public ApiResponseDto<?> check(HttpServletRequest request, HttpServletResponse response) {
        return ResponseUtils.ok(userService.checkLoginStatus(request, response), MsgType.CHECK_VALIDITY_SUCCESSFULLY);
    }

    // 로그인
    @PostMapping("/login")
    public ApiResponseDto<?> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        return ResponseUtils.ok(userService.validateUser(loginRequestDto, response), MsgType.SIGN_IN_SUCCESSFULLY);
    }

    // 로그아웃
    @GetMapping("/logout")
    public ApiResponseDto<?> logout(HttpServletResponse response) {
        return ResponseUtils.ok(userService.logout(response), MsgType.LOG_OUT_SUCCESSFULLY);
    }

    // 아이디 체크
    @GetMapping("/check-duplication/{id}")
    public ApiResponseDto<?> checkDuplication(@PathVariable String id) {
        return ResponseUtils.ok(userService.checkDuplication(id), MsgType.VALIDATE_ID_SUCCESSFULLY);
    }
}
