package com.example.demo.service;

import com.example.demo.dto.TodoInput;
import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<Todo> findAll() {
        return todoRepository.findAll();
    }

    public Todo findById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));
    }

    public Todo create(TodoInput input) {
        Todo todo = new Todo();

        todo.setSubject(input.getSubject());
        todo.setChecked(input.isChecked());

        return todoRepository.save(todo);
    }

    public Todo update(Long id, TodoInput input) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setSubject(input.getSubject());
        todo.setChecked(input.isChecked());

        return todoRepository.save(todo);
    }

    public Todo toggle(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found"));

        todo.setChecked(!todo.isChecked());

        return todoRepository.save(todo);
    }

    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}