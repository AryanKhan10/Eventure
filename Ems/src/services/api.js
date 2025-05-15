const BASE_URL =  "http://localhost:3000/api/v1"

export const authEndpoints ={
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/signin`,
    REFRESH_API: `${BASE_URL}/auth/refresh-token`,
}