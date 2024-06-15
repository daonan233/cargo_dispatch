<template>
  <el-container>
    <el-aside width="500px">
      <SideBar />
    </el-aside>
    <el-container>
      <el-header>
        <h1>城市容量管理</h1>
      </el-header>
      <el-main>
        <el-table :data="citiesCap" style="width: 100%">
          <el-table-column prop="name" label="城市" width="180"></el-table-column>
          <el-table-column label="容量">
            <template #default="scope">
              <el-input-number v-model.number="scope.row.capacity" :min="0" />
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="updateCapacities" style="margin-top: 20px;">修改</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';
import {useUserStore} from "@/stores/user.js";
import { useCapacityStore } from '@/stores/city.js';
import SideBar from '@/components/sideBar.vue';
import 'element-plus/dist/index.css';
import { ElContainer, ElAside, ElHeader, ElMain, ElTable, ElTableColumn, ElInputNumber, ElButton } from 'element-plus';


const capacityStore = useCapacityStore();
const citiesCap = ref([...capacityStore.citiesCap]);

const updateCapacities = () => {
  if(useUserStore().getCurrentUser.role !== 'boss'){
    window.alert("您不是领导，无法进行紧急方案处理")
  }
  capacityStore.$patch({
    citiesCap: citiesCap.value
  });
};
</script>
