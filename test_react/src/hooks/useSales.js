import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getSales,
    createSale,
    updateSale,
    deleteSale
} from "../apis/sale.api";

export default function useSales() {
    const queryClient = useQueryClient();

    const sales = useQuery({
        queryKey: ["sales"],
        queryFn: getSales
    });

    const create = useMutation({
        mutationFn: createSale,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sales"]
            });
        }
    });

    const update = useMutation({
        mutationFn: updateSale,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sales"]
            });
        }
    });

    const remove = useMutation({
        mutationFn: deleteSale,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sales"]
            });
        }
    });

    return {
        sales,
        create,
        update,
        remove
    };
}