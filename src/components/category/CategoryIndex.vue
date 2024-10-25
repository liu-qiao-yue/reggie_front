<template>
  <div class="container">
    <div class="tableBar m-b-20">
      <el-button type="primary" @click="a" color="#333333"> + 新增菜品分类</el-button>
      <el-button type="primary" @click="a" color="#ffc200"> + 新增套餐分类</el-button>
    </div>
    <CustomTable :table-data="categoryPage" :columns="columns" :current-page="currentPage" :page-size="pageSize"
      :total="total" :disabled="false" :background="true" @update:pagination="changePagination">
      <!-- 自定义操作列插槽 -->
      <template #actions="{ row }">
        <i class="iconfont icon-icon-edit" title="编辑" @click="handleEdit(row)" />
        <i class="iconfont icon-icon_delete" title="删除" @click="handleDelete(row)" />
      </template>

      <!-- 自定义其他列 -->
      <template #custom-column="{ row }">
        <span>{{ row.customData }}</span>
      </template>
    </CustomTable>
  </div>
</template>
<script setup lang="ts" name="CategoryIndex">
import type { CategoryInter } from '@/types/CategoryInter';
import { ref, onMounted } from 'vue';
import CustomTable from '@/views/common/CustomTable.vue';
import { _categoryPage } from '@/apis/CategoryApi';
import { categoryColumn } from '@/js/TableColumns';


// 定义表格列的元数据
const columns = categoryColumn

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 总记录数
const total = ref(0);
// 分页数据
const categoryPage = ref<CategoryInter[]>([]);

function a() { }

function changePagination(newCurrentPage: number, newPageSize: number) {
  pageSize.value = newPageSize;
  currentPage.value = newCurrentPage;
  getCategoryPage();
}

const handleEdit = (row: CategoryInter) => {

}

const handleDelete = (row: CategoryInter) => {

}

// 获取分页数据
const getCategoryPage = async () => {
  try {
    const { data } = await _categoryPage(currentPage.value, pageSize.value);
    categoryPage.value = data.data.records;
    total.value = data.data.total;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

onMounted(() => {
  // 获取数据
  getCategoryPage();
});
</script>
<style lang="scss" scoped>
.icon-icon-edit{
  margin-right: 10px;
}
</style>
