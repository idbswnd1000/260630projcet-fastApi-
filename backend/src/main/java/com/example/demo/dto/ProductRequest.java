package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    @NotBlank
    @JsonProperty("product_name")
    private String productName;

    @NotBlank
    private String color;

    @NotNull
    private Integer price;

    @NotNull
    @JsonProperty("sale_price")
    private Integer salePrice;

    @NotBlank
    @JsonProperty("category_code")
    private String categoryCode;
}