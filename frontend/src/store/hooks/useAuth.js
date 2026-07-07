import { useMutation, useQuery } from "@apollo/client";

import {
    LOGIN,
    ME,
} from "../graphql/auth";



export const useLogin = () => {

    const [loginMutation] = useMutation(LOGIN);

    const login = async (loginObj) => {

        const { data } = await loginMutation({

            variables: {

                input: {

                    name: loginObj.name,

                    password: loginObj.password,

                },

            },

        });

        localStorage.setItem(
            "accessToken",
            data.login.accessToken,
        );

        return data.login;

    };

    return {

        mutateAsync: login,

    };

};



export const useCurrentUser = () => {

    return useQuery(ME, {

        fetchPolicy: "network-only",

    });

};