export interface CategoryInter {
    id:string;
    type:string;//类型 1 菜品分类 2 套餐分类
    name:string;//分类名称
    sort:string;//顺序
    createTime:string;
    updateTime:string;
    createUser:string;
    updateUser:string;
    isDeleted:string;
}