<template>
    <el-dialog width="70%" modal append-to-body align-center v-model="localIsShow" :before-close="closeDialog"
        class="multi-level-select-dialog" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
            <div class="dialog-header flex-between">
                <span :id="titleId" :class="titleClass">添加菜品</span>
                <div class="flex-between">
                    <el-input v-model="seachKey" placeholder="请输入搜索内容" clearable class="search"
                        @keyup.enter="getList('', seachKey)" @clear="getList('', seachKey)" />
                    <el-icon @click="close">
                        <Close />
                    </el-icon>
                </div>
            </div>
        </template>
        <div class="dialog-content">
            <!-- 一级和二级... -->
            <div class="data-list">
                <!-- 一级数据 -->
                <el-scrollbar max-height="400px" class="tabBut" v-show="seachKey.trim() == ''">
                    <el-text line-clamp="1" v-for="(item, index) in rootList" :key="'data' + index + '_' + item.id"
                        :class="{ act: index == keyInd }" @click="checkTypeHandle(index, item.id)">
                        {{ item.name }}
                    </el-text>
                </el-scrollbar>
                <!-- 二级数据 -->
                <el-scrollbar max-height="400px" class="tabList">
                    <div class="table">
                        <div v-if="childrenList.length == 0" style="padding-left:10px">
                            暂无菜品!
                        </div>
                        <el-checkbox-group v-else v-model="selectedValues">
                            <div v-for="(item, index) in childrenList" :key="'childrenList' + index + '_' + item.value"
                                class="items">
                                <el-checkbox :key="index" :value="item">
                                    <div class="item">
                                        <span style="flex: 3;text-align: left">{{ item.name }}</span>
                                        <span>{{ item?.status == '0' ? '停售' : '在售' }}</span>
                                        <span>{{ Number(item.price) / 100 }}</span>
                                    </div>
                                </el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </el-scrollbar>
            </div>
            <!-- 选中数据-->
            <el-scrollbar max-height="400px" class="selected-data">
                <div class="tit">
                    已选菜品({{ selectedValues.length }})
                </div>
                <div class="items">
                    <el-row v-for="(item, index) in selectedValues" :key="'selected' + index + '_' + item.id"
                        class="item">
                        <el-col :span="8">{{ item.name }}</el-col>
                        <el-col :span="8" class="price">￥ {{ Number(item.price) / 100 }} </el-col>
                        <el-col :span="8" class="del" @click="delCheck(index)">
                            <img src="@/assets/images/icons/btn_clean@2x.png"
                                style="width: auto; height: 40px; border:none;" alt="">
                        </el-col>
                    </el-row>
                </div>
            </el-scrollbar>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>

    </el-dialog>
</template>
<script setup lang="ts" name="MultiLevelSelect">
import {  ref, watch } from 'vue';
import { Close } from '@element-plus/icons-vue'
import type { SetmealDishList } from '@/types/SetmealDishInter';

const props = withDefaults(defineProps<{
    isShow: boolean;
    checked?: [];
    rootList: [];
    childrenList: SetmealDishList
}>(), {
    checked: () => []
})

// 本地dialog显示控制
const localIsShow = ref(props.isShow);
// el-checkbox-group 选择值
const selectedValues = ref<SetmealDishList>([]);
// 搜索关键字
const seachKey = ref('');
// 一级选中样式标签
const keyInd = ref(0);
// // 一级分类数据
// const rootList = ref([]);
// // 二级分类数据
// const childrenList = ref([]);

const emit = defineEmits(['closeMultiLevelSelect', 'getChildrens']);



watch(() => props.isShow, (newVal) => {
    localIsShow.value = newVal;
});

const closeDialog = () => {
    emit('closeMultiLevelSelect', {});
};

const save = () => {
    emit('closeMultiLevelSelect', JSON.parse(JSON.stringify(selectedValues.value)));
};


const checkTypeHandle = (index: number, id: string) => {
    keyInd.value = index
    getList(id, '')
}

/**
 * 根据一级分类id获取二级菜品信息
 * @param id 
 */
const getList = (categoryId: string, name: string) => {
   emit('getChildrens',  categoryId, name )
}


const delCheck = (ind: number) => {
    selectedValues.value.splice(ind, 1)
}
// /**
//  * 获取一级菜品分类
//  */
// const getDishTypeList = async () => {
//     const { data } = await _getCategoryList(1)
//     if (data.code === 1) {
//         rootList.value = data.data
//         getList(data.data[0].id, '')
//     }
// }
// onMounted(() => {
//     // 获取一级
//     getDishTypeList()

// })
</script>
<style lang="scss" scoped>
.multi-level-select-dialog {
    .dialog-header {
        height: 42px;

    }

    :deep(.el-dialog__body) {
        padding: 0 !important;
    }

    .search {
        width: 240px;
    }

    .dialog-content {
        padding: 10px 0;
        display: flex;
        line-height: 40px;
        align-items: normal;
    }

    .dialog-content .data-list {
        display: flex;
        border-right: solid 2px #E4E7ED;
        width: 60%;
        // padding: 15px;
    }

    .dialog-content .data-list .tabBut {
        min-width: 110px;
        // margin: 0 20px;
    }

    .dialog-content .data-list .tabBut span {
        display: block;
        text-align: center;
        border-right: solid 2px #f4f4f4;
        cursor: pointer;
        padding: 0 15px;
    }

    .dialog-content .data-list .act {
        border-color: #FFC200 !important;
        color: #FFC200 !important;
    }

    .dialog-content .data-list .tabList {
        flex: 1;
        padding: 15px;
    }

    .dialog-content .data-list .tabList .table {
        border: solid 1px #f4f4f4;
        border-bottom: solid 1px #f4f4f4;
    }

    .dialog-content .data-list .tabList .table .items {
        border-bottom: solid 1px #f4f4f4;
        padding: 0 10px;
        display: flex;
    }

    .dialog-content .data-list .tabList .table .items .el-checkbox,
    .dialog-content .data-list .tabList .table .items :deep(.el-checkbox__label) {
        width: 100%;
    }

    .dialog-content .data-list .tabList .table .items .item {
        display: flex;
        padding-right: 20px;
    }

    .dialog-content .data-list .tabList .table .items .item span {
        display: inline-block;
        text-align: center;
        flex: 1;
    }

    .dialog-content .selected-data {
        width: 40%;
        padding: 0 15px;
    }

    .dialog-content .selected-data .item {
        box-shadow: 0px 1px 4px 3px rgba(0, 0, 0, 0.03);
        display: flex;
        text-align: center;
        padding: 0 10px;
        margin-bottom: 20px;
        border-radius: 6px;
        color: #818693;
    }

    .dialog-content .selected-data .item .el-col:first-child {
        text-align: left;
        color: #20232A;
    }

    .dialog-content .selected-data .item .price {
        display: inline-block;
        flex: 1;
    }

    .dialog-content .selected-data .item .del {
        cursor: pointer;
    }

    .dialog-content .selected-data .item .del img {
        position: relative;
        top: 5px;
        width: 20px;
    }

    .dialog-content .el-checkbox__label {
        width: 100%;
    }
}
</style>