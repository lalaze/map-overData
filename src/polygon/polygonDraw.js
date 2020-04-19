import { Polygon } from './polygon'
import { ListEachCallback } from '../utils'

class PolygonDraw {
    constructor (data,ctx,width,heigh) {
        
        this.dataList = this.initData(data)
        this.ctx = ctx
        this.width = width
        this.height = heigh
        
        this.render()
    }

    initData (data)　{

        let dataList = []
        let self = this
        ListEachCallback(data,(item,index)=> {
            dataList.push(new Polygon (item.list))
        })
        return dataList

    }

    render () {
        this.draw()
    }

    draw ()　{
        let self = this
        ListEachCallback(self.dataList,(item,index)=> {
            self.ctx.save()
            item.draw(self.ctx,item.dataList)
            self.ctx.restore()
        })
    }
}

export  default PolygonDraw
