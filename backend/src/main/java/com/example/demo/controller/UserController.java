package com.example.demo.controller;


import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserResponse findById(Long id) {
        return userService.findById(id);
    }

    @PostMapping
    public UserResponse save(@Valid @RequestBody UserRequest userRequest) {
        return userService.save(userRequest);
    }
    @PutMapping("/{id}")
    public UserResponse update(@Valid @RequestBody UserRequest userRequest, Long id) {
        return userService.update(userRequest, id);
    }

    @DeleteMapping("/{id}")
    public Long delete(Long id) {
        return userService.delete(id);
    }
}