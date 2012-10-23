CM.charSkillDAT = function (sd) {
	this.name = (sd.name) ? sd.name : "";
	
	this.rank = 0;
	this.mod = 0;
	this.totRank = 0;
	
	this.adj = 0;
	this.adj_mod = 0;
	this.totAdj = 0;

	this.AV = 0;
	this.totAV = 0;

	this.active = true;

	this.cost = (sd.cost) ? sd.cost : 1;
	this.xp = new CM.rankedXpDAT(this.cost);

	this.attrib1 = (sd.att1) ? sd.att1 : null;
	this.attrib2 = (sd.att2) ? sd.att2 : null;
	this.attrib3 = (sd.att3) ? sd.att3 : null;
	this.attrib4 = (sd.att4) ? sd.att4 : null;
	
	this.group = (sd.group) ? sd.group : null;
	this.subGroup = (sd.subGroup) ? sd.subGroup : null;
	this.mixtype = (sd.mixtype) ? sd.mixtype : null;
	this.desc = (sd.desc) ? sd.desc : "";
	
	this.skType = "d";  // d for default, e for elective, w for write in
}