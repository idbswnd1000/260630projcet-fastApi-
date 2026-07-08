package com.example.demo.graphql;

import com.example.demo.sales.dto.ViewDashboardResponse;
import com.example.demo.sales.dto.ViewSalesResponse;
import com.example.demo.sales.service.SalesService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class SalesResolver {

    private final SalesService salesService;

    @QueryMapping
    public List<ViewSalesResponse> viewSales() {
        return salesService.getViewSales();
    }

    @QueryMapping
    public ViewDashboardResponse dashboard() {
        return salesService.getDashboard();
    }
}