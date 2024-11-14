import type { OrderDetail } from "./OrderDetailInter";

export interface Orders {
    id: string;

    /**
     * 订单号
     */
    number: string;

    /**
     * 订单状态 1待付款，2待派送，3已派送，4已完成，5已取消
     */
    status: number;


    /**
     * 下单用户id
     */
    userId: string;

    /**
     * 地址id
     */
    addressBookId: string;


    /**
     * 下单时间
     */
    orderTime: string;


    /**
     * 结账时间
     */
    checkoutTime: string;


    /**
     * 支付方式 1微信，2支付宝
     */
    payMethod: string;


    /**
     * 实收金额
     */
    amount: number;

    /**
     * 备注
     */
    remark: string;

}

export interface OrdersDto extends Orders {
    /**
         * 用户姓名
         */
    userName: string;
    /**
     * 用户电话
     */
    phone: string;

    /**
     * 详细地址
     */
    address: string;
    /**
     * 收货人
     */
    consignee: string;

    orderDetails: OrderDetail[];
}