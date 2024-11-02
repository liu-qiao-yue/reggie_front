import request from '@/js/request'
import type { CategoryForm } from '@/types/CategoryInter'

/**
 * 分页列表
 * @param page 
 * @param pageSize 
 * @returns 
 */
export function _categoryPage(page: number, pageSize: number) {
    return request({
        url: '/backend/category/page',
        method: 'get',
        params: { page, pageSize }
    })
}

/**
 * 新增菜品或套餐分类
 * @param data 
 * @returns 
 */
export function _saveCategory(data: CategoryForm) {
    return request({
        url: '/backend/category',
        method: 'post',
        data: data
    })
}

/**
 * 更新菜品或套餐分类
 * @param data 
 * @returns 
 */
export function _updatecategory(data: CategoryForm) {
    return request({
        url: '/backend/category',
        method: 'put',
        data: data
    })
}

/**
 * 删除菜品或套餐分类
 * @param id 
 * @returns 
 */
export function _deleteCategory(id:string) {
    return request({
        url: '/backend/category?ids=' + id,
        method: 'DELETE',
    })
}


export function _getCategoryList(type:number) {
    return request({
        url: '/backend/category/list',
        method: 'get',
        params: { type }
    })
}