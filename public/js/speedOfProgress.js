var rangeValue
var nowRange

var speedOfProgress = function (num, speed, callback) {
    var self = this;
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');
    // var range = num;
   
    this.go = true;
    this.num = num;
    this.speed = speed;
    this.endDraw = false;
    this.data = "";
    this.run = function(){
        if(!self.go) return
        self.num++;
        if(self.num>=50){

        }else{
          setTimeout(self.run,self.speed);
        }
        
    }
    this.setGo = function(){
        this.go = false;
    }
    this.end = function(data){
        self.data = data ===undefined? self.data:data;
        self.num++
        if(self.num<=100){
            setTimeout(self.end,10);
        }
    }
    this.removeElement= function(){
        this.go = false;
        this.endDraw = true;
        if(document.getElementById("c")){
            document.getElementById("c").remove();
            document.getElementById("mengban").remove();
            document.getElementById("text").remove()
        }
    }
    function clearElement(){
        setTimeout(()=>{
            document.getElementById("c").remove();
            document.getElementById("mengban").remove();
            document.getElementById("text").remove();
        },1000)
        callback(self.data)
    }
    rangeValue = self.num;
    nowRange = self.num; //用于做一个临时的range

    //画布属性
    var mW = canvas.width = 250;
    var mH = canvas.height = 250;
    var lineWidth = 2;

    //圆属性
    var r = mH / 2; //圆心
    var cR = r - 16 * lineWidth; //圆半径

    //Sin 曲线属性
    var sX = 0;
    var sY = mH / 2;
    var axisLength = mW; //轴长
    var waveWidth = 0.015; //波浪宽度,数越小越宽 
    var waveHeight = 6; //波浪高度,数越大越高
    var speed = 0.09; //波浪速度，数越大速度越快
    var xOffset = 0; //波浪x偏移量

    ctx.lineWidth = lineWidth;

    //画圈函数
    var IsdrawCircled = false;
    var drawCircle = function () {

        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.arc(r, r, cR + 5, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        ctx.clip();

    }

    //画sin 曲线函数
    var drawSin = function (xOffset) {
        ctx.save();

        var points = []; //用于存放绘制Sin曲线的点

        ctx.beginPath();
        //在整个轴长上取点
        for (var x = sX; x < sX + axisLength; x += 20 / axisLength) {
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = -Math.sin((sX + x) * waveWidth + xOffset);

            var dY = mH * (1 - nowRange / 100);

            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
        }

        //封闭路径
        ctx.lineTo(axisLength, mH);
        ctx.lineTo(sX, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.fillStyle = '#1c86d1';
        ctx.fill();

        ctx.restore();
    };

    //写百分比文本函数
    var drawText = function () {
        ctx.save();

        var size = 0.4 * cR;
        ctx.font = size + 'px Microsoft Yahei';
        ctx.textAlign = 'center';
        ctx.fillStyle = "#fff";
        ctx.fillText(~~nowRange + '%', r, r + size / 2);

        ctx.restore();
    };

    var render = function () {
        if(self.num >100){
            self.num = 100;
        }
        if(self.endDraw || self.num>100) return;
        
        ctx.clearRect(0, 0, mW, mH);

        rangeValue = self.num;

        if (IsdrawCircled == false) {
            drawCircle();
        }

        if (nowRange <= rangeValue) {
            var tmp = 1;
            nowRange += tmp;
        }

        if (nowRange > rangeValue) {
            var tmp = 1;
            nowRange -= tmp;
        }

        drawSin(xOffset);
        drawText();

        xOffset += speed;
        
        if(self.num==100)
        {
            clearElement()
            self.endDraw = true;
        } 
        requestAnimationFrame(render);
    }
    this.start = function(num){
        self.num = num;
        self.go = true;
        self.run();
    }
    render();
    self.run();
}
