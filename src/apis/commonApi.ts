import request from '@/js/request'
import type { EmployeeInter } from '@/types/EmployeeInters'
import type { ResetPasswordRequest } from '@/types/ResetPasswordForm'

export function _loginIn (_params:EmployeeInter) {
    return request({
        url: '/backend/employee/login',
        method: 'post',
        data: _params
    })
}

export function _loginOut () {
    return request({
        url: '/backend/employee/logout',
        method: 'post'
    })
}

export function _changePassword (_params:ResetPasswordRequest) {
    return request({
        url: '/backend/employee/changePassword',
        method: 'post',
        data: _params
    })
}