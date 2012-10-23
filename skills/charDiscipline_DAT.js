CM.charDisciplineDAT = function(sd) {
	this.name = (sd.name) ? sd.name : "";
	
	this.rank = 0;
	this.mod = 0;
	this.totRank = 0;
	
	this.mult = 1; // not used ever, but I put it here in case something tries to access it.

	this.AV = 0;
	this.totAV = 0;

	this.active = true;

	this.cost = (sd.cost) ? sd.cost : 4;
	this.xp = new CM.rankedXpDAT(this.cost);
	
	this.mixtype = (sd.mixtype) ? sd.mixtype : null;
	this.desc = (sd.desc) ? sd.desc : "";

	this.group = (sd.group) ? sd.group : null;
	this.subGroup = (sd.subGroup) ? sd.subGroup : null;
	
	this.skType = "d";  // d for default, e for elective, w for write in
}

