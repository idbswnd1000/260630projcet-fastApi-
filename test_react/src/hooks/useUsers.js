import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../apis/user.api";

export default function useUsers() {
    const queryClient = useQueryClient();

    const users = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    });

    const create = useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        }
    });

    const update = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        }
    });

    const remove = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            });
        }
    });

    return {
        users,
        create,
        update,
        remove
    };
}