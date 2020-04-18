//entry.js

import  Draw  from './draw'

class MapData {

    constructor(type, map, data,png) {
        // 一长串参数检查
        let canvas = document.createElement('canvas')
        if (!(canvas.getContext)) {
            let msg = '改浏览器不支持canvas，无法使用本插件！'
            alert (msg)
            throw msg
        } else if (!(type && map && data)) {
            throw new TypeError('缺少参数或参数为空，请检查！', "mapData.js", 8) 
        } else if (type !== 'polygon' && type !== 'point') {
            throw new TypeError('不是指定的类型！', "mapData.js", 10) 
        } else if (!map.getMapType()) {
            throw new TypeError('没有百度地图实例！', "mapData.js", 10) 
        } else if (!$) {
            throw new TypeError('本插件依赖jquery，没有导入jquery！', "mapData.js", 10) 
        } 
        
        // 设置地图的一些默认属性
        map.setDraggingCursor('default');
        map.setDefaultCursor("default");
        map.addEventListener('resize', function () {
            var center = map.getCenter();
            map.setCenter(center);
        });
         //隐藏所有兴趣点，方便画图
        map.setMapStyle({
            styleId: '75e6bbd3eb890ad0d54760c200146b9d'
        });

        this.type = type
        this.map = map
        this.data = data

    }

    render () {

        if (this.type === 'point') {
            this.map.addOverlay(new Draw(this.type,this.map,this.data,this.callback,this.imageSrc));
        }

    }

    click(callback) {
        this.callback = callback
    }

    setImage(src) {
        this.imageSrc = src
    }

}

;! function (win) {
    win.MapData = MapData
}(window);