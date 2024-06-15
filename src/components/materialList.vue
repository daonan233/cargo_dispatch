<template>
  <div class="material-list-container">
    <h1 align="center">库房</h1>
    <el-table :data="tableData" height="700" style="width: 100%" align="center" stripe>
      <el-table-column prop="code" label="编码" width="150" header-align="center" align="center" />
      <el-table-column prop="city" label="城市名称" width="200" header-align="center" align="center" />
      <el-table-column prop="materialName" label="物资名称" width="200" header-align="center" align="center" />
      <el-table-column prop="materialCategory" label="物资类别" width="200" header-align="center" align="center" />
      <el-table-column prop="quantity" label="物资数量" width="200" header-align="center" align="center">
        <template #default="{ row }">
          <el-input-number v-model="row.quantity" :min="0" :max="100000" :disabled="!row.editable" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="goBack" class="back-button">返回</el-button>
  </div>
</template>

<script>
import { usePointStore } from '@/stores/points.js';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

export default {
  setup() {
    
    const pointStore = usePointStore();
    const router = useRouter();
    let code = 1; // 初始编码

    const tableData = computed(() => {
      const data = [];
      pointStore.allPointPosition.forEach(point => {
        for (const [materialType, quantity] of Object.entries(point.resourceDetail)) {
          let materialCategory = '';
          switch(materialType) {
            case 'resourceA':
              materialCategory = '日用品';
              break;
            case 'resourceB':
              materialCategory = '食物';
              break;
            case 'resourceC':
              materialCategory = '家电';
              break;
            default:
              materialCategory = '未知';
              break;
          }
          console.log('code: ', code);
          if(code <= 60) {
            data.push({
              code: code++,
              city: point.name,
              materialName: materialType,
              materialCategory: materialCategory,
              quantity: point.resourceDetail[materialType],
            });
          }
      }
      });
      return data;
    });
    const goBack = () => {
      router.push('/warehouse');
    };


    return {
      tableData,
      goBack,
    };
  },
};
</script>

<style scoped>
.material-list-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.back-button {
  margin-top: 40px;
  border-radius: 8px;
}

h1 {
  margin-top: 0px;
  margin-bottom: 20px;
}
</style>