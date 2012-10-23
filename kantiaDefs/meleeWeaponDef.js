CM.meleeWeaponDef = function(sd) {
	this.name = null;

	this.skillName = null;	// if this is not null, the weapon definition will trigger the creation of a skill definition with this name.

	this.cost = null;

	this.att1 = null;
	this.att2 = null;
	this.att3 = null;
	this.att4 = null;

	this.mixtype = null;
	this.desc = null;

	
	this.skillOpts = {};	
	
	
	this.hands = null;
	this.attackRate = 1;
	this.diff = 0;
	this.weapCat = null;
	this.stagingSource = null;
	this.stagingLimit = null;
	this.offStaging = 0;
	this.offStaging2 = 0;
	this.damage = null;
	this.dam_type = "";
	this.masteryOpts = [];
	
	if (sd) {
		this.setMeleeWeaponDef(sd);
	}
}

	CM.meleeWeaponDef.prototype.setMeleeWeaponDef = function(sd) {
		CM.deepCopy(sd, this);
		if (sd.cost) this.cost = parseInt(sd.cost, 10);
	}