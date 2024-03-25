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

const signupUser = async () => {
    const graphqlQuery = {
        query: `
            mutation CreateUser($userInput: UserInputData!) {
                createUser(userInput: $userInput) {
                    name
                    email
                }
            }
        `,
        variables: {
            userInput: {
                email: email.value,
                name: name.value,
                password: password.value,
            },
        },
    };

    try {
        const response = await axios.post(
            'http://localhost:8080/graphql',
            graphqlQuery
        );
        if (response.data.errors) {
            console.log(response.data.errors);
        } else {
            console.log(response.data.data);
            router.push('/home');
        }
    } catch (err) {
        console.log(err);
    }
};
</script>
