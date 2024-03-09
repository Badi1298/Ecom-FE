<template>
    <div class="p-5">
        <div
            class="flex flex-col border border-gray-dark rounded pb-3 gap-2.5 max-w-[50vw]"
        >
            <div class="h-96">
                <img
                    :src="`http://localhost:8080/${item.image}`"
                    alt="aaaa"
                    class="w-full h-full object-cover"
                />
            </div>
            <div class="text-2xl p-4">
                <h3 class="text-center">{{ item.title }}</h3>
                <p class="text-sm">{{ item.description }}</p>
            </div>
            <div class="flex gap-2.5 justify-center items-center">
                <button
                    class="bg-orange text-white py-1 px-2.5"
                    @click="addNewItemPopupOpen = true"
                >
                    Edit
                </button>
                <button
                    class="bg-purple text-white py-1 px-2.5"
                    @click="deleteItem(item._id)"
                >
                    Delete
                </button>
            </div>
        </div>
        <new-item
            v-if="addNewItemPopupOpen"
            :item="item"
            :edit="true"
            @close-popup="addNewItemPopupOpen = false"
        />

        <NuxtLink to="/home">
            <button class="bg-orange mt-4 p-1 text-white rounded">
                Go Back
            </button>
        </NuxtLink>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

import { ItemsService } from '@/service/default/index.js';

const route = useRoute();
const router = useRouter();

const itemsService = new ItemsService();

const item = ref({});

const addNewItemPopupOpen = ref(false);

const itemId = computed(() => {
    return route.params.id;
});

onMounted(() => {
    getItem();
});

const getItem = async () => {
    try {
        const response = await itemsService.getItem(itemId.value);
        item.value = response.data.item;
    } catch (err) {
        console.log(err);
    }
};

const deleteItem = async () => {
    try {
        await itemsService.deleteItem(itemId.value);
        router.push('/home');
    } catch (err) {
        console.log(err);
    }
};
</script>
