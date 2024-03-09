<template>
    <header>
        <div class="flex justify-between items-center p-4">
            <NuxtLink to="/home">
                <h1 class="text-3xl font-bold cursor-pointer">E-Commerce</h1>
            </NuxtLink>
            <h2 v-if="isLoggedIn && user.name" class="text-xl">
                User Name: {{ user.name }}
            </h2>
            <div class="flex items-center gap-x-7">
                <div class="flex items-center gap-x-2 cursor-pointer">
                    <i class="pi pi-user"></i>
                    <NuxtLink v-if="!isLoggedIn" to="/log-in">
                        <h3 class="font-medium">Log In</h3>
                    </NuxtLink>
                    <NuxtLink v-if="!isLoggedIn" to="/sign-up">
                        <h3 class="font-medium">Sign Up</h3>
                    </NuxtLink>
                    <h3 v-if="isLoggedIn" class="font-medium" @click="logOut">
                        Log Out
                    </h3>
                </div>
                <i class="pi pi-heart cursor-pointer"></i>
                <div class="flex items-center gap-x-1 cursor-pointer">
                    <i class="pi pi-shopping-cart"></i>
                    <p
                        class="bg-gray-dark text-white rounded-full w-4 flex items-center justify-center text-xs"
                    >
                        1
                    </p>
                </div>
            </div>
        </div>
        <nav class="flex justify-between items-center p-4 bg-gray-light">
            <ul class="flex gap-x-5 text-sm">
                <li
                    v-for="option in headerOptions"
                    class="cursor-pointer font-thin"
                >
                    <NuxtLink v-if="option.show" :to="option.route">{{
                        option.name
                    }}</NuxtLink>
                </li>
            </ul>
            <button
                v-if="isLoggedIn"
                class="bg-green p-1 rounded text-white"
                @click="addNewItemPopupOpen = true"
            >
                New Item
            </button>
            <new-item
                v-if="addNewItemPopupOpen"
                @close-popup="addNewItemPopupOpen = false"
            />
        </nav>
    </header>
</template>

<script setup>
import Cookies from 'js-cookie';

const emit = defineEmits(['refetchItems']);

const userStore = useUserStore();
const { user, isLoggedIn } = storeToRefs(userStore);

const addNewItemPopupOpen = ref(false);

const headerOptions = computed(() => {
    return [{ name: 'My Items', route: '/my-items', show: isLoggedIn.value }];
});

const logOut = () => {
    Cookies.remove('token');
    isLoggedIn.value = false;
};

const onRefetchItems = item => {
    emit('refetchItems', item);
};
</script>
