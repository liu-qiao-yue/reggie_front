<template>
  <el-dialog :title="title" width="65%" modal append-to-body align-center :destroy-on-close="true" :lock-scroll="true"
    :close-on-press-escape="false" :close-on-click-modal="false" v-model="localIsShow" :before-close="closeDialog">
    <div class="dish-dialog-content">
      <el-form :model="dishForm" ref="dishRef" label-width=100 :rules="dishRules">
        <el-form-item label="菜品名称:" prop="name">
          <el-input v-model="dishForm.name" placeholder="请输入菜品名称"></el-input>
        </el-form-item>
        <el-form-item label="菜品分类:" prop="categoryId">
          <el-select-v2 v-model="dishForm.categoryId" placeholder="请选择菜品分类" :options="dishList"></el-select-v2>
        </el-form-item>
        <el-form-item label="菜品价格:" prop="price">
          <el-input v-model="dishForm.price" placeholder="请输入菜品名称"></el-input>
        </el-form-item>
        <el-form-item label="口味做法配置:" prop="flavors">
          <el-input v-model="dishForm.flavors" placeholder="请输入菜品名称"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片:" prop="image">
          <el-upload 
          action="/common/upload" 
          :show-file-list="false"
          :on-success="handleAvatarSuccess" 
          :on-change="onChange" 
          ref="uploadRef">
            <el-image
            :src="getImage(dishForm.image as string)"
            :preview-src-list="[`/common/acess?name=${dishForm.image}`]">
              <template #error>
                <div class="image-slot">
                  <i class="icon-upload avatar-uploader-icon"></i>
                  <!-- <img src="@/assets/images/noimg.png"
                    style="width: auto; height: 40px; border:none;"> -->
                </div>
              </template>
            </el-image>
          </el-upload>
        </el-form-item>
        <el-form-item label="菜品描述:" prop="description">
          <el-input v-model="dishForm.description" type="textarea" placeholder="菜品描述，最长200字" show-word-limit
            maxlength="200"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>

  </el-dialog>
</template>
<script setup lang="ts" name="AddOrEditDishModal">
import { _getCategoryList } from '@/apis/CategoryApi';
import type { DishDto } from '@/types/DishInter';
import { ElMessage, type FormInstance, type FormRules, type UploadFile} from 'element-plus';
import { ref, watch, reactive, onMounted } from 'vue';
import { getImage } from '@/utils/commonUtils';
import { useRouter } from 'vue-router';
import type { AxiosResponse } from 'axios';
import type { Category } from '@/types/CategoryInter';


const router = useRouter()
//表单
const dishForm = reactive<DishDto>({
  'name': '',
  'id': '',
  'price': '',
  'image': '',
  'description': '',
  'flavors': [],
  //'status': true,
  'categoryId': ''
})
const dishRef = ref<FormInstance>()
const dishRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
  ],
  categoryId: [
    { required: true, message: '请选择菜品分类', trigger: 'blur' },
  ],
  price: [
    { required: true, message: '请输入菜品价格', trigger: 'blur' },
    { pattern: /^\d+(\.\d{0,2})?$/, message: '菜品价格格式只能为数字,且最多保留两位小数' },
    { pattern: /^(\d{1,4}|10000)$/, message: '数字不能大于10000', trigger: 'blur' }
  ],
  image: [
    { required: true, message: '请上传菜品图片', trigger: 'blur' }
  ]
})

//表单数据
const dishList = ref([])
const uploadRef = ref();


// 父组件参数
const props = withDefaults(defineProps<{
  isShow: boolean;
  title: string;
}>(), {
  isShow: false,
  title: ''
})

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddOrEditDishModal']);



watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});


onMounted(() => {
  _getCategoryList(1).then(({ data }) => {
    if (data.code === 1) {
      dishList.value = data.data.map((data:Category) =>{
        return {
          label: data.name,
          value: data.id
        }
      })      
    }
  })
})

const closeDialog = (data: boolean) => {
  if (!dishRef.value) return
  dishRef.value.resetFields()
  emit('closeAddOrEditDishModal', data);
};
// const closeDialog = () => {
//   closeDialogHandle(false)
// };

const save = async () => {
  if (!dishRef.value) return

  await dishRef.value.validate((valid) => {
    if (valid) {
      console.log('submit!')
      closeDialog(true)
    }
  })
  
};


const handleAvatarSuccess = (response: AxiosResponse) => {
  // 拼接down接口预览
  if (response.data.code === 0 && response.data.msg === '未登录') {
    router.push("/login")
  } else {
    dishForm.image = response.data.data
  }
}

const onChange = (file: UploadFile) => {
  if (file) {
    const suffix = file.name.split('.')[1]
    const size =  file.size ? file.size / 1024 / 1024 < 2 : true;
    if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
      ElMessage.error('上传图片只支持 png、jpeg、jpg 格式！')
      uploadRef.value?.clearFiles();
      return false
    }
    if (!size) {
      ElMessage.error('上传文件大小不能超过 2MB!')
      return false
    }
    return file
  }
}
</script>
<style lang="scss" scoped></style>