package com.example.demo.promotion.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "promotions")
@Getter
@Setter
@NoArgsConstructor
public class Promotion {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "promotion_name")
    private String promotionName;

    @Column(name = "discount_rate")
    private Double discountRate;
}