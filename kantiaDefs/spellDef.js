CM.spellDef = function(sd) {
	this.name = null;
	this.cost = null;

	this.desc = null;
		
	this.disciplines = {};
	
	if (sd) {
		this.setSpellDef(sd);
	}
}

	CM.spellDef.prototype.setSpellDef = function(sd) {
		if (sd.name) this.name = sd.name;
		if (sd.cost) this.cost = parseInt(sd.cost, 10);
		if (sd.desc) this.desc = sd.desc;
		if (sd.disciplines) this.disciplines = sd.disciplines;
	}