import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTVkYjJkYjBhZGFiMjk0YWM5OThiMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4Nzk5MjQ3MywiZXhwIjoxNjg4MjUxNjczfQ.KLX_K0pIGeYh8Qjak-ARdpO1bVSVndcOzd51zD18C4E";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});
export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token:`Bearer ${TOKEN}`},
});

