package com.example.demo.sales.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TopProductResponse {

    private String categoryName;
    private String productCategoryName;
    private String productName;

    private Integer totalSales;
    private Integer totalProfit;
    private Integer totalQuantity;
}