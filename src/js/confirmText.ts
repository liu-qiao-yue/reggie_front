import { type ConfirmText } from '@/types/ConfirmTextInter'

const text: ConfirmText = {
    resetPwd:{ //重置密码操作
        title:'提示',
        content:"确认要重置该密码吗？",
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
    },
    unlock:{ //解除账户操作
        title:'提示',
        content:"您将启用该账户的登录权限，是否确认？",
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
    },
    lock:{ //锁账户操作
        title:'警告',
        content:"您将锁定该账户，锁定后将无法登录，是否确认？",
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
    },
    delete:{ //删除操作
        title:'提示',
        content:"确认要删除本条数据？",
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
    },
    deleteWindowData:{ //删除操作
        title:'提示',
        content:"确认删除本条数据？",
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning',
    }
}

export { text }