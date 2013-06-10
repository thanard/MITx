function calculate(text){
    try{
        var pattern=/\d+|\+|\-|\*|\/|\(|\)/g;
        var tokens = text.match(pattern);
        var val = evaluate(tokens);
        if (tokens.length!==0){
            throw "ill-formed expression";
        }else{
            return String(val);
        } 
    }
    catch(err){
        return err;
    }
    return JSON.stringify(tokens);
    }
    
function read_operand(array){
    var num=array[0];
    array.shift();
    if(isNaN(parseInt(num))){
        throw "number expected";
    }else{
        return parseInt(num);
    }
}

function evaluate(array){
    if (array.length === 0){
        throw "missing operand";
    }else{
        var value=read_operand(array);
        while(array.length!==0){
            var operator = array[0];
            array.shift();
            if (array.length===0){
                throw "missing operand";
            }
            else if (operator=='+'||operator=='-'||operator=='*'||operator=='/'){
                var temp=read_operand(array);
                if (operator=='+'){
                    value=value+temp;
                }
                else if(operator=='-'){
                    value=value-temp;
                }
                else if(operator=='*'){
                    value=value*temp;
                }
                else{
                    value=value/temp;
                }
            }else{
                throw "unrecognized operator";
            }
        }
        return value;
    }
}
function setup_cal(div){
    var input=$('<input></input>',{type:"text",size: 50});
    var output = $('<div></div>');
    var button = $('<button>Calculate</button>');
    button.bind("click",function(){
        output.text(String(calculate(input.val())));
    });
    
    $(div).append(input,button,output);
}
// #-id .-class
$(document).ready(function(){
   $('.calculator').each(function(){
       //this refers to the <div> with class calculator
       setup_cal(this);
   });
});