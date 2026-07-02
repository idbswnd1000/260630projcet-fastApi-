package com.example.demo.service;

import com.example.demo.dto.SaleRequest;
import com.example.demo.dto.SaleResponse;
import com.example.demo.entity.Sale;
import com.example.demo.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    private SaleResponse toResponse(Sale sale) {
        return SaleResponse.builder()
                .id(sale.getId())
                .userId(sale.getUserId())
                .productId(sale.getProductId())
                .quantity(sale.getQuantity())
                .discountRate(sale.getDiscountRate())
                .totalPrice(sale.getTotalPrice())
                .createdAt(sale.getCreatedAt())
                .build();
    }

    public List<SaleResponse> findAll() {
        return saleRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public SaleResponse findById(Integer id) {
        return toResponse(saleRepository.findById(id).orElseThrow());
    }

    public SaleResponse save(SaleRequest saleRequest) {
        Sale sale = Sale.builder()
                .userId(saleRequest.getUserId())
                .productId(saleRequest.getProductId())
                .quantity(saleRequest.getQuantity())
                .discountRate(saleRequest.getDiscountRate())
                .totalPrice(saleRequest.getTotalPrice())
                .createdAt(saleRequest.getCreatedAt())
                .build();

        Sale savedSale = saleRepository.save(sale);

        return toResponse(savedSale);
    }

    public SaleResponse update(SaleRequest saleRequest, Integer id) {
        Sale sale = saleRepository.findById(id).orElseThrow();

        sale.setUserId(saleRequest.getUserId());
        sale.setProductId(saleRequest.getProductId());
        sale.setQuantity(saleRequest.getQuantity());
        sale.setDiscountRate(saleRequest.getDiscountRate());
        sale.setTotalPrice(saleRequest.getTotalPrice());
        sale.setCreatedAt(saleRequest.getCreatedAt());

        Sale updatedSale = saleRepository.save(sale);

        return toResponse(updatedSale);
    }

    public Integer delete(Integer id) {
        saleRepository.deleteById(id);
        return id;
    }
}