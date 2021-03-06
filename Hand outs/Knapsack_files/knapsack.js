var knapsack = function(){

	var itemProperties={
				"value":{"clock":175,"painting":90,"radio":20,"vase":50,"book":10,"computer":200},
				"weight":{"clock":10,"painting":9,"radio":4,"vase":2,"book":1,"computer":20}
			}
	var maxWeight=20;

	function setup(div){
		var model = Model();
		var controller = Controller(model);
		var view=View(div,controller,model);

		var button = $("<p><button> Reset </button></p>");

		model.reset();

		button.on("click",controller.reset);
		model.update
		$(div).append(button);
	}


	function EventHandler(){
		var handler={};
		function on(event_string,callback){
			var cblist=handler[event_string];
			if(cblist===undefined){
				handler[event_string]=[];
			}
			handler[event_string].push(callback);
		}
		function trigger(event_string,data){
			var cblist=handler[event_string];
			if(cblist!==undefined){
				for(var i=0;i<cblist.length;i++){
					cblist[i](data);
				}
			}
		}
		return {on:on,trigger:trigger};
	}

	function isInArray(name,array){
		for (var i=0;i<array.length;i++){
			if(name==array[i]){
				return i;
			}
		}
		if(i==array.length){
			return -1
		}
	}

	function Model(){
		var listItem={"house":["clock","painting","radio","vase","book","computer"],"burglar":[]};
		var event_handler=EventHandler();
		var totalWeight=0;
		var totalValue=0;

		function reset(){
			listItem={"house":["clock","painting","radio","vase","book","computer"],"burglar":[]};
			event_handler.trigger('update',listItem);
			totalValue=0;
			totalWeight=0;
		}

		function move(name){
			//remove & add
			if(isInArray(name,listItem["house"])>-1){
				listItem["house"].splice(listItem["house"].indexOf(name),1);
				listItem["burglar"].push(name);
				totalValue+=itemProperties.value[name];
				totalWeight+=itemProperties.weight[name];
			}else{
				listItem["burglar"].splice(listItem["burglar"].indexOf(name),1);
				listItem["house"].push(name);
				totalValue-=itemProperties.value[name];
				totalWeight-=itemProperties.weight[name];
			}
			event_handler.trigger('update',listItem);
		}
		function get_listItem(){
			return listItem;
		}
		function get_totalWeight(){
			return totalWeight;
		}

		return {get_listItem:get_listItem,
				get_totalWeight:get_totalWeight,
				reset:reset,
				move:move,
				on:event_handler.on};
	}

	function Controller(model){
		function reset(){
			model.reset();
		}
		function move(evt){
			name=$(evt.target).attr("id");
			if(itemProperties.weight[name]+model.get_totalWeight()>maxWeight){
				alert("Knapsack capacity exceeded :(");
			}else{
				model.move(name);
			}
		}
		return {reset:reset,move:move};
	}

	function View(div,controller,model){
		var div1 = $('<div class="house"></div>');
		var currentTotal = $(
			'<div>
				<h3>Current Weight = '+model.get_totalWeight()+'kg<span color="red"> out of 20kg</span></h3>
			</div>');
		var div2 = $('<div class="burglar"></div>');

		var pic1 = $('<div><img src = "house.png" class="image"></div>')
		var items1 = $('<div class="item"></div>');
		var div11 = $('<div class="first"></div>');
		var div12 = $('<div class="second"></div>');

		var pic2 = $('<div><img src = "burglar.png" class="image"></div>')
		var items2 = $('<div class="item"></div>');
		var div21 = $('<div class="first"></div>');
		var div22 = $('<div class="second"></div>');

		items1.append(div11,div12);
		items2.append(div21,div22);
		div1.append(pic1,items1);
		div2.append(pic2,items2);

		var divTemp=$('<div id="bigframe">');
		divTemp.append(div1,currentTotal,div2)
		$(div).append(divTemp);


		function update(listItem){					
			div11.empty();
			div12.empty();
			div21.empty();
			div22.empty();

			hItems=listItem["house"]
			for(var i=0;i<hItems.length;i++){
				if(i>=3){
					div12.append($('<div class="pic_frame"><img src="'+hItems[i]+'.png" id='+hItems[i]+' class="smallImg"><p>$'+itemProperties.value[hItems[i]]+', '+itemProperties.weight[hItems[i]]+'kg</p>'));
				}else{
					div11.append($('<div class="pic_frame"><img src="'+hItems[i]+'.png" id='+hItems[i]+' class="smallImg"><p>$'+itemProperties.value[hItems[i]]+', '+itemProperties.weight[hItems[i]]+'kg</p>'));
				}
			}
			bItems=listItem["burglar"]
			for(var i=0;i<bItems.length;i++){
				if(i>=3){
					div22.append($('<div class="pic_frame"><img src="'+bItems[i]+'.png" id='+bItems[i]+' class="smallImg"><p>$'+itemProperties.value[bItems[i]]+', '+itemProperties.weight[bItems[i]]+'kg</p>'));
				}else{
					div21.append($('<div class="pic_frame"><img src="'+bItems[i]+'.png" id='+bItems[i]+' class="smallImg"><p>$'+itemProperties.value[bItems[i]]+', '+itemProperties.weight[bItems[i]]+'kg</p>'));
				}
			}

			$('.smallImg').on("click",function(evt){
				controller.move(evt);
			});
		}
		model.on('update',update);
		return {};
	}

	return {setup:setup};
}();

$(document).ready(function(){
	$('.knapsack').each(function(){
		knapsack.setup($(this));
	})
})