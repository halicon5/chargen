CM.masteryDAT = function (name, ident, def) {
	this.name = name;
	this.identName = ident;
	this.type = def.name;
	this.attachedAVs = {};

	this.rank = 0;
	this.rank_mod = 0;
	this.totRank = 0;
	this.active = 1;	// binary flag
	
	this.cost = (def.cost) ? def.cost : 2;
	this.xp = new CM.rankedXpDAT(this.cost);	
}