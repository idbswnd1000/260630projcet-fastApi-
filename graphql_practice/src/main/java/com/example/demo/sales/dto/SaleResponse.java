package com.example.demo.sales.dto;

import com.example.demo.sales.entity.Sale;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class SaleResponse {

    private Integer id;
    private LocalDate date;
    private Integer quantity;

    private Integer productId;
    private String productName;
    private String productCategoryName;
    private String categoryName;

    private Integer customerId;
    private String customerName;
    private String regionName;

    private Integer promotionId;
    private String promotionName;
    private Double discountRate;

    private Integer channelId;
    private String channelName;

    public static SaleResponse from(Sale sale) {
        return SaleResponse.builder()
                .id(sale.getId())
                .date(sale.getDate())
                .quantity(sale.getQuantity())

                .productId(sale.getProduct().getId())
                .productName(sale.getProduct().getProductName())
                .productCategoryName(
                        sale.getProduct()
                                .getProductCategory()
                                .getProductCategoryName()
                )
                .categoryName(
                        sale.getProduct()
                                .getProductCategory()
                                .getCategory()
                                .getCategoryName()
                )

                .customerId(sale.getCustomer().getId())
                .customerName(sale.getCustomer().getCustomerName())
                .regionName(sale.getCustomer().getRegion().getRegionName())

                .promotionId(sale.getPromotion().getId())
                .promotionName(sale.getPromotion().getPromotionName())
                .discountRate(sale.getPromotion().getDiscountRate())

                .channelId(sale.getChannel().getId())
                .channelName(sale.getChannel().getChannelName())

                .build();
    }
}