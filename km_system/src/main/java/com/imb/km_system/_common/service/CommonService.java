package com.imb.km_system._common.service;

import com.imb.km_system._common.dto.SecurityUserDto;
import com.imb.km_system._common.exception.CustomException;
import com.imb.km_system._common.exception.ErrorType;
import com.imb.km_system.users.entity.Users;
import com.imb.km_system.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommonService {

    private final UserRepository userRepository;

    public Users findUserByAuthentication(Authentication authentication) {
        Object principalObject = authentication.getPrincipal();

        if(principalObject instanceof SecurityUserDto securityUserDto) {
            Optional<Users> optionalUser = findUserById(securityUserDto.getId());

            if(optionalUser.isPresent()) {
                return optionalUser.get();
            }
        }

        throw new CustomException(ErrorType.NOT_FOUND_MEMBER);
    }

    private Optional<Users> findUserById(String id) {
        return userRepository.findById(id);
    }

    public Users validateUserByToken(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorType.NOT_FOUND_MEMBER));
    }
}
