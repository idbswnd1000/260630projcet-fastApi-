import { useQuery, useMutation } from "@apollo/client";
import {
    GET_EMPLOYEES,
    GET_EMPLOYEE,
    CREATE_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
} from "../graphql/employee";

const normalizeEmployee = (emp) => ({
    name: emp.name,
    email: emp.email,
    job: emp.job,
    pay: Number(emp.pay),
});

export const useAllGetEmployee = () => {
    const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES);

    return {
        data: [...(data?.employees ?? [])].sort(
            (a, b) => Number(a.id) - Number(b.id)
        ),
        isLoading: loading,
        error,
        refetch,
    };
};

export const useGetEmployee = (id) => {
    const { data, loading, error, refetch } = useQuery(GET_EMPLOYEE, {
        variables: {
            id: Number(id),
        },
        skip: !id,
    });

    return {
        data: data?.employee,
        isLoading: loading,
        error,
        refetch,
    };
};

export const usePostRegisterEmployee = () => {
    const [createEmployee] = useMutation(CREATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        awaitRefetchQueries: true,
    });

    const execute = async (employeeObj) => {
        const { data } = await createEmployee({
            variables: {
                input: normalizeEmployee(employeeObj),
            },
        });

        return data.createEmployee;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};

export const usePutUpdateEmployee = () => {
    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        awaitRefetchQueries: true,
    });

    const execute = async (employeeObj) => {
        const { id, ...input } = employeeObj;

        const { data } = await updateEmployee({
            variables: {
                id: Number(id),
                input: normalizeEmployee(input),
            },
        });

        return data.updateEmployee;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};

export const useDeleteEmployee = () => {
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [{ query: GET_EMPLOYEES }],
        awaitRefetchQueries: true,
    });

    const execute = async (id) => {
        await deleteEmployee({
            variables: {
                id: Number(id),
            },
        });

        return id;
    };

    return {
        mutate: execute,
        mutateAsync: execute,
    };
};