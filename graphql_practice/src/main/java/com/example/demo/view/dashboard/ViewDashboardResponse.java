package com.example.demo.view.dashboard;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ViewDashboardResponse {

    private Integer totalOrders;
    private Integer totalQuantity;
    private Integer totalSales;

    private Long customerCount;
    private Long productCount;

    private List<TopProductResponse> topProducts;
}