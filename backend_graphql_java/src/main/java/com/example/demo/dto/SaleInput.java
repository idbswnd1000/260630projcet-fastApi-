package com.example.demo.dto;
import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleInput {
    private Integer userId;
    private Integer productId;
    private Integer quantity;
    private Double discountRate;
    private Integer totalPrice;
    private LocalDate createdAt;
}
