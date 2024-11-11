package com.imb.km_system._common.jwt;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.imb.km_system._common.dto.SecurityUserDto;
import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.MsgType;
import com.imb.km_system._common.response.ResponseUtils;
import com.imb.km_system._common.service.CommonService;
import com.imb.km_system.users.entity.Users;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.ResponseUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CommonService commonService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = jwtUtil.resolveToken(request);
        ObjectMapper mapper = new ObjectMapper();

        if(token == null) {
            filterChain.doFilter(request, response);
            return;
        }

        int validationCheck = jwtUtil.validateToken(token);

        if(validationCheck < 0) {
            if(validationCheck == -1) {
                request.setAttribute("exception", ErrorType.INVALID_TOKEN.toString());
                filterChain.doFilter(request, response);
                return;
            } else if(validationCheck == -2) {
                request.setAttribute("exception", ErrorType.EXPIRED_TOKEN.toString());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(mapper.writeValueAsString(ResponseUtils.fail(ErrorType.EXPIRED_TOKEN)));
                return;
            }
        }

        try {
            setAuthentication(String.valueOf(jwtUtil.getMemberId(token)));
        } catch (UsernameNotFoundException e) {
            request.setAttribute("exception", ErrorType.NOT_FOUND_MEMBER.toString());
        }
        filterChain.doFilter(request, response);
    }

    private void setAuthentication(String id) {
        Users user = commonService.validateUserByToken(id);
        SecurityUserDto securityMemberDto = SecurityUserDto.from(user);

        SecurityContext context = SecurityContextHolder.createEmptyContext();

        Authentication authentication = jwtUtil.getAuthentication(securityMemberDto);
        context.setAuthentication(authentication);

        SecurityContextHolder.setContext(context);
        log.info("토큰에 들어있는 값 = {}", securityMemberDto);
    }
}
