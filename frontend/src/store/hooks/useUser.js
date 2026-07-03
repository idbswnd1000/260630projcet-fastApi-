import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query"
import {
    userAllGetApi,
    userLoginApi,
    userRegisterApi,
    currentUserApi
} from "../apis/user.api.js"


export const useAllGetUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: userAllGetApi
    })
}


export const useLoginUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"]
            });
        }
    });
};

// export const useLoginUser = () => {
//     return useMutation({
//         mutationFn: userLoginApi,
//         onSuccess: (user) =>{
//             localStorage.setItem("currentUser", JSON.stringify(user));
//         }
//     })
// }

export const useCurrentUser = () => {

    return useQuery({

        queryKey: ["currentUser"],

        queryFn: currentUserApi,

        enabled: !!localStorage.getItem("accessToken"),

        retry: false,

    });

}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    queryClient.setQueryData(["currentUser"], null);
    queryClient.removeQueries({ queryKey: ["currentUser"] });
  };
};
// export const getCurrentUser = () => {
//     const user = localStorage.getItem("currentUser")
//     return user && JSON.parse(user)
// }
