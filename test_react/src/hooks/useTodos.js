import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {

    getTodos,

    createTodo,

    updateTodo,

    deleteTodo

} from "../apis/todo.api.js";

export default function useTodos() {

    const queryClient = useQueryClient();

    const todos = useQuery({

        queryKey: ["todos"],

        queryFn: getTodos

    });

    const create = useMutation({

        mutationFn: createTodo,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["todos"]

            });

        }

    });

    const update = useMutation({

        mutationFn: updateTodo,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["todos"]

            });

        }

    });

    const remove = useMutation({

        mutationFn: deleteTodo,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["todos"]

            });

        }

    });

    return {
        todos,
        create,
        update,
        remove
    };

}