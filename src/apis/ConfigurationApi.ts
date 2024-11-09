import request from "@/js/request";
import type { Configuration } from "@/types/ConfigurationInter";

/**
 * 口味做法配置树
 * @param name 
 * @returns 
 */
export function _configTreeList(name: string, type:string) {
    return request({
        url: '/backend/flavor/configuration',
        method: 'post',
        data: { name, type }
    })
}

/**
 * 新增全部/二级
 * @param data 
 * @returns 
 */
export function _saveConfig(data: Configuration) {
    return request({
        url: '/backend/flavor/configuration/save',
        method: 'post',
        data: data
    })
}
