export interface ResetPasswordForm{
    oldPassword:string;
    newPassword:string;
    confirmPassword:string;
}

export interface ResetPasswordRequest{
    id:string;
    type:''|'change'|'reset'; //主动修改 | 管理员重置
    oldPassword?:string;
    newPassword?:string;
}