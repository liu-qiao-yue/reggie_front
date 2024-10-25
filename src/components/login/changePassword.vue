<template>
  <div class="reset-password">
      <el-form label-width=100 :model="resetPasswordForm" ref="resetFormRef" :rules="rules">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="resetPasswordForm.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="resetPasswordForm.newPassword" type="password" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="resetPasswordForm.confirmPassword" type="password" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>

      <div class="reset-password-btn">
        <el-button @click="confirmChange">确定</el-button>
      </div>
    </div>
</template>
<script setup lang="ts" name="changePassword">
import { _loginOut } from '@/apis/commonApi';
import usePassword from '@/hooks/usePassword';
// import { useRouterStore } from '@/store/userouterStore';
import { useRouter, useRoute } from 'vue-router';


const router = useRouter();
const route = useRoute();

const {
  resetFormRef,
  resetPasswordForm,
  rules,
  validateAndSubmit
} = usePassword()

console.log(route.params.id);

const confirmChange = () =>{
    validateAndSubmit(route.params.id as string, 'change').then(async(res) => {
    if(res){
        const { data } = await _loginOut()
        if (String(data.code) === '1') {
            localStorage.clear()
            router.push('/login')
        }
    }
  })
}

// import { ElMessage } from 'element-plus';
//     import { useRouterStore } from '@/store/userouterStore';

//     const routerStore = useRouterStore();
//     function changePassword(){
//         ElMessage.success('修改完成');
//         setTimeout(function () {
//             routerStore.goTo("/login")
//         }, 3000);
//     }
</script>
<style lang="scss" scoped>

</style>
