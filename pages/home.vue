<template>
    <TheTopbar />
    <div class="p-5">
        <div class="grid grid-cols-5 gap-4">
            <div
                v-for="item in items"
                class="flex flex-col border border-gray-dark rounded pb-3 gap-2.5"
            >
                <div class="h-[206px] border-b border-black">
                    <img
                        :src="`http://localhost:8080/${item.image}`"
                        alt="aaaa"
                        class="w-full h-full object-cover rounded-t"
                    />
                </div>
                <div class="text-2xl p-4">
                    <h3 class="text-center">{{ item.title }}</h3>
                    <p class="text-sm">{{ item.description }}</p>
                </div>
                <div class="flex gap-2.5 justify-center items-center">
                    <NuxtLink :to="`/items/${item._id}`">
                        <button class="bg-orange text-white py-1 px-2.5">
                            View
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-5">
            <button
                :disabled="!showPreviousPageButton"
                class="bg-green text-white p-2 rounded disabled:bg-gray disabled:opacity-50"
                @click="goToPreviousPage"
            >
                Previous Page
            </button>
            <p>Current Page: {{ currentPage }}</p>
            <button
                :disabled="!showNextPageButton"
                class="bg-green text-white p-2 rounded disabled:bg-gray disabled:opacity-50"
                @click="goToNextPage"
            >
                Next Page
            </button>
        </div>
    </div>
</template>

<script setup>
import openSocket from 'socket.io-client';

import { ItemsService } from '@/service/default/index.js';

const itemsService = new ItemsService();

const items = ref([]);

const skip = ref(0);
const limit = ref(5);
const currentPage = ref(1);
const totalItems = ref(null);

const showPreviousPageButton = computed(() => {
    return skip.value >= limit.value;
});

const showNextPageButton = computed(() => {
    return skip.value < totalItems.value - limit.value;
});

onMounted(() => {
    getItems();
    // const socket = openSocket('http://localhost:8080');
    // socket.on('items', data => {
    //     if (data.action === 'create') {
    //         items.value.push(data.item);
    //     } else if (data.action === 'update') {
    //         console.log('update', data.item);
    //         replaceObjectById(items.value, data.item._id, data.item);
    //     }
    // });
});

const getItems = async () => {
    try {
        const response = await itemsService.getItems(skip.value, limit.value);
        items.value = response.data.items;
        totalItems.value = response.data.totalItems;
    } catch (err) {
        console.log(err);
    }
};

const replaceObjectById = (arr, id, newData) => {
    // Find the index of the object with the specified id
    let index = arr.findIndex(item => item._id === id);

    // If the object with the specified id exists
    if (index !== -1) {
        // Replace the object with new data
        arr[index] = newData;
    }
};

const goToPreviousPage = () => {
    skip.value -= limit.value;
    currentPage.value--;
    getItems();
};

const goToNextPage = () => {
    skip.value += limit.value;
    currentPage.value++;
    getItems();
};
</script>
