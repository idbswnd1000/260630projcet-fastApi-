package com.example.demo.view.sales;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ViewSalesService {

    private final ViewSalesRepository viewSalesRepository;

    public List<ViewSalesResponse> findAll() {
        return viewSalesRepository.findAll()
                .stream()
                .map(ViewSalesResponse::from)
                .toList();
    }
}