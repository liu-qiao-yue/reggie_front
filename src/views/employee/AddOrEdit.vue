<template>
  <el-dialog :title="title == 'edit' ? '编辑员工信息' : '新增员工信息'" width="50%" modal append-to-body align-center
    :destroy-on-close="true" :lock-scroll="true" :close-on-press-escape="false" :close-on-click-modal="false"
    v-model="localIsShow" :before-close="closeDialog">

    <div class="dialog-content">
      <el-form label-width=100 :model="employeeForm" ref="employeeRef" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="employeeForm.username" placeholder="请输入账号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="employeeForm.name" placeholder="请输入员工姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="employeeForm.phone" placeholder="请再次输入手机号" :disabled="!editPhone" autocomplete="off"></el-input>
          <span @click="showPhone" v-if="id != ''">修改</span>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="employeeForm.sex">
            <el-radio value="1">男</el-radio>
            <el-radio value="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="employeeForm.idNumber" placeholder="请再次输入身份证号" :disabled="!editIdNumber" autocomplete="off"></el-input>
          <span @click="showIdNumber"  v-if="id != ''">修改</span>
        </el-form-item>

      </el-form>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="updateForm" v-if="title === 'edit'">保存</el-button>
        <el-button type="primary" @click="saveForm(true)" v-if="title === 'add'">确认</el-button>
        <el-button type="primary" @click="saveForm(false)" v-if="title === 'add'">保存并继续添加</el-button>
      </div>
    </template>

  </el-dialog>
</template>
<script setup lang="ts" name="AddOrEdit">
import { ref, watch, reactive, onMounted } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type { EmployeeInter } from '@/types/EmployeeInters';
import { validatePhone, validateIdNumber, validateUserName } from '@/js/validators';
import { _employeeInfo, _saveEmployee, _updateEmployee } from '@/apis/EmployeeApi';
import { encodePassword } from '@/utils/commonUtils';

const editPhone = ref(false);
const editIdNumber = ref(false);

// 定义 props，接收父组件传递的 isShow 值
const props =withDefaults(defineProps<{
  isShow: boolean;
  title: string;
  id: string;
}>(),{
  isShow: false,
  title: '',
  id: ''
})

const emit = defineEmits(['closeAddRrEdit']);

const localIsShow = ref(props.isShow);
const employeeRef = ref<FormInstance>()
const employeeForm = reactive<EmployeeInter>({
  name: '',
  username: '',
  phone: '',
  sex: '1',
  idNumber: ''
});


const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入员工姓名', trigger: 'blur' },
    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_-]{2,20}$/, message: '用户名必须以字母开头，长度在2-20之间，只能包含字母、数字、下划线', trigger: 'blur' },
    { validator: (rule, value, callback) => validateUserName(rule, value, callback, props.id), trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { validator: (rule, value, callback) => { if (editPhone.value) validatePhone(rule, value, callback) }, trigger: 'blur' }
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
  ],
  idNumber: [
    { required: true, message: '请输入身份证号', trigger: 'blur' },
    { validator: (rule, value, callback) => { if (editIdNumber.value) validateIdNumber(rule, value, callback) } , trigger: 'blur' }
  ],
})

watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});

const closeDialog = () => {
  emit('closeAddRrEdit', false);
};
const saveForm = async (isExit: boolean) => {
  validateForm().then((valid) => {
    if (valid) {
      employeeForm.password = encodePassword("123456")
      _saveEmployee(employeeForm).then(({ data }) => {
        if (data.code == '1')
          ElMessage.success("保存成功");
        if (isExit) {
          emit('closeAddRrEdit', true);
        }
      })
    }
  }).catch(() => {
  });
}


const updateForm = () => {
  validateForm().then((valid) => {
    if (valid) {
      const request = JSON.parse(JSON.stringify(employeeForm))
      if (!editIdNumber.value) delete request.idNumber
      if (!editPhone.value) delete request.phone
      _updateEmployee(request).then(({data}) =>{
        if (data.code == '1')
          ElMessage.success("修改成功");
          emit('closeAddRrEdit', true);
      })
    }
  })
}


onMounted(() => {
  if (props.id) {
    _employeeInfo(props.id).then(res => {
      Object.assign(employeeForm, res.data.data as EmployeeInter);
      delete employeeForm.password
    })
  } else {
    editIdNumber.value = true
    editPhone.value = true
  }
})
const validateForm = () => {
  if (!employeeRef.value) return Promise.reject();
  const field = ['name', 'username', 'sex']
  if (editIdNumber.value) field.push('idNumber')
  if (editPhone.value) field.push('phone')
  return employeeRef.value.validateField(field);
}


const showPhone = () => {
  editPhone.value = true;
}

const showIdNumber = () => {
  editIdNumber.value = true;
}

</script>
<style lang="scss" scoped></style>
