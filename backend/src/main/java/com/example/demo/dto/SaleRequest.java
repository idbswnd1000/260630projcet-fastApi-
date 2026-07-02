package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class SaleRequest {

    @NotNull
    @JsonProperty("user_id")
    private Integer userId;

    @NotNull
    @JsonProperty("product_id")
    private Integer productId;

    @NotNull
    private Integer quantity;

    @NotNull
    @JsonProperty("discount_rate")
    private Double discountRate;

    @NotNull
    @JsonProperty("total_price")
    private Integer totalPrice;

    @NotNull
    @JsonProperty("created_at")
    private LocalDate createdAt;
}