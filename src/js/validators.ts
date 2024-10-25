import type { ResetPasswordForm } from "@/types/ResetPasswordForm";

export function validatePasswordRegex(rule: unknown, value: string, callback: (arg0: Error | undefined) => void) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      callback(new Error('密码至少8位，必须包含数字、字母和特殊符号'));
    } else {
      callback(undefined);
    }
  }
  
  export function validateConfirmPassword(passwordForm:ResetPasswordForm) {
    return (rule: unknown, value: string, callback: (arg0: Error | undefined) => void) => {
      if (value !== passwordForm.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback(undefined);
      }
    };
  }

  export function validatePhone (rule: unknown, value: string, callback: (arg0: Error | undefined) => void){
    const phoneReg = /^1(3|4|5|6|7|8)\d{9}$/;
    if (!phoneReg.test(value)) {
      callback(new Error("请输入正确的手机号"))
    } else {
      callback(undefined)
    }
  }

  export function validateIdNumber (rule: unknown, value: string, callback: (arg0: Error | undefined) => void){
    const phoneReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!phoneReg.test(value)) {
      callback(new Error("请输入正确的身份证号"))
    } else {
      callback(undefined)
    }
  }


  export function defaultValidate (rule: unknown, value: string, callback: (arg0: Error | undefined) => void){
      callback(undefined)
  }