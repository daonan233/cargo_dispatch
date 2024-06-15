

<template>
    <div id="Warehouse">
      <side-bar />
      <div class="content">
        <warehouseManage />
      </div>
    </div>
</template>
  
<script>
  import warehouseManage from '@/components/warehouseManage.vue';
  import SideBar from '@/components/sideBar.vue';
  
  export default {
    name: 'Warehouse',
    components: {
      warehouseManage, SideBar
    },
  };
</script>
  
<style scoped>
#Warehouse {
  display: flex;
}

.content {
  flex: 1;
  padding: 20px;
}

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  