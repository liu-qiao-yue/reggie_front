<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <div class="sidebar-container">
          <div class="logo">
          <img src="@/assets/images/login/login-logo.png">
        </div>
        <SlideMenu></SlideMenu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <HeaderLayout></HeaderLayout>
        </el-header>
        <el-main>
          <div class="main-body">
            <RouterView></RouterView>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts" name="BasicLayout">
import SlideMenu from '@/views/menu/SlideMenu.vue';
import HeaderLayout from '@/views/header/HeaderLayout.vue';

</script>
<style lang="scss" scoped>
@use "./BasicLayout.scss";
</style>
