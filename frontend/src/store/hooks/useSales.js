import { useMemo } from "react";
import { useQuery } from "@apollo/client";

import { GET_SALES } from "../graphql/sale";

import { useAllGetUser } from "./useUser";
import { useAllGetProduct } from "./useProduct";

export const useAllGetSales = () => {
    const { data, loading, error, refetch } = useQuery(GET_SALES);

    return {
        data: data?.sales ?? [],
        isLoading: loading,
        error,
        refetch,
    };
};

export const useGetSales = () => {
    const { data: userList = [] } = useAllGetUser();
    const { data: productList = [] } = useAllGetProduct();
    const { data: salesList = [] } = useAllGetSales();

    const rowData = useMemo(() => {
        const userObj = Object.fromEntries(
            userList.map((item) => [
                Number(item.id),
                item,
            ])
        );

        const productObj = Object.fromEntries(
            productList.map((item) => [
                Number(item.id),
                item,
            ])
        );

        return salesList.map((item) => ({
            ...item,

            userId: Number(item.userId),
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            total_price: Number(item.total_price),

            user_name:
                userObj[Number(item.userId)]?.username ??
                "알수없음",

            product_name:
                productObj[Number(item.productId)]?.productName ??
                "알수없음",
        }));
    }, [userList, productList, salesList]);

    return rowData;
};