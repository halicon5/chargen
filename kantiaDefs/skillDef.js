CM.skillDef = function(sd) {
	this.name = null;
	this.cost = null;

	this.att1 = null;
	this.att2 = null;
	this.att3 = null;
	this.att4 = null;
	
	this.mixtype = null;
	this.desc = null;
		
	this.group = null;
	this.subGroup = null;
	
	if (sd) {
		this.setSkillDef(sd);
	}
}

	CM.skillDef.prototype.setSkillDef = function(sd) {
		if (sd.name) this.name = sd.name;
		if (sd.cost) this.cost = parseInt(sd.cost, 10);
		if (sd.att1) this.att1 = sd.att1;
		if (sd.att2) this.att2 = sd.att2;
		if (sd.att3) this.att3 = sd.att3;
		if (sd.att4) this.att4 = sd.att4;
		if (sd.mixtype) this.mixtype= sd.mixtype;
		if (sd.desc) this.desc = sd.desc;
		if (sd.group) this.group = sd.group;
		if (sd.subGroup) this.subGroup = sd.subGroup;
	}