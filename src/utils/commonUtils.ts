import { _getCategoryList } from '@/apis/CategoryApi';
import { _flavorConfigList } from '@/apis/FlavorConfigurationApi';
import type { Category } from '@/types/CategoryInter';
import type { FlavorConfiguration } from '@/types/FlavorConfiguration';
import CryptoJS from 'crypto-js';
export function encodePassword(pwd: string): string {
    return CryptoJS.MD5(pwd).toString();
}

export function getImage(image: string): string {
    return image ? `/backend/common/access?name=${image}` : ''
}

export async function getDishList() {
    const { data } = await _getCategoryList(1);
    if (data.code === 1) {
        return data.data.map((data: Category) => {
            return {
                label: data.name,
                value: data.id
            }
        })
    }
};

export async function getFlavorConfigList() {
    const { data } = await _flavorConfigList('');
    if (data.code === 1) {
        return data.data.map((data: FlavorConfiguration) => {
            return {
                label: data.name,
                value: data.id,
                children: data.children.map((j: FlavorConfiguration) => {
                    return {
                        label: j.name,
                        value: j.id
                    }
                })
            }
        })

    }
};