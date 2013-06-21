var counter = function(){
	function setup(div){
		var model = Model();
		var controller = Controller(model);
		var view=View(div,model);
		var view2=View(div,model);

		var button = $("<button> Increment </button>");
		button.bind("click",controller.increment);
		$(div).append(button);
	}


	function EventHandler(){
		//map event_string to callbacks
		//{'update':[...View.update...]}

		//== check value(convert type for you) | === check value and type
		var handler={};
		function on(event_string,callback){
			var cblist=handler[event_string];
			if(cblist===undefined){
				handler[event_string]=[];
			}
			handler[event_string].push(callback);
			//console.log("update_event_on:"+handler['update']);
		}
		function trigger(event_string,data){
			var cblist=handler[event_string];
			if(cblist!==undefined){
				for(var i=0;i<cblist.length;i++){
					cblist[i](data);
				}
			}
			//console.log("update_event_trigger:"+handler['update']);
		}
		return {on:on,trigger:trigger};
	}

	function Model(){
		var count=0; //current value
		var event_handler=EventHandler();

		function addone(){
			count++;
			event_handler.trigger('update',count);
		}
		function reset(){
			count=0;
			event_handler.trigger('update',count);
		}
		function get_value(){
			return count;
		}
		return {addone:addone,
				reset:reset,
				on:event_handler.on};
	}

	function Controller(model){
		function increment(){
			model.addone();
		}
		return {increment:increment};
	}

	function View(div,model){
		var display = $('<div class="view">The current value of the counter is <span> 0 </span></div>');
		var counter_value = display.find('span')
		$(div).append(display);//or just div because it's jquery object already

		function update(cval){
			counter_value.text(cval);
		}
		model.on('update',update);
		return {};
	}

	return {setup:setup};
}();

$(document).ready(function(){
	$('.counter').each(function(){
		counter.setup($(this));
	})
})