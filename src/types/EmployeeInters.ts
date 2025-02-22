// 接口
export interface EmployeeInter {
    id?: string;
    username?: string;
    name?: string;
    password?: string;
    phone?: string;
    sex?: string;
    idNumber?: string;//身份证
    status?: string;
}

export interface loginFormInter {
    username: string;
    password: string;
    userKey: string;
    code?: string; // 数字字母验证码
    e_code?: string; // email验证码
    validateType: string
}
