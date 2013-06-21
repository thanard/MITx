	var Model = function(){
		var listItem={"house":["clock","painting","radio","vase","book","computer"],"burglar":[]};

		function reset(){
			listItem={"house":["clock","painting","radio","vase","book","computer"],"burglar":[]};
		}

		function move(name){
			//remove
			if($.inArray(name,listItem["house"])>-1){
				listItem["house"].splice(listItem["house"].indexOf(name),1);
			}else{
				listItem["burglar"].splice(listItem["burglar"].indexOf(name),1);
			}

			//add
			if($.inArray(name,listItem["house"])>-1){
				listItem["house"].push(name);
			}else{
				listItem["burglar"].push(name);
			}
		}

		function get_listItem(){
			return listItem;
		}

		return {get_listItem:get_listItem,
				reset:reset,
				move:move,
				};
	}

    if (typeof exports == 'undefined') {
    	exports = {};
    }
	exports["Model"] = Model;