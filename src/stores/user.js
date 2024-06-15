// user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        users: [
            {
                username: '1',
                password: '1',
                role: 'user'
            },
            {
                username: '2',
                password: '2',
                role: 'admin'
            },
            {
                username: '3',
                password: '3',
                role: 'boss'
            }
        ],
        currentUser: null // 用于存储当前登录的用户信息
    }),
    getters: {
        getUsers() {
            return this.users;
        },
        getCurrentUser() {
            return this.currentUser;
        },
        isAuthenticated() {
            return !!this.currentUser;
        }
    },
    actions: {
        authenticateUser(username, password) {
            const user = this.users.find(user => user.username === username && user.password === password);
            if (user) {
                this.currentUser = user;
                return true;
            } else {
                return false;
            }
        },
        logout() {
            this.currentUser = null;
        }
    }
});
