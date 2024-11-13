import type { SetmealDishList } from "./SetmealDishInter";

export interface Setmeal{
    id?: string; // 可选字段，对应于Java中的Long类型
    categoryId: string;
    name: string;
    price: string;
    status?: 0 | 1; //  0:停用 1:启用
    code?: string;
    description: string;
    image: string;
    copies?: string
}

export interface SetmealDto extends Setmeal{
    setmealDishes: SetmealDishList
    categoryName?: string
}