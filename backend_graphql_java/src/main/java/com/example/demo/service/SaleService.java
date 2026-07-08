package com.example.demo.service;

import com.example.demo.dto.SaleInput;
import com.example.demo.entity.Sale;
import com.example.demo.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;

    public List<Sale> findAll() {
        return saleRepository.findAll();
    }

    public Sale findById(Integer id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));
    }

    public Sale create(SaleInput input) {
        Sale sale = new Sale();

        sale.setUserId(input.getUserId());
        sale.setProductId(input.getProductId());
        sale.setQuantity(input.getQuantity());
        sale.setDiscountRate(input.getDiscountRate());
        sale.setTotalPrice(input.getTotalPrice());
        sale.setCreatedAt(input.getCreatedAt());

        return saleRepository.save(sale);
    }

    public Sale update(Integer id, SaleInput input) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found"));

        sale.setUserId(input.getUserId());
        sale.setProductId(input.getProductId());
        sale.setQuantity(input.getQuantity());
        sale.setDiscountRate(input.getDiscountRate());
        sale.setTotalPrice(input.getTotalPrice());
        sale.setCreatedAt(input.getCreatedAt());

        return saleRepository.save(sale);
    }

    public void delete(Integer id) {
        saleRepository.deleteById(id);
    }
}