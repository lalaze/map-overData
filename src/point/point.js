
class Point {
    constructor (id,lon,lat) {
        
        this.id = id
        this.lon = lon
        this.lat = lat

    }

    draw (context,x,y) {

        context.beginPath()
        context.fillStyle = '#ea86c2'
        context.strokeStyle = '#555'
        context.lineWidth = .3
        // context.arc(x, y, 4, 0, Math.PI * 2)
        context.arc(x, y, 8, 0, Math.PI * 2)
        context.fill()
        context.stroke()
        context.closePath()
        
    }

    drawImg (context,x,y,imageObj) {
        context.drawImage(imageObj, x, y, 16, 16);

    }
}

export {Point}