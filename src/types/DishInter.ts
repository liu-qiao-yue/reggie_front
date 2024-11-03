import type { DishFlavor } from "./DishFlavorInter";

export interface DishInter {
  id: string;
  name?: string;
  categoryId?: string;
  price?: string;
  code?: string;
  image?: string;
  description?: string;
  status?: number; // 0 停售 1 起售
  sort?: number; // 顺序
  createTime?: string;
  updateTime?: string;
  createUser?: string;
  updateUser?: string;
  isDeleted?: string; // 是否删除
}

export interface DishDto extends DishInter {
  flavors?: DishFlavor[];
  categoryName?: string;
  copies?: string;
}