package com.example.demo.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    @NotNull
    @Positive
    private Integer age;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String city;
}