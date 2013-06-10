function calculate(text){
    var pattern=/\d+|\+|\-|\*|\/|\(|\)/g;
    var tokens = text.match(pattern);
    return JSON.stringify(tokens);
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