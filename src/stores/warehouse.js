import { defineStore } from 'pinia';

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    warehouses: [
      { id: 1, name: '哈尔滨' },
      { id: 2, name: '长春' },
      { id: 3, name: '沈阳' },
      { id: 4, name: '乌鲁木齐' },
      { id: 5, name: '呼和浩特' },
      { id: 6, name: '北京' },
      { id: 7, name: '银川' },
      { id: 8, name: '太原' },
      { id: 9, name: '济南' },
      { id: 10, name: '西安' },
      { id: 11, name: '郑州' },
      { id: 12, name: '成都' },
      { id: 13, name: '重庆' },
      { id: 14, name: '武汉' },
      { id: 15, name: '南京' },
      { id: 16, name: '上海' },
      { id: 17, name: '杭州' },
      { id: 18, name: '长沙' },
      { id: 19, name: '昆明' },
      { id: 20, name: '福州' }
    ],
  }),
  getters: {
    getWarehouseById: (state) => (id) => {
      return state.warehouses.find(warehouse => warehouse.id === id)?.name || '未知';
    },
  },
});