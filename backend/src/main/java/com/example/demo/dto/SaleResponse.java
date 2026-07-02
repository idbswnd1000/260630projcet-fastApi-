package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaleResponse {

    private Integer id;

    @JsonProperty("user_id")
    private Integer userId;

    @JsonProperty("product_id")
    private Integer productId;

    private Integer quantity;

    @JsonProperty("discount_rate")
    private Double discountRate;

    @JsonProperty("total_price")
    private Integer totalPrice;

    @JsonProperty("created_at")
    private LocalDate createdAt;
}