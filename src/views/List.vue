<template>
  <div id="materialList">
    <side-bar />
    <div class="content">
      <materialList />
    </div>
  </div>
</template>

<script>
import materialList from '@/components/materialList.vue';
import SideBar from '@/components/sideBar.vue';

export default {
  name: 'List',
  components: {
    materialList,
    SideBar,
  },
};
</script>

<style scoped>
#materialList {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
  margin: 0 auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  margin-top: 60px;
}
</style>
