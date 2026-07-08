package com.example.demo.graphql.mutation;

import com.example.demo.dto.ProductInput;
import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ProductMutation {

    private final ProductService productService;

    @MutationMapping
    public Product createProduct(@Argument ProductInput input) {
        return productService.create(input);
    }

    @MutationMapping
    public Product updateProduct(
            @Argument Long id,
            @Argument ProductInput input) {

        return productService.update(id, input);
    }

    @MutationMapping
    public Boolean deleteProduct(@Argument Long id) {
        productService.delete(id);
        return true;
    }
}