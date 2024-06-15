<template>
  <div :class="['sidebar', { 'sidebar-active': isActive }]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <el-menu active-text-color="rgb(163,167,247)" :router="true" text-color="#fff" @open="handleOpen" @close="handleClose">
      <h1 class="menu-title">Material Allocation</h1>
      <el-menu-item index="home" :route="{ path: '/home' }">
        <el-row>
          <span class="menu-text">地图</span>
        </el-row>
      </el-menu-item>
      <el-menu-item index="warehouse" :route="{ path: '/warehouse' }">
        <el-row>
          <span class="menu-text">添加物资</span>
        </el-row>
      </el-menu-item>
      <el-menu-item index="map" :route="{ path: '/list' }">
        <el-row>
          <span class="menu-text">物资列表</span>
        </el-row>
      </el-menu-item>
      <el-menu-item index="map" :route="{ path: '/capx' }">
        <el-row>
          <span class="menu-text">修改容量</span>
        </el-row>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isActive = ref(false);

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
};
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
};

const handleMouseEnter = () => {
  isActive.value = true;
};

const handleMouseLeave = () => {
  isActive.value = false;
};
</script>

<style scoped>
.sidebar {
  background-color: rgb(151, 188, 220);
  width: 60px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  transition: width 0.3s ease;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
}

.sidebar-active {
  width: 200px;
}

.el-menu {
  background-color: inherit;
  height: 100%;
}

.menu-title {
  transition: opacity 0.3s ease;
  opacity: 0;
  margin-left:20px;
  user-select: none;
}

.menu-text {
  transition: opacity 0.3s ease;
  opacity: 0;
  user-select:none
}

.sidebar-active .menu-title,
.sidebar-active .menu-text {
  opacity: 1;
}
</style>
