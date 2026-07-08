package com.example.demo.graphql.query;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class EmployeeQuery {

    private final EmployeeService employeeService;

    @QueryMapping
    public List<Employee> employees() {
        return employeeService.findAll();
    }

    @QueryMapping
    public Employee employee(@Argument Long id) {
        return employeeService.findById(id);
    }

}