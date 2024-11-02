import type { TableColumn } from "@/types/TableInter";

const employeeColumn: TableColumn[] = [
    {
        prop: 'name',
        label: '员工姓名',
        width: '180'
    },
    {
        prop: 'username',
        label: '账号',
        width: '180'
    },
    {
        prop: 'phone',
        label: '手机'
    },
    {
        prop: 'status',
        label: '状态',
        formatter: (value: unknown) => {
            return value === 1 ? '正常' : '已禁用';
        },
        width: '100'
    },
    {
        prop: 'actions',
        label: '操作',
        isActions: true // 标记为操作列
        // },
        // {
        //   prop: 'customData',
        //   label: '自定义数据',
        //   templateSlotName: 'custom-column' // 使用自定义插槽
    }
]

const categoryColumn: TableColumn[] = [
    {
        prop: 'name',
        label: '分类名称'
    },
    {
        prop: 'type',
        label: '分类类型',
        formatter: (value: unknown) => {
            return value === 1 ? '菜品分类' : '套餐分类';
        },
        width: '200'
    },
    {
        prop: 'createTime',
        label: '操作时间'
    },
    {
        prop: 'sort',
        label: '排序'
    },
    {
        prop: 'actions',
        label: '操作',
        isActions: true // 标记为操作列
    }
]

const foodColumn: TableColumn[] = [
    {
        prop: 'name',
        label: '菜品名称'
    },
    {
        prop: 'image',
        label: '图片',
        templateSlotName: 'image-column' // 使用自定义插槽
    },
    {
        prop: 'categoryName',
        label: '菜品分类'
    },
    {
        prop: 'price',
        label: '售价',
        formatter: (value: unknown) => {
            return '￥' + Number(value)/100 
        }
    },
    {
        prop: 'status',
        label: '售卖状态',
        formatter: (value: unknown) => {            
            return value === 1 ? '启售' : '停售'
        }
    },
    {
        prop: 'updateTime',
        label: '最后操作时间'
    },
    {
        prop: 'actions',
        label: '操作',
        isActions: true, // 标记为操作列
        width: 200
    }
]
export { employeeColumn, categoryColumn, foodColumn }