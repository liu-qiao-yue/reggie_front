<template>
    <el-dialog :title="config.id ? '新增配置明细' : '新增配置'" width="50%" modal append-to-body align-center
        :destroy-on-close="true" :lock-scroll="true" :close-on-press-escape="false" :close-on-click-modal="false"
        v-model="localIsShow" :before-close="closeDialog">
        <div class="dialog-content">
            <el-form :model="configForm" ref="configRef" label-width=100 :rules="configRules">
                <el-form-item label="配置名称:" prop="name">
                    <el-input v-model="configForm.name" placeholder="请输入配置名称"
                        :disabled="configForm.id !== ''"></el-input>
                </el-form-item>
                <el-form-item label="配置类型:" prop="type">
                    <el-select-v2 v-model="configForm.type" placeholder="请选择配置类型" :options="configSelectList"
                        :disabled="configForm.id !== ''"></el-select-v2>
                </el-form-item>
                <el-form-item v-for="(item, index) in configForm.children" :key="configForm.name + '_' + index"
                    :label="'配置明细_' + (index + 1)" :prop="'children.' + index + '.name'" :rules="configRules.childName"
                    :class="{ 'have-icon': !item.id }">
                    <el-input v-model="item.name" placeholder="请输入配置明细" :disabled="item.id !== ''"></el-input>
                    <i class="iconfont icon-icon-add" title="新增"
                        @click="addDetail(configForm.children as Configuration[])" v-if="!item.id"></i>
                    <i class="iconfont icon-icon_delete" title="删除"
                        @click="deleteDetail(configForm.children as Configuration[], index)"
                        v-if="index > 0 && !item.id"></i>
                </el-form-item>

            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="saveConfigForm">确定</el-button>
            </div>
        </template>

    </el-dialog>
</template>
<script setup lang="ts" name="AddConfig">
import type { Configuration } from '@/types/ConfigurationInter';
import type { FormInstance, FormRules } from 'element-plus';
import { ref, watch, reactive, onMounted } from 'vue';
import { configSelectList } from '@/assets/data/selectListData';
import { _saveConfig } from '@/apis/ConfigurationApi';


const props = defineProps<{
    isShow: boolean;
    config: Configuration;
}>()

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddConfig']);

// 表单
const configForm = ref<Configuration>({
    id: '',
    name: '',
    type: '',
    children: [{
        name: '',
        type: '',
        id: ''
    }]
})

const configRef = ref<FormInstance>()
const configRules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入配置名称', trigger: 'blur' },
    ],
    type: [
        { required: true, message: '请选择配置类型', trigger: 'blur' },
    ],
    childName: [
        { required: true, message: '请输入配置明细名称', trigger: 'blur' },
        // 验证当前配置明细名称是否重复
        { validator: (rule: any, value: string, callback: any) => {
            const children = configForm.value.children as Configuration[]
            const index = children.filter((item: Configuration) => item.name === value)
            if (index.length > 1) {
                return callback(new Error('配置明细名称重复'))
            } else {
                return callback()
            }
        } }
    ]
})

watch(() => props.isShow, (newVal) => {
    localIsShow.value = newVal;
});

const closeDialog = () => {
    handleClose(false)
};
const handleClose = (data: boolean) => {
    configRef.value?.resetFields()
    emit('closeAddConfig', data);
};
const saveConfigForm = () => {
    const configParams = JSON.parse(JSON.stringify(configForm.value))
    const addChildren = configParams.children.filter((item: Configuration) => item.id === '')

    if( addChildren.length === 0 ){
        handleClose(false)
        return
    }
    configParams.children = addChildren
    configRef.value?.validate(async (valid) => {
        if (valid) {
            const { data } = await _saveConfig(configParams)
            if (data.code === 1) {
                handleClose(true)
            }
        }
    })
    
};

const addDetail = (children: Configuration[]) => {
    children.push({
        name: '',
        type: '',
        id: ''
    })
}

const deleteDetail = (children: Configuration[], index: number) => {
    children.splice(index, 1)
}


onMounted(() => {
    configForm.value = JSON.parse(JSON.stringify(props.config))
    if (!configForm.value.children) {
        configForm.value.children = []
    }
    configForm.value.children.push({
        name: '',
        type: '',
        id: ''
    })
})
</script>
<style lang="scss" scoped>
.have-icon {
    :deep(.el-form-item__content) {
        .el-input {
            width: calc(100% - 60px);
        }

        .iconfont {
            margin: 0 5px;
        }
    }
}
</style>