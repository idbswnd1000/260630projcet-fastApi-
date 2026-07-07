import { useMutation, useQuery } from "@apollo/client";

import {
    GET_TODOS,
    GET_TODO,
    CREATE_TODO,
    UPDATE_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
} from "../graphql/todo";

const normalizeTodo = (todo) => ({
    subject: todo.subject,
    checked: Boolean(todo.checked),
});

export const useAllGetTodo = () => {
    const { data, loading, error, refetch } = useQuery(GET_TODOS);

    const todos = [...(data?.todos ?? [])].sort((a, b) => {
        return Number(a.id) - Number(b.id);
    });

    return {
        data: todos,
        isLoading: loading,
        error,
        refetch,
    };
};

export const useGetTodo = (id) => {
    const { data, loading, error } = useQuery(GET_TODO, {
        variables: {
            id: Number(id),
        },
        skip: !id,
    });

    return {
        data: data?.todo,
        isLoading: loading,
        error,
    };
};

export const usePostRegisterTodo = () => {
    const [createTodo] = useMutation(CREATE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    return {
        mutateAsync: async (todoObj) => {
            const { data } = await createTodo({
                variables: {
                    input: normalizeTodo(todoObj),
                },
            });

            return data.createTodo;
        },
    };
};

export const usePutUpdateTodo = () => {
    const [updateTodo] = useMutation(UPDATE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    return {
        mutateAsync: async (todoObj) => {
            const { id, ...input } = todoObj;

            const { data } = await updateTodo({
                variables: {
                    id: Number(id),
                    input: normalizeTodo(input),
                },
            });

            return data.updateTodo;
        },
    };
};

export const useToggleTodo = () => {
    const [toggleTodo] = useMutation(TOGGLE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    return {
        mutateAsync: async (id) => {
            const { data } = await toggleTodo({
                variables: {
                    id: Number(id),
                },
            });

            return data.toggleTodo;
        },
    };
};

export const useDeleteTodo = () => {
    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [{ query: GET_TODOS }],
    });

    return {
        mutateAsync: async (id) => {
            await deleteTodo({
                variables: {
                    id: Number(id),
                },
            });

            return id;
        },
    };
};