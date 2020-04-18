import { Point } from './point'
import { ListEachCallback,Event } from '../utils'

class PointDraw {
    constructor (map,data,ctx,width,height,clickCallback,imageSrc) {
        this.map = map
        this.bindEvent()
        this.dataSet = this.initData(data)
        this.ctx = ctx
        this.width = width
        this.height = height
        this.clickCallback = clickCallback 
        this.imageSrc = imageSrc
        // 变化的时候放旧数据的
        // this.oldDataSet = []
        this.render()
    }

    initData (data)　{
        
        let dataSet = []
        let self = this
        ListEachCallback(data,(item,index)=> {
            dataSet.push(new Point (item.id,item.lon,item.lat))
        })
        return dataSet

    }

    bindEvent () {
        let self = this
        map.addEventListener('mousemove', function (e) {
            let cursor = 'default'
            ListEachCallback(self.dataSet,(item,index)=> {
                let option = self.imageSrc ? 25 : 10
                let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                if (result) {
                    cursor = 'pointer'
                    return false
                }
            })
            map.setDefaultCursor(cursor)
        })
        map.addEventListener('mousedown', function (e) {
            ListEachCallback(self.dataSet,(item,index)=> {
                let option = self.imageSrc ? 25 : 10
                let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                if (result ) {
                   self.clickCallback(item,self.map)
                }
            })
        })
    }

    render () {
        this.draw()
    }

    draw ()　{
        // this.oldDataSet = []
        // ------------------------
        let self = this
        let imgObj = new Image()
        if (self.imageSrc) {
            imgObj.src = self.imageSrc
            imgObj.onload = function(){
                ListEachCallback(self.dataSet,(item,index)=> {
                    item.drawImg(self.ctx, item.x, item.y,imgObj)
                })
            }
        } else {
            ListEachCallback(self.dataSet,(item,index)=> {
                self.ctx.save()
                item.draw(self.ctx, item.x, item.y)
                self.ctx.restore()
            })
        }
    }
}

export  default PointDraw
