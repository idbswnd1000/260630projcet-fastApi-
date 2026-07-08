package com.example.demo.view.sales;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ViewSalesResponse {

    private Integer id;
    private LocalDate date;

    private Integer year;
    private Integer month;
    private Integer quarter;

    private String customerName;
    private String regionName;

    private String productName;
    private String productCategoryName;
    private String categoryName;

    private String promotionName;
    private Double discountRate;
    private String channelName;

    private Integer quantity;
    private Integer price;
    private Integer salePrice;

    private Integer totalPrice;
    private Integer salesAmount;
    private Integer profit;

    public static ViewSalesResponse from(ViewSales viewSales) {
        return ViewSalesResponse.builder()
                .id(viewSales.getId())
                .date(viewSales.getDate())
                .year(viewSales.getYear())
                .month(viewSales.getMonth())
                .quarter(viewSales.getQuarter())
                .customerName(viewSales.getCustomerName())
                .regionName(viewSales.getRegionName())
                .productName(viewSales.getProductName())
                .productCategoryName(viewSales.getProductCategoryName())
                .categoryName(viewSales.getCategoryName())
                .promotionName(viewSales.getPromotionName())
                .discountRate(viewSales.getDiscountRate())
                .channelName(viewSales.getChannelName())
                .quantity(viewSales.getQuantity())
                .price(viewSales.getPrice())
                .salePrice(viewSales.getSalePrice())
                .totalPrice(viewSales.getTotalPrice())
                .salesAmount(viewSales.getSalesAmount())
                .profit(viewSales.getProfit())
                .build();
    }
}