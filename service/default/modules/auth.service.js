import httpService from '@/service/http.service.js';

export default class AuthService {
    me() {
        return httpService.get('auth/me');
    }

    login(payload) {
        if (!payload) return;
        return httpService.post('auth/login', payload);
    }
}
