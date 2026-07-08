package com.example.demo.graphql.mutation;

import com.example.demo.dto.LoginInput;
import com.example.demo.dto.LoginPayload;
import com.example.demo.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuthMutation {

    private final AuthService authService;

    @MutationMapping
    public LoginPayload login(@Argument LoginInput input) {
        return authService.login(input);
    }
}