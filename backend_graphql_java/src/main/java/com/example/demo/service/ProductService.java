package com.example.demo.service;

import com.example.demo.dto.ProductInput;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public Product findById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product create(ProductInput input) {
        Product product = new Product();

        product.setProductName(input.getProductName());
        product.setColor(input.getColor());
        product.setPrice(input.getPrice());
        product.setSalePrice(input.getSalePrice());
        product.setProductCategoryCode(input.getCategoryCode());

        return productRepository.save(product);
    }

    public Product update(Long id, ProductInput input) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setProductName(input.getProductName());
        product.setColor(input.getColor());
        product.setPrice(input.getPrice());
        product.setSalePrice(input.getSalePrice());
        product.setProductCategoryCode(input.getCategoryCode());

        return productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }
}