var UglyButton = function(div) {
  var exports = {};
  var oldHTML = div.html();
  div.replaceWith($("<div id='uglybutton'><div id='uglybutton-value'></div></div>"));
  $("#uglybutton-value").html(oldHTML);
  return exports;
}

$(function() {
    $(".ugly").each(function() {
        var btn = UglyButton($(this));
    });
});