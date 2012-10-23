CM.charSpellDAT = function (sd) {
	this.name = (sd.name) ? sd.name : "";
	
	this.rank = 0;
	this.mod = 0;
	this.totRank = 0;
	
	this.cost = (sd.cost) ? sd.cost : 1;
	this.xp = new CM.rankedXpDAT(this.cost);

	this.desc = (sd.desc) ? sd.desc : "";
	
	this.disciplines = (sd.disciplines) ? sd.disciplines : {};
}

