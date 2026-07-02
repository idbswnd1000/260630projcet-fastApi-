package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TodoRequest {

    @NotBlank
    private String subject;

    @NotBlank
    private boolean checked;
}