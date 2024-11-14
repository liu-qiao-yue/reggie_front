<template>
  <div>
    <!-- 表格主体 -->
    <el-table :data="pagedData" style="width: 100%" stripe @selection-change="handleSelectionChange" ref="customTableRef">
      <!-- 添加序号列，如果需要的话 -->
      <el-table-column label="序号" width="70" v-if="showIndexColumn" header-align="center" :align="'center'">
        <template #default="{ $index }">
          <!-- 序号计算，考虑到了当前页码和页面大小 -->
          {{ $index + 1 + (internalCurrentPage - 1) * internalPageSize }}
        </template>
      </el-table-column>

      <!-- 复选框列，根据showCheckbox属性决定是否显示 -->
      <el-table-column type="selection" width="25" v-if="showCheckbox"></el-table-column>
      
      <!-- 遍历列定义 -->
      <el-table-column v-for="(column, index) in columns" :key="index" :header-align="'center'" :align="column.align?column.align:'center'"
        :prop="column.prop" :label="column.label" :width="column.width" :fixed="column.fixed" :show-overflow-tooltip="column.overflowTooltip">

        <!-- 如果是操作列，则渲染操作按钮 -->
        <template v-if="column.isActions" #default="{ row, $index }">
          <slot name="actions" :row="row" :index="$index"></slot>
        </template>
        <!-- 自定义单元格内容 -->
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
          <i class="iconfont icon-no-data"></i>
        </div>
      </template>
      <slot></slot>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination :current-page="internalCurrentPage" :page-size="internalPageSize" :page-sizes="[10, 15, 30, 50]"  layout="total, sizes, prev, pager, next, jumper" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" v-if="isPagination"></el-pagination>
  </div>
</template>

<script lang="ts" setup name="CustomTable">
import {computed, ref, defineEmits } from 'vue';
import type { TableColumn, TableRow } from '@/types/TableInter';
import type { TableInstance } from 'element-plus'

// 定义组件属性
const props = withDefaults(defineProps<{
  tableData: TableRow[];
  columns: TableColumn[];
  total?: number;
  isPagination?: boolean;
  showIndexColumn?: boolean;
  showCheckbox?: boolean; // 新增属性，控制是否显示复选框列
}>(),{
  isPagination: true,
  showIndexColumn: false,
  showCheckbox: false,
  total: 0
});

// 计算分页后的数据
const pagedData = computed(() => {  
  return props.tableData;
});

// 内部使用的当前页和每页大小
const internalCurrentPage = ref(1);
const internalPageSize = ref(10);
const customTableRef = ref<TableInstance>()

// 定义自定义事件
const emit = defineEmits<{
  (e: 'update:pagination', currentPage: number, pageSize: number): void;
  (e: 'selection-change', selectedRows: TableRow[]): void;
}>();

// 监听分页组件中的当前页和每页大小变化
const handleSizeChange = (size: number) => {

  internalPageSize.value = size;
  emit('update:pagination', internalCurrentPage.value, internalPageSize.value);
};
const handleCurrentChange = (currentPage: number) => {
  internalCurrentPage.value = currentPage;
  emit('update:pagination', internalCurrentPage.value, internalPageSize.value);
};

// 当选择项发生变化时触发
const handleSelectionChange = (selection: TableRow[]) => {
  emit('selection-change', selection);
};

const clearSelection = () => {
  if(props.showCheckbox){
    customTableRef.value!.clearSelection()
  }
}

defineExpose({ clearSelection })
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