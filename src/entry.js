//entry.js

import  Draw  from './draw'

class MapData {

    constructor(map) {
        
        // 一长串参数检查
        let canvas = document.createElement('canvas')
        if (!(canvas.getContext)) {
            let msg = '改浏览器不支持canvas，无法使用本插件！'
            alert (msg)
            throw msg
        } else if (!map.getMapType()) {
            throw new TypeError('没有百度地图实例！', "mapData.js", 10) 
        } else if (!$) {
            throw new TypeError('本插件依赖jquery，没有导入jquery！', "mapData.js", 10) 
        } 
        
        // 设置地图的一些默认属性
        map.setDraggingCursor('default')
        map.setDefaultCursor("default")
        map.addEventListener('resize', function () {
            var center = map.getCenter()
            map.setCenter(center)
        })
       
        this.map = map
        
        //  缓存 
        this.cache = []       

    }

    render (example) {
      
        this.map.addOverlay(example)

    }

    createDraw(type,data,id) {

        if (!(type && map && data)) {
            throw new TypeError('缺少参数或参数为空，请检查！', "mapData.js", 8) 
        } else if (type !== 'polygon' && type !== 'point') {
            throw new TypeError('不是支持的类型！', "mapData.js", 10) 
        }
        let example = new Draw(type,this.map,data,id)
        this.cache.push(example)
        return example

    }

    switchCanvas () {
        let index = ''
        this.cache.forEach((item,i)=> {
            if (item.canvas.style.display == 'none') {
                index = i
            }
        })
        if (index !== '') {
            if (index+1 == this.cache.length) {
                this.cache[index].canvas.style.display = ''
                this.cache[0].canvas.style.display = 'none'
            } else {
                this.cache[index].canvas.style.display = ''
                this.cache[index+1].canvas.style.display = 'none'
            }
        } else {
            this.cache[0].canvas.style.display = 'none'
        }
    }

    allCanvasShow() {
        this.cache.forEach((item,i)=> {
            item.canvas.style.display = ''
        })
    }

    allCanvasHide() {
        this.cache.forEach((item,i)=> {
            item.canvas.style.display = 'none'
        })
    }

    swidthCanvasById(id) {
        this.cache.forEach((item,i)=> {
            if (item.id == id) {
                if (this.cache[i].canvas.style.display == 'none') {
                    this.cache[i].canvas.style.display = ''
                }else {
                    this.cache[i].canvas.style.display = 'none'
                }
            }
        })
    }


}

! function (win) {
    win.MapData = MapData
}(window)