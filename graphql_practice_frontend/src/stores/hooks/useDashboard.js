import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_DASHBOARD = gql`
query{

    dashboard{

        totalOrders
        totalQuantity
        totalSales

        customerCount
        productCount

        topProducts{

            productName
            totalSales
            totalProfit
            totalQuantity

        }

    }

}
`;

export const useDashboard = () => {
    return useQuery(GET_DASHBOARD);
};