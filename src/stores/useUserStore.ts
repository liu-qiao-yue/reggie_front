import { _getUserInfo } from "@/apis/CommonApi";
import type { EmployeeInter } from "@/types/EmployeeInters";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useUserStore = defineStore('user', ()=>{
  const userInfo = ref<EmployeeInter>(JSON.parse(localStorage.getItem('userInfo') as string)) || {}
  const token = ref(localStorage.getItem('token') || '')

  const getToken = computed(() => token.value);
  const getUserInfo = () => {
    if(userInfo.value == null || userInfo.value.id == undefined || userInfo.value.id == ''){
      _getUserInfo().then(({ data }) => {
        userInfo.value = data.data
        localStorage.setItem('userInfo', JSON.stringify(data.data))
      })
    }
    return userInfo.value
  }


  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem('token', newToken);
  }

  function clearTokenAndUserInfo() {
    token.value = '';
    userInfo.value = {} as EmployeeInter;
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }


  return { getToken, getUserInfo, setToken, clearTokenAndUserInfo };
})
