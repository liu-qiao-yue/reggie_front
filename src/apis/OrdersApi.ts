import request from '@/js/request'
export function _getOrdersPage (page:number,pageSize:number,name:string, beginTime:string, endTime: string) {
    return request({
        url: '/backend/order/page',
        method: 'get',
        params: {page,pageSize,name, beginTime, endTime}
    })
}