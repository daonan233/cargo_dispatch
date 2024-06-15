import { defineStore } from 'pinia';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [
      { id: 1, name: '日用品' },
      { id: 2, name: '食物' },
      { id: 3, name: '家电' },
      { id: 4, name: '工具' },
      { id: 5, name: '服装' }
    ],
  }),
  getters: {
    getCategoryById: (state) => (id) => {
      return state.categories.find(category => category.id === id)?.name || '未知';
    },
  },
});