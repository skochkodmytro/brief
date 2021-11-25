import axios from "axios";

const apiPath = 'http://localhost:8080/api/';

type LoginResponse = {
    user: UserType
    token: string
}

type CheckResponse = {
    user: UserType
}

export const client = {
    setToken(token: string) {
        localStorage.setItem('token', token);
    },
    getToken() {
        return localStorage.getItem('token');
    },
    login(login: string, password: string) {
        return axios.post<LoginResponse>(`${apiPath}login`, { login, password }).then(res => res.data);
    },
    checkToken() {
        return axios.get<CheckResponse>(`${apiPath}check?token=${client.getToken()}`).then(res => res.data);
    },
    logout() {
        localStorage.removeItem('token');
    }
}
