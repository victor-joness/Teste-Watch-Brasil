import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: null,
    token: null,
    userData: null,
  }),
  actions: {
    setUserData(userData : any) {
      this.userData = userData;
    },
    setUserId(userId: any) {
      this.userId = userId;
    },
    setToken(token: any) {
      this.token = token;
    },
    clearUserData() {
      this.userData = null;
      this.userId = null;
      this.token = null;
    }
  }
});
