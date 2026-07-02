package com.example.demo.service;

import com.example.demo.dto.TodoResponse;
import com.example.demo.dto.TodoRequest;
import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
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
public class TodoService {

    private final TodoRepository todoRepository;

    // entity(relations_ <=> dto(object)
    private TodoResponse toResponse(Todo todo) {
        return TodoResponse.builder()
                .id(todo.getId())
                .subject(todo.getSubject())
                .checked(todo.isChecked())
                .build();
    }
    // get All 방식
    public List<TodoResponse> findAll() {
        return todoRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    //get one 방식
    public TodoResponse findById(Long id) {
        return toResponse(todoRepository.findById(id).orElseThrow());
    }

    // post 방식
    public TodoResponse save(TodoRequest todoRequest) {
        Todo todo = Todo.builder()
                .subject(todoRequest.getSubject())
                .checked(todoRequest.isChecked())
                .build();
        Todo savedTodo = todoRepository.save(todo);
        return toResponse(savedTodo);
    }

    // put 방식
    public TodoResponse update(TodoRequest todoRequest, Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow();
        todo.setSubject(todoRequest.getSubject());
        todo.setChecked(todoRequest.isChecked());
        todoRepository.save(todo);
        return  toResponse(todo);
    }

    // delete 방식
    public Long delete(Long id) {
        todoRepository.deleteById(id);
        return id;
    }

}