var graphcalc = (function(){
    var exports={};//accessible from outside
    function graph(canvas,functionInp,min,max){
        var tree= calculator.parse(functionInp);
        var output=[];
        for(var i=0;i<canvas.width;i++){
            var value=calculator.evaluate(tree,{x:min+i/(1.0*min+max),e:Math.e,pi:Math.PI});//1.0* to make it floating
            output.push(value);
        }
        var dom=canvas[0];
        var ctx = dom.getContext('2d');

        var maxx=Math.max.apply(Math, output);//max amp
        var minn=Math.min.apply(Math,output);//min amp
            
        var gcanvas = $("<canvas></canvas>")[0]; //DOM object
        gcanvas.width = canvas.width;
        gcanvas.height = canvas.height-10;
        var gctx = gcanvas.getContext('2d');
        for(var i=0;i<canvas.width-1;i++){
            gctx.moveTo(canvas.height-(output[i]-minn)/(maxx-minn)*canvas.height,i);
            gctx.lineTo(canvas.height-(output[i+1]-minn)/(maxx-minn)*canvas.height,i+1);
        }
        
        ctx.drawImage(gcanvas,0,5);// to leave upper and lower border by 5 pixcels
        canvas.on("mousemove",function(event){
            var mx = event.pageX;
            var my = event.pageY;
            var offset = canvas.offset();//{left: ..., top: ...}
            mx = Math.round(mx-offset.left);
            my=Math.round(my-offset.top);
            
        })
        
    }    
    function setup(div){
        var canvas = $('<canvas></canvas>');
        var func = $('<input id = "func">f(x)</input>', {type:"text",size:50});
        var min = $('<input>min</input>', {type: "text", size: 50});
        var max = $('<input>max</input>', {type: "text", size: 50});
        var plot = $('<button>Plot</button>');
        plot.bind("click", function(){
            graph(canvas,func.val(),min,max);
        });
        $(div).append(canvas,func,min,max,plot);
        
    }
    exports.setup = setup;
   
    return exports;
}());

$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});