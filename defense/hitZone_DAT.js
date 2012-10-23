CM.hitZoneDAT = function(hz) {
	this.name = hz.name;
	this.armorZone = hz.armorZone;

	this.calledShot = 0;
	this.calledShot_mod = 0;
	this.calledShotTot = 0;

	this.defStaging = 0;
	this.defStaging_mod = 0;
	this.defStagingTot = 0;
	
	this.absorb = 0;
	this.absorb_mod = 0;
	this.absorbTot = 0;
	
	this.damTrans = 0;
	this.damTrans_mod = 0;
	this.damTransTot = 0;
	
	this.targetDR = 0;
	this.noAglDR = 0;
	this.touchDR = 0;
	
	this.incapLimit = 0;
	this.maimLimit = 0;
}