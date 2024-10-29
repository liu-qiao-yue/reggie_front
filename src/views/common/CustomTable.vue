<template>
  <div>
    <!-- 表格主体 -->
    <el-table :data="pagedData" style="width: 100%" stripe>
      <!-- 添加序号列，如果需要的话 -->
      <el-table-column label="序号" width="60" fixed="left" v-if="showIndexColumn">
        <template #default="{ $index }">
          <!-- 序号计算，考虑到了当前页码和页面大小 -->
          {{ $index + 1 + (internalCurrentPage - 1) * internalPageSize }}
        </template>
      </el-table-column>
      <!-- 遍历列定义 -->
      <el-table-column v-for="(column, index) in columns" :key="index" header-align="center" :align="'center'"
        :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed"
        :cell-style="{ textAlign: 'center' }" :header-cell-style="{ 'text-align': 'center' }"
        v-show="column.displayStatus === 1">
        <!-- 如果是操作列，则渲染操作按钮 -->
        <template v-if="column.isActions" #default="{ row, $index }">
          <slot name="actions" :row="row" :index="$index"></slot>
        </template>
        <!-- 否则渲染单元格内容 -->
        <template v-else-if="column.templateSlotName" #default="{ row, $index }">
          <slot :name="column.templateSlotName" :row="row" :index="$index"></slot>
        </template>
        <!-- 使用自定义函数处理显示逻辑 -->
        <template v-else-if="column.formatter" #default="{ row }">
          {{ column.formatter?.(row[column.prop], row) ?? '-' }}
        </template>
        <template v-else #default="{ row }">
          {{ row[column.prop] }}
        </template>
      </el-table-column>
      <!-- 自定义空数据提示 -->
      <template v-slot:empty>
        <div class="empty-text">
          <i class="iconfont icon-no-data" />
        </div>
      </template>
      <!-- 插槽用于插入自定义列 -->
      <slot></slot>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination :current-page="internalCurrentPage" :page-size="internalPageSize" :page-sizes="[10, 15, 30, 50]"
      :disabled="isDisabledPagination" layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, defineEmits } from 'vue';
import type { TableColumn, TableRow } from '@/types/TableInter';

// 定义组件属性
const props = defineProps<{
  tableData: TableRow[];
  columns: TableColumn[];
  total: number;
  isDisabledPagination: boolean;
  showIndexColumn: boolean
}>();

// 计算分页后的数据
const pagedData = computed(() => {
  return props.tableData;
});

// 内部使用的当前页和每页大小
const internalCurrentPage = ref(1);
const internalPageSize = ref(10);

// 定义自定义事件
const emit = defineEmits<{
  (e: 'update:pagination', currentPage: number, pageSize: number): void;
}>();

// 监听分页组件中的当前页和每页大小变化
const handleSizeChange = (size: number) => {
  console.log("我是内部的分页组件的size变化");

  internalPageSize.value = size;
  emit('update:pagination', internalCurrentPage.value, internalPageSize.value);
};
const handleCurrentChange = (currentPage: number) => {
  console.log("我是内部的分页组件的currentPage变化");

  internalCurrentPage.value = currentPage;
  emit('update:pagination', internalCurrentPage.value, internalPageSize.value);
};
</script>

<style scoped>
.empty-text {
  min-height: 120px;
  padding: 10px 0;

  .icon-no-data {
    font-size: 120px;
    line-height: 120px;
    color: #ebeef5;
  }
}
</style>