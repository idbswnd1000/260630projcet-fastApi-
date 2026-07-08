package com.example.demo.graphql.mutation;

import com.example.demo.dto.TodoInput;
import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class TodoMutation {

    private final TodoService todoService;

    @MutationMapping
    public Todo createTodo(@Argument TodoInput input) {
        return todoService.create(input);
    }

    @MutationMapping
    public Todo updateTodo(
            @Argument Long id,
            @Argument TodoInput input) {

        return todoService.update(id, input);
    }

    @MutationMapping
    public Todo toggleTodo(@Argument Long id) {
        return todoService.toggle(id);
    }

    @MutationMapping
    public Boolean deleteTodo(@Argument Long id) {
        todoService.delete(id);
        return true;
    }
}