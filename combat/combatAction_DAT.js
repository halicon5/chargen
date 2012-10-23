CM.combatActionDAT = function(weapDef, aScenario, act) {
	if (weapDef.name) {
		this.name = weapDef.name + ": " + aScenario;
		this.name += (act) ? " (" + act + ")" : "";
	}
	else {
		this.name = "";
	}
	this.weaponName = weapDef.name;
	
	this.act = act;		// block or attack, mostly only important to items with a blocking bonus;  Null or "" values will assume "attack", "block"
	this.scenario = aScenario;	// 1handed, two-handed, etc

	this.minActions = (weapDef.minActions) ? weapDef.minActions : 1;
	this.skillOpts = (weapDef.skillOpts) ? weapDef.skillOpts : {};
	this.skill = "";
	this.diff = (weapDef.diff) ? weapDef.diff : 0;
	this.hands = (weapDef.hands) ? weapDef.hands : "1";
	
	this.damage = "";
	this.damage_mod = "";
	
	this.offStaging = 0;
	this.offStaging_mod = 0;
	this.offStagingTot = 0;
	
	this.actions = 0;

	this.baseAV = 0;
	this.baseAV_mod = 0;
	this.baseAVTot = 0;
	

	this.actAdj = 0;		// action type adjustments, such as blocking, parry, disarm, etc
	this.actAdj_mod = 0;
	this.actAdjTot = 0;

	this.sceneAdj = 0;		// scenario mods
	this.sceneAdj_mod = 0;	// will never bring the scenario mod tot above 0;
	this.sceneAdjTot = 0;

	this.AV1 = 0;
	this.AV1_mod = 0;
	this.AV1Tot = 0;

	this.AV2 = 0;
	this.AV2_mod = 0;
	this.AV2Tot = 0;

	this.AV3 = 0;
	this.AV3_mod = 0;
	this.AV3Tot = 0;
	
	this.AV4 = 0;
	this.AV4_mod = 0;
	this.AV4Tot = 0;

	this.AV5 = 0;
	this.AV5_mod = 0;
	this.AV5Tot = 0;

	this.AV6 = 0;
	this.AV6_mod = 0;
	this.AV6Tot = 0;

}