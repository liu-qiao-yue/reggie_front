export interface OrderDetail{
    id: string;

    name: string;

    /**
     * 订单id
     */
    orderId: string;

    /**
     * 菜品id
     */
    dishId: string;

    /**
     * 套餐id
     */
    setmealId: string;

    /**
     * 口味
     */
    dishFlavor: string;

    /**
     * 数量
     */
    number: string;

    /**
     * 金额
     */
    amount: string;

    /**
     * 图片
     */
    image: string;
}