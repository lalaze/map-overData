import { Point } from './point'
import { ListEachCallback } from '../utils'

class PointDraw {
    constructor (map,data,ctx,width,height) {
        this.map = map
        // this.bindEvent();
        this.dataSet = this.initData(data)
        this.ctx = ctx
        this.width = width
        this.height = height
        // 变化的时候放旧数据的
        // this.oldDataSet = []
        this.render()
    }

    initData (data)　{
        
        let dataSet = []
        ListEachCallback(data,(item,index)=> {
            dataSet.push(new Point (item.id,item.lon,item.lat))
        })
        return dataSet
    }

    bindEvent () {
        var self = this;
        map.addEventListener('mousemove', function (e) {
            console.log('0.0')
            var cursor = 'default';
            ListEachCallback(self.dataSet,(item,index)=> {
                var result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= 5;
                console.log('0.0')
                if (result) {
                    console.log('事件')
                    cursor = 'pointer';
                    return false;
                }
            })
            map.setDefaultCursor(cursor);
        });
        map.addEventListener('mousedown', function (e) {
            ListEachCallback(self.dataSet,(item,index)=> {
                var result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= 5;
                console.log('0.0')
                if (result) {
                    console.log('事件')
                    return false;
                }
            })
        });
    }

    render () {
        this.draw()
    }

    draw ()　{
        // this.oldDataSet = []
        // ------------------------
        let self = this
        ListEachCallback(this.dataSet,(item,index)=> {
            self.ctx.save();
            item.draw(self.ctx, item.x, item.y);
            self.ctx.restore();
        })
    }
}

export  default PointDraw
