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
        <i class="iconfont icon-icon-edit" title="编辑" @click="handleEdit(row)" />
        <i :class="'iconfont ' + (row.status == '1' ? 'icon-lock' : 'icon-unlock')" 
          :title="row.status == '1' ? '禁用' : '启用'" @click="updateStatus(row)" />
        <i class="iconfont icon-icons-" title="重置密码" @click="resetPwd(row)" />
        <!-- <span @click="updateStatus(row)">{{ row.status == '1' ? '禁用' : '启用' }}</span> -->
        <!-- <span @click="resetPwd(row)" v-if="isShowResetPwd">|重置密码</span> -->
        <!-- <span @click="resetPwd(row)">|重置密码</span> -->

      </template>

      <!-- 自定义其他列 -->
      <template #custom-column="{ row }">
        <span>{{ row.customData }}</span>
      </template>
    </CustomTable>
    <AddOrEdit v-if="isShowAddOrEdit" :isShow="isShowAddOrEdit" :title="title" :id="currentId"
      @closeAddRrEdit="closeAddorEdit"></AddOrEdit>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { _employeePage, _updateEmployee } from '@/apis/employeeApi';
import CustomTable from '@/views/common/CustomTable.vue';
import type { EmployeeInter } from '@/types/EmployeeInters';
import AddOrEdit from '@/views/employee/AddOrEdit.vue';
import { ElMessage } from 'element-plus';
import type { ResetPasswordRequest } from '@/types/ResetPasswordForm';
import { _changePassword } from '@/apis/commonApi';
import encodePassword from '@/utils/commonUtils';
import { employeeColumn } from '@/js/TableColumns';


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


const isShowAddOrEdit = ref(false);
const currentId = ref('');
const title = ref('');

const isShowResetPwd = ref(false);

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
  const request: EmployeeInter = {
    id: row.id,
    status: row.status == '1' ? '0' : '1'
  }

  _updateEmployee(request).then(({ data }) => {
    if (data.code == 1) {
      ElMessage.success("修改成功");
      row.status = request.status;
    }
  })
}

const resetPwd = (row: EmployeeInter) => {
  const request: ResetPasswordRequest = {
    id: row.id as string,
    type: 'reset',
    newPassword: encodePassword('123456')
  }

  _changePassword(request).then(({ data }) => {
    if (data.code == 1) {
      ElMessage.success("重置密码成功");
    }
  })
}
</script>

<style scoped>
.tableBar {
  display: flex;
  justify-content: space-between;
}
.icon-lock, .icon-unlock {
    margin: 0 10px;
}
</style>