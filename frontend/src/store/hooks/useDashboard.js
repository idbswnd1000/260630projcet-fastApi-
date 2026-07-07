import { useMemo } from "react";

import { useAllGetUser } from "./useUser";
import { useAllGetSales } from "./useSales";
import { useAllGetProduct } from "./useProduct";

export const useDashboard = () => {

    const { data: userList = [] } = useAllGetUser();

    const { data: salesList = [] } = useAllGetSales();

    const { data: productList = [] } = useAllGetProduct();


    const kpi = useMemo(() => {

        const totalSalesAmount = salesList.reduce(
            (sum, item) => sum + item.totalPrice,
            0
        );

        const totalOrderCount = salesList.length;

        const totalQuantity = salesList.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        const customerCount = userList.length;

        const productCount = productList.length;

        return {

            totalSalesAmount,

            totalOrderCount,

            totalQuantity,

            customerCount,

            productCount,

        };

    }, [

        salesList,

        userList,

        productList,

    ]);


    const productRanking = useMemo(() => {

        const obj = {};

        salesList.forEach(item => {

            obj[item.productId] =

                (obj[item.productId] || 0)

                + item.quantity;

        });


        return Object.entries(obj)

            .map(([productId, quantity]) => {

                const product = productList.find(

                    item =>

                        String(item.id)

                        ===

                        String(productId)

                );

                return {

                    name:

                        product?.productName ??

                        "Unknown",

                    quantity,

                };

            })

            .sort(

                (a, b) =>

                    b.quantity - a.quantity

            )

            .slice(0, 10);

    }, [

        salesList,

        productList,

    ]);


    const userRanking = useMemo(() => {

        const obj = {};

        salesList.forEach(item => {

            obj[item.userId] =

                (obj[item.userId] || 0)

                + 1;

        });


        return Object.entries(obj)

            .map(([userId, count]) => {

                const user = userList.find(

                    item =>

                        String(item.id)

                        ===

                        String(userId)

                );

                return {

                    username:

                        user?.username ??

                        "Unknown",

                    count,

                };

            })

            .sort(

                (a, b) =>

                    b.count - a.count

            )

            .slice(0, 10);

    }, [

        salesList,

        userList,

    ]);


    return {

        kpi,

        userRanking,

        productRanking,

    };

};