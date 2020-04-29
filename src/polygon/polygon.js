import { ListEachCallback } from '../utils'

class Polygon {

    constructor (dataList) {
        this.dataList = dataList
    }
    
    draw (context,listData,style) {

        context.beginPath()
        context.strokeStyle = style.color ? style.color : "#c9d0de"
        context.lineWidth = style.width ? style.width : 1

        ListEachCallback(listData,(item,index)=> {
            if (index == 0) {
                context.moveTo(item.x,item.y)
            } else {
                context.lineTo(item.x,item.y)
            }
        })

        context.closePath();
        context.stroke();

    }
}

export {Polygon}