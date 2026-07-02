package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "sales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "product_id", nullable = false)
    private Integer productId;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "discount_rate", nullable = false)
    private Double discountRate;

    @Column(name = "total_price", nullable = false)
    private Integer totalPrice;

    @Column(name = "created_at", nullable = false)
    private LocalDate createdAt;
}