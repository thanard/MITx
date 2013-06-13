$(function() {
    $(".listener").bind("click", function(evt) {//'click' - type of the event
        var str = "" +
          "Click!\n" +
          "Event Target: " + $(evt.target).attr("id") + "\n" +
          "This:" + $(this).attr("id") + "\n";
      
        alert(str);
        evt.stopPropagation();//eat the event that is propagating up along the path
//        evt.on
//        evt.off
//        click
//        mouse{ent,exit}
    });
});

//pass function into jq read them all first and then show at once don't run until the browser finish