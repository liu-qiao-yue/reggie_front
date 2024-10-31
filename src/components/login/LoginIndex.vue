<template class="template">
  <div class="login">
    <div class="login-box">
      <!-- <img src="@/assets/images/login/login-l.png" alt=""> -->
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <div class="login-form-title">
            <img src="@/assets/images/login/logo.png" style="width:139px;height:42px;" alt="" />
          </div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" type="text" placeholder="账号" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" type="password" placeholder="密码"
              @keyup.enter="submitForm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" type="primary" @click="submitForm">
              <span>登录</span>
            </el-button>
          </el-form-item>
          <div class="text-right">
              <el-link type="primary" :underline="false" @click="goForgetPwd">忘记密码</el-link>
            </div>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="LoginIndex">
import { ref, reactive } from 'vue';
import { _loginIn } from '@/apis/commonApi';
import type { EmployeeInter } from '@/types/EmployeeInters';
import { type FormInstance, type FormRules, ElMessage } from 'element-plus'
import { useMenuStore } from '@/store/useMenuStore';
import encodePassword from '@/utils/commonUtils';
import { useRouter } from 'vue-router';


const loginFormRef = ref<FormInstance>()
const loginForm = reactive<EmployeeInter>({
  username: 'admin',
  password: '123456a@'
})

const loginRules = reactive<FormRules<EmployeeInter>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})
const routerStore = useRouter();
const menuStore = useMenuStore();

const submitForm = async () => {
  if (!loginFormRef.value) return

  await loginFormRef.value.validate(async (valid, fields) => {
    if (valid) {
      const requestForm = JSON.parse(JSON.stringify(loginForm))
      // 密码加密
      requestForm.password = encodePassword(loginForm.password as string);

      const { data } = await _loginIn(requestForm);
      if (String(data.code) === '1') {
        if (loginForm.password == '123456') {
          // 注意使用 params 时一定不能使用 path
          // routerStore.push({name: "changePassword", params: {id: data.data.id, name: data.data.name}})
          routerStore.push({ path: '/changePassword', query: { id: data.data.id, name: data.data.name } })

        } else {
          ElMessage.success('登录成功');
          const path = "/employee/member/index";
          menuStore.setActiveItem(path)
          routerStore.push(path)
          localStorage.setItem('userInfo', JSON.stringify(data.data))
        }
      } else {
        ElMessage.error(data.msg)
      }

    } else {
      console.log('error submit!', fields)
    }
  })
}

const goForgetPwd = () => {
  routerStore.push({ path: '/forgotPassword' })
}
</script>
<style lang="scss" scoped>
@use './login.css'
</style>
