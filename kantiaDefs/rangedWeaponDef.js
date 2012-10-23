CM.rangedWeaponDef = function(sd) {
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

	this.range = 0;
	this.rangeInc = 0;
	this.rangeDiff = 0;
	this.recoil = 0;
	this.ammoType = "";
	this.ammoCap = 0;
	this.ROF = 1;
	this.failRate = 0;

	this.masteryOpts = [];
	
	if (sd) {
		this.setWeaponDef(sd);
	}
}

	CM.rangedWeaponDef.prototype.setWeaponDef = function(sd) {
		if (sd.name) this.name = sd.name;
		if (sd.skillName) this.skillName = sd.skillName;
		if (sd.cost) this.cost = parseInt(sd.cost, 10);
		if (sd.att1) this.att1 = sd.att1;
		if (sd.att2) this.att2 = sd.att2;
		if (sd.att3) this.att3 = sd.att3;
		if (sd.att4) this.att4 = sd.att4;
		if (sd.mixtype) this.mixtype= sd.mixtype;
		if (sd.desc) this.desc = sd.desc;

		if (sd.skillOpts) this.skillOpts = sd.skillOpts;
		
		if (sd.hands) this.hands = sd.hands;
		if (sd.attackRate) this.attackRate = sd.attackRate;
		if (sd.diff) this.diff = sd.diff;

		if (sd.weapCat) this.weapCat = sd.weapCat;
		if (sd.group) this.group = sd.group;
		if (sd.subGroup) this.subGroup = sd.subGroup;

		if (sd.stagingSource) this.stagingSource = sd.stagingSource;
		if (sd.stagingLimit) this.stagingLimit = sd.stagingLimit;
		if (sd.offStaging) this.staging = sd.staging;
		if (sd.offStaging2) this.staging2 = sd.staging2;
		if (sd.damage) this.damage = sd.damage;
		if (sd.dam_type) this.dam_type = sd.dam_type;
		
		if (sd.range) this.range = sd.range;
		if (sd.rangeInc) this.rangeInc = sd.rangeInc;
		if (sd.rangeDiff) this.rangeDiff = sd.rangeDiff;
		if (sd.recoil) this.recoil = sd.recoil;
		if (sd.ammoType) this.ammoType = sd.ammoType;
		if (sd.ammoCap) this.ammoCap = sd.ammoCap;
		if (sd.ROF) this.ROF = sd.ROF;
		if (sd.failRate) this.failRate = sd.failRate;
		
		if (sd.masteryOpts) this.masteryOpts = sd.masteryOpts;
	}