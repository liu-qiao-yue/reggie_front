import type { DishFlavor } from "./DishFlavorInter";

export interface DishInter {
  id: string;
  name?: string;
  categoryId?: string;
  price?: string;
  code?: string;
  image?: string;
  description?: string;
  status?: string; // 0 停售 1 起售
  sort?: number; // 顺序
}

export interface DishDto extends DishInter {
  flavors: DishFlavor[];
  categoryName?: string;
  copies?: string;
}