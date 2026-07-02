package com.example.demo.service;

import com.example.demo.dto.EmployeeRequest;
import com.example.demo.dto.EmployeeResponse;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    private EmployeeResponse toResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .job(employee.getJob())
                .pay(employee.getPay())
                .build();
    }

    public List<EmployeeResponse> findAll() {
        return employeeRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public EmployeeResponse findById(Long id) {
        return toResponse(employeeRepository.findById(id).orElseThrow());
    }

    public EmployeeResponse save(EmployeeRequest employeeRequest) {
        Employee employee = Employee.builder()
                .name(employeeRequest.getName())
                .email(employeeRequest.getEmail())
                .job(employeeRequest.getJob())
                .pay(employeeRequest.getPay())
                .build();

        Employee savedEmployee = employeeRepository.save(employee);

        return toResponse(savedEmployee);
    }

    public EmployeeResponse update(EmployeeRequest employeeRequest, Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow();

        employee.setName(employeeRequest.getName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setJob(employeeRequest.getJob());
        employee.setPay(employeeRequest.getPay());

        Employee updatedEmployee = employeeRepository.save(employee);

        return toResponse(updatedEmployee);
    }

    public Long delete(Long id) {
        employeeRepository.deleteById(id);
        return id;
    }
}