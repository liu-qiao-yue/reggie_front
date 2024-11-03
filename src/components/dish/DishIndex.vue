<template>
  <div class="dish-index-container">
    <div class="container-header m-b-20">
      <div class="input-container">
        <el-input v-model="name" placeholder="请输入菜品名称" clearable @keyup.enter="getDishPage" @clear="getDishPage" ></el-input>
      </div>
      <div class="btn-container">
        <el-link type="primary" class="pipe" :underline="false" @click="deleteHandle('0', null)">批量删除</el-link>
        <el-link type="primary" class="pipe" :underline="false" @click="statusHandle('1', null)">批量启售</el-link>
        <el-link type="primary" class="" :underline="false" @click="statusHandle('0', null)">批量停售</el-link>
        <el-button type="primary" @click="addOrEditDish">+新建菜品</el-button>
      </div>
    </div>
    <div class="container-body">
      <CustomTable :table-data="dishPage" :columns="columns" :current-page="currentPage" :page-size="pageSize"
        :total="total" @update:pagination="changePagination" @selection-change="selectionChange"
        :showCheckbox="true" ref="customTableRef">
        <!-- 图片卡槽 -->
        <template #image-column="{ row }">
            <el-image style="width: auto; height: 40px; border:none;cursor: pointer;" :src="getImage(row.image)"
            :preview-src-list="[`/backend/common/access?name=${row.image}`]" :preview-teleported="true">
            <template #error>
              <div class="image-slot">
                <img src="@/assets/images/noimg.png" style="width: auto; height: 40px; border:none;">
              </div>
            </template>
          </el-image>          
        </template>
        <!-- 自定义操作列插槽 -->
        <template #actions="{ row }">
          <div class="table-btn">
            <el-tag type="primary" class="m-r-10" round @click="addOrEditDish(row)">编辑</el-tag>
            <el-tag type="primary" class="m-r-10" round @click="statusHandle('2', row.id)">{{  row.status === 0 ? '启售' : '停售' }}</el-tag>
            <el-tag type="primary" round @click="deleteHandle('1', row.id)">删除</el-tag>
          </div>
        </template>
      </CustomTable>
    </div>

    <ConfirmModal :isShow="isShowConfirmModal" :confirmType="confirmType"
      @closeConfirmModal="closeConfirmModal"></ConfirmModal>

    <AddOrEditDishModal v-if="isShowAddOrEditDishModal" :isShow="isShowAddOrEditDishModal" :title="title"
      @closeAddOrEditDishModal="closeAddOrEditDishModal"></AddOrEditDishModal>
  </div>
</template>
<script setup lang="ts" name="">
import { onMounted, ref } from 'vue';
import CustomTable from '@/views/common/CustomTable.vue';
import { foodColumn } from '@/js/TableColumns';
import type { DishDto } from '@/types/DishInter';
import { _dishPage, _dishStatusByStatus } from '@/apis/DishApi';
import { ElMessage } from 'element-plus';
import ConfirmModal from '@/views/common/ConfirmModal.vue';
import { _deleteCategory } from '@/apis/CategoryApi';
import type { TableRow } from '@/types/TableInter';
import { getImage } from '@/utils/commonUtils';
import AddOrEditDishModal from '@/views/dish/AddOrEditDishModal.vue';


// 定义表格列的元数据
const columns = foodColumn
// 自定义表格实例
const customTableRef = ref()
// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
// 总记录数
const total = ref(0);
// 分页数据
const dishPage = ref<DishDto[]>([]);

const name = ref('')
const checkList = ref<DishDto[]>([])

// 确认弹窗相关
const isShowConfirmModal = ref(false);
const confirmType = ref('');
const currentIds = ref<string>('')
const currentStats = ref<string>('')


// 编辑 & 新增 弹窗相关
const isShowAddOrEditDishModal = ref(false);
const title = ref('')

function changePagination(newCurrentPage: number, newPageSize: number) {
  pageSize.value = newPageSize;
  currentPage.value = newCurrentPage;
  // 请求
}

const selectionChange = (selection: TableRow[]) => {
  checkList.value = selection as unknown as DishDto[];  
}


const getDishPage = () => {
  _dishPage(currentPage.value, pageSize.value, name.value).then(res =>{
    const { data } = res;
    if(data.code === 1){
      dishPage.value = data.data.records;
      total.value = data.data.total;      
    }
  })
}

/**
 * 删除 & 批量删除
 * @param type 0批量删除 1删除
 * @param id 
 */
const deleteHandle = (type:string, id: string|null) => {
  if(type === '0' && checkList.value.length === 0)
    return ElMessage.error("请选择删除对象")

  currentIds.value = id?id:checkList.value.map(data=> {return data.id}).join(",")
  confirmType.value = 'delete'
  isShowConfirmModal.value = true
}

const statusHandle = (type: string, row: DishDto|null) => {
  if((type === '1' || type === '0') && checkList.value.length === 0){
    return ElMessage.error("批量操作，请先勾选操作菜品")
  }
  currentIds.value =  row ? row.id : checkList.value.map(data=> {return data.id}).join(",")
  currentStats.value = row ? (row.status ? '0' : '1'): type
  confirmType.value = 'changeStatus'
  isShowConfirmModal.value = true

}

const deleteDish = () => {
  _deleteCategory(currentIds.value).then(({data}) =>{
    if(data.code === 1){
      ElMessage.success('删除成功')
      currentIds.value = ''
      clearable()
      getDishPage();
    }
  })
}

const updatSatus = () =>{
  _dishStatusByStatus(currentIds.value, currentStats.value).then( ({data}) => {
    if(data.code === 1){
      ElMessage.success("菜品状态已经更改成功")
      currentIds.value = ''
      currentStats.value = ''
      clearable()
      getDishPage();
    }
  })
}

const closeConfirmModal = (res: boolean) => {
  isShowConfirmModal.value = false;
  if (res) {
    if(confirmType.value === 'delete'){
      deleteDish()
    }else if(confirmType.value === 'changeStatus'){
      updatSatus()
    }
  }
}

const clearable = () =>{
  if(customTableRef.value && customTableRef.value.clearSelectio){
    customTableRef.value.clearSelection()
  }
}


const closeAddOrEditDishModal = (res:boolean) => {
  isShowAddOrEditDishModal.value = false;
  title.value = ''
  if(res){
    getDishPage();
  }
}


const addOrEditDish = (id: string) => {
  title.value = id ? '编辑菜品' : '新增菜品'
  isShowAddOrEditDishModal.value = true
}
onMounted(() => {
  // 获取数据
  getDishPage();
});
</script>
<style lang="scss" scoped>
.dish-index-container {
  .container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-link.el-link--primary {
      padding: 0 20px;
    }

    .el-link:nth-child(1),
    .el-link:nth-child(3) {
      color: #f56c6c;
    }
  }

  .el-tag.el-tag--primary {
    cursor: pointer;
    &:nth-child(3){
      color: #f56c6c;
      background-color: rgb(254, 240.3, 240.3);
      border-color: rgb(253, 225.6, 225.6);
    }
  }
}
</style>