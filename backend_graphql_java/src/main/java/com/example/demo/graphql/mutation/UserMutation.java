package com.example.demo.graphql.mutation;

import com.example.demo.dto.UserInput;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class UserMutation {

    private final UserService userService;

    @MutationMapping
    public User createUser(@Argument UserInput input) {
        return userService.create(input);
    }

    @MutationMapping
    public User updateUser(
            @Argument Long id,
            @Argument UserInput input) {

        return userService.update(id, input);
    }

    @MutationMapping
    public Boolean deleteUser(@Argument Long id) {
        userService.delete(id);
        return true;
    }
}