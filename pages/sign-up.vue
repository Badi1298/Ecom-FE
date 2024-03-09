<template>
    <div class="flex flex-col items-center justify-center p-5">
        <h1 class="text-2xl mb-4">Sign Up</h1>
        <form class="flex flex-col gap-y-2.5" @submit.prevent="signupUser">
            <div class="flex flex-col gap-y-1">
                <label for="name">Name</label>
                <input
                    v-model="name"
                    id="name"
                    name="name"
                    type="text"
                    class="border border-black rounded ring-0 outline-none px-1"
                />
            </div>
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
            <div class="flex flex-col gap-y-1">
                <label for="confirm-password">Confirm Password</label>
                <input
                    v-model="confirmPassword"
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    class="border border-black rounded ring-0 outline-none px-1"
                />
            </div>
            <button class="bg-green text-white px-2 py-1 rounded mt-3">
                Signup
            </button>
        </form>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import axios from 'axios';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const signupUser = async () => {
    const payload = {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
    };

    try {
        await axios.put('http://localhost:8080/auth/signup', payload);
        router.push('/home');
    } catch (err) {
        console.log(err);
    }
};
</script>
