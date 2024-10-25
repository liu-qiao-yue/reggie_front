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
        displayStatus: 1, // 控制列的显示状态
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
        displayStatus: 1, // 控制列的显示状态
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


export { employeeColumn, categoryColumn }