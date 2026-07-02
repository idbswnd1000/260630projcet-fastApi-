package com.example.demo.service;

import com.example.demo.dto.ProductRequest;
import com.example.demo.dto.ProductResponse;
import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    private ProductResponse toResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .productName(product.getProductName())
                .color(product.getColor())
                .price(product.getPrice())
                .salePrice(product.getSalePrice())
                .categoryCode(product.getCategoryCode())
                .build();
    }

    public List<ProductResponse> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProductResponse findById(Long id) {
        return toResponse(productRepository.findById(id).orElseThrow());
    }

    public ProductResponse save(ProductRequest productRequest) {
        Product product = Product.builder()
                .productName(productRequest.getProductName())
                .color(productRequest.getColor())
                .price(productRequest.getPrice())
                .salePrice(productRequest.getSalePrice())
                .categoryCode(productRequest.getCategoryCode())
                .build();

        Product savedProduct = productRepository.save(product);

        return toResponse(savedProduct);
    }

    public ProductResponse update(ProductRequest productRequest, Long id) {
        Product product = productRepository.findById(id).orElseThrow();

        product.setProductName(productRequest.getProductName());
        product.setColor(productRequest.getColor());
        product.setPrice(productRequest.getPrice());
        product.setSalePrice(productRequest.getSalePrice());
        product.setCategoryCode(productRequest.getCategoryCode());

        Product updatedProduct = productRepository.save(product);

        return toResponse(updatedProduct);
    }

    public Long delete(Long id) {
        productRepository.deleteById(id);
        return id;
    }
}