import { _getCategoryList } from '@/apis/CategoryApi';
import { _configTreeList } from '@/apis/ConfigurationApi';
import type { Configuration } from '@/types/ConfigurationInter';
import CryptoJS from 'crypto-js';
import type { SelectInter } from '@/types/SelectInter';
export function encodePassword(pwd: string): string {
    return CryptoJS.MD5(pwd).toString();
}

export function getImage(image: string): string {
    return image ? `/backend/common/access?name=${image}` : ''
}

export async function getCategoryList(type: number): Promise<SelectInter[]>{
    const { data } = await _getCategoryList(type);
    if (data.code === 1) {
        return preprocessConfiguration(data.data)
    }
    return []
};

export async function getFlavorConfigList(): Promise<SelectInter[]>{
    const { data } = await _configTreeList('', '0');
    if (data.code === 1) {
        return preprocessConfiguration(data.data)

    }
    return []
};

export function preprocessConfiguration(config: Configuration[]): SelectInter[] {
    return config.map((data: Configuration) => {
        const item:SelectInter = {
            label: data.name,
            value: data.id
        }
        if (data.children) {
            item.children = preprocessConfiguration(data.children)
        }
        return item
    })
}

export function getOrdersStatus(status: number):string{
    if(status === null){
        return '未知订单状态'
    }
    //1待付款，2待派送，3已派送，4已完成，5已取消
    switch(status){
        case 1:
            return '待付款'
        case 2:
            return '待派送'
        case 3:
            return '已派送'
        case 4:
            return '已完成'
        case 5:
            return '已取消'
        default:
            return '未知订单状态'
    }
}