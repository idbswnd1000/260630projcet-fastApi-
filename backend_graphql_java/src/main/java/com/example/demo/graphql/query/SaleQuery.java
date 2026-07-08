package com.example.demo.graphql.query;

import com.example.demo.entity.Sale;
import com.example.demo.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class SaleQuery {

    private final SaleService saleService;

    @QueryMapping
    public List<Sale> sales() {
        return saleService.findAll();
    }

    @QueryMapping
    public Sale sale(@Argument Integer id) {
        return saleService.findById(id);
    }

}