<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
/* 设置body高度100% */
html, body, #app{
    margin: 0;
	  padding: 0;
    height: 100%;
}
</style>
