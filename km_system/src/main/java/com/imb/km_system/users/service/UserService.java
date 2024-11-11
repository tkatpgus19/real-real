package com.imb.km_system.users.service;

import com.imb.km_system._common.dto.SecurityUserDto;
import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system._common.jwt.JwtUtil;
import com.imb.km_system.departments.entity.Departments;
import com.imb.km_system.departments.repository.DepartmentRepository;
import com.imb.km_system.users.dto.request.LoginRequestDto;
import com.imb.km_system.users.dto.request.RegisterRequestDto;
import com.imb.km_system.users.dto.response.CheckLoginStatusResponse;
import com.imb.km_system.users.dto.response.LoginResponseDto;
import com.imb.km_system.users.entity.Users;
import com.imb.km_system.users.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public CheckLoginStatusResponse checkLoginStatus(HttpServletRequest request, HttpServletResponse response){
        // 쿠키에서 JWT 토큰 찾기
        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("JWT_TOKEN".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        log.warn(Arrays.toString(cookies));
        // JWT 토큰 유효성 검사
        if (token != null && jwtUtil.validateToken(token) > 0) {
            // 토큰이 유효한 경우
            String userId = jwtUtil.getMemberId(token);

            Users user = userRepository.findByUserId(userId);
            String jwtAccessToken = jwtUtil.createToken(user, false);

            // JWT 만료기간 및 쿠기 만료기간 초기화
            Cookie cookie = new Cookie("JWT_TOKEN", jwtAccessToken);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(6_000);
            cookie.setPath("/"); // 전체 경로에 쿠키 유효화
            cookie.setAttribute("SameSite", "Lax");
            response.addCookie(cookie);

            return CheckLoginStatusResponse.from(user);
        } else {
            // 토큰이 만료되었거나 유효하지 않은 경우
            throw new CustomException(ErrorType.INVALID_TOKEN);
        }
    }
    
    // 로그인
    public LoginResponseDto validateUser(LoginRequestDto request, HttpServletResponse response) {
        Users user = userRepository.findById(request.getId())
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_MEMBER));

        if(!user.checkPassword(request.getPassword(), passwordEncoder)) {
            throw new CustomException(ErrorType.INVALID_PASSWORD);
        }

        String jwtAccessToken = jwtUtil.createToken(user, false);

        Cookie cookie = new Cookie("JWT_TOKEN", jwtAccessToken);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(6_000);
        cookie.setPath("/"); // 전체 경로에 쿠키 유효화
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
        return LoginResponseDto.from(user);
    }

    // 회원가입
    @Transactional
    public String registerUser(RegisterRequestDto request) {
        // 중복이 아니면, 가입
        if(checkDuplication(request.getId())) {
            Departments deptId = departmentRepository.findById(request.getDeptId())
                    .orElseThrow(() -> new CustomException(ErrorType.DEPARTMENT_NOT_FOUND));

            Users target = Users.from(request, deptId);
            target.encodePassword(passwordEncoder);
            userRepository.save(target);
        }
        else {
            throw new CustomException(ErrorType.DB_SAVE_ERROR);
        }
        return null;
    }

    // 아이디 중복 체크
    public boolean checkDuplication(String id) {
        Users user = userRepository.findById(id)
                .orElse(null);
        if(user == null) {
            return true;
        }
        throw new CustomException(ErrorType.DUPLICATED_NICKNAME);
    }

    // 로그아웃
    public String logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("JWT_TOKEN", null);
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
        return "";
    }

    @Transactional
    public void initUser() {

        Users[] newUsers = new Users[5];
        newUsers[0] = Users.of("first", "password", "김갑", "00", departmentRepository.findById(1L).orElse(null));
        newUsers[1] = Users.of("other1", "password1", "김을", "01", departmentRepository.findById(2L).orElse(null));
        newUsers[2] = Users.of("other2", "password1", "김병", "01", departmentRepository.findById(2L).orElse(null));
        newUsers[3] = Users.of("other3", "password1", "김정", "01", departmentRepository.findById(3L).orElse(null));
        newUsers[4] = Users.of("other4", "password1", "김무", "01", departmentRepository.findById(3L).orElse(null));

        for(int i=0; i<5; i++) {
            newUsers[i].encodePassword(passwordEncoder);
            userRepository.save(newUsers[i]);
        }
    }

}
