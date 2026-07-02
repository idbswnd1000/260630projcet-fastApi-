package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoResponse {

    @NotBlank
    private Long id;

    @NotBlank
    private String subject;

    @NotBlank
    private boolean checked;

}