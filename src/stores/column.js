import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useListStore = defineStore('list', () => {
  const materials = ref([]);
  
  const loadMaterialsFromLocalStorage = () => {
    const savedMaterials = localStorage.getItem('materials');
    if (savedMaterials) {
      materials.value = JSON.parse(savedMaterials);
    }
  };

  const saveMaterialsToLocalStorage = () => {
    localStorage.setItem('materials', JSON.stringify(materials.value));
  };

  const addMaterial = (material) => {
    material.id = materials.value.length + 1;
    materials.value.push(material);
    saveMaterialsToLocalStorage();
  };

  const updateMaterialQuantity = (id, quantity) => {
    const material = materials.value.find(mat => mat.id === id);
    if (material) {
      material.quantity = quantity;
      saveMaterialsToLocalStorage();
    }
  };

  const deleteMaterial = (id) => {
    materials.value = materials.value.filter(mat => mat.id !== id);
    saveMaterialsToLocalStorage();
  };

  loadMaterialsFromLocalStorage();

  watch(materials, saveMaterialsToLocalStorage, { deep: true });

  return {
    materials,
    addMaterial,
    updateMaterialQuantity,
    deleteMaterial,
  };
});