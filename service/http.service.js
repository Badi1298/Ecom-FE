import axios from 'axios';

import Cookies from 'js-cookie';

class HttpService {
    constructor(baseURL) {
        const httpService = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        this.httpService = httpService;
        this.initInterceptors();
    }

    authHeaders() {
        const { isLoggedIn } = useUserStore();
        if (isLoggedIn) {
            return { Authorization: `Bearer ${Cookies.get('token')}` };
        }
        return {};
    }

    initInterceptors() {
        this.httpService.interceptors.request.use(
            config => {
                config.headers = { ...config.headers, ...this.authHeaders() };
                return config;
            },
            error => {
                // Do something with request error
                return Promise.reject(error);
            }
        );
    }

    async get(url, headers = {}, options = {}) {
        try {
            return await this.httpService.request({
                method: 'GET',
                url,
                headers,
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async post(url, data, options = {}) {
        try {
            return await this.httpService.request({
                method: 'POST',
                url,
                data: JSON.stringify(data),
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async postForm(url, data) {
        try {
            return await this.httpService.request({
                method: 'POST',
                url,
                data,
            });
        } catch (err) {
            throw err;
        }
    }

    async patch(url, data, options = {}) {
        try {
            return await this.httpService.request({
                method: 'PATCH',
                url,
                data: JSON.stringify(data),
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async patchForm(url, data) {
        try {
            return await this.httpService.request({
                method: 'PATCH',
                url,
                data,
            });
        } catch (err) {
            throw err;
        }
    }

    async put(url, data, options = {}) {
        try {
            return await this.httpService.request({
                method: 'PUT',
                url,
                data: JSON.stringify(data),
                ...options,
            });
        } catch (err) {
            throw err;
        }
    }

    async delete(url, params) {
        try {
            return await this.httpService.request({
                method: 'DELETE',
                url,
                params,
            });
        } catch (err) {
            throw err;
        }
    }
}

const httpService = new HttpService('http://localhost:8080/');

export default httpService;
