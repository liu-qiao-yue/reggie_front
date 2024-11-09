<template>
  <div class="flavor-config-container">
    <div class="tableBar m-b-20 flex-between">
      <div class="input-group">
        <el-input v-model="param.name" style="width: 240px" placeholder="配置名称" clearable
        @keyup.enter="getFlavorConfigList" @clear="getFlavorConfigList" />

      <el-select-v2 v-model="param.type" clearable placeholder="请选择配置类型" 
      :options="configSelectList" @change="getFlavorConfigList"></el-select-v2>
      </div>
      <el-button type="primary" @click="addConfig(null)">+ 添加</el-button>
    </div>
    <CustomTable :tableData="flavorConfigList" :columns="columns" :isDisabledPagination="false"
      :show-index-column="true">
      <template #children-column="{ row }">
        <div class="tag-list">
          <el-tag v-for="item in row.children" :key="item.id" :disable-transitions="false">
            {{ item.name }}
          </el-tag>
        </div>
      </template>

      <template #actions="{ row }">
        <el-link type="primary" :underline="false" @click="addConfig(row)">添加明细</el-link>
        <!-- <el-button type="primary" </el-button> -->
      </template>
    </CustomTable>
  </div>

  <AddConfig v-if="isShowAddConfig" :is-show="isShowAddConfig" :config="currentConfig" @closeAddConfig="closeAddConfig"></AddConfig>
</template>
<script setup lang="ts" name="FlavorConfig">
import { onMounted, ref } from 'vue';
import CustomTable from '@/views/common/CustomTable.vue';
import { flavorColumn } from '@/js/TableColumns';
import { _configTreeList } from '@/apis/ConfigurationApi';
import type { Configuration } from '@/types/ConfigurationInter';
import { configSelectList } from '@/assets/data/selectListData';
import AddConfig from '@/views/config/AddConfig.vue';

const param = ref<Configuration>({
  id: '',
  name: '',
  type: '',
})
const columns = flavorColumn

// 口味数据集合
const flavorConfigList = ref<Configuration[]>([])

// AddConfig 弹窗
const isShowAddConfig = ref(false)
const currentConfig = ref<Configuration>({
  id: '',
  name: '',
  type: '',
  parentId: '',
  children: []
})

const getFlavorConfigList = () => {
  _configTreeList(param.value.name, param.value.type).then(({ data }) => {
    if (data.code === 1) {
      flavorConfigList.value = data.data;
    }
  })
}

const addConfig = (row: Configuration | null) => {
  isShowAddConfig.value = true
  if(row){
    currentConfig.value = row
  }
}

const closeAddConfig = (data: boolean) => {
  isShowAddConfig.value = false
  currentConfig.value = {id: '', name: '', type: '', parentId: '', children: []}
  if (data) {
    getFlavorConfigList()
  }
}

onMounted(() => {
  getFlavorConfigList()
})
</script>
<style lang="scss" scoped>
.flavor-config-container {
  .input-group {
    :deep(.el-select) {
      width: 240px !important;
      margin-left: 10PX;
    }
  }

  .tag-list {

    .button-new-tag {
      height: 24px !important;

    }
  }
}
</style>