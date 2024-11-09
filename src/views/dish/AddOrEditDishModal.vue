<template>
  <el-dialog :title="id ? '编辑菜品' : '新增菜品'" width="65%" modal append-to-body align-center :destroy-on-close="true"
    :lock-scroll="true" :close-on-press-escape="false" :close-on-click-modal="false" v-model="localIsShow"
    :before-close="beforeClose">
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
              <div class="title">
                <span>更改口味做法配置信息</span>
              </div>
              <div class="cont">
                <div class="flavor-item" v-for="(item, index) in dishForm.flavors" :key="index">
                  <!-- 一级选择框 -->
                  <div class="itTit">
                    <el-select-v2 v-model="item.name" placeholder="请选择口味" :options="flavorConfigList"
                      @change="(value: string) => flavorChange(value, item)"></el-select-v2>
                  </div>
                  <!-- 二级 -->
                  <div class="labItems" style="display: flex">
                    <el-tag type="warning" closable v-for="(it, ind) in item.values" :key="ind"
                      @close="removeFlavorDetail(item, ind)">
                      <span class="labItem">{{ it.label }}</span>
                    </el-tag>
                  </div>
                  <el-link type="danger" :underline="false" @click="flavorChange(item.name, item)">重置</el-link>
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
        <el-button @click="closeDialog(false)">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>

  </el-dialog>
</template>
<script setup lang="ts" name="AddOrEditDishModal">
import type { DishDto } from '@/types/DishInter';
import { ElMessage, type FormInstance, type FormRules, type UploadFile } from 'element-plus';
import { ref, watch, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { DishFlavor } from '@/types/DishFlavorInter';
import type { SelectInter } from '@/types/SelectInter';
import { _deleteFile } from '@/apis/CommonApi';
import { _queryDishById, _saveDish } from '@/apis/DishApi';
import { getImage } from '@/utils/commonUtils';

const router = useRouter()

//表单
const dishForm = ref<DishDto>({
  'name': '',
  'id': '',
  'price': '',
  'image': '',
  'description': '',
  'flavors': [],
  'categoryId': '',
  'status': '1'
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
    { pattern: /^(1000(\.00?)?|[0-9]{1,3}(\.\d{1,2})?)$/, message: '数字不能大于10000', trigger: 'blur' }
  ],
  image: [
    { required: true, message: '请上传菜品图片', trigger: 'change' }
  ]
})

//表单数据
const uploadRef = ref();


// 父组件参数
const props = withDefaults(defineProps<{
  isShow: boolean;
  id: string;
  dishList: SelectInter[];
  flavorConfigList: SelectInter[];
}>(), {
  isShow: false,
  id: '',
  dishList: () => [],
  flavorConfigList: () => []
 
})

const localIsShow = ref(props.isShow);
const emit = defineEmits(['closeAddOrEditDishModal']);


watch(() => props.isShow, (newVal) => {
  localIsShow.value = newVal;
});


onMounted(async () => {
  if (props.id) {
    // 获取菜品信息
    const { data } = await _queryDishById(props.id)
    if(data.code === 1){
      dishForm.value = data.data
      // price/100
      dishForm.value.price = (data.data.price / 100).toString()
      // 将param.flavors中的value 通过 flavorConfigList 换成 valus
      const localConfigListChildren:SelectInter[] = []
       
      JSON.parse(JSON.stringify(props.flavorConfigList)).map((i: SelectInter) => {
        localConfigListChildren.push(...i.children as SelectInter[])
      })

      dishForm.value.flavors.forEach((i: DishFlavor) => {
        const valueList = JSON.parse(i.value as string)
        i.values = localConfigListChildren.filter((j: SelectInter) => {
          return valueList.includes(j.value)
        })
      })
    }
    
  }
})
const beforeClose = () => {
  // 关闭前
  closeDialog(false)
};
const closeDialog = (data: boolean) => {
  if (!dishRef.value) return

  if (props.id === '' && dishForm.value.image !== '' && !data) {
    _deleteFile(dishForm.value.image as string);
  }
  dishRef.value.resetFields()
  emit('closeAddOrEditDishModal', data);
};

const valiateForm = (): boolean => {
  // 将param.flavors中的values 转成value
  let isReturn = true
  let message = ''
  dishForm.value.flavors.forEach((i, index) => {
    if (i.name === null || i.name == '') {
      isReturn = false
      message += '第' + (index + 1) + '条口味做法选项不能为空;<br/>'
    }
    if (i.values?.length == undefined || i.values.length === 0) {
      isReturn = false
      message += '第' + (index + 1) + '条口味做法选项详细信息不能为空，请重新选择;<br/> '
      const config = JSON.parse(JSON.stringify(props.flavorConfigList)).filter((j: SelectInter) => { return j.value === i.name })
      i.values = config[0]?.children
    }
  })

  // 判断param.flavors.value中是否有重复选项
  const uniqueSet = new Set(
    dishForm.value.flavors.map(i => { return i.name })
  );
  if (uniqueSet.size !== dishForm.value.flavors.length) {
    message += "口味做法选项不能重复"
    isReturn = false
  }
  if(!isReturn){
    ElMessage({
      message: message,
      type: 'error',
      dangerouslyUseHTMLString: true,
    })
  }
  return isReturn
}

const save = async () => {
  if (!dishRef.value) return

  await dishRef.value.validate((valid) => {
    if (valid) {

      if (!valiateForm()) {
        return
      }

      // 构建提交参数 param
      const param: DishDto = JSON.parse(JSON.stringify(dishForm.value))

      param.flavors.forEach(i => {
        if (i.values?.length !== undefined && i.values.length > 0) {
          i.value = JSON.stringify(i.values.map(j => { return j.value }))
          // 删掉param.flavors中的values
          delete i.values
        }
      })

      // price * 100
      param.price = (Number(param.price) * 100) + ''

      // 请求
      _saveDish(param).then(({data}) => {
        if (data.code == 1)
          ElMessage.success("保存成功");
          closeDialog(true)
      })

    }
  })

};


const handleAvatarSuccess = (response: { code: number; msg: string; data: object }) => {
  // 拼接down接口预览
  if (response.code === 0 && response.msg === 'NOTLOGIN') {
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

const flavorChange = (value: string, flavor: DishFlavor) => {
  const flavorItem = JSON.parse(JSON.stringify(props.flavorConfigList)).filter((item: SelectInter) => item.value === value)
  flavor.values = flavorItem[0].children as SelectInter[]
}

const removeFlavorDetail = (flavor: DishFlavor, index: number) => {
  if (flavor.values) {
    flavor.values.splice(index, 1)
  }
}

const delFlavor = (flavors: DishFlavor[], index: number) => {
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

        :deep(.el-select) {
          height: 100%;
        }

        :deep(.el-select__wrapper) {
          height: 100%;
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

      .error {
        border: solid 1px #f56c6c;
      }
    }
  }

  .el-link {
    padding: 0 10px;
  }
}
</style>