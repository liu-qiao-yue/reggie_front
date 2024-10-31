<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="layout">
    <div class="layout-box" :class="{ 'changePwd': changeActive }">
      <div class="login-changePwd" v-if="router.currentRoute.value.name !== 'forgotPassword'">
        <img src="@/assets/images/login/login-l.png" alt="">
        <div class="layout-right common-backgoround">
          <RouterView></RouterView>
        </div>
      </div>
      <div v-else class="login-changePwd">
        <div class="common-backgoround forgot-password">
          <RouterView></RouterView>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts" name="Layout">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const changeActive = ref(false)

watch(router.currentRoute, (newValue) => {
  if (newValue.name === 'changePassword') {
    changeActive.value = true
  } else {
    changeActive.value = false
  }
}, { deep: true, immediate: true })

</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
  background-color: #333;

  .layout-box {
    width: 100%;

    .common-backgoround {
      background-color: #ffffff;
      height: 474.38px;
      border-radius: 0px 8px 8px 0px;
    }

    .login-changePwd {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      img {
        width: 40%;
        height: 474.38px;
      }

      .layout-right {
        width: 30%;
      }
    }

    .common-backgoround.forgot-password {
      width: 80%;
    }

  }

  .changePwd {
    img {
      width: 30% !important;
    }

    .layout-right {
      width: 40% !important;
    }
  }
}
</style>
