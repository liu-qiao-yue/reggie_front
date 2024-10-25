<template>
  <div class="slide-item-container clearfix">
    <template v-for="item in menus" :key="item.id">
      <el-menu-item :index="item.path" :disabled="item.disabled" :title="item.title">
        <div class="border">
          <i :class="['iconfont', item.icon]"></i>
          <span v-html="item.title"></span>
        </div>
      </el-menu-item>
    </template>
  </div>
</template>
<script setup lang="ts" name="SlideItem">
import type { Menus } from '@/types/MenuInter';

// 第三种写法：接收 + 限制类型 + 指定默认值 + 限制必要性
withDefaults(defineProps<{ menus: Menus, activePath: string }>(), {
  menus: () => [],
  activePath: ''
})

</script>
<style lang="scss" scoped></style>
