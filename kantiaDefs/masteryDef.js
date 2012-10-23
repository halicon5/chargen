CM.masteryDef = function(md) {
	this.name = "";
	this.tables = {};
	this.desc = "";
	this.minRank = 8;

	if (md) {
		this.setMasteryDef(md);
	}
}


	CM.masteryDef.prototype.setMasteryDef = function(md) {
		if (md.name) this.name = md.name;
		if (md.tables) this.tables = md.tables;
		if (md.minRank) this.minRank = md.minRank;
		if (md.desc) this.desc = md.desc;
	}