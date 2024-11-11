package com.imb.km_system._common.response;

import com.imb.km_system._common.exception.ErrorResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ApiResponseDto<T> {

    private final T data;
    private final String msg;
    private final ErrorResponse errorResponse;

    @Builder
    public ApiResponseDto(T data, String msg, ErrorResponse errorResponse) {
        this.data = data;
        this.msg = msg;
        this.errorResponse = errorResponse;
    }
}
