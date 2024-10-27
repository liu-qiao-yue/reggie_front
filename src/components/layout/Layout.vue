<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="layout">
    <div class="layout-box"  :class="{ 'changePwd': changeActive }">
      <img src="@/assets/images/login/login-l.png" alt="">
      <div class="layout-right">
        <RouterView></RouterView>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts" name="Layout">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const changeActive = ref(false)

watch(router.currentRoute,(newValue)=>{  
  if (newValue.name === 'changePassword') {
    changeActive.value = true
  } else {
    changeActive.value = false
  }
  },{deep:true,immediate:true})

</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  background-color: #333;

  .layout-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    img {
      width: 40%;
      height: 474.38px;
    }

    .layout-right{
      width: 30%;
      background-color: #ffffff;
      height: 474.38px;
      border-radius: 0px 8px 8px 0px;
    }
  }

  .changePwd{
    img {
      width: 30% !important;
    }
    .layout-right{
      width: 40% !important;
    }
  }
}
</style>
