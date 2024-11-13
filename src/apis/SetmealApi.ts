import request from '@/js/request'
import type { SetmealDto } from '@/types/SetmealInter'

/**
 * 分页列表
 * @param page 第几页
 * @param pageSize 每页几条
 * @param name 菜品名称
 * @returns 
 */
export function _setmealPage(page: number, pageSize: number, name: string) {
    return request({
        url: '/backend/setmeal/page',
        method: 'get',
        params: { page, pageSize, name }
    })
}

/**
 * 删除套餐
 * @param id 
 * @returns 
 */
export function _deleteSetmeal(id:string) {
    return request({
        url: '/backend/setmeal?ids=' + id,
        method: 'DELETE',
    })
}

/**
 * 起售停售---批量起售停售接口
 * @param ids 
 * @param status 
 * @returns 
 */
export function _setmealStatusByStatus(ids: string, status: string){
    return request({
        url: `/backend/setmeal/status/${status}?ids=${ids}`,
        method: 'post'
    })
}
/**
 * 新增套餐
 * @param setmealDto 
 * @returns 
 */
export function _saveSetmeal(setmealDto: SetmealDto) {
    return request({
        url: '/backend/setmeal',
        method: 'post',
        data: setmealDto
    })
}
/**
 * 根据ID获取套餐及菜品关联数据
 * @param id 
 * @returns 
 */
export function _getSetmealById(id: string) {
    return request({
        url: '/backend/setmeal/' + id,
        method: 'get'
    })
}

