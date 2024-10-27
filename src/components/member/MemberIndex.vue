<template>
  <div class="container">
    <div class="tableBar m-b-20">
      <el-input v-model="name" style="width: 240px" placeholder="请输入员工姓名" clearable @keyup.enter="fetchData"
        @clear="fetchData" />
      <el-button type="primary" @click="handleEdit" color="#ffc200">+ 添加员工</el-button>
    </div>
    <CustomTable :table-data="pagedData" :columns="columns" :current-page="currentPage" :page-size="pageSize"
      :total="total" :disabled="false" :background="true" @update:pagination="changePagination">
      <!-- 自定义操作列插槽 -->
      <template #actions="{ row }">
        <i class="iconfont icon-icon-edit" title="编辑" @click="handleEdit(row)"></i>
        <i :class="'iconfont ' + (row.status == '1' ? 'icon-lock' : 'icon-unlock')"
          :title="row.status == '1' ? '禁用' : '启用'" @click="updateStatus(row)"></i>
        <i class="iconfont icon-icons-" title="重置密码" @click="resetPwd(row)"></i>
      </template>

      <!-- 自定义其他列 -->
      <template #custom-column="{ row }">
        <span>{{ row.customData }}</span>
      </template>
    </CustomTable>
    <AddOrEdit v-if="isShowAddOrEdit" :isShow="isShowAddOrEdit" :title="title" :id="currentId"
      @closeAddRrEdit="closeAddorEdit"></AddOrEdit>

    <ConfirmModal :isShow="isShowConfirmModal" :confirmType="confirmType" 
      @closeConfirmModal="closeConfirmModal"></ConfirmModal>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue';
import { _employeePage, _updateEmployee } from '@/apis/employeeApi';
import CustomTable from '@/views/common/CustomTable.vue';
import type { EmployeeInter } from '@/types/EmployeeInters';
import AddOrEdit from '@/views/employee/AddOrEdit.vue';
import { ElMessage } from 'element-plus';
import type { ResetPasswordRequest } from '@/types/ResetPasswordForm';
import { _changePassword } from '@/apis/commonApi';
import encodePassword from '@/utils/commonUtils';
import { employeeColumn } from '@/js/TableColumns';
import ConfirmModal from '@/views/common/ConfirmModal.vue';


// 定义表格列的元数据
const columns = employeeColumn;

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);
const name = ref('');
// 总记录数
const total = ref(0);
// 分页数据
const pagedData = ref<EmployeeInter[]>([]);

// 添加或编辑弹窗
const isShowAddOrEdit = ref(false);
const currentId = ref('');
const title = ref('');

// 是否显示重置密码标签
const isShowResetPwd = ref(false);

// confirmModal 弹窗
const isShowConfirmModal = ref(false)
const confirmType = ref('')
let currentItem = reactive<EmployeeInter>({})
// 获取分页数据
const fetchData = async () => {
  try {
    console.log("我发请求了");

    const { data } = await _employeePage(currentPage.value, pageSize.value, name.value);
    pagedData.value = data.data.records;
    total.value = data.data.total;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};
// 初始化加载数据
onMounted(() => {
  fetchData()

  const user = localStorage.getItem("userInfo") as EmployeeInter
  if (user && user.username == 'admin') isShowResetPwd.value = true
});

function changePagination(newCurrentPage: number, newPageSize: number) {
  pageSize.value = newPageSize;
  currentPage.value = newCurrentPage;
  fetchData();
}


// 处理编辑操作
function handleEdit(row: EmployeeInter) {
  isShowAddOrEdit.value = true;
  if (row) {
    title.value = 'edit';
    currentId.value = row.id as string;
  } else {
    title.value = 'add';
    currentId.value = ''
  }
}
function closeAddorEdit(res: boolean) {
  isShowAddOrEdit.value = false;
  title.value = '';
  currentId.value = '';
  debugger
  if (res) {
    fetchData();
  }
}

const updateStatus = (row: EmployeeInter) => {
  currentItem = JSON.parse(JSON.stringify(row))
  // 0 已禁用
  confirmType.value = row.status == '0' ? 'unlock' : 'lock'
  isShowConfirmModal.value = true
}

const resetPwd = (row: EmployeeInter) => {
  currentItem = JSON.parse(JSON.stringify(row))
  // 1. 锁定 需要启用
  confirmType.value = 'resetPwd'
  isShowConfirmModal.value = true
}

const closeConfirmModal = (data: boolean) => {
  isShowConfirmModal.value = false
  if(!data)return;

  if(confirmType.value == 'unlock' || confirmType.value == 'lock'){
    const request: EmployeeInter = {
    id: currentItem.id,
    status: currentItem.status == '1' ? '0' : '1'
  }

  _updateEmployee(request).then(({ data }) => {
    if (data.code == 1) {
      ElMessage.success("修改成功");
      fetchData()
    }
  })
    return
  }

  if(confirmType.value == 'resetPwd'){
    const request: ResetPasswordRequest = {
    id: currentItem.id as string,
    type: 'reset',
    newPassword: encodePassword('123456')
  }

  _changePassword(request).then(({ data }) => {
    if (data.code == 1) {
      ElMessage.success("重置密码成功");
    }
  })
    return
  }
}
</script>

<style scoped>
.tableBar {
  display: flex;
  justify-content: space-between;
}

.icon-lock,
.icon-unlock {
  margin: 0 10px;
}
</style>