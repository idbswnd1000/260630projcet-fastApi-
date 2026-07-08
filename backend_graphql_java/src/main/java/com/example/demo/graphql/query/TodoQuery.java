package com.example.demo.graphql.query;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class TodoQuery {

    private final TodoService todoService;

    @QueryMapping
    public List<Todo> todos() {
        return todoService.findAll();
    }

    @QueryMapping
    public Todo todo(@Argument Long id) {
        return todoService.findById(id);
    }

}