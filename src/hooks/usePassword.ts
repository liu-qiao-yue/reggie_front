import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { validatePasswordRegex, validateConfirmPassword } from '@/js/validators';
import type { ResetPasswordForm, ResetPasswordRequest } from '@/types/ResetPasswordForm';
import encodePassword from '@/utils/commonUtils';
import { _changePassword } from '@/apis/commonApi';
import { ElMessage } from 'element-plus';

export default function () {
  const resetFormRef = ref<FormInstance>()
  const resetPasswordForm = reactive<ResetPasswordForm>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const rules = reactive<FormRules>({
    oldPassword: [
      { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    newPassword: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      { validator: validatePasswordRegex, trigger: 'blur' }
    ],
    confirmPassword: [
      { required: true, message: '请输入确认密码', trigger: 'blur' },
      { validator: validateConfirmPassword(resetPasswordForm), trigger: 'blur' }
    ]
  })

  const submitForm = async () => {
    if (!resetFormRef.value) return
    return resetFormRef.value.validate();
  }

  const validateAndSubmit = (id: string, type: 'change' | 'reset') => {
    
    return submitForm().then(async isValid => {
      if (isValid) {
        const request: ResetPasswordRequest = {
          id: id,
          oldPassword: encodePassword(resetPasswordForm.oldPassword),
          newPassword: encodePassword(resetPasswordForm.newPassword),
          type: type
        }
        const { data } = await _changePassword(request);
        if (data.code == '1') {
          ElMessage.success('修改密码成功')
          return true
        } else {
          ElMessage.error(data.msg)
          return false
        }
      }
    })

  }

  const resetForm = () => {
    if (!resetFormRef.value) return
    resetFormRef.value.resetFields()
  }

  return {
    resetFormRef,
    resetPasswordForm,
    rules,
    submitForm,
    validateAndSubmit,
    resetForm
  }
}