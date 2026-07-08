package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.dto.EmployeeInput;
import com.example.demo.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // 전체 조회
    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    // 단건 조회
    public Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }

    // 등록
    public Employee create(EmployeeInput input) {

        Employee employee = new Employee();

        employee.setName(input.getName());
        employee.setEmail(input.getEmail());
        employee.setJob(input.getJob());
        employee.setPay(input.getPay());

        return employeeRepository.save(employee);
    }

    // 수정
    public Employee update(Long id, EmployeeInput input) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        employee.setName(input.getName());
        employee.setEmail(input.getEmail());
        employee.setJob(input.getJob());
        employee.setPay(input.getPay());

        return employeeRepository.save(employee);
    }

    // 삭제
    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

}