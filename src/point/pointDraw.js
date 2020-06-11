import { Point } from './point'
import { ListEachCallback } from '../utils'

class PointDraw {
    constructor (map,data,ctx,width,height,clickCallback,imageSrcObj,style,zoomCallback) {
        this.map = map
        this.dataSet = this.initData(data)
        this.ctx = ctx
        this.width = width
        this.height = height
        this.clickCallback = clickCallback 
        this.imageSrcObj = imageSrcObj
        this.style = style ? style : {}
        this.zoomCallback = zoomCallback
        this.bindEvent()
        this.render(this.style)
    }

    initData (data)　{
        
        let dataSet = []
        let self = this
        ListEachCallback(data,(item,index)=> {
            dataSet.push(new Point (item.id,item.longitude,item.latitude))
        })
        return dataSet

    }

    bindEvent () {
        let self = this
        self.map.addEventListener('mousemove', function (e) {
            // let cursor = 'default'
        
            ListEachCallback(self.dataSet,(item,index)=> {
                let option = 16
                let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                if (result) {
                    // cursor = 'pointer'
                    let cursor = 'pointer'
                    self.map.setDefaultCursor(cursor)
                    return false
                }else {
                    let cursor = 'default'
                    self.map.setDefaultCursor(cursor)
                }
            })
            
        })
        if (self.clickCallback) {
            self.map.addEventListener('mousedown', function (e) {
                ListEachCallback(self.dataSet,(item,index)=> {
                    // let option = self.imageSrcObj ? 25 : 10
                    let option = 16 
                    // 地图上的事件点击点与图标点有差别
                    // x差10 的样子，y差30的样子，目前不知道原因，手动给他修复
                    // 是因为他上部有元素！！！！canvas定位的时候拿的位置与地图不符合
                    let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                    if (result) {
                        self.clickCallback(item,self.map)
                    }
                })
                
            })
        }
        if (self.zoomCallback) {
             // 滚动回调事件
            self.map.addEventListener("zoomend", function(e){
                self.zoomCallback(self.map)
            });
        }
       
    }

    render () {
        this.draw()
    }

    draw ()　{
        // this.oldDataSet = []
        // ------------------------
        let self = this
        let imgObj = new Image()
        if (self.imageSrcObj) {
            imgObj.src = self.imageSrcObj.url
            self.imageSrcObj.imgObj = imgObj
            imgObj.onload = function(){
                ListEachCallback(self.dataSet,(item,index)=> {
                    item.drawImg(self.ctx, item.x, item.y,self.imageSrcObj)
                })
            }
        } else {
            ListEachCallback(self.dataSet,(item,index)=> {
                self.ctx.save()
                item.draw(self.ctx, item.x, item.y,self.style)
                self.ctx.restore()
            })
        }
    }
}

export  default PointDraw
