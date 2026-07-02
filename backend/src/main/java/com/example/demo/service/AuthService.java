package com.example.demo.service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.jwt.JwtProvider;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 사용자입니다."));

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }

        String token = jwtProvider.createToken(user.getUsername());

        return new LoginResponse(token, "Bearer");
    }

    public UserResponse me(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow();

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .age(user.getAge())
                .email(user.getEmail())
                .city(user.getCity())
                .build();
    }
}