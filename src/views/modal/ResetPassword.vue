<template>
  <el-dialog title="修改密码" width="500" modal append-to-body align-center :destroy-on-close="true" :lock-scroll="true"
    :close-on-press-escape="false" :close-on-click-modal="false" v-model="localIsShow" :before-close="closeDialog">

    <div class="reset-password">
      <el-form label-width=100 :model="resetPasswordForm" ref="resetFormRef" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="resetPasswordForm.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="resetPasswordForm.password" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="resetPasswordForm.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="confirmChange">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts" name="resetPassword">
import { ref, watch } from 'vue';
import usePassword from '@/hooks/usePassword';

const {
  resetFormRef,
  resetPasswordForm,
  rules,
  validateAndSubmit
} = usePassword()

// 定义 props，接收父组件传递的 isShow 值
const props = defineProps<{
  isShow: boolean;
}>();

// 定义 emit，用于触发自定义事件

const emit = defineEmits(['closeResetPwd']);
// 定义一个本地的响应式变量 localIsShow，并初始化为 props.isShow 的值
const localIsShow = ref(props.isShow);

// 监听 props.isShow 的变化，当其变化时更新 localIsShow
watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});

// 定义关闭对话框的函数，通过 emit 触发 update:isShow 事件，将 isShow 设置为 false
const closeDialog = () => {
  emit('closeResetPwd', false);
};

// 定义确认对话框的函数，通过 emit 触发 update:isShow 事件，将 isShow 设置为 false
const confirmChange = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
  validateAndSubmit(userInfo.id, 'change').then((res) => {
    if(res){
      emit('closeResetPwd', true);
    }
  })
};


</script>
<style lang="scss" scoped></style>
