import PointDraw from './point/pointDraw'
import PolygonDraw from './polygon/polygonDraw'
import { ListEachCallback } from './utils'

// 这里只能用函数写法，因为我们的方法是重新定义在他百度地图的类上面的
// 而他上面是一个对象，不能使用class的继承写法

// function getPixelRatio(context) {
//     var backingStore = context.backingStorePixelRatio ||
//         context.webkitBackingStorePixelRatio ||
//         context.mozBackingStorePixelRatio ||
//         context.msBackingStorePixelRatio ||
//         context.oBackingStorePixelRatio ||
//         context.backingStorePixelRatio || 1;
//     return (window.devicePixelRatio || 1) / backingStore;
// };


function Draw (type,map,data,id)  {
    this.type = type
    this.map = map
    this.data = data
    // 这两个都在下面的initalize里面装
    // 实例化draw ，实例属性width，height，zoom
    this.pointDraw = ''
    this.polygonDraw = ''
    // 当前实例的ctx
    this.canvas = ''
    this.ctx = ''
    this.clickcallback = ''
    this.imageSrcObj = {}
    this.id = id?id : ''  
} 

Draw.prototype = new BMap.Overlay() 

Draw.prototype.click = function (callback) {
    this.clickcallback= callback
}

Draw.prototype.icon = function(obj) {
    this.imageSrcObj = obj
}

Draw.prototype.style = function(style) {
    this.style = style
}

// 缩放事件接口
Draw.prototype.zoom = function(callback) {
    this.zoomcallback = callback
}

Draw.prototype.initialize = function () {

    let canvas = document.createElement('canvas')
    this.canvas = canvas

    // let ratio = getPixelRatio(ctx)  

    //  解决图标模糊问题
    canvas.width   = this.map.getSize().width
    canvas.height  = this.map.getSize().height
    // canvas.width   = this.map.getSize().width*ratio
    // canvas.height  = this.map.getSize().height*ratio
    // let divWidth = 300 * ratio; // 用于内容居中
    // let divHeight = 300 * ratio; // 用于内容居中
    canvas.style.position = 'absolute'
    canvas.style.top = 0
    canvas.style.left = 0
    this.ctx = canvas.getContext('2d')
    
    if (this.type == "point") {
        this.pointDraw = new PointDraw(this.map,this.data,this.ctx,canvas.width,canvas.height,this.clickcallback,this.imageSrcObj,this.style,this.zoomcallback)
    } else if (this.type == "polygon") { 
        this.polygonDraw = new PolygonDraw(this.map,this.data,this.ctx,canvas.width,canvas.height,this.style,this.zoomcallback)
    }
    
    this.map.getPanes().labelPane.appendChild(canvas)

}

Draw.prototype.draw = function ()  {
    
    let bounds = this.map.getBounds() //返回当前视口的西南纬度/经度和东北纬度/经度
    let sw = bounds.getSouthWest()
    let ne = bounds.getNorthEast()
    let py = this.map.pointToOverlayPixel(new BMap.Point(sw.lng, ne.lat)) //经纬度转成屏幕坐标
    this.ctx.canvas.style.left = py.x + 'px'
    this.ctx.canvas.style.top = py.y + 'px'  

    // 地图变化的时候的核心数据处理
    let self = this

    if (this.type == "point") {
        this.ctx.clearRect(0, 0, this.pointDraw.width, this.pointDraw.height)
        this.pointDraw.zoom = this.map.getZoom
        ListEachCallback(this.pointDraw.dataSet,(item,index)=> {
            let px = self.map.pointToOverlayPixel(new BMap.Point(item.longitude, item.latitude))
            item.x = px.x - py.x
            item.y = px.y - py.y
        })
        this.pointDraw.render()
    } else if (this.type == "polygon") { 
        this.ctx.clearRect(0, 0, this.polygonDraw.width, this.polygonDraw.height)
        this.polygonDraw.zoom = this.map.getZoom
        ListEachCallback(this.polygonDraw.dataList,(item,index)=> {
            ListEachCallback(item.dataList,(item,index)=>{
                let px = self.map.pointToOverlayPixel(new BMap.Point(item.longitude, item.latitude))
                item.x = px.x - py.x
                item.y = px.y - py.y
            })
        })
        this.polygonDraw.render()
    }
}

export default Draw
