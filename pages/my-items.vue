<template>
    <TheTopbar @refetch-items="getMyItems" />
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
                    <button
                        class="bg-orange text-white py-1 px-2.5 rounded"
                        @click="onOpenEditPopup(item)"
                    >
                        Edit
                    </button>
                    <button class="bg-pink text-white py-1 px-2.5 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>

        <new-item
            v-if="addNewItemPopupOpen"
            :item="item"
            :edit="true"
            @close-popup="addNewItemPopupOpen = false"
        />
    </div>
</template>

<script setup>
import { ItemsService } from '@/service/default/index.js';

const itemsService = new ItemsService();

const item = ref({});
const items = ref([]);

const addNewItemPopupOpen = ref(false);

onMounted(() => {
    getMyItems();
});

const getMyItems = async () => {
    try {
        const response = await itemsService.getMyItems();
        items.value = response.data.items;
    } catch (err) {
        console.log(err);
    }
};

const onOpenEditPopup = itemToEdit => {
    item.value = itemToEdit;
    addNewItemPopupOpen.value = true;
};
</script>
