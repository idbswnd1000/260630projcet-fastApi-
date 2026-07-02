package com.example.demo.controller;


import com.example.demo.dto.TodoRequest;
import com.example.demo.dto.TodoResponse;
import com.example.demo.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public List<TodoResponse> findAll() {
        return todoService.findAll();
    }

    @GetMapping("/{id}")
    public TodoResponse findById(Long id) {
        return todoService.findById(id);
    }

    @PostMapping
    public TodoResponse save(@Valid @RequestBody TodoRequest todoRequest) {
        return todoService.save(todoRequest);
    }
    @PutMapping("/{id}")
    public TodoResponse update(@Valid @RequestBody TodoRequest todoRequest, Long id) {
        return todoService.update(todoRequest, id);
    }

    @DeleteMapping("/{id}")
    public Long delete(Long id) {
        return todoService.delete(id);
    }
}