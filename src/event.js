//  必须要抽一个事件处理器统一处理地图事件

class Event {
    constructor(map) {
        this.map
        this.clickCallback = {}
        this.zoomCallback = {}
        this.mousemoveCallback = {}
        this.dataSet = {}
    }

    bindEvent() {
        let self = this
        // 移动事件
        self.map.addEventListener('mousemove', function (e) {
            let cursor = 'default'
            ListEachCallback(self.dataSet[this.id], (item, index) => {
                // let option = self.imageSrc ? 25 : 10
                let option = 16
                let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                if (result) {
                    console.log(result)
                    cursor = 'pointer'
                    return false
                }
            })
            map.setDefaultCursor(cursor)
        })
        // 点击事件
        if (self.clickCallback) {
            self.map.addEventListener('mousedown', function (e) {

                ListEachCallback(self.dataSet, (item, index) => {
                    // let option = self.imageSrc ? 25 : 10
                    let option = 16
                    // 地图上的事件点击点与图标点有差别
                    // x差10 的样子，y差30的样子，目前不知道原因，手动给他修复
                    // 是因为他上部有元素！！！！canvas定位的时候拿的位置与地图不符合
                    let result = Math.sqrt(Math.pow(e.clientX - item.x, 2) + Math.pow(e.clientY - item.y, 2)) <= option
                    if (result) {
                        self.clickCallback(item, self.map)
                    }
                })

            })
        }
        // zoom事件
        if (self.zoomCallback) {
            // 滚动回调事件
            self.map.addEventListener("zoomend", function (e) {
                self.zoomCallback(self.map)
            });
        }
    }

    addData(id, data) {
        this.dataList[id] = data
    }

    addEvent(type,id,callback) {
        this['type'+Callback][id] = callback
    }



    
}