function NPCtools() {

}

	NPCtools.strip_specials = function(str) {
		if (typeof str === "string") {
			return str.replace(/[\/, -\.\'\" :]/g, "");
		} else {
			return str;
		}
	}

    NPCtools.calc_weight = function (att) {
        var weight = 5;
        if (att) {
            if (att.rank) {
                for (var i=1; i<=att.rank;++i) {
                    weight = Math.round((weight + (2.75*i))/10)*10;
                }
            }
        }
        return weight;
    }
    
    NPCtools.calc_haul = function(lift) {
        return Math.round(lift * 15/8/10)*10;
    }
    
    
    