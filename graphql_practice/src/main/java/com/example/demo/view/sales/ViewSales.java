package com.example.demo.view.sales;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.time.LocalDate;

@Entity
@Immutable
@Table(name = "view_sales")
@Getter
public class ViewSales {

    @Id
    private Integer id;

    private LocalDate date;

    private Integer year;
    private Integer month;
    private Integer quarter;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "region_name")
    private String regionName;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_category_name")
    private String productCategoryName;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "promotion_name")
    private String promotionName;

    @Column(name = "discount_rate")
    private Double discountRate;

    @Column(name = "channel_name")
    private String channelName;

    private Integer quantity;

    private Integer price;

    @Column(name = "sale_price")
    private Integer salePrice;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "sales_amount")
    private Integer salesAmount;

    private Integer profit;
}