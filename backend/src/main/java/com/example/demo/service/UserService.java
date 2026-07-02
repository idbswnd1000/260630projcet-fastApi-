package com.example.demo.service;

import com.example.demo.dto.UserRequest;
import com.example.demo.dto.UserResponse;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/*
* query :   insert, update <= save()
*           delete from users where id = ? <= deleteById()
*           select * from users M= findAll()
*           select  *from users where id = ? <= findById()
* */

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // entity(relations_ <=> dto(object)
    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .age(user.getAge())
                .email(user.getEmail())
                .city(user.getCity())
                .build();
    }
    // get All 방식
    public List<UserResponse> findAll() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    //get one 방식
    public UserResponse findById(Long id) {
        return toResponse(userRepository.findById(id).orElseThrow());
    }

    // post 방식
    public UserResponse save(UserRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .age(userRequest.getAge())
                .email(userRequest.getEmail())
                .city(userRequest.getCity())
                .build();
        userRepository.save(user);
        return UserResponse.builder().username(user.getUsername()).build();
    }

    // put 방식
    public UserResponse update(UserRequest userRequest, Long id) {
        User user = userRepository.findById(id).orElseThrow();
        user.setUsername(userRequest.getUsername());
        user.setPassword(userRequest.getPassword());
        user.setAge(userRequest.getAge());
        user.setEmail(userRequest.getEmail());
        user.setCity(userRequest.getCity());
        userRepository.save(user);
        return  toResponse(user);
    }

    // delete 방식
    public Long delete(Long id) {
        userRepository.deleteById(id);
        return id;
    }

}