CM.defenseStatsDAT = function (aName) {
	this.name = aName;
	


	// these are aggregated based on the natural defenses plus any armor or protections.
	this.base = 0;		// 50 + aglFinal - Size
	this.base_mod = 0;
	this.baseTot;
	
	this.armorDef = 0;
	this.armorDef_mod = 0;
	this.armorDefTot = 0;
	
	this.shieldDef = 0;
	this.shieldDef_mod = 0;
	this.shieldDefTot = 0;
	
	this.noAgl = 0;
	this.noAgl_mod = 0;
	this.noAglTot = 0;
	
	this.still = 0;
	this.still_mod = 0;
	this.stillTot = 0;
	
	this.touch = 0;
	this.touch_mod = 0;
	this.touchTot = 0;


	// the following almost will never see the natDeflect, natStaging, etc values set to anything. Holder variables for possible future use.
	this.natSize = 0;
	this.natSize_mod = 0;
	this.natSizeTot = 0;
	
	this.natAgl = 0;
	this.natAgl_mod = 0;
	this.natAglTot = 0;
	
	this.natDeflect = 0;	// usually set by racial characteristics, all body parts inherit this for the body to hit zone DR
	this.natDeflect_mod = 0;
	this.natDeflectTot = 0;

	this.natDefStaging = 0;	// based off of FORT, called shots will inherit this value for their base
	this.natDefStaging_mod = 0;
	this.natDefStagingTot = 0;

	this.natAbsorb = 0;	// based off of natural armor. Usually this value is zero, but some races have some.  hit locations inherit this value.
	this.natAbsorb_mod = 0;
	this.natAbsorbTot = 0;
	
	this.natDamTrans = 0;	// based off of natural armor, almost never used. Hit locations inherit this value
	this.natDamTrans_mod = 0;
	this.natDamTransTot = 0;
	

	// Agility based limits and calculated values
	this.aglLimit = 0;
	this.aglLimit_mod = 0;
	this.aglLimitTot = 0;

	this.aglArmorAdj = 0;
	this.aglFinal = 0;		// 


	this.DRnormal = 0;		// baseTot + Armor Deflect + natural deflect
	this.DRtouch = 0;		// baseTot 
	
	this.hitZones = {};
	
	for (var i = 0; i < kantiaDefs.hitZones.length; i++) {
		this.hitZones[ kantiaDefs.hitZones[i].name ] = new CM.hitZoneDAT(kantiaDefs.hitZones[i]);
	}
}