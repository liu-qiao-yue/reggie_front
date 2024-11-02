import request from '@/js/request'

/**
 * 分页列表
 * @param page 第几页
 * @param pageSize 每页几条
 * @param name 菜品名称
 * @returns 
 */
export function _dishPage(page: number, pageSize: number, name: string) {
    const res = {
        "code": 1,
        "msg": null,
        "data": {
            "records": [
                {
                    "id": "1413385247889891331",
                    "name": "酸菜排骨",
                    "categoryId": "1847227623393320961",
                    "price": 50,
                    "code": "12345678987654321234t",
                    "image": "123123.jpg",
                    "description": "东北老师酸菜搭配黑龙江五常大米绝对嘎嘎的",
                    "status": 0,
                    "sort": 0,
                    "createTime": "2024-10-18 18:48:18",
                    "updateTime": "2024-10-19 12:14:54",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1413384757047271425",
                    "name": "王老吉",
                    "categoryId": "1413341197421846529",
                    "price": 500,
                    "code": "",
                    "image": "00874a5e-0df2-446b-8f69-a30eb7d88ee8.png",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-07-09 14:29:20",
                    "updateTime": "2021-07-12 09:09:16",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1413385247889891330",
                    "name": "米饭",
                    "categoryId": "1413384954989060097",
                    "price": 200,
                    "code": "",
                    "image": "ee04a05a-1230-46b6-8ad5-1a95b140fff3.png",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-07-09 14:31:17",
                    "updateTime": "2021-07-11 16:35:26",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1413342036832100354",
                    "name": "北冰洋",
                    "categoryId": "1413341197421846529",
                    "price": 500,
                    "code": "",
                    "image": "c99e0aab-3cb7-4eaa-80fd-f47d4ffea694.png",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-07-09 11:39:35",
                    "updateTime": "2021-07-09 15:12:18",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397862477831122945",
                    "name": "上汤焗龙虾",
                    "categoryId": "1397844391040167938",
                    "price": 108800,
                    "code": "1234567865432",
                    "image": "5b8d2da3-3744-4bb3-acdc-329056b8259d.jpeg",
                    "description": "上汤焗龙虾是一道色香味俱全的传统名菜，属于粤菜系。此菜以龙虾为主料，配以高汤制成的一道海鲜美食。本品肉质洁白细嫩，味道鲜美，蛋白质含量高，脂肪含量低，营养丰富。是色香味俱全的传统名菜。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:29:20",
                    "updateTime": "2021-05-27 10:29:20",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397862198033297410",
                    "name": "老火靓汤",
                    "categoryId": "1397844391040167938",
                    "price": 49800,
                    "code": "123456786532455",
                    "image": "583df4b7-a159-4cfc-9543-4f666120b25f.jpeg",
                    "description": "老火靓汤又称广府汤，是广府人传承数千年的食补养生秘方，慢火煲煮的中华老火靓汤，火候足，时间长，既取药补之效，又取入口之甘甜。 广府老火汤种类繁多，可以用各种汤料和烹调方法，烹制出各种不同口味、不同功效的汤来。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:28:14",
                    "updateTime": "2021-05-27 10:28:14",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397861683434139649",
                    "name": "清蒸河鲜海鲜",
                    "categoryId": "1397844391040167938",
                    "price": 38800,
                    "code": "1234567876543213456",
                    "image": "1405081e-f545-42e1-86a2-f7559ae2e276.jpeg",
                    "description": "新鲜的海鲜，清蒸是最好的处理方式。鲜，体会为什么叫海鲜。清蒸是广州最经典的烹饪手法，过去岭南地区由于峻山大岭阻隔，交通不便，经济发展起步慢，自家打的鱼放在锅里煮了就吃，没有太多的讲究，但却发现这清淡的煮法能使鱼的鲜甜跃然舌尖。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:26:11",
                    "updateTime": "2021-05-27 10:26:11",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397860963880316929",
                    "name": "脆皮乳鸽",
                    "categoryId": "1397844391040167938",
                    "price": 10800,
                    "code": "1234563212345",
                    "image": "3fabb83a-1c09-4fd9-892b-4ef7457daafa.jpeg",
                    "description": "“脆皮乳鸽”是广东菜中的一道传统名菜，属于粤菜系，具有皮脆肉嫩、色泽红亮、鲜香味美的特点，常吃可使身体强健，清肺顺气。随着菜品制作工艺的不断发展，逐渐形成了熟炸法、生炸法和烤制法三种制作方法。无论那种制作方法，都是在鸽子经过一系列的加工，挂脆皮水后再加工而成，正宗的“脆皮乳鸽皮脆肉嫩、色泽红亮、鲜香味美、香气馥郁。这三种方法的制作过程都不算复杂，但想达到理想的效果并不容易。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:23:19",
                    "updateTime": "2021-05-27 10:23:19",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397860792492666881",
                    "name": "烤乳猪",
                    "categoryId": "1397844391040167938",
                    "price": 38800,
                    "code": "213456432123456",
                    "image": "2e96a7e3-affb-438e-b7c3-e1430df425c9.jpeg",
                    "description": "广式烧乳猪主料是小乳猪，辅料是蒜，调料是五香粉、芝麻酱、八角粉等，本菜品主要通过将食材放入炭火中烧烤而成。烤乳猪是广州最著名的特色菜，并且是“满汉全席”中的主打菜肴之一。烤乳猪也是许多年来广东人祭祖的祭品之一，是家家都少不了的应节之物，用乳猪祭完先人后，亲戚们再聚餐食用。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:22:39",
                    "updateTime": "2021-05-27 10:22:39",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                },
                {
                    "id": "1397860578738352129",
                    "name": "白切鸡",
                    "categoryId": "1397844391040167938",
                    "price": 6600,
                    "code": "12345678654",
                    "image": "9ec6fc2d-50d2-422e-b954-de87dcd04198.jpeg",
                    "description": "白切鸡是一道色香味俱全的特色传统名肴，又叫白斩鸡，是粤菜系鸡肴中的一种，始于清代的民间。白切鸡通常选用细骨农家鸡与沙姜、蒜茸等食材，慢火煮浸白切鸡皮爽肉滑，清淡鲜美。著名的泮溪酒家白切鸡，曾获商业部优质产品金鼎奖。湛江白切鸡更是驰名粤港澳。粤菜厨坛中，鸡的菜式有200余款之多，而最为人常食不厌的正是白切鸡，深受食家青睐。",
                    "status": 1,
                    "sort": 0,
                    "createTime": "2021-05-27 10:21:48",
                    "updateTime": "2021-05-27 10:21:48",
                    "createUser": "1",
                    "updateUser": "1",
                    "isDeleted": 0
                }
            ],
            "total": 24,
            "size": 10,
            "current": 1,
            "orders": [],
            "optimizeCountSql": true,
            "hitCount": false,
            "countId": null,
            "maxLimit": null,
            "searchCount": true,
            "pages": 3
        },
        "map": {}
    }

    return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: res
          });
        }, 1000); // 模拟1秒的网络延迟
      });
    // return res;
    // return request({
    //     url: '/backend/dish/page',
    //     method: 'get',
    //     params: { page, pageSize, name }
    // })
}


/**
 * 删除接口
 * @param ids 
 * @returns 
 */
export function _deleteDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'delete',
        params: { ids }
    })
}


export function _editDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'put',
        params: { ids }
    })
}



export function _addDish(ids: string){
    return request({
        url: '/backend/dish',
        method: 'post',
        data: { ids }
    })
}



export function _queryDishById(id: string){
    return request({
        url: '/backend/' + id,
        method: 'get'
    })
}


export function _queryDishList(ids: string){
    return request({
        url: '/backend/dish/list',
        method: 'get',
        params: { ids }
    })
}
/**
 * 起售停售---批量起售停售接口
 * @param ids 
 * @param status 
 * @returns 
 */
export function _dishStatusByStatus(ids: string, status: string){
    return request({
        url: `/dish/status/${status}`,
        method: 'post',
        data: { ids: ids }
    })
}
