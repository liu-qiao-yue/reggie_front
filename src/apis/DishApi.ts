import request from '@/js/request'
import type { DishDto, DishInter } from '@/types/DishInter'

/**
 * 分页列表
 * @param page 第几页
 * @param pageSize 每页几条
 * @param name 菜品名称
 * @returns 
 */
export function _dishPage(page: number, pageSize: number, name: string) {
    return request({
        url: '/backend/dish/page',
        method: 'get',
        params: { page, pageSize, name }
    })
}


/**
 * 删除接口
 * @param ids 
 * @returns 
 */
export function _deleteDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'delete',
        params: { ids }
    })
}

/**
 * 新增/编辑保存
 * @param ids 
 * @returns 
 */
export function _saveDish(dishDto: DishDto){
    return request({
        url: '/backend/dish',
        method: 'post',
        data: dishDto
    })
}

/**
 * 根据id查询菜品以及其口味信息
 * @param id 
 * @returns 
 */

export function _queryDishById(id: string){
    return request({
        url: '/backend/dish/' + id,
        method: 'get'
    })
}


export function _queryDishList(param: DishInter){
    return request({
        url: '/backend/dish/list',
        method: 'get',
        params: param
    })
}
/**
 * 起售停售---批量起售停售接口
 * @param ids 
 * @param status 
 * @returns 
 */
export function _dishStatusByStatus(ids: string, status: string){
    return request({
        url: `/backend/dish/status/${status}?ids=${ids}`,
        method: 'post'
    })
}
