<template>
  <el-dialog :title="id?'编辑菜品':'新增菜品'" width="65%" modal append-to-body align-center :destroy-on-close="true" :lock-scroll="true"
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
          <div class="flavorBox">
            <div v-if="dishForm.flavors?.length != 0" class="flavor">
              <!-- v-for="(item,index) in dishForm.flavors" :key="index" -->
              <div class="title">
                <span>口味名（请点击添加）</span><span>口味标签（输入标签回车添加）</span>
              </div>
              <div class="cont">
                <div class="flavor-item" v-for="(item, index) in dishForm.flavors" :key="index">
                  <!-- 一级选择框 -->
                  <div class="itTit">
                    <el-select-v2 v-model="item.name" placeholder="请输入口味" :options="flavorConfigList"
                      @change="(value: string) => flavorChange(value, item)" allow-create filterable default-first-option :reserve-keyword="false"></el-select-v2>
                  </div>
                  <!-- 二级 -->
                  <div class="labItems" style="display: flex">
                    <el-tag type="warning" closable v-for="(it, ind) in item.values" :key="ind"
                      @close="removeFlavorDetail(item.values, ind)">
                      <span class="labItem">{{ it.label }}</span>
                    </el-tag>

                    <div class="inputBox" contenteditable="true"
                      @keydown.enter="(val) => keyDownHandle(val, dishForm.flavors, index)"></div>
                  </div>
                  <el-link type="danger" :underline="false" @click="delFlavor(dishForm.flavors, index)">删除</el-link>
                </div>
              </div>
              <el-button type="primary" @click="addFlavore">添加口味</el-button>
            </div>

            <div v-else>
              <el-button type="primary" @click="addFlavore">+ 添加口味</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="菜品图片:" prop="image">
          <el-upload action="/backend/common/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
            :on-change="onChange" ref="uploadRef">
            <el-image :src="getImage(dishForm.image as string)">
              <template #error>
                <div class="image-slot">
                  <i class="icon-upload avatar-uploader-icon"></i>
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
import { ElMessage, type FormInstance, type FormRules, type UploadFile } from 'element-plus';
import { ref, watch, reactive, onMounted } from 'vue';
import { getImage } from '@/utils/commonUtils';
import { useRouter } from 'vue-router';
import type { Category } from '@/types/CategoryInter';
import { _flavorConfigList } from '@/apis/FlavorConfigurationApi';


const router = useRouter()
//表单
const dishForm = ref<DishDto>({
  'name': '',
  'id': '',
  'price': '',
  'image': '',
  'description': '',
  'flavors': [],
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
  id: string;
}>(), {
  isShow: false,
  id: ''
})

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddOrEditDishModal']);
const flavorConfigList = ref([]);


watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});


onMounted(() => {
  _getCategoryList(1).then(({ data }) => {
    if (data.code === 1) {
      dishList.value = data.data.map((data: Category) => {
        return {
          label: data.name,
          value: data.id
        }
      })
    }
  })


  _flavorConfigList('').then(({ data }) => {
    if (data.code === 1) {
      flavorConfigList.value = data.data.map((item) => {
        return {
          label: item.name,
          value: item.id,
          children: item.children.map(j => {
            return {
              label: j.name,
              value: j.id
            }
          })
        }
      })
      console.log("flavorConfigList", flavorConfigList.value);

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
      closeDialog(true)
    }
  })

};


const handleAvatarSuccess = (response: { code: number; msg: string; data: object }) => {
  // 拼接down接口预览
  if (response.code === 0 && response.msg === '未登录') {
    router.push("/login")
  } else {
    debugger
    dishForm.value.image = response.data as unknown as string
  }
}

const onChange = (file: UploadFile) => {
  if (file) {
    const suffix = file.name.split('.')[1]
    const size = file.size ? file.size / 1024 / 1024 < 2 : true;
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

const addFlavore = () => {
  dishForm.value.flavors.push({
    name: '',
    values: []
  })
}

const flavorChange = (value, flavor) => {
  const flavorItem = flavorConfigList.value.filter(item => item.value === value)
  if (flavorItem.length === 0) {
    if(value.trim().length > 3){
      return ElMessage.error('口味名称小于3个字')
    }
    flavor.values = []
  }else {
    flavor.values = flavorItem[0].children
  }

  console.log("flavor", dishForm.value.flavors);

}

const removeFlavorDetail = (values, index: number) => {
  console.log(values, index);

  values.splice(index, 1)
}

const keyDownHandle = (event, flavors, index) => {
  // 阻止默认行为，防止页面跳转等
  event.preventDefault();

  if (flavors[index].name === '' || flavors[index].name === null){
    ElMessage.error('请先输入口味！！')
    return
  }

  // 获取当前可编辑元素的内容
  const content = event.target.innerText;

  // 处理你的逻辑，例如将内容添加到 flavors 数组中
  if (content.trim()) {
    flavors[index].values.push({
      label: content.trim(),
      value: ''
    });
    console.log('Updated flavors:', dishForm.value.flavors);
  }

  // 清空可编辑元素的内容
  event.target.innerText = '';

}

const delFlavor = (flavors, index) => {
  flavors.splice(index, 1)
}
</script>
<style lang="scss" scoped>
.flavorBox {
  width: 777px;
  .flavor {
    border: solid 1px #dfe2e8;
    border-radius: 3px;
    padding: 15px;
    background: #fafafb;

    .title {
      color: #606168;
    }

    .flavor-item {
      display: flex;
      margin: 10px 0;

      .itTit {
        width: 150px;
        margin-right: 15px;

        :deep(.el-select__wrapper) {
          height: 40px;
        }
      }

      .labItems {
        flex: 1;
        // display: flex;
        flex-wrap: wrap;
        border-radius: 3px;
        min-height: 39px;
        border: solid 1px #d8dde3;
        background: #fff;
        padding: 0 5px;

        .el-tag {
          display: inline-block;
          color: #f19c59;
          margin: 5px;
          line-height: 26px;
          height: 26px;
          padding: 0 10px;
          background: #fdf4eb;
          border-radius: 3px;
          border: solid 1px #fae2cd;
        }

        .inputBox {
          display: inline-block;
          width: 100%;
          height: 36px;
          line-height: 36px;
          overflow: hidden;
          flex: 1 1 0%;
          outline: none;
        }
      }
    }
  }

  .el-link {
    padding: 0 10px;
  }
}
</style>