package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer price;

    @Column(name = "sale_price", nullable = false)
    private Integer salePrice;

    @Column(name = "category_code", nullable = false)
    private String categoryCode;
}