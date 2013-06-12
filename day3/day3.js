function test_clear(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.clearRect(0,0,JQcanvas.width(),JQcanvas.height());
}

function test_line(){
    var JQcanvas = $('#test:first');
    var DOMcanvas = JQcanvas[0];//canvas from JQ is a list of DOM object in this case there is only one object
    var ctx = DOMcanvas.getContext('2d');//object to draw line circle|| in order to have properties of canvas
    
    ctx.beginPath();
    ctx.lineJoin="round";
    ctx.moveTo(50,50);
    ctx.lineTo(150,50);
    ctx.lineTo(150,150);
    ctx.lineTo(50,150);
    ctx.lineTo(50,50);
    ctx.lineWidth=10;
    ctx.strokeStyle = "red";
    ctx.lineCap="round"
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
}

function test_star(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    var out=Math.PI/2;
    var inn=Math.PI/2-Math.PI/5;
    ctx.beginPath();
    for(var i = 0; i<5;i++){
        ctx.moveTo(polar_x(70,out),polar_y(70,out));
        ctx.lineTo(polar_x(40,inn),polar_y(40,inn));
        out-=2*Math.PI/5;
        ctx.lineTo(polar_x(70,out),polar_y(70,out));
        inn-=2*Math.PI/5;
    }
    ctx.lineTo(polar_x(70,Math.PI/2),polar_y(70,Math.PI/2));
    ctx.stroke();
    
}
function polar_x(r,ang){
    return -r*Math.cos(ang)+100;
}
function polar_y(r,ang){
    return -r*Math.sin(ang)+100;
}

function test_smiley(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');

    ctx.beginPath();
    //cx,cy,radius,sangle,eangle
    ctx.arc(100,100,75,0,2*Math.PI);
    ctx.fillStyle= "yellow";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(75,75,5,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(125,75,5,0,2*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(100,125,25,2*Math.PI,Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(100,100,75,0,2*Math.PI);
    ctx.arcWidth=30;
    ctx.stroke();
}

function test_rec(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    ctx.beginPath();
    
}

function test_text(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.font="20px Georgia";
    ctx.textAlign="center";//left right
    ctx.textBeseline = "middle";// top bottom
    
    ctx.fillText("Hi!",100,100);
}

function test_mouse(){
    var JQcanvas = $('#test:first');//first thing that has tag
    var DOMcanvas = JQcanvas[0];
    var ctx = DOMcanvas.getContext('2d');
    
    var bg_image = $("<canvas></canvas>")[0]; //DOM object
    bg_image.width = 200;
    bg_image.height = 200;
    var bctx = bg_image.getContext('2d');
    bctx.fillStyle="#FF00FF";
    bctx.fillRect(10,10,100,100);
    
    //image,x,y
    ctx.drawImage(bg_image,0,0);
    
    JQcanvas.on("mousemove",function(event){
        var mx = event.pageX;
        var my = event.pageY;
        var offset = JQcanvas.offset();//{left: ..., top: ...}
        mx = Math.round(mx-offset.left);
        my=Math.round(my-offset.top);
        
        ctx.clearRect(0,0,200,200);//clear older one
        ctx.drawImage(bg_image,0,0);
        
        ctx.beginPath();
        ctx.moveTo(mx-10,my);
        ctx.lineTo(mx+10,my);
        ctx.moveTo(mx,my-10);
        ctx.lineTo(mx,my+10);
        ctx.stroke();
    })
}

//Create a fake module like python to make it unaccessible from outside if not import
var calculator = (function(){
    var exports={};
    function foo(a,b) {
        return bar(a)+b;
    }
    exports.foo=foo;//make it accessible from outside
    
    function bar(a){
        return a+1;
    }
    return exports;
}());

/* this is how to import and use
<script src="calculator.js"></script>
...calculator.foo(3,4)...
*/