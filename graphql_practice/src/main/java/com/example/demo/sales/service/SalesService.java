package com.example.demo.sales.service;

import com.example.demo.customer.repository.CustomerRepository;
import com.example.demo.product.repository.ProductRepository;
import com.example.demo.sales.dto.TopProductResponse;
import com.example.demo.sales.dto.ViewDashboardResponse;
import com.example.demo.sales.dto.ViewSalesResponse;
import com.example.demo.sales.entity.Sale;
import com.example.demo.sales.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SalesService {

    private final SaleRepository saleRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public List<ViewSalesResponse> getViewSales() {
        return saleRepository.findAll()
                .stream()
                .map(ViewSalesResponse::from)
                .toList();
    }

    public ViewDashboardResponse getDashboard() {
        List<Sale> sales = saleRepository.findAll();

        int totalOrders = sales.size();

        int totalQuantity = sales.stream()
                .mapToInt(Sale::getQuantity)
                .sum();

        int totalSales = sales.stream()
                .mapToInt(this::getSalesAmount)
                .sum();

        return ViewDashboardResponse.builder()
                .totalOrders(totalOrders)
                .totalQuantity(totalQuantity)
                .totalSales(totalSales)
                .customerCount((int) customerRepository.count())
                .productCount((int) productRepository.count())
                .topProducts(getTopProducts())
                .build();
    }

    public List<TopProductResponse> getTopProducts() {
        List<Sale> sales = saleRepository.findAll();

        return sales.stream()
                .collect(Collectors.groupingBy(
                        sale -> sale.getProduct().getId(),
                        Collectors.toList()
                ))
                .values()
                .stream()
                .map(list -> {
                    Sale first = list.get(0);

                    int totalQuantity = list.stream()
                            .mapToInt(Sale::getQuantity)
                            .sum();

                    int totalSales = list.stream()
                            .mapToInt(this::getSalesAmount)
                            .sum();

                    int totalProfit = list.stream()
                            .mapToInt(this::getProfit)
                            .sum();

                    return TopProductResponse.builder()
                            .categoryName(first.getProduct()
                                    .getProductCategory()
                                    .getCategory()
                                    .getCategoryName())
                            .productCategoryName(first.getProduct()
                                    .getProductCategory()
                                    .getProductCategoryName())
                            .productName(first.getProduct().getProductName())
                            .totalSales(totalSales)
                            .totalProfit(totalProfit)
                            .totalQuantity(totalQuantity)
                            .build();
                })
                .sorted(Comparator.comparing(TopProductResponse::getTotalSales).reversed())
                .limit(10)
                .toList();
    }

    private int getSalesAmount(Sale sale) {
        int quantity = sale.getQuantity();
        int salePrice = sale.getProduct().getSalePrice();
        double discountRate = sale.getPromotion().getDiscountRate();

        return (int) (quantity * (salePrice * (1 - discountRate)));
    }

    private int getProfit(Sale sale) {
        int quantity = sale.getQuantity();
        int salePrice = sale.getProduct().getSalePrice();
        int cost = sale.getProduct().getPrice();
        double discountRate = sale.getPromotion().getDiscountRate();

        return (int) (quantity * ((salePrice * (1 - discountRate)) - cost));
    }
}