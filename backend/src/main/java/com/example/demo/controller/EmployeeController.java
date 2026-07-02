package com.example.demo.controller;

import com.example.demo.dto.EmployeeRequest;
import com.example.demo.dto.EmployeeResponse;
import com.example.demo.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<EmployeeResponse> findAll() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public EmployeeResponse findById(@PathVariable Long id) {
        return employeeService.findById(id);
    }

    @PostMapping
    public EmployeeResponse save(@Valid @RequestBody EmployeeRequest employeeRequest) {
        return employeeService.save(employeeRequest);
    }

    @PutMapping("/{id}")
    public EmployeeResponse update(
            @Valid @RequestBody EmployeeRequest employeeRequest,
            @PathVariable Long id
    ) {
        return employeeService.update(employeeRequest, id);
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return employeeService.delete(id);
    }
}