const BASE_URL = `${import.meta.env.VITE_BASE_URL}/api/v1` || "http://localhost:3000/api/v1"

export const authEndpoints ={
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/login`,
    REFRESH_API: `${BASE_URL}/auth/refresh-token`,
}