// useUser.js
import { useQuery, useMutation } from "@apollo/client";

import {
    GET_USERS,
    LOGIN,
    ME,
    CREATE_USER,
} from "../graphql/user";

export const useAllGetUser = () => {
    const { data, loading, error, refetch } = useQuery(GET_USERS);

    return {
        data: data?.users ?? [],
        isLoading: loading,
        error,
        refetch,
    };
};

export const useLoginUser = () => {
    const [login] = useMutation(LOGIN);

    return {
        mutateAsync: async (loginObj) => {
            const { data } = await login({
                variables: {
                    input: loginObj,
                },
            });

            localStorage.setItem("accessToken", data.login.accessToken);

            return data.login;
        },
    };
};

export const useCurrentUser = () => {
    const token = localStorage.getItem("accessToken");

    const { data, loading, error, refetch } = useQuery(ME, {
        skip: !token,
        fetchPolicy: "network-only",
    });

    return {
        data: data?.me,
        isLoading: loading,
        error,
        refetch,
    };
};

export const useRegisterUser = () => {
    const [createUser] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    return {
        mutateAsync: async (userObj) => {
            const { data } = await createUser({
                variables: {
                    input: {
                        username: userObj.username,
                        password: userObj.password,
                        age: Number(userObj.age),
                        email: userObj.email,
                        city: userObj.city,
                    },
                },
            });

            return data.createUser;
        },
    };
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};