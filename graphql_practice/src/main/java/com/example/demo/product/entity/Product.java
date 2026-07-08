package com.example.demo.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "product_name")
    private String productName;

    private String color;

    @Column(name = "price")
    private Integer price;

    @Column(name = "sale_price")
    private Integer salePrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_code")
    private ProductCategory productCategory;
}