<template>
    <div class="header">
        <div class="header-left">
            <span class="header-title">{{ pageName }}</span>
        </div>
        <div class="header-right">
            <i class="iconfont icon-user-icon"></i>
            <el-dropdown trigger="click" class="cursor-pointer">
                <span class="">
                    {{ userInfo?.name }}
                </span>
                <template v-slot:dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="resetPassword">
                            <i class="iconfont icon-ic-edit-pen"></i>
                            修改密码
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <i class="iconfont icon-login-out cursor-pointer" @click="handleLogout"></i>
        </div>
        <ResetPassword v-if="showResetPassword" :isShow="showResetPassword" @closeResetPwd="closeResetPwd"></ResetPassword>
    </div>
</template>
<script setup lang="ts" name="HeaderLayout">
import { useMenuStore } from '@/store/useMenuStore';
import { onMounted, ref } from 'vue';
import ResetPassword from '../modal/ResetPassword.vue';
import { ElMessage } from 'element-plus';
import { _loginOut } from '@/apis/commonApi';
import { useRouter } from 'vue-router';


const pageName = ref('')
const showResetPassword = ref(false)

const router = useRouter();
const menuStore = useMenuStore();

menuStore.$subscribe(() => {
    console.log("menuStore变化了");
    setTimeout(() => {
        pageName.value = router.currentRoute.value.meta.title as string
    }, 10);
})

const userInfo = JSON.parse(localStorage.getItem('userInfo') || "");

async function handleLogout() {
    const { data } = await _loginOut()
    if (String(data.code) === '1') {
        localStorage.clear()
        router.push('/login')

    }
}
onMounted(() => {
    pageName.value = router.currentRoute.value.meta.title as string
})
function resetPassword() {
    showResetPassword.value = true
}

function closeResetPwd(data: boolean) {
    console.log('@@', "closeResetPwd");
    
    showResetPassword.value = false
    if (data) {
        ElMessage.success('密码修改成功，请重新登录')
        handleLogout()
    }
}



</script>
<style lang="scss" scoped>
.header {
    height: 64px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-left {
    color: #333333;
    height: 64px;
    font-size: 16px;
    width: 300px;
    padding-left: 22px;
    line-height: 64px;
    font-weight: 700;
    // opacity: 0;
    float: left;
    animation: opacity 500ms ease-out 800ms forwards;
}

.header-right {
    float: right;
    display: flex;
    margin-right: 34px;
    height: 100%;
    line-height: 64px;
    color: #333333;
    font-size: 14px;
    align-items: center;
}

.header-right>i {
    margin: 0 10px;
    color: #333333;
}
</style>
