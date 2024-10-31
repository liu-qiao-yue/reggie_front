export interface ResetPasswordForm{
    oldPassword:string;
    password:string;
    confirmPassword:string;
}

export interface ResetPasswordRequest{
    id?:string;
    type:''|'change'|'reset'; //主动修改 | 管理员重置
    oldPassword?:string;
    password?:string;
}

export interface ForgotPasswordForm extends ForgotPasswordRequest{
    confirmPassword: string;
}

export interface ForgotPasswordRequest {
    name: string;
    username: string;
    idNumber: string;
    type: 'forgot';
    password: string;
}
