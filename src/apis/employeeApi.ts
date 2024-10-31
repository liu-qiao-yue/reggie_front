import request from '@/js/request'
import type { EmployeeInter } from '@/types/EmployeeInters'
export function _employeePage (page:number,pageSize:number,name:string) {
    return request({
        url: '/backend/employee/page',
        method: 'get',
        params: {page,pageSize,name}
    })
}

export function _employeeInfo(id:string) {
    return request({
        url: '/backend/employee/' + id,
        method: 'get',
    })
}

export function _saveEmployee(data: EmployeeInter) {
    return request({
        url: '/backend/employee',
        method: 'post',
        data: data
    })
}

export function _updateEmployee(data: EmployeeInter) {
    return request({
        url: '/backend/employee',
        method: 'put',
        data: data
    })
}
export function _validate(username: string, id: string){
    return request({
        url: '/backend/employee/validate',
        method: 'post',
        data: {
            username,
            id
        },
        showLoading: false
    })
}