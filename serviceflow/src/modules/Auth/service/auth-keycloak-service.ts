import jwtDecode from "jwt-decode";
import Keycloak from "keycloak-js";
import { type AccessTokenPayLoadNewDTO, type RoleEnum } from "../models/Login";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "REALM_SPRING_API",
  clientId: "itsm-frontend",
});

// 🔒 garante que o init rode apenas uma vez
let initialized = false;

export function initAuth() {
  if (initialized) return Promise.resolve(keycloak.authenticated ?? false);
  initialized = true;

  return keycloak.init({
    onLoad: "login-required",
    pkceMethod: "S256",
  });
}

export function login() {
  keycloak.login({
    redirectUri: window.location.origin + "/home",
  });
}

export async function logout() {
  try {
    await keycloak.logout({
      redirectUri: window.location.origin + "/",
    });
    keycloak.clearToken();
  } catch (error) {
    console.error("Erro no logout:", error);
  }
}

export function getAccessToken(): string | undefined {
  return keycloak.token;
}

export function getAccessTokenPayload(): AccessTokenPayLoadNewDTO | undefined {
  try {
    const token = keycloak.token;
    return token ? (jwtDecode(token) as AccessTokenPayLoadNewDTO) : undefined;
  } catch (error) {
    return undefined;
  }
}

export function isAuthenticated(): boolean {
  return !!keycloak.authenticated;
}

export function hasAnyRoles(roles: RoleEnum[]): boolean {
  if (roles.length === 0) return true;
  const tokenPayload = getAccessTokenPayload();
  const userRoles = tokenPayload?.realm_access?.roles || [];
  return roles.some((role) => userRoles.includes(role));
}

export default keycloak;