CM.traitHCDef = function(def) {
	this.name = (def.name) ? def.name : null;

	this.trait = (def.trait) ? def.trait : false;
	this.flaw = (def.flaw) ? def.flaw : 0;
	this.merit = (def.merit) ? def.merit : 0;
	
	this.HC = (def.HC) ? def.HC : false;
	this.xpCost = (def.xpCost) ? def.xpCost : 0;
	
	this.mult = (def.mult) ? def.mult : false;
	this.reqIdent = (def.reqIdent) ? def.reqIdent : false;
	this.reqDetails = (def.reqDetails) ? def.reqDetails : false;
	
	
	this.desc = (def.desc) ? def.desc : "";
	this.mods = (def.mods) ? def.mods : [];
	this.special = (def.special) ? def.special : [];		// used to call special functions that are unique to each 
	
	this.customCalc = false; // a string value indicates what custom calc is used.
}
