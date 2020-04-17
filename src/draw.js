import PointDraw from './point/pointDraw'
import { ListEachCallback } from './utils'

// 这里只能用函数写法，因为我们的方法是重新定义在他百度地图的类上面的
// 而他上面是一个对象，不能使用class的继承写法

function Draw (type,map,data)  {
    this.type = type
    this.map = map
    this.data = data
    // 这两个都在下面的initalize里面装
    // 实例化draw ，实例属性width，height，zoom
    this.pointDraw = ''
    // 当前实例的ctx
    this.ctx = ''
} 

Draw.prototype = new BMap.Overlay() 

Draw.prototype.initialize = function () {
    let canvas = document.createElement('canvas')

    canvas.width   = this.map.getSize().width
    canvas.height  = this.map.getSize().height
    canvas.style.position = 'absolute'
    canvas.style.top = 0
    canvas.style.left = 0

    this.ctx = canvas.getContext('2d')
    this.pointDraw = new PointDraw(this.map,this.data,this.ctx,canvas.width,canvas.height)
    this.map.getPanes().labelPane.appendChild(canvas)
}

Draw.prototype.draw = function ()  {
    
    let bounds = this.map.getBounds() //返回当前视口的西南纬度/经度和东北纬度/经度
    let sw = bounds.getSouthWest()
    let ne = bounds.getNorthEast()
    let py = this.map.pointToOverlayPixel(new BMap.Point(sw.lng, ne.lat)) //经纬度转成屏幕坐标
    this.ctx.canvas.style.left = py.x + 'px'
    this.ctx.canvas.style.top = py.y + 'px'
    this.ctx.clearRect(0, 0, this.pointDraw.width, this.pointDraw.height);
    this.pointDraw.zoom = this.map.getZoom

    // 地图变化的时候的核心数据处理
    let self = this
    ListEachCallback(this.pointDraw.dataSet,(item,index)=> {
        let px = self.map.pointToOverlayPixel(new BMap.Point(item.lon, item.lat));
        item.x = px.x - py.x;
        item.y = px.y - py.y;
    })

    this.pointDraw.render()

}

export default Draw
