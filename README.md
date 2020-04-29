# map-overData

## 介绍

这个东西主要是为了往百度地图上画东西，要求大量数据不要卡，所以写了

目前效果就只有两种

![JlHkNV.png](http://zezeze-note.oss-cn-hongkong.aliyuncs.com/%E7%AC%94%E8%AE%B0%E6%88%AA%E5%9B%BE/JlTXQJ.png?OSSAccessKeyId=LTAI4GCeVHegRoadhkK6mc12&Expires=1588156491&Signature=yDUpom6NpxH3X7xLFMN%2BGzBPiWY%3D)

可以看到是画图标与画多变形，这里是取随机数，所以有点乱问题不大，同时还有点击事件

![JlqHB9.png](http://zezeze-note.oss-cn-hongkong.aliyuncs.com/%E7%AC%94%E8%AE%B0%E6%88%AA%E5%9B%BE/JlqHB9.png?OSSAccessKeyId=LTAI4GCeVHegRoadhkK6mc12&Expires=1588156518&Signature=emY%2B%2Fui8sbF7NaHn7IYDAQVAi4c%3D)

完整例子在test文件夹

## 实例

 地图显示比较多数据的功能

 基本功能比较完善，写个文档

是依赖百度地图的，所以要先引入百度地图

先看个demo，在test文件夹里面有

```javascript
var map = new BMap.Map("map", {
    enableMapClick: false
}); 
map.centerAndZoom(new BMap.Point(113.300251, 22.810862), 13);
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
var mapData = new MapData(map)
$.ajax({
    url: 'http://localhost:8080/lapi/data1',
    success: function (res) {
        var example1 = mapData.createDraw('point', res, 'cheche')
        mapData.render(example1)

    }
})
```

前面就是创建百度地图实例然后设置中心点，十分简单

重点是后面

```javascript
var mapData = new MapData(map) // 创建实例
```

然后拿数据，数据的类型是

```javascript
[{
    "id": "1",  // 为什么会有id后面会说
    "lon": "113.303037",
    "lat": "22.76938"
}
....  // 后面重复
]
```

然后创建画布用实例渲染画布

```javascript
 var example1 = mapData.createDraw('point', res, 'cheche') // 创建画布
 mapData.render(example1) // 渲染画布
```

大功告成

感觉是不是很简单呢(并不)

![JlTXQJ.png](http://zezeze-note.oss-cn-hongkong.aliyuncs.com/%E7%AC%94%E8%AE%B0%E6%88%AA%E5%9B%BE/JlHP7q.png?OSSAccessKeyId=LTAI4GCeVHegRoadhkK6mc12&Expires=1588156596&Signature=BB1E%2F9PTSonY05roUPBvkImavYM%3D)

## api

- new MapData(map)  

  创建实例，需要传入百度地图实例

- createDraw(type,data,id)

参数：type，data，id

```javascript
// 目前就只有两个type参数point与polygon
var example1 = mapData.createDraw('point', res, 'cheche') // 点
var example2 = mapData.createDraw('polygon', res) // 多边形

// 如果有id，返回的canvas会自带id

console.log(example1.id) // cheche
```

- click(callback)

点击触发的回调函数，point专用

```javascript
// 点击返回函数
example1.click(function (item, map) {
    var point = new BMap.Point(item.lon, item.lat);
    var marker = new BMap.Marker(point);
    $.ajax({
        url: 'http://localhost:8080/mapi/clickData?id=' + item.id,
        type: 'get',
        success: function (res) {
            var sContent = res.data.data;
            var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, point); //开启信息窗口
        }
    })
})

// 点击的时候会触发这个函数，函数有两个参数，一是item此条数据的对象，二是map地图实例，前面为什么要id呢，就是为了触发事件哒
```

- icon

点的图标，point专用

```javascript
example1.icon("https://s1.ax1x.com/2020/04/17/JZku8K.png")
```

- 切换类方法
  - switchCanvas()  默认切换展示
  - seitchCanvasById()  根据id切换展示
  - allCanvasShow()  全部展示
  - allCanvasHide()  全部隐藏

- 缓存

在实例里面有当前画布实例的缓存可以操作

```javascript
console.log(mapData)
```

[![J19BaF.png](http://zezeze-note.oss-cn-hongkong.aliyuncs.com/%E7%AC%94%E8%AE%B0%E6%88%AA%E5%9B%BE/J19BaF.png?OSSAccessKeyId=LTAI4GCeVHegRoadhkK6mc12&Expires=1588156647&Signature=gvnyc9Wq4PHeCkLFHnYwPc0Xmio%3D)](https://imgchr.com/i/J19BaF)

## 后续要完善的功能

- 搜索显示入口
- 画笔样式自定义接口