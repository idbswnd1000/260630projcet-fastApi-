package com.example.demo.sales.dto;

import com.example.demo.sales.entity.Sale;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class ViewSalesResponse {

    private Integer id;
    private LocalDate date;

    private Integer year;
    private Integer quarter;
    private Integer month;
    private String monthName;

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

    public static ViewSalesResponse from(Sale sale) {
        int quantity = sale.getQuantity();
        int salePrice = sale.getProduct().getSalePrice();
        int cost = sale.getProduct().getPrice();
        double discountRate = sale.getPromotion().getDiscountRate();

        int salesAmount = (int) (quantity * (salePrice * (1 - discountRate)));
        int profit = (int) (quantity * ((salePrice * (1 - discountRate)) - cost));

        int month = sale.getDate().getMonthValue();
        int quarter = (month - 1) / 3 + 1;

        return ViewSalesResponse.builder()
                .id(sale.getId())
                .date(sale.getDate())
                .year(sale.getDate().getYear())
                .quarter(quarter)
                .month(month)
                .monthName(sale.getDate().getMonth().toString())

                .customerName(sale.getCustomer().getCustomerName())
                .regionName(sale.getCustomer().getRegion().getRegionName())

                .productName(sale.getProduct().getProductName())
                .productCategoryName(sale.getProduct().getProductCategory().getProductCategoryName())
                .categoryName(sale.getProduct().getProductCategory().getCategory().getCategoryName())

                .promotionName(sale.getPromotion().getPromotionName())
                .discountRate(discountRate)
                .channelName(sale.getChannel().getChannelName())

                .quantity(quantity)
                .price(cost)
                .salePrice(salePrice)
                .totalPrice(quantity * salePrice)
                .salesAmount(salesAmount)
                .profit(profit)
                .build();
    }
}