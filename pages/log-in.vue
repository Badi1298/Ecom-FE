<template>
    <div class="flex flex-col items-center justify-center p-5">
        <h1 class="text-2xl mb-4">Log In</h1>
        <form class="flex flex-col gap-y-2.5" @submit.prevent="loginUser">
            <div class="flex flex-col gap-y-1">
                <label for="email">E-Mail</label>
                <input
                    v-model="email"
                    id="email"
                    name="email"
                    type="email"
                    class="border border-black rounded ring-0 outline-none px-1"
                />
            </div>
            <div class="flex flex-col gap-y-1">
                <label for="password">Password</label>
                <input
                    v-model="password"
                    id="password"
                    name="password"
                    type="password"
                    class="border border-black rounded ring-0 outline-none px-1"
                />
            </div>
            <button class="bg-green text-white px-2 py-1 rounded mt-3">
                Log In
            </button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { AuthService } from '@/service/default/index.js';

import Cookies from 'js-cookie';

const authService = new AuthService();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { getUserData } = userStore;

const router = useRouter();

const email = ref('');
const password = ref('');

const loginUser = async () => {
    const payload = {
        email: email.value,
        password: password.value,
    };

    try {
        const response = await authService.login(payload);
        Cookies.set('token', response.data.token);
        isLoggedIn.value = true;

        getUserData();
        router.push('/home');
    } catch (err) {
        console.log(err);
    }
};
</script>
