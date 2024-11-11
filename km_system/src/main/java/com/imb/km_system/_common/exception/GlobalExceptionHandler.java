package com.imb.km_system._common.exception;

import com.imb.km_system._common.response.ApiResponseDto;
import com.imb.km_system._common.response.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ApiResponseDto<?> handleGlobalException(CustomException customException) {
        return ResponseUtils.fail(customException.getErrorType());
    }
}
