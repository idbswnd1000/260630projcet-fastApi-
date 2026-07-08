package com.example.demo.graphql.mutation;

import com.example.demo.dto.SaleInput;
import com.example.demo.entity.Sale;
import com.example.demo.service.SaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class SaleMutation {

    private final SaleService saleService;

    @MutationMapping
    public Sale createSale(@Argument SaleInput input) {
        return saleService.create(input);
    }

    @MutationMapping
    public Sale updateSale(
            @Argument Integer id,
            @Argument SaleInput input) {

        return saleService.update(id, input);
    }

    @MutationMapping
    public Boolean deleteSale(@Argument Integer id) {
        saleService.delete(id);
        return true;
    }
}