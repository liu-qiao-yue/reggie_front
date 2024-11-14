<template>
  <div class="order-container">
    <div class="input-container m-b-20">
      <el-input v-model="param.name" placeholder="请输入订单号" clearable @keyup.enter="getOrdersPage"
        @clear="getOrdersPage"></el-input>
        <el-date-picker v-model="orderTime" type="datetimerange" start-placeholder="开始时间"
      end-placeholder="结束时间" :default-time="defaultTime" value-format="YYYY-MM-DD HH:mm:ss" />
      <el-button type="primary" @click="getOrdersPage">查询</el-button>
    </div>
    <div class="container-body">
      <CustomTable :table-data="orderPageList" :columns="ordersColumn" :current-page="param.page"
        :page-size="param.pageSize" :total="total" @update:pagination="changePagination">
        <template #actions="{ row }">
          <i class="iconfont icon-icon-look" title="查看" @click="handleLook(row)"></i>
        </template>
      </CustomTable>
    </div>

    <lookOrderModal :is-show="isShowLook" :data="currentItem as OrdersDto" @close-look-dialog="closeLookDialog"></lookOrderModal>
  </div>
</template>
<script setup lang="ts" name="OrderIndex">
import CustomTable from '@/views/common/CustomTable.vue';
import { ordersColumn } from '@/js/TableColumns';
import { onMounted, ref, watch } from 'vue';
import type { OrdersDto } from '@/types/OrdersInter';
import { _getOrdersPage } from '@/apis/OrdersApi';
import lookOrderModal from '@/views/orders/lookOrderModal.vue';

const orderPageList = ref<OrdersDto[]>([]);
// 总记录数
const total = ref(0);
// 查询参数
const param = ref({
  page: 1,
  pageSize: 10,
  name: '',
  beginTime: '',
  endTime: ''
})
const orderTime = ref('')
const defaultTime: [Date, Date] = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
]

const isShowLook = ref(false)
const currentItem = ref<OrdersDto>()

const handleLook = (row: OrdersDto) => {
  currentItem.value = row
  isShowLook.value = true
}


const getOrdersPage = async () => {

  const { data } = await _getOrdersPage(param.value.page, param.value.pageSize, param.value.name, param.value.beginTime, param.value.endTime)
  if (data.code === 1) {
    orderPageList.value = data.data.records
    total.value = data.data.total
  }
}

function changePagination(newCurrentPage: number, newPageSize: number) {
  param.value.pageSize = newPageSize;
  param.value.page = newCurrentPage;
  // 请求
  getOrdersPage()
}
const closeLookDialog = () => {
  isShowLook.value = false
}
onMounted(() => {
  getOrdersPage()
})

watch(orderTime, (val) => {
  console.log("^^",val);
  
  if (val && val.length >= 2) {
    param.value.beginTime = val[0]
    param.value.endTime = val[1]
  } else {
    param.value.beginTime = ''
    param.value.endTime = ''
  }
})
</script>
<style lang="scss" scoped>
.order-container {
  .input-container {
    .el-input {
      width: 240px;
    }

    :deep(.el-date-editor) {
      height: 42px;
      margin: 0 10px;
    }
  }
}
</style>
