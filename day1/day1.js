function calculate(text){
    try{
        var pattern=/[0-9]*\.[0-9]+|[0-9]+|\+|\-|\*|\/|\(|\)|sin|cos|tan|log|sqrt/g;
        var tokens = text.match(pattern);
        //console.log(JSON.stringify(tokens));
        var val = read_term(tokens);
        if (tokens.length!==0){
            throw "ill-formed expression";
        }else{
            return String(val);
        } 
    }
    catch(err){
        return err;
    }
    //return JSON.stringify(tokens);
}
    
//read operand gets called by evaluate
function read_operand(array){
    var num=array[0];
    array.shift();
    //check if it is an open paren
    if (num=='('){
        var temp1=evaluate(array);
        if(array[0]==')'){
            num=temp1;
            array.shift();
        }else{
            throw ") is not found";
        }
    }
    if(num=='-'){
        num=-read_operand(array);
    }
    if(num=='sin'){
        num=Math.sin(read_operand(array));
    }
    if(num=='log'){
        num=Math.log(read_operand(array));
    }
    if(num=='cos'){
        num=Math.cos(read_operand(array));
    }
    if(num=='tan'){
        num=Math.tan(read_operand(array));
    }
    if(isNaN(parseInt(num))){
        throw "number expected";
    }else{
        return parseFloat(num);
    }
}

//evaluate text in the text field
function evaluate(array){
    if (array.length === 0){
        throw "missing operand";
    }else{
        var value=read_operand(array);
        //stop either when the array is empty or the next one is a closed paren
        while(array.length!==0 && array[0]!=')'){
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

//to read first time to evaluate everything except +,-, numbers
function read_term(array){
    var newarray=[];
    if (array.length === 0){
        throw "missing operand";
    }else{
        while(array.length!==0){
                var next = array[0];
                array.shift();
                if (array.length===0){
                    throw "missing operand";
                }
                else if (/[0-9]*\.[0-9]+|[0-9]+/.test(next)){
                    newarray.push(next);
                }
                else if (next=='*'||next=='/'){
                    var temp=read_operand(array);
                    if(next=='*'){
                        var temp1=newarray[newarray.length-1];
                        newarray.pop();
                        newarray.push(temp1*temp);
                    }
                    else{
                        var temp2=newarray[newarray.length-1];
                        newarray.pop();
                        newarray.push(temp2/temp);
                    }
                }else if(next=='+'||next=='-'){
                        newarray.push(next);
                }else{
                    throw "unrecognized operator";
                }
        }
    }
    console.log(newarray);
    return evaluate(newarray);
}

function setup_cal(div){
    var input=$('<input id="input1"></input>',{type:"text",size: 50});
    var output = $('<div></div>');
    var button = $('<button id="button1">Calculate</button>');
    button.bind("click",function(){
        output.text(String(calculate(input.val())));
    });
    
    $("#input1").keyup(function(event){
        if(event.keyCode==13){
            $("#button1").click();
        }
    })
    $(div).append(input,button,output);
}
// #-id .-class
$(document).ready(function(){
   $('.calculator').each(function(){
       //this refers to the <div> with class calculator
       setup_cal(this);
   });
});