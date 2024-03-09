<template>
    <div
        class="w-screen h-screen bg-black/50 fixed z-10 top-0 left-0"
        @click="$emit('closePopup')"
    ></div>
    <div
        class="fixed z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded w-80"
    >
        <h3 class="text-2xl mb-5">{{ popupTitle }}</h3>
        <form class="flex flex-col gap-4" @submit.prevent="handleForm">
            <div class="flex flex-col">
                <label for="title">Title</label>
                <input
                    v-model="defaultItem.title"
                    type="text"
                    class="border border-black ring-0 outline-none px-1.5 rounded"
                />
            </div>
            <div class="flex flex-col">
                <label for="title">Description</label>
                <input
                    v-model="defaultItem.description"
                    type="text"
                    class="border border-black ring-0 outline-none px-1.5 rounded"
                />
            </div>
            <div class="flex flex-col gap-1">
                <label for="image">Image</label>
                <span v-if="edit" class="text-xs"
                    >If you wish to change the current image select a new one,
                    if not, do not interact with this field and the old image
                    will remain.</span
                >
                <input
                    type="file"
                    name="image"
                    id="image"
                    @change="onFileChange"
                />
            </div>
            <button type="submit" class="bg-green text-white p-1 rounded">
                {{ buttonLabel }}
            </button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';

import { ItemsService } from '@/service/default/index.js';

import Cookies from 'js-cookie';

const props = defineProps({
    edit: {
        type: Boolean,
        default: false,
    },
    item: {
        type: Object,
        default: {
            title: '',
            description: '',
            image: '',
        },
    },
});

const emit = defineEmits(['closePopup', 'refetchItems']);

const itemsService = new ItemsService();

const defaultItem = ref(JSON.parse(JSON.stringify(props.item)));

const popupTitle = computed(() => {
    return props.edit ? 'Edit Item' : 'Add Item';
});

const buttonLabel = computed(() => {
    return props.edit ? 'Edit' : 'Add';
});

const onFileChange = async event => {
    if (!event.target.files) return;

    defaultItem.value.image = event.target.files[0];
};

const handleForm = async () => {
    const formData = new FormData();
    formData.append('title', defaultItem.value.title);
    formData.append('description', defaultItem.value.description);
    formData.append('image', defaultItem.value.image);

    if (!props.edit) {
        axios
            .post('http://localhost:8080/shop/item', formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then(response => {
                if (response.status !== 201)
                    throw new Error('Failed to post item.');

                emit('closePopup');
            })
            .catch(err => console.log(err));
    } else {
        await itemsService.editItem(defaultItem.value._id, formData);
        emit('closePopup');
    }
};
</script>
