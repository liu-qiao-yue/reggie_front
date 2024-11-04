import request from "@/js/request";


export function _flavorConfigList(name: string) {
    return request({
        url: '/backend/flavor/configuration',
        method: 'post',
        params: { name }
    })
}
