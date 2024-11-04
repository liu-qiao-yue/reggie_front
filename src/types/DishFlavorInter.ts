export interface DishFlavor {
    id?: number; // 菜品口味ID
    dishId?: number; // 菜品ID
    name: string; // 口味名称
    value?: string; // 口味数据列表
    values: [];
    createTime?: string; // 创建时间
    updateTime?: string; // 更新时间
    createUser?: number; // 创建用户
    updateUser?: number; // 更新用户
    isDeleted?: number; // 是否删除 (0: 未删除, 1: 已删除)
  }