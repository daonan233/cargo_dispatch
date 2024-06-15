<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form>
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="username" placeholder="输入您的用户名">
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" placeholder="输入您的密码">
        </div>
        <button @click.prevent="login" class="btn">Login</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';
import {ref } from 'vue'

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const router = useRouter();
const userStore = useUserStore();

const login = () => {
  const isAuthenticated = userStore.authenticateUser(username.value, password.value);
  const role = userStore.getCurrentUser.role;
  if (isAuthenticated) {
    window.alert("您是"+role)
    router.push('/home');
  } else {
    errorMessage.value = '用户名或密码错误';
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 98vh;
  background-color: #f0f0f0;
}

.login-box {
  width: 40vw;
  height: 50vh;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.login-box:hover {
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
}

h2 {
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  font-size: 30px;
  font-family: "youyuan";
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn {
  display: block;
  width: 50%;
  padding: 10px;
  margin: 60px auto 0;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
