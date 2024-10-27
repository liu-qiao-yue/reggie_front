<template>
    <el-dialog width="400px" :before-close="handleClose" v-model="localIsShow" :lock-scroll="true" ref="microDialog"
        modal-append-to-body :close-on-press-escape="false" :close-on-click-modal="false" class="confirm-modal-container"
        append-to-body modal>
        <template #header>
            <div class="dialog-title">
                <!-- <i class="el-icon-warning vertical-middle m-r-10"></i> -->
                <el-icon class="el-icon-warning vertical-middle m-r-10"><Warning/></el-icon>
                <span>
                    {{ text[confirmType].title }}
                </span>
            </div>
        </template>

        <div class="model-content">{{ text[confirmType].content }}</div>

        <template #footer>
            <div class="text-right opt-footer">
                <el-button @click="closeDialog(false)">{{ text[confirmType].cancelButtonText }}</el-button>
                <el-button type="primary" color="#ffc200" class="vo-ui" @click="closeDialog(true)">{{
                    text[confirmType].confirmButtonText }}</el-button>
            </div>
        </template>
    </el-dialog>

</template>
<script setup lang="ts" name="ConfirmModal">
import { ref, watch } from 'vue';
import { text } from '@/js/confirmText'
import { Warning } from '@element-plus/icons-vue'


const props = withDefaults(defineProps<
    {
        isShow: boolean,
        confirmType: string

    }>(),
    {
        isShow: () => false,
        confirmType: () => ''
    })



const emit = defineEmits(['closeConfirmModal']);
// 定义一个本地的响应式变量 localIsShow，并初始化为 props.isShow 的值
const localIsShow = ref(props.isShow);

// 监听 props.isShow 的变化，当其变化时更新 localIsShow
watch(() => props.isShow, (newVal) => {
    localIsShow.value = newVal;
});

// 定义关闭对话框的函数，通过 emit 触发 update:isShow 事件，将 isShow 设置为 false
const closeDialog = (flag: boolean | null) => {
    emit('closeConfirmModal', flag);
    localIsShow.value = false;
};

// 定义确认对话框的函数，通过 emit 触发 update:isShow 事件，将 isShow 设置为 false
const handleClose = () => {
    closeDialog(false)
};

</script>
<style lang="scss" scoped>

</style>
