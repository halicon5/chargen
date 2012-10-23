CM.traitHCDAT = function (def, traitHC, ident, details) {
	this.type = (def.name) ? def.name : null;

	this.identity = (ident) ? ident : "";
	this.details = (details) ? details : "";

	this.name = this.type +  ( (this.identity) ? " " + trim(this.identity) : "" );

	if (traitHC.toUpperCase() == "TRAIT") {
		this.trait = (def.trait) ? def.trait : false;
		this.flaw = (def.flaw) ? def.flaw : 0;
		this.merit = (def.merit) ? def.merit : 0;
	}

	if (traitHC.toUpperCase() == "HC") {
		this.HC = (def.HC) ? def.HC : false;
		this.xpCost = (def.xpCost) ? def.xpCost : 0;
	}
	
	this.desc = (def.desc) ? def.desc : "";
	this.modIds = {};
}