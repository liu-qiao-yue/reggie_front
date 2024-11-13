export interface SetmealDish{
    id?: string;
    setmealId?: string;// 套餐id
    dishId?: string;// 菜品id
    name?: string;// 菜品名称 （冗余字段）
    price?: string;// 菜品原价 （冗余字段）
    copies?: number;// 份数
    sort?: string;// 排序
    totalPrice?: string;// 套餐总金额
}

export type SetmealDishList = SetmealDish[]