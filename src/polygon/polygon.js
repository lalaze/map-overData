import { ListEachCallback } from '../utils'

class Polygon {

    constructor (dataList) {
        this.dataList = dataList
    }
    
    draw (context,listData) {

        context.beginPath()
        context.strokeStyle ="#ea86c2"

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