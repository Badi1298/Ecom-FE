import httpService from '@/service/http.service.js';

export default class ItemsService {
    getItems(skip, limit) {
        return httpService.get('shop/items', {}, { params: { skip, limit } });
    }

    getItem(itemId) {
        if (!itemId) return;
        return httpService.get(`shop/item/${itemId}`);
    }

    getMyItems() {
        return httpService.get('shop/my-items');
    }

    editItem(itemId, payload) {
        if (!itemId) return;
        return httpService.patchForm(`shop/item/${itemId}`, payload);
    }

    deleteItem(itemId) {
        if (!itemId) return;
        return httpService.delete(`shop/items/${itemId}`);
    }
}
