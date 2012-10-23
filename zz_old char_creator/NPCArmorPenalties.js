function NPCArmorPenalties(allarmor) {
	this.all_armor = allarmor;
	this.initiative = 0;
	this.ranged = 0;
	this.perception = 0;
	this.agl_ref = 0;
	this.spell = 0;
	this.psion = 0;
	this.major_move = 0;
	this.update();
}


	NPCArmorPenalties.prototype.update = function() {
		var init = 0, rang = 0, perc = 0, aglref = 0, spell = 0, psion = 0;
		forEach (this.all_armor, function (ar) {
			if (ar.owned) {
				init	+=  ar.pen_init;
				rang 	+=  ar.pen_ranged;
				perc	+=  ar.pen_per;
				aglref	+=	ar.pen_aglref;
				spell	+=	ar.pen_spell;
				psion	+=	ar.pen_psion;
			}

		});
		this.initiative = init;
		this.ranged		= rang;
		this.perception	= perc;
		this.agl_ref	= aglref;
		this.spell		= spell;
		this.psion		= psion;
		this.major_move = Math.floor(this.initiative/2);
	}

	NPCArmorPenalties.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<table border='1' cellspacing=0>";
		h = h + "<tr><td><b>Armor Penalties</b></td><td>Major Move: " + this.major_move + " yrd</td></tr>";
		h = h + "<tr><td>Initiative: " + this.initiative + "</td><td>AGL/REF: " + this.agl_ref + " AV</td></tr>";
		h = h + "<tr><td>Ranged: " + this.ranged + " AV</td><td>Perception: " + this.perception + " AV</td></tr>";
		h = h + "<tr><td>Spells: " + this.spell + " AV</td><td>Psionic: " + this.psion + " AV</td></tr>";
		h = h + "</table>";
		return h;

	}

	
