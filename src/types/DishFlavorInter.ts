import type { SelectInter } from "./SelectInter";

export interface DishFlavor {
    id?: number; // 菜品口味ID
    dishId?: number; // 菜品ID
    name: string; // 口味名称
    value?: string; // 口味数据列表
    values?: SelectInter[];
  }