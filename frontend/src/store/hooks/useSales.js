import { useQuery } from "@tanstack/react-query";
import { useAllGetUser } from "./useUser.js";
import { useAllGetProduct } from "./useProduct.js";
import { salesAllGetApi } from "../apis/sales.api.js";
import { useMemo } from "react";

export const useAllGetSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: salesAllGetApi,
  });
};

export const useGetSales = () => {
  const { data: userList = [] } = useAllGetUser();
  const { data: productList = [] } = useAllGetProduct();
  const { data: salesList = [] } = useAllGetSales();

  const rowData = useMemo(() => {
    const users = Array.isArray(userList) ? userList : [];
    const products = Array.isArray(productList) ? productList : [];
    const sales = Array.isArray(salesList) ? salesList : [];
    
    const userObj = Object.fromEntries(
      users.map((item) => [String(item.id), item])
    );

    const productObj = Object.fromEntries(
      products.map((item) => [String(item.id), item])
    );

    return sales.map((item) => {
      const userId = item.user_id ?? item.userId;
      const productId = item.product_id ?? item.productId;

      const user = userObj[String(userId)];
      const product = productObj[String(productId)];

      return {
        ...item,
        user_name: user?.username ?? `알수없음(${userId})`,
        product_name:
          product?.product_name ??
          product?.productName ??
          product?.name ??
          `알수없음(${productId})`,
      };
    });
  }, [userList, productList, salesList]);

  return rowData;
};