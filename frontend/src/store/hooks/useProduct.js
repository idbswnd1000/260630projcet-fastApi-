import { useMutation, useQuery } from "@apollo/client";

import {
    GET_PRODUCTS,
    GET_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
} from "../graphql/product";

const normalizeProduct = (product) => ({
    productName: product.productName ?? product.product_name,
    color: product.color,
    price: Number(product.price),
    salePrice: Number(product.salePrice ?? product.sale_price),
    productCategoryCode:
        product.productCategoryCode ?? product.product_category_code,
});

export const useAllGetProduct = () => {
    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS);

    return {
        data: [...(data?.products ?? [])].sort(
            (a, b) => Number(a.id) - Number(b.id)
        ),
        isLoading: loading,
        error,
        refetch,
    };
};

export const useGetProduct = (id) => {
    const { data, loading, error, refetch } = useQuery(GET_PRODUCT, {
        variables: {
            id: Number(id),
        },
        skip: !id,
    });

    return {
        data: data?.product,
        isLoading: loading,
        error,
        refetch,
    };
};

export const usePostRegisterProduct = () => {
    const [createProduct] = useMutation(CREATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
        awaitRefetchQueries: true,
    });

    const execute = async (productObj) => {
        const { data } = await createProduct({
            variables: {
                input: normalizeProduct(productObj),
            },
        });

        return data.createProduct;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};

export const usePutUpdateProduct = () => {
    const [updateProduct] = useMutation(UPDATE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
        awaitRefetchQueries: true,
    });

    const execute = async (productObj) => {
        const { data } = await updateProduct({
            variables: {
                id: Number(productObj.id),
                input: normalizeProduct(productObj),
            },
        });

        return data.updateProduct;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};

export const useDeleteProduct = () => {
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        refetchQueries: [{ query: GET_PRODUCTS }],
        awaitRefetchQueries: true,
    });

    const execute = async (id) => {
        await deleteProduct({
            variables: {
                id: Number(id),
            },
        });

        return id;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};