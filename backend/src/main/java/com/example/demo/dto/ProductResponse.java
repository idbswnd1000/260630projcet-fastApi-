package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    @JsonProperty("product_name")
    private String productName;

    private String color;

    private Integer price;

    @JsonProperty("sale_price")
    private Integer salePrice;

    @JsonProperty("category_code")
    private String categoryCode;
}