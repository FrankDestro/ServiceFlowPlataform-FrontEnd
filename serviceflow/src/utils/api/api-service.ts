import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import * as authService from "../../modules/Auth/service/auth-keycloak-service.ts";
import { ENV } from "../../config/env.ts";
import { showToast } from "../../layout/Toastify/Toastify.tsx";

// ===========================
// SEM TOKEN — uso em dev ou rotas públicas
// ===========================
export function requestBackend(config: AxiosRequestConfig) {
    return axios({ ...config, baseURL: ENV.apiUrl });
}

// ===========================
// COM TOKEN — rotas protegidas
// agora pega o token do Keycloak automaticamente
// ===========================
// export function requestBackendConfig(config: AxiosRequestConfig) {
//     config.headers = {
//         ...(config.headers || {}),
//         Authorization: "Bearer " + authService.getAccessToken(),
//          // @ts-ignore
//         silent: config.silent  // ← repassa o silent
//     };
//     return axios({ ...config, baseURL: ENV.apiUrl, headers: config.headers });
// }

export async function requestBackendConfig(config: AxiosRequestConfig) {
    const token = await authService.getAccessTokenFresh();
    config.headers = {
        ...(config.headers || {}),
        Authorization: "Bearer " + token,
        // @ts-ignore
        silent: config.silent
    };
    return axios({ ...config, baseURL: ENV.apiUrl, headers: config.headers });
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
const axiosWithToken = axios.create({ baseURL: ENV.apiUrl });

// axiosWithToken.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = authService.getAccessToken();
//         if (token) {
//             config.headers = config.headers ?? {};
//             config.headers["Authorization"] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error: AxiosError) => Promise.reject(error)
// );

axiosWithToken.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = await authService.getAccessTokenFresh(); // 👈 troca aqui
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
    const error = err as AxiosError<{ message?: string }> & { config?: { silent?: boolean } };
        const backendMessage = error.response?.data?.message;
        const status = error.response?.status;

     if (error.config?.silent) {
        return Promise.reject(error);
    }

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