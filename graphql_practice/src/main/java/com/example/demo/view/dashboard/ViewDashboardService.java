package com.example.demo.view.dashboard;

import com.example.demo.view.sales.ViewSales;
import com.example.demo.view.sales.ViewSalesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ViewDashboardService {

    private final ViewDashboardRepository viewDashboardRepository;
    private final ViewSalesRepository viewSalesRepository;

    public ViewDashboardResponse getDashboard(){

        ViewDashboard dashboard =
                viewDashboardRepository.findAll().getFirst();

        return ViewDashboardResponse.builder()
                .totalOrders(dashboard.getTotalOrders())
                .totalQuantity(dashboard.getTotalQuantity())
                .totalSales(dashboard.getTotalSales())
                .customerCount((long) dashboard.getCustomerCount())
                .productCount((long) dashboard.getProductCount())
                .topProducts(getTopProducts())
                .build();
    }

    private List<TopProductResponse> getTopProducts(){

        return viewSalesRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        ViewSales::getProductName
                ))
                .entrySet()
                .stream()
                .map(entry->{

                    int sales = entry.getValue().stream()
                            .mapToInt(ViewSales::getSalesAmount)
                            .sum();

                    int profit = entry.getValue().stream()
                            .mapToInt(ViewSales::getProfit)
                            .sum();

                    int quantity = entry.getValue().stream()
                            .mapToInt(ViewSales::getQuantity)
                            .sum();

                    return TopProductResponse.builder()
                            .productName(entry.getKey())
                            .totalSales(sales)
                            .totalProfit(profit)
                            .totalQuantity(quantity)
                            .build();

                })
                .sorted(
                        Comparator.comparing(
                                TopProductResponse::getTotalSales
                        ).reversed()
                )
                .limit(10)
                .toList();
    }

}