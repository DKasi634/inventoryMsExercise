

export enum ENDPOINTS{
    BASE_ENDPOINT=import.meta.env.VITE_BASE_ENDPOINT,
    PRODUCTS='products/',
    ORDERS='orders/',
    AUTH_TOKEN_OBTAIN='auth/token',
    AUTH_TOKEN_REFRESH='auth/token/refresh',
    REGISTER="auth/register",
    LOGOUT="auth/logout",
}