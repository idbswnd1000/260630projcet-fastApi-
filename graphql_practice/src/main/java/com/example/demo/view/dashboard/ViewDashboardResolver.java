package com.example.demo.view.dashboard;

import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ViewDashboardResolver {

    private final ViewDashboardService viewDashboardService;

    @QueryMapping
    public ViewDashboardResponse dashboard() {
        return viewDashboardService.getDashboard();
    }
}