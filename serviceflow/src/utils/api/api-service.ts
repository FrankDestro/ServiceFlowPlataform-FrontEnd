import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import * as authService from "../../modules/Auth/service/auth-keycloak-service.ts";
import { BASE_URL } from "../system/system.ts";
import { showToast } from "../../layout/Toastify/Toastify.tsx";

// ===========================
// SEM TOKEN — uso em dev ou rotas públicas
// ===========================
export function requestBackend(config: AxiosRequestConfig) {
    return axios({ ...config, baseURL: BASE_URL });
}

// ===========================
// COM TOKEN — rotas protegidas
// agora pega o token do Keycloak automaticamente
// ===========================
export function requestBackendConfig(config: AxiosRequestConfig) {
    config.headers = {
        ...(config.headers || {}),
        Authorization: "Bearer " + authService.getAccessToken(),
    };
    return axios({ ...config, baseURL: BASE_URL, headers: config.headers });
}

// ===========================
// LEGADO — mantido comentado para referência
// ===========================
// export function requestBackendConfig(config: AxiosRequestConfig) {
//   config.headers = {
//     ...(config.headers || {}),
//     Authorization: "Bearer " + authService.getAccessToken(),
//   };
//   return axios({ ...config, baseURL: BASE_URL, headers: config.headers });
// }

// ===========================
// REQUEST INTERCEPTOR
// injeta token apenas quando usar requestBackendToken
// ===========================
const axiosWithToken = axios.create({ baseURL: BASE_URL });

axiosWithToken.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = authService.getAccessToken();
        if (token) {
            config.headers = config.headers ?? {};
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// sobrescreve requestBackendToken para usar a instância com token
export function requestBackendTokenImpl(config: AxiosRequestConfig) {
    return axiosWithToken({ ...config });
}

// ===========================
// RESPONSE INTERCEPTOR (global)
// ===========================
axios.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.data?.success === false) {
            showToast.warning(response.data.message || "Operação não concluída com sucesso");
            return Promise.reject(response);
        }
        return response;
    },
    (err: unknown) => {
        const error = err as AxiosError<{ message?: string }>;
        const backendMessage = error.response?.data?.message;
        const status = error.response?.status;

        switch (status) {
            case 400:
                showToast.error(backendMessage || "Erro de requisição (400)");
                break;
            case 401:
                showToast.error(backendMessage || "Sessão expirada, faça login novamente.");
                authService.login();
                break;
            case 403:
                showToast.error(backendMessage || "Acesso proibido (403)");
                break;
            case 404:
                showToast.error(backendMessage || "Recurso não encontrado (404)");
                break;
            case 500:
                showToast.error(backendMessage || "Erro interno do servidor (500)");
                break;
            default:
                showToast.error(backendMessage || error.message || "Erro inesperado!");
                break;
        }

        return Promise.reject(error);
    }
);