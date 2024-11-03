import request from '@/js/request'

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


export function _editDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'put',
        params: { ids }
    })
}



export function _addDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'post',
        data: { ids }
    })
}



export function _queryDishById(id: string){
    return request({
        url: '/backend/' + id,
        method: 'get'
    })
}


export function _queryDishList(ids: string){
    return request({
        url: '/backend/dish/list',
        method: 'get',
        params: { ids }
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
        url: `/dish/status/${status}`,
        method: 'post',
        data: { ids: ids }
    })
}
