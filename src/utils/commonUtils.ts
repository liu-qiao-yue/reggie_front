import CryptoJS from 'crypto-js';
export function encodePassword(pwd: string): string {
    return CryptoJS.MD5(pwd).toString();
}

export function getImage(image: string): string {
    return `/common/access?name=${image}`
}