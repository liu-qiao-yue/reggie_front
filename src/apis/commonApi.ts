import request from '@/js/request'
import type { EmployeeInter } from '@/types/EmployeeInters'
import type { ForgotPasswordRequest, ResetPasswordRequest } from '@/types/PasswordForm'

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

export function _forgotPassword (_params:ForgotPasswordRequest) {
    return request({
        url: '/backend/employee/forgotPassword',
        method: 'post',
        data: _params
    })
}

export function _deleteFile (filename:string) {
    return request({
        url: '/backend/common/delete',
        method: 'delete',
        params: { filename }
    })
}