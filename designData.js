// 还没有数据，先行设计数据格式  都是json格式

// 工程地点的数据格式
var pData = {
    // 。。。。一些响应状态参数等
    "data" : [
        // id用于点击气泡的时候发起请求
        {id:'1',longitude:'115.....',latitude:'11.26666'},
        {id:'2',longitude:'115.....',latitude:'11.26666'}
        // ...
    ],
}

// 电子围栏的数据格式
var dData = {
    // 。。。。一些响应状态参数等
    "data" : [
        // 不用发请求，直接四个点
        [{longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'},
        {longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'}],

        [{longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'},
        {longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'}],
        
        [{longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'},
        {longitude:'115.....',latitude:'11.26666'},{longitude:'115.....',latitude:'11.26666'}],
        // ...
    ],
}

// 车辆的数据格式
var cData = {
     // 。。。。一些响应状态参数等
     "data" : [
        // id用于点击气泡的时候发起请求
        {id:'1',longitude:'115.....',latitude:'11.26666'},
        {id:'2',longitude:'115.....',latitude:'11.26666'}
        // ...
    ],
}

