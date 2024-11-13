<template>
    <el-dialog :title="id ? '编辑套餐' : '新增套餐'" width="60%" modal append-to-body align-center :destroy-on-close="true"
        :lock-scroll="true" :close-on-press-escape="false" :close-on-click-modal="false" v-model="localIsShow"
        :before-close="closeDialog">
        <div class="setmeal-dialog-content">
            <el-form :model="setmealForm" ref="setmealRef" label-width=100 :rules="setmealRules">
                <el-form-item label="套餐名称:" prop="name">
                    <el-input v-model="setmealForm.name" placeholder="请输入套餐名称"></el-input>
                </el-form-item>
                <el-form-item label="套餐分类:" prop="categoryId">
                    <el-select-v2 v-model="setmealForm.categoryId" placeholder="请选择套餐分类"
                        :options="setmealList"></el-select-v2>
                </el-form-item>
                <el-form-item label="套餐价格:" prop="price">
                    <el-input v-model="setmealForm.price" placeholder="请输入套餐名称"></el-input>
                </el-form-item>
                <el-form-item label="套餐菜品:" prop="setmealDishes">
                    <div :class="{ 'setmeal-box': setmealForm.setmealDishes.length > 0 }">
                        <div class="content">
                            <el-button class="addBut" type="primary" @click="test">+添加菜品</el-button>
                            <CustomTable class="dish-table" v-if="setmealForm.setmealDishes.length > 0"
                                :table-data="setmealForm.setmealDishes || []" :columns="setmealAddDishColumn"
                                :isPagination="false" :show-index-column="false">
                                <template #copies-column="{ row }">
                                    <el-input-number v-model="row.copies" size="small" :min="1"
                                        :max="99"></el-input-number>
                                </template>
                                <template #actions="{ index }">
                                    <i class="iconfont icon-icon_delete" title="删除" @click="delDishHandle(index)"></i>
                                </template>
                            </CustomTable>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="套餐图片:" prop="image">
                    <el-upload action="/backend/common/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
                        :on-change="onChange" ref="uploadRef">
                        <el-image :src="getImage(setmealForm.image as string)">
                            <template #error>
                                <div class="image-slot">
                                    <i class="icon-upload avatar-uploader-icon"></i>
                                </div>
                            </template>
                        </el-image>
                    </el-upload>
                </el-form-item>
                <el-form-item label="套餐描述:" prop="description">
                    <el-input v-model="setmealForm.description" type="textarea" placeholder="套餐描述，最长200字"
                        show-word-limit maxlength="200"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>

    </el-dialog>
    <MultiLevelSelect v-if="isShowMultLevelSelect" :isShow="isShowMultLevelSelect"
        @closeMultiLevelSelect="closeMultiLevelSelect" :rootList="dishType" :childrenList="childrenList"
        @getChildrens="getList"></MultiLevelSelect>

</template>
<script setup lang="ts" name="">
import { ref, watch, reactive, onMounted } from 'vue';
import MultiLevelSelect from '@/views/setmeal/MultiLevelSelect.vue';
import type { SetmealDto } from '@/types/SetmealInter';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { getCategoryList, getImage } from '@/utils/commonUtils';
import type { SelectInter } from '@/types/SelectInter';
import { _getCategoryList } from '@/apis/CategoryApi';
import { _queryDishList } from '@/apis/DishApi';
import CustomTable from '../common/CustomTable.vue';
import { setmealAddDishColumn } from '@/js/TableColumns';
import type { SetmealDish, SetmealDishList } from '@/types/SetmealDishInter';
// 引入js-big-decimal
import BigDecimal from 'js-big-decimal';
import { useRouter } from 'vue-router';
import { _getSetmealById, _saveSetmeal } from '@/apis/SetmealApi';



const router = useRouter()

// 弹窗控制
const isShowMultLevelSelect = ref(false)
// 表单数据
const setmealForm = ref<SetmealDto>({
    name: '',
    categoryId: '',
    price: '',
    image: '',
    description: '',
    setmealDishes: []
})

const setmealRef = ref<FormInstance>()
const setmealRules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入套餐名称', trigger: 'blur' },
    ],
    categoryId: [
        { required: true, message: '请选择套餐分类', trigger: 'blur' },
    ],
    price: [
        { required: true, message: '请输入套餐价格', trigger: 'blur' },
        { pattern: /^\d+(\.\d{0,2})?$/, message: '套餐价格格式只能为数字,且最多保留两位小数' },
        { pattern: /^(1000(\.00?)?|[0-9]{1,3}(\.\d{1,2})?)$/, message: '数字不能大于10000', trigger: 'blur' }
    ],
    image: [
        { required: true, message: '请上传套餐图片', trigger: 'change' }
    ]
})

//表单数据
const uploadRef = ref();
const setmealList = ref<SelectInter[]>([])
// 一级分类数据
const dishType = ref([]);
// 二级分类数据
const childrenList = ref<SetmealDishList>([]);

const props = withDefaults(defineProps<{
    isShow: boolean;
    id: string;
}>(), {
    isShow: false,
    id: ''
})

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddOrEditSetmealModal']);



watch(() => props.isShow, (newVal) => {
    localIsShow.value = newVal;
});

const closeDialog = () => {
    emit('closeAddOrEditSetmealModal', false);
};

const save = () => {
    setmealRef.value?.validate(async (valid: boolean) => {
        if (valid) {
            const param: SetmealDto = JSON.parse(JSON.stringify(setmealForm.value))
            param.price = BigDecimal.multiply(param.price, 100)
            param.setmealDishes = param.setmealDishes.map(i => {
                return {
                    dishId: i.id,
                    copies: i.copies
                }
            })
            _saveSetmeal(param).then(({ data }) => {
                if (data.code == 1) {
                    ElMessage.success("保存成功")
                    emit('closeAddOrEditSetmealModal', true);
                }
            })
        }
    })
};

const test = () => {
    isShowMultLevelSelect.value = true
}
const closeMultiLevelSelect = (data: SetmealDishList) => {
    isShowMultLevelSelect.value = false
    if (data) {
        data.forEach((item: SetmealDish) => {
            item.copies = 1
            item.totalPrice = BigDecimal.multiply(item.price, item.copies)
        })
        setmealForm.value.setmealDishes = data
    }
    console.log("@@", setmealForm.value.setmealDishes);

}


const onChange = (file: UploadFile) => {
    if (file) {
        const suffix = file.name.split('.')[1]
        const size = file.size ? file.size / 1024 / 1024 < 2 : true;
        if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
            ElMessage.error('上传图片只支持 png、jpeg、jpg 格式！')
            uploadRef.value?.clearFiles();
            return false
        }
        if (!size) {
            ElMessage.error('上传文件大小不能超过 2MB!')
            return false
        }
        return file
    }
}


const handleAvatarSuccess = (response: { code: number; msg: string; data: object }) => {
    // 拼接down接口预览
    if (response.code === 0 && response.msg === 'NOTLOGIN') {
        router.push("/login")
    } else {
        debugger
        setmealForm.value.image = response.data as unknown as string
    }
}


// 深度监听 setmealDishes 的变化
watch(() => setmealForm.value.setmealDishes, (newVal) => {
    newVal.forEach((dish) => {
        if (dish.price && dish.copies !== undefined) {
            dish.totalPrice = BigDecimal.multiply(dish.price, dish.copies)
        }
    });
}, { deep: true }); // 深度监听，以捕捉数组内部对象的变化



onMounted(async () => {
    // 套餐分类
    setmealList.value = await getCategoryList(2)
    // 套餐菜品 一级
    const { data } = await _getCategoryList(1)
    if (data.code === 1) {
        dishType.value = data.data
        // 套餐菜品 二级
        getList(data.data[0].id, '')
    }

    // 获取套餐表单数据
    if (props.id) {
        const { data } = await _getSetmealById(props.id)
        if (data.code === 1) {
            setmealForm.value = data.data
            setmealForm.value.price = BigDecimal.divide(data.data.price, 100, 2)
            setmealForm.value.setmealDishes.forEach((dish: SetmealDish) => {
                dish.totalPrice = BigDecimal.multiply(dish.price, dish.copies)
            })
        }
    }
})

const getList = (categoryId: string, name: string) => {
    _queryDishList({ categoryId, name }).then(({ data }) => {
        if (data.code === 1) {
            if (data.data.length == 0) {
                childrenList.value = []
                return
            }
            childrenList.value = data.data
        } else {
            ElMessage.error(data.msg)
        }
    })
}
const delDishHandle = (index: number) => {
    setmealForm.value.setmealDishes.splice(index, 1)
}


const res: SetmealDto = {
    "name": "套餐名称",
    "categoryId": "1847227690544128002",
    "price": '10000',
    "code": "",
    "image": "1b7b725d-38df-491d-8ea7-adc688e6fbd6.jpg",
    "description": "套餐描述",
    "status": 1,
    "setmealDishes": [
        {
            "copies": 1,
            "dishId": "1397851668262465537",
            "name": "口味蛇",
            "price": '16800'
        },
        {
            "copies": 1,
            "dishId": "1397854865672679425",
            "name": "鱼香炒鸡蛋",
            "price": '2000'
        }
    ]
}
</script>
<style lang="scss" scoped>
.setmeal-dialog-content {
    .setmeal-box {
        width: 100%;

        .content {
            background: #F8F8FF;
            padding: 20px;
            border: solid 1px #DCDCDC;
            border-radius: 3px;

            .addBut {
                margin-bottom: 20px;
            }

            .dish-table {
                .el-input-number.el-input-number--small {
                    margin: 5px;
                }
            }
        }
    }
}
</style>