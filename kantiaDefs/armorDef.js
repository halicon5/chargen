CM.armorDef = function(ad) {
	CM.deepCopy(ad, this);

	this.name = (ad.name) ? ad.name : "";
	
	this.group	= "armor";
	this.subGroup = (ad.subGroup) ? ad.subGroup : "misc";

	
	this.deflect		= (parseInt(ad.deflect)) ? parseInt(ad.deflect) : 0;
	this.called_shot	= (parseInt(ad.called_shot)) ? parseInt(ad.called_shot) : 0;
	this.defStaging		= (parseInt(ad.defStaging)) ? parseInt(ad.defStaging) : 0;
	this.absorb		= (parseInt(ad.absorb)) ? parseInt(ad.absorb) : 0;
	this.damTrans		= (parseInt(ad.damTrans)) ? parseInt(ad.damTrans) : 0;
	this.bypass		= (parseInt(ad.bypass)) ? parseInt(ad.bypass) : 0;
	this.blockDiff	= (parseInt(ad.blockDiff)) ? parseInt(ad.blockDiff) : 0;
	this.init		= (parseInt(ad.init)) ? parseInt(ad.init) : 0;
	this.ranged		= (parseInt(ad.ranged)) ? parseInt(ad.ranged) : 0;
	this.AGL_limit	= (parseInt(ad.AGL_limit)) ? parseInt(ad.AGL_limit) : 0;
	this.adjusts	= (ad.adjusts) ? ad.adjusts : {};		// format is { AGL: {adj_mod: -10, mod: 2}, REF .... }
	this.mods 		= (ad.mods) ? ad.mods : [];
	
	if (ad.hands) this.hands = ad.hands;
	if (ad.skillOpts) this.skillOpts = ad.skillOpts;
	this.notes		= (ad.notes) ? ad.notes : "";
}