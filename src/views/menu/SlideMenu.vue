<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu class="el-menu-vertical-demo" :default-active="isActiveItem" router @select="tabMenu"
            :collapse-transition="false">
            <slide-item :menus="menuList" :activePath="isActiveItem"></slide-item>
        </el-menu>
    </el-scrollbar>
</template>
<script setup lang="ts" name="SlideMenu">
// import { onMounted } from 'vue';
// import { useRouterStore } from '@/store/userouterStore';
import { menuList } from '@/assets/data/menuData';
import SlideItem from './SlideItem.vue';
import { useMenuStore } from '@/store/useMenuStore';
/* 引入storeToRefs */
import { storeToRefs } from 'pinia'

const menuStore = useMenuStore();

const { isActiveItem } = storeToRefs(menuStore)
function tabMenu(key: string, keyPath: string[]) {
    menuStore.setActiveItem(key)
}

</script>
<style lang="scss" scoped></style>
