package com.example.demo.graphql.query;

import com.example.demo.entity.User;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AuthQuery {

    private final AuthService authService;
    private final JwtProvider jwtProvider;
    private final HttpServletRequest request;

    @QueryMapping
    public User me() {

        String authorization = request.getHeader("Authorization");

        System.out.println("Authorization = " + authorization);

        if (authorization == null) {
            throw new RuntimeException("토큰 없음");
        }

        String token = authorization.substring(7);

        String username = jwtProvider.getUsername(token);

        System.out.println("username = " + username);

        return authService.me(username);
    }
}