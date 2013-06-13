var graphcalc = (function (){
    var exports={};//accessible from outside
    function setup(div){ 
        var canvas1 = $('<canvas></canvas>', {id: "screen"});
    	var input1 = $('<input></input>', {type: 'text', id: "input1"});
    	var input2 = $('<input></input>', {type: 'text', id: "input2"});
    	var input3 = $('<input></input>', {type: 'text', id: "input2"});
    	var plotB = $('<button>Plot</button>', {id: "plotButton"});
    	var text1 = $('<text>f(x): </text>');
    	var text2 = $('<text> min x: </text>');
    	var text3 = $('<text> max x: </text>');
    	
    	var screenDiv = $('<div></div>');
    	var divR1 = $('<div></div>');
    	var divR2 = $('<div></div>');
    	var divR3 = $('<div></div>');
    	
    	$(screenDiv).append(canvas1);
    	$(divR1).append(text1, input1);
    	$(divR2).append(text2, input2, text3, input3);
    	$(divR3).append(plotB);
    	$(div).append(screenDiv, divR1, divR2, divR3);
        
        plotB.bind('click', function(){
            graph(canvas1, input1.val(), input2.val(), input3.val());
            //graph($('#screen'), $('#input1.val()'), #input2.val(), #input3.val() )
        });
    }
    
    function graph(canvas, func, min, max){
        var DOMcanvas = canvas[0];   
        DOMcanvas.width = canvas.width();
        DOMcanvas.height = canvas.height();
    	var ctx = DOMcanvas.getContext('2d'); // ctx: context
        
        var width=canvas.width();
        var height=canvas.height();
        
        try{
            var tree= calculator.parse(func);
            var output=[];
            for(var i=0;i<width;i++){
                var value=calculator.evaluate(tree,{x:min+1.0*i/(width-1)*(max-min),e:Math.e,pi:Math.PI});//1.0* to make it floating
                output.push(value);
                console.log(min+1.0*i/(width-1)*(max-min));
                console.log(value);
            }
    
            var maxx=Math.max.apply(Math, output);//max amp
            var minn=Math.min.apply(Math,output);//min amp
                
            var gcanvas = $("<canvas></canvas>")[0]; //DOM object
            gcanvas.width = width;
            gcanvas.height = height-10;
            var gheight=height-10;
            var gctx = gcanvas.getContext('2d');
            gctx.beginPath();
            gctx.moveTo(0,gheight-(output[0]-minn)/(maxx-minn)*gheight);
            for(var j=1;j<width;j++){
                gctx.lineTo(j,gheight-(output[j]-minn)/(maxx-minn)*gheight);
            }
            gctx.stroke();
            
            ctx.drawImage(gcanvas,0,5);// to leave upper and lower border by 5 pixcels
            canvas.on("mousemove",function(event){
                var mx = event.pageX;
                var my = event.pageY;
                var offset = canvas.offset();//{left: ..., top: ...}
                mx = Math.round(mx-offset.left);
                my=Math.round(my-offset.top);
                
                ctx.clearRect(0,0,width,height);
                ctx.drawImage(gcanvas,0,5);// to leave upper and lower border by 5 pixcels
                
                ctx.beginPath(); //drawing a crosshair over cursor location
                ctx.moveTo(mx-10, my);
                ctx.lineTo(mx+10, my);
                ctx.moveTo(mx, my-10);
                ctx.lineTo(mx, my+10);
                ctx.strokeStyle="black";
                ctx.lineWidth = 1;
                ctx.stroke();
                
            })	
        } 
        catch(err){
    		// error on canvas
    		ctx.beginPath();
    		ctx.fillStyle = "black";
    		ctx.font = "14px Arial";
    		ctx.textAlign = "center"; //left, right
    		ctx.textBaseline = "middle"; //top, bottom, alphabetic
    		ctx.fillText(err, width/2, height/2);//string, x, y
    		
	    }
    }
    exports.setup = setup;
    return exports;
}());

$(document).ready(function() {
    $('.graphcalc').each(function() {
        graphcalc.setup(this);  
    });
});