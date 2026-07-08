package com.example.demo.view.dashboard;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopProductResponse {

    private String productName;
    private Integer totalSales;
    private Integer totalProfit;
    private Integer totalQuantity;
}