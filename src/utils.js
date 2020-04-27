// 数组循环，然后执行这个call函数
let ListEachCallback = (list,callback) => {
    list.forEach((item,index) => {
        callback(item,index)
    });
}

export {
    ListEachCallback
}