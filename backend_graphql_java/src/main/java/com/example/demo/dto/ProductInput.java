package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductInput {

    private String productName;
    private String color;
    private Integer price;
    private Integer salePrice;
    private String categoryCode;


}