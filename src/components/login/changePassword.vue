<template>
  <div class="change-password-container">
    <el-page-header :icon="ArrowLeft" @back="onBack">
      <template #content>
        <span class="text-large font-600 mr-3"> {{ route.query.name }} </span>
      </template>
    </el-page-header>
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

        <div class="reset-password-btn">
          <el-button type="primary" @click="resetForm">重置</el-button>
          <el-button type="primary" @click="confirmChange">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts" name="changePassword">
import { _loginOut } from '@/apis/commonApi';
import usePassword from '@/hooks/usePassword';
import { ElMessage } from 'element-plus';
// import { useRouterStore } from '@/store/userouterStore';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'



const router = useRouter();
const route = useRoute();

const {
  resetFormRef,
  resetPasswordForm,
  rules,
  validateAndSubmit,
  resetForm
} = usePassword()

console.log(route.query);

const confirmChange = () => {
  validateAndSubmit(route.query.id as string, 'change').then(async (res) => {
    if (res) {
      const { data } = await _loginOut()
      if (String(data.code) === '1') {
        ElMessage.success('修改完成');
        setTimeout(function () {
          router.push("/login")
          localStorage.clear()
        }, 2000);
      }
    }
  })
}



const onBack = () => {
  router.push("/login")
}
</script>
<style lang="scss" scoped>
.change-password-container {
  min-height: 474.38px;
  padding: 10px;

  .el-page-header>.el-page-header__header {
    height: 30px;
  }

  .el-page-header__content{
    font-size: 14px !important;
    font-weight: 500 !important;
  }
  .reset-password {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;

    .el-form {
      width: 80%;
    }

    .reset-password-btn {
      text-align: center;
    }
  }
}
</style>
