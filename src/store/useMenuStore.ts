import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', ()=>{
  const isActiveItem = ref<string>(localStorage.getItem('isActiveItem') as string);
  
  function setActiveItem(item: string){
    isActiveItem.value = item;
    localStorage.setItem('isActiveItem', item)
  }

  function getPath(){
    return isActiveItem.value;
  }
  return {
    isActiveItem, getPath, setActiveItem
  }
})