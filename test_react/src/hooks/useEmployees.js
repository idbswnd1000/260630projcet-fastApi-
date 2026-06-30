import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from "../apis/employee.api";

export default function useEmployees() {
    const queryClient = useQueryClient();
    const employees = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees
    });

    const create = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            });
        }
    });

    const update = useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            });

        }
    });

    const remove = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["employees"]
            });
        }
    });
    return {
        employees,
        create,
        update,
        remove
    };
}