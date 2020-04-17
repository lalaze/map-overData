import { Point } from './point'
import { ListEachCallback } from '../utils'

class PointDraw {
    constructor (map,data,ctx) {
        this.map = map
        this.bindEvent();
        this.dataSet = initData(data)
        this.ctx
        // 变化的时候放旧数据的
        // this.oldDataSet = []
    }

    initData (data)　{
        let dataSet = []
        ListEachCallback(data,(item,index)=> {
            dataSet.push(new Point ({
                id:item.id,
                lon:item.lon,
                lat:item.lat
            }))
        })
        return dataSet
    }

    bindEvent () {
        var self = this;
        map.addEventListener('mousemove', function (e) {
            var cursor = 'default';
            self.dataSet.each(function (i, data) {
                var result = Math.sqrt(Math.pow(e.clientX - data.x, 2) + Math.pow(e.clientY - data.y, 2)) <= 5;
                if (result) {
                    console.log('事件')
                    cursor = 'pointer';
                    return false;
                }
            });
            map.setDefaultCursor(cursor);
        });
        map.addEventListener('mousedown', function (e) {
            paint.dataSet.each(function (i, data) {
                var result = Math.sqrt(Math.pow(e.clientX - data.x, 2) + Math.pow(e.clientY - data.y, 2)) <= 5;
                if (result) {
                    console.log('事件')
                    return false;
                }
            });
        });
    }

    render () {
        this.draw()
    }

    draw ()　{
        // this.oldDataSet = []
        // ------------------------
        let self = this.ctx
        ListEachCallback(this.dataSet,(item,index)=> {
            ctx.save();
            item.draw(self.ctx, item.x, item.y);
            ctx.restore();
        })
    }
}

export {
    PointDraw
}