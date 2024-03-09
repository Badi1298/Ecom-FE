import openSocket from 'socket.io-client';

import { AuthService } from '@/service/default/index.js';

import Cookies from 'js-cookie';

export const useUserStore = defineStore('user', () => {
    const authService = new AuthService();

    const isLoggedIn = ref(false);

    const user = ref({ name: '' });
    const socket = ref({});

    onMounted(async () => {
        isLoggedIn.value = !!Cookies.get('token');
        if (!isLoggedIn.value) return;

        getUserData();
    });

    const initSockets = () => {
        socket.value = openSocket('http://localhost:8080');
    };

    const getUserData = async () => {
        try {
            const response = await authService.me();
            user.value = response.data.user;
        } catch (err) {
            console.log(err);
        }
    };

    return {
        user,
        socket,
        isLoggedIn,
        getUserData,
    };
});
