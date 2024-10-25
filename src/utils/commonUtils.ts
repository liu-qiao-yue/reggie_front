import CryptoJS from 'crypto-js';
export default function encodePassword(pwd:string){
    return CryptoJS.MD5(pwd).toString();
}