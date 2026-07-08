package com.example.demo.graphql.mutation;

import com.example.demo.entity.Employee;
import com.example.demo.dto.EmployeeInput;
import com.example.demo.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class EmployeeMutation {

    private final EmployeeService employeeService;

    @MutationMapping
    public Employee createEmployee(
            @Argument EmployeeInput input) {

        return employeeService.create(input);
    }

    @MutationMapping
    public Employee updateEmployee(
            @Argument Long id,
            @Argument EmployeeInput input) {

        return employeeService.update(id, input);
    }

    @MutationMapping
    public Boolean deleteEmployee(
            @Argument Long id) {

        employeeService.delete(id);
        return true;
    }

}