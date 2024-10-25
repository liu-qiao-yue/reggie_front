export interface MenuInter{
    id?:string,
    path:string,
    title?:string,
    icon?:string,
    disabled?:boolean
}

// 定义一个自定义类型Persons
export type Menus = Array<MenuInter>