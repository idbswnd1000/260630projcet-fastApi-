package com.example.demo.controller;

import com.example.demo.dto.SaleRequest;
import com.example.demo.dto.SaleResponse;
import com.example.demo.service.SaleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sales")
@RequiredArgsConstructor
public class SaleController {

    private final SaleService saleService;

    @GetMapping
    public List<SaleResponse> findAll() {
        return saleService.findAll();
    }

    @GetMapping("/{id}")
    public SaleResponse findById(@PathVariable Integer id) {
        return saleService.findById(id);
    }

    @PostMapping
    public SaleResponse save(@Valid @RequestBody SaleRequest saleRequest) {
        return saleService.save(saleRequest);
    }

    @PutMapping("/{id}")
    public SaleResponse update(
            @Valid @RequestBody SaleRequest saleRequest,
            @PathVariable Integer id
    ) {
        return saleService.update(saleRequest, id);
    }

    @DeleteMapping("/{id}")
    public Integer delete(@PathVariable Integer id) {
        return saleService.delete(id);
    }
}