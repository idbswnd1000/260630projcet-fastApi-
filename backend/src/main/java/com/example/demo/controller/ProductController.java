package com.example.demo.controller;

import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping
    public ProductResponse save(@Valid @RequestBody ProductRequest productRequest) {
        return productService.save(productRequest);
    }

    @PutMapping("/{id}")
    public ProductResponse update(
            @Valid @RequestBody ProductRequest productRequest,
            @PathVariable Long id
    ) {
        return productService.update(productRequest, id);
    }

    @DeleteMapping("/{id}")
    public Long delete(@PathVariable Long id) {
        return productService.delete(id);
    }
}