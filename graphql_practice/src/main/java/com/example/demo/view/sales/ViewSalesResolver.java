package com.example.demo.view.sales;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ViewSalesResolver {

    private final ViewSalesService viewSalesService;

    @QueryMapping
    public List<ViewSalesResponse> viewSales() {
        return viewSalesService.findAll();
    }
}