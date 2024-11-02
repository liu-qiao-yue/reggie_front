<template>
    <div class="forgot-password-container">
        <el-page-header :icon="ArrowLeft" @back="onBack">
            <template #content>
                <span class="text-large font-600 mr-3"> {{ route.query.name }} </span>
            </template>
        </el-page-header>

        <div class="forgot-password-body">
            <el-form label-width=100 :model="forgotPwdFormForm" ref="forgotFormRef" :rules="rules">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="forgotPwdFormForm.username" placeholder="请输入账号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="员工姓名" prop="name">
                    <el-input v-model="forgotPwdFormForm.name" placeholder="请输入员工姓名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="idNumber">
                    <el-input v-model="forgotPwdFormForm.idNumber" placeholder="请再次输入身份证号"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="password">
                    <el-input v-model="forgotPwdFormForm.password" type="password" placeholder="请输入新密码"
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmPassword">
                    <el-input v-model="forgotPwdFormForm.confirmPassword" type="password" placeholder="请再次输入新密码"
                        autocomplete="off"></el-input>
                </el-form-item>

                <div class="password-btn">
                    <el-button type="primary" @click="resetForm">重置</el-button>
                    <el-button type="primary" @click="confirmChange">确定</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts" name="forgotPwdForm">
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ArrowLeft } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { validatePasswordRegex, validateConfirmPassword } from '@/js/validators';
import { encodePassword } from '@/utils/commonUtils';
import type { ForgotPasswordForm, ForgotPasswordRequest } from '@/types/PasswordForm';
import { _forgotPassword } from '@/apis/CommonApi';

const router = useRouter();
const route = useRoute();

const forgotFormRef = ref<FormInstance>()
const forgotPwdFormForm = reactive<ForgotPasswordForm>({
    name: '',
    username: '',
    idNumber: '',
    password: '',
    confirmPassword: '',
    type: 'forgot'
});

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入员工姓名', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
    ],
    idNumber: [
        { required: true, message: '请输入身份证号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { validator: validatePasswordRegex, trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { validator: validateConfirmPassword(forgotPwdFormForm), trigger: 'blur' }
    ]
})


const onBack = () => {
    router.push("/login")
}

const resetForm = () => {
    if (!forgotFormRef.value) return
    forgotFormRef.value.resetFields()
}


const confirmChange = async () => {
    if (!forgotFormRef.value) return
    forgotFormRef.value.validate((validate) => {
        if (validate) {
            const param: ForgotPasswordRequest = {
                password: encodePassword(forgotPwdFormForm.password),
                username: forgotPwdFormForm.username,
                name: forgotPwdFormForm.name,
                idNumber: forgotPwdFormForm.idNumber,
                type: 'forgot'
            }
            _forgotPassword(param).then(({data}) => {
                if (data.code === 1) {
                    router.push("/login")
                }
            })
        }
    });
}
</script>
<style lang="scss" scoped>
.forgot-password-container {
    margin: 20px 30px 20px 20px;

    .forgot-password-body {
        margin: 10px 15px 10px 10px;

        .password-btn {
            text-align: center;
        }
    }
}
</style>
