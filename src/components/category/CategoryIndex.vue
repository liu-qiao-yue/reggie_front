<template>
  <div class="container">
    <div class="tableBar m-b-20">
      <el-button type="primary" @click="addType(1)" class="continue"> + 新增菜品分类</el-button>
      <el-button type="primary" @click="addType(2)"> + 新增套餐分类</el-button>
    </div>
    <CustomTable :table-data="categoryPage" :columns="columns" :current-page="currentPage" :page-size="pageSize"
      :total="total" :isPagination="false" :background="true" @update:pagination="changePagination"
      :show-index-column="true">
      <!-- 自定义操作列插槽 -->
      <template #actions="{ row }">
        <i class="iconfont icon-icon-edit m-r-10" title="编辑" @click="handleEdit(row)"></i>
        <i class="iconfont icon-icon_delete" title="删除" @click="handleDelete(row)"></i>
      </template>
    </CustomTable>

    <AddOrEditCategory v-if="isShowAddOrEdit" :is-show="isShowAddOrEdit" :title="title" @closeAddOrEdit="closeAddOrEdit"
      :currentItem="currentItem" :type="type"></AddOrEditCategory>

    <ConfirmModal :isShow="isShowConfirmModal" :confirmType="confirmType"
      @closeConfirmModal="closeConfirmModal"></ConfirmModal>
  </div>
</template>
<script setup lang="ts" name="CategoryIndex">
import type { Category, CategoryForm } from '@/types/CategoryInter';
import { ref, onMounted } from 'vue';
import CustomTable from '@/views/common/CustomTable.vue';
import { _categoryPage, _deleteCategory } from '@/apis/CategoryApi';
import { categoryColumn } from '@/js/TableColumns';
import AddOrEditCategory from '@/views/category/AddOrEditCategory.vue';
import ConfirmModal from '@/views/common/ConfirmModal.vue';

// 定义表格列的元数据
const columns = categoryColumn

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
// 总记录数
const total = ref(0);
// 分页数据
const categoryPage = ref<Category[]>([]);

// edit & add type params
const title = ref('');
const isShowAddOrEdit = ref(false);
const currentItem = ref<CategoryForm>({
  id: '',
  name: '',
  sort: '',
  type: ''
});
const type = ref();

// 确认弹窗相关
const isShowConfirmModal = ref(false);
const confirmType = ref('');

function addType(_param: number) {
  type.value = _param;
  title.value = 'add'
  isShowAddOrEdit.value = true;
}

function changePagination(newCurrentPage: number, newPageSize: number) {
  pageSize.value = newPageSize;
  currentPage.value = newCurrentPage;
  getCategoryPage();
}

const handleEdit = (row: Category) => {
  currentItem.value = JSON.parse(JSON.stringify(row));
  isShowAddOrEdit.value = true;
  type.value = row.type
  title.value = 'edit'
}

const handleDelete = (row: Category) => {
  confirmType.value = 'delete'
  isShowConfirmModal.value = true;
  currentItem.value.id = row.id;
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

const closeAddOrEdit = (res: boolean) => {
  isShowAddOrEdit.value = false;
  currentItem.value = {} as CategoryForm;
  if (res) getCategoryPage();
}

const closeConfirmModal = (res: boolean) => {
  isShowConfirmModal.value = false;
  if (res) {
    _deleteCategory(currentItem.value.id).then(({data}) => {
      if (data.code == '1') {
        getCategoryPage();
        currentItem.value.id = '';
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
