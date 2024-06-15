<template>
  <div>
    <h1 align="center">仓储物资管理</h1>
    <div>
      <h2 align="center">添加新物资</h2>
      <el-form @submit.prevent="submit" class="material-form" :model="newMaterial">
        <el-form-item label="物资 :">
          <el-select v-model="newMaterial.name" placeholder="请选择物资" size="large" required class="small-input">
            <el-option label="物资A" value="resourceA"></el-option>
            <el-option label="物资B" value="resourceB"></el-option>
            <el-option label="物资C" value="resourceC"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库房 :">
          <el-select v-model="newMaterial.warehouse_id" placeholder="请选择所属库房" required class="small-input" size="large">
            <el-option v-for="warehouse in warehouses" :key="warehouse.name" :label="warehouse.name" :value="warehouse.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="数量 :">
          <el-input-number v-model="newMaterial.quantity" :min="1" :max="100000" placeholder="数量" required class="small-input" size="large" />
        </el-form-item>
        <el-form-item class="button-group">
          <el-button type="primary" native-type="submit" class="submit-button">添加</el-button>
          <el-button type="primary" @click="viewMaterialList" class="view-button">查看物资列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { useListStore } from '@/stores/column.js';
  import { useCategoryStore } from '@/stores/category.js';
  import { useWarehouseStore } from '@/stores/warehouse.js';
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { usePointStore } from '@/stores/points';
  import {useUserStore} from "@/stores/user.js";

  export default {
    setup() {
      const router = useRouter();
      const listStore = useListStore();
      const categoryStore = useCategoryStore();
      const warehouseStore = useWarehouseStore();
      const pointStore = usePointStore();

      const viewMaterialList = () => {
        router.push('/list');
      };

      const submit = () => {
        if (useUserStore().getCurrentUser.role === 'user') {
          window.alert("您不是管理员或领导，不能进行操作！")
        } else {
          pointStore.allPointPosition.forEach(point => {
            if (point.name === newMaterial.value.warehouse_id) {
              console.log(newMaterial.value.quantity);
              point.resourceDetail[newMaterial.value.name] += newMaterial.value.quantity;
            }
          });
          window.alert("添加物品成功！")
        }
      }

      const addNewMaterial = () => {
        listStore.addMaterial({ ...newMaterial.value });
        newMaterial.value = {
          name: '',
          category_id: '',
          warehouse_id: '',
          code: '',
          quantity: 1,
        };
      };

      const newMaterial = ref({
        name: '',
        category_id: '',
        warehouse_id: '',
        code: '',
        quantity: 1,
      });

      const categories = computed(() => categoryStore.categories);
      const warehouses = computed(() => warehouseStore.warehouses);

      return {
        viewMaterialList,
        submit,
        addNewMaterial,
        newMaterial,
        categories,
        warehouses,
      };
    },
  };
</script>

<style scoped>
  .material-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 500px;
    margin: 0 auto;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
  }

  .submit-button, .view-button {
    margin: 0 auto;
    width: 30%;
    padding: 18px 20px;
    border-radius: 8px;
  }
</style>