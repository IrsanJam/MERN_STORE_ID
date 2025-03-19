import { apiConfig } from "../../utils/api/api.config";
import { registerType,LoginState } from "../../utils/auth/type";



export const loginFetch = async (data: LoginState) => {
    const response = await apiConfig.post("/login", data);
    return response.data;
};

export const registerFetch = async (data:registerType) => {
    const response = await apiConfig.post("/register", data);
    return response.data;
}