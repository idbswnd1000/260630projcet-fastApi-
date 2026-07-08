package com.example.demo.view.dashboard;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

@Entity
@Getter
@Immutable
@Table(name = "view_dashboard")
public class ViewDashboard {

    @Id
    private Integer totalOrders;

    @Column(name = "total_quantity")
    private Integer totalQuantity;

    @Column(name = "total_sales")
    private Integer totalSales;

    @Column(name = "customer_count")
    private Integer customerCount;

    @Column(name = "product_count")
    private Integer productCount;
}