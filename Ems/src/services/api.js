const BASE_URL =  "http://localhost:3000/api/v1"

export const authEndpoints ={
    SIGNUP_API: `${BASE_URL}/auth/signup`,
    LOGIN_API: `${BASE_URL}/auth/signin`,
    REFRESH_API: `${BASE_URL}/auth/refresh-token`,
}
export const eventEndpoints ={
    CREATE_EVENT_API: `${BASE_URL}/event/create-event`,
    DELETE_EVENT_API: `${BASE_URL}/event/delete-event`,
    UPDATE_EVENT_API: `${BASE_URL}/event/update-event`,
    GET_ALL_EVENTS_API: `${BASE_URL}/event/get-all-events`,
    GET_EVENT_DETAILS_API: `${BASE_URL}/event/get-event`,
}