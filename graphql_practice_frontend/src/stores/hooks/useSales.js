import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_SALES = gql`
    query {

        viewSales {

            id
            date

            customerName
            regionName

            productName
            productCategoryName
            categoryName

            promotionName
            discountRate

            channelName

            quantity

            price
            salePrice
            totalPrice

        }

    }
`;

export const useSales = () => {
    return useQuery(GET_SALES);
};