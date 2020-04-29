
class Point {
    constructor (id,lon,lat) {
        
        this.id = id
        this.longitude = lon
        this.latitude = lat

    }

    draw (context,x,y,style) {

        context.beginPath()
        context.fillStyle = style.color ? style.color : "#c9d0de"
        // context.strokeStyle = '#555'
        context.lineWidth = .3
        let r = style.r ? style.r:8
        // context.arc(x, y, 4, 0, Math.PI * 2)
        context.arc(x, y, r, 0, Math.PI * 2)
        context.fill()
        context.stroke()
        context.closePath()
        
    }

    drawImg (context,x,y,imageObj) {
        context.drawImage(imageObj, x, y, 16, 16);

    }
    
}

export {Point}