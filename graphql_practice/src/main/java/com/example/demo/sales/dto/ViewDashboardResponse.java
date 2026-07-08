package com.example.demo.sales.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ViewDashboardResponse {

    private Integer totalOrders;
    private Integer totalQuantity;
    private Integer totalSales;

    private Integer customerCount;
    private Integer productCount;

    private List<TopProductResponse> topProducts;
}