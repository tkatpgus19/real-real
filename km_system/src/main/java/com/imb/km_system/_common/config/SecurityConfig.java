package com.imb.km_system._common.config;

import com.imb.km_system._common.exception.AccessDeniedHandler;
import com.imb.km_system._common.jwt.JwtAuthFilter;
import jakarta.servlet.DispatcherType;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationEntryPoint authenticationEntryPoint;
    private final AccessDeniedHandler accessDeniedHandler;
    private final JwtAuthFilter jwtAuthFilter;

    private final String[] whiteList = {"/ws-stomp/**", "/ws-stomp/sub/**", "/ws-stomp/pub/**", "/api/**", "/swagger-ui/**", "/api-docs/**", "/swagger-resources/**"};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(
                        (auth) ->
                                auth
                                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                                        .dispatcherTypeMatchers(DispatcherType.ASYNC).permitAll()

                                        .requestMatchers(whiteList).permitAll()
                                        .anyRequest().authenticated()

                )
//                .exceptionHandling(authentication ->
//                        authentication.authenticationEntryPoint(authenticationEntryPoint)
//                                .accessDeniedHandler(accessDeniedHandler))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        http
                .formLogin(AbstractHttpConfigurer::disable);
        http
                .httpBasic(AbstractHttpConfigurer::disable);
        http
                .csrf(AbstractHttpConfigurer::disable);
        http
                .cors((corsCustomizer -> corsCustomizer.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOriginPatterns(List.of("*"));
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                    configuration.setAllowCredentials(true);
                    configuration.setAllowedHeaders(List.of("*"));
                    configuration.setExposedHeaders(Collections.singletonList("Authorization"));

                    return configuration;
                })));
        http
                .headers((headers) -> headers.frameOptions(
                        HeadersConfigurer.FrameOptionsConfig::sameOrigin
                ));
        http
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );


        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();
        cors.setAllowedOriginPatterns(Arrays.asList("*"));
        cors.setAllowedMethods(Arrays.asList("GET","POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        cors.setAllowedHeaders(Arrays.asList("*"));
        cors.addExposedHeader("Authorization");
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);

        return source;
    }
}
