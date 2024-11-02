<template>
  <el-dialog :title="localTitle" width="40%" modal append-to-body align-center
    :destroy-on-close="true" :lock-scroll="true" :close-on-press-escape="false" :close-on-click-modal="false"
    v-model="localIsShow" :before-close="closeDialog">
    <div class="dialog-content">
        <el-form label-width=100 :model="categoryForm" ref="categoryRef" :rules="rules">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="categoryForm.sort" placeholder="请输入排序" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
      
        <el-button type="primary" @click="saveForm(true)" v-if="title === 'add'">确定</el-button>
        <el-button @click="saveForm(false)" v-if="title === 'add'" class="continue">保存并继续添加</el-button>
        <el-button type="primary" @click="updateForm" v-if="title === 'edit'">确定</el-button>
      </div>
    </template>

  </el-dialog>
</template>
<script setup lang="ts" name="">
import type { CategoryForm } from '@/types/CategoryInter';
import { onMounted, reactive, ref, watch } from 'vue';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { _saveCategory, _updatecategory } from '@/apis/CategoryApi';


const props = defineProps<{
  isShow: boolean;
  title: string;
  currentItem:CategoryForm;
  type: number;
}>()

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddOrEdit']);
const localTitle = ref('')

const categoryRef = ref<FormInstance>()
const categoryForm = reactive<CategoryForm>({
  id: '',
  name: '',
  type: props.type + '',
  sort: ''
})

const rules: FormRules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  sort:[
    { required: true, message: '请输入排序', trigger: 'blur' },
    { type: 'number', message: '排序必须为数字值'}
  ]
}

watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});

const closeDialog = () => {
  emit('closeAddOrEdit', false);
};

const updateForm = async () => {
  if (!categoryRef.value) return
  await categoryRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('保存成功');
      _updatecategory(categoryForm).then(({data}) =>{
        if (data.code == '1')
          ElMessage.success("修改成功");
          emit('closeAddOrEdit', true);
      })
    }
  })
  
};

const saveForm = async (isClose: boolean) => {
  if (!categoryRef.value) return
  await categoryRef.value.validate((valid) => {
    if (valid) {
      ElMessage.success('保存成功');
      _saveCategory(categoryForm).then(({data}) =>{
        if (data.code == '1')
          ElMessage.success("添加成功");
          if(isClose) emit('closeAddOrEdit', true);
      })
    }
  })
  
};

onMounted(()=>{
  if(props.title == 'edit' && props.currentItem){
    // 不需要update & create 数据
    Object.assign(categoryForm, {
      id: props.currentItem.id,
      name: props.currentItem.name,
      sort: props.currentItem.sort,
      type: props.type + ''
    })
  }
  localTitle.value += props.title == 'add'? '新增':'编辑'
  
  localTitle.value += props.type == 1?'菜品分类':'套餐分类'
})
</script>
<style lang="scss" scoped>


</style>