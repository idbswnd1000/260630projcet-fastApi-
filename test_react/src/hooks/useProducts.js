import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../apis/product.api";

export default function useProducts() {
    const queryClient = useQueryClient();

    const products = useQuery({
        queryKey: ["products"],
        queryFn: getProducts
    });

    const create = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
        }
    });

    const update = useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
        }
    });

    const remove = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"]
            });
        }
    });

    return {
        products,
        create,
        update,
        remove
    };
}