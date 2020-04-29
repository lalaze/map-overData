import { Polygon } from './polygon'
import { ListEachCallback } from '../utils'

class PolygonDraw {
    constructor (map,data,ctx,width,heigh,style,zoomCallback) {
        this.map = map
        this.dataList = this.initData(data)
        this.ctx = ctx
        this.width = width
        this.height = heigh
        this.style = style ? style : {}
        this.zoomCallback = zoomCallback
        this.bindEvent()
        this.render(this.style)
    }

    initData (data)　{

        let dataList = []
        let self = this
        ListEachCallback(data,(item,index)=> {
            dataList.push(new Polygon (item.list))
        })
        return dataList

    }

    bindEvent () { 
        let self = this
        // 滚动回调事件
        if (self.zoomCallback) {
            self.map.addEventListener("zoomend", function(e){
                self.zoomCallback(self.map)
            });
        }
       
    }

    render () {
        this.draw()
    }

    draw ()　{
        let self = this
        ListEachCallback(self.dataList,(item,index)=> {
            self.ctx.save()
            item.draw(self.ctx,item.dataList,self.style)
            self.ctx.restore()
        })
    }
}

export  default PolygonDraw
