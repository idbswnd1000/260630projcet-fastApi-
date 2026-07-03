import { rootApi } from "./root.api.js";

export const userAllGetApi = async () => {
  const response = await rootApi.get("/user/");
  return response.data;
};

export const userLoginApi = async (loginUser) => {
  try {
    const response = await rootApi.post("/auth/login/", {
      username: loginUser.username,
      password: loginUser.password,
    });

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ?? "로그인에 실패했습니다."
    );
  }
};

export const userRegisterApi = async (userObj) => {
  const response = await rootApi.post("/user/", userObj);
  return response.data;
};

export const currentUserApi = async () => {
  const response = await rootApi.get("/auth/me/");
  return response.data;
};