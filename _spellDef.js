var spellDef = function() {
	// drink coding! fuck yeah, bitches!
	this.name = "spell name";
	this.prereq = "spell prereqs";
	this.components = "spell components";
	this.description = "spell description - this might be dicey... save it for later versions";
	this.damage = "I'm assuming this is a descriptive string";
	this.effect = "I'm assuming this is also a descriptive string";
	
	
	// My basic model enables whomever is working on the backend to keep all EPOT, or AOE, or target, etc. type of data collected together. Then reference individual sub-objects to calculate strain independently.
	
	this.minStamina = 4;		// some integer
	
	this.base = {};
	this.base.strain = 4; 		// some integer value
	this.base.tav = 40;			// again, an integer
	
	
	this.EPOT = {};
	this.EPOT.strainPer = 3;	// integer value, per unit that EPOT represents, used to calculate
	this.EPOT.tavPer = 10;		// integer value, per unit that EPOT represents, calculable field
	this.EPOT.description
	this.EPOT.unit = "";		// a string value describing the EPOT unit, might just be EPOT, could be yards, chickens, chinchillas, whatever.
	
	this.AOE = {};				// god, AOE is a pain in the ass, it can be user defined or calculated based on other values. good luck.
	this.AOE.unit = ""; 		// similar to EPOT... textual description
	this.AOE.calcType = "user"; 	// or "calc" or whatever... not sure how we want to handle this.  Fuck spells, seriously.  What asshole wrote this game anyways? 
	this.AOE.strainPer = 2; 	// The strain incurred per aforementioned unit.
	this.AOE.tavPer = 5;		// Similar to above
	this.AOE.args	= {};		// allow for an infinite number of args, just to be sure, so we create an object.
	this.AOE.args["arg1"] = "SPIR";
	this.AOE.args["arg2"] = "PWR";
	this.AOE.args["arg3"] = 5	// for a scenario of (A + B) * C for example
	
	this.targets = {};
	this.targets.unit = ""; 		// similar to EPOT... textual description, some things might be per "3 humanoid targets" or some whacked out stuff... enchantment magic is screwy this way.
	this.targets.calcType = "user"; 	// or "calc" or whatever... not sure how we want to handle this.  Fuck spells, seriously.  What asshole wrote this game anyways? 
	this.targets.strainPer = 2; 	// The strain incurred per aforementioned unit.
	this.targets.tavPer = 5;		// Similar to above
	this.targets.args	= {};		// allow for an infinite number of args, just to be sure, so we create an object.
	this.targets.args["arg1"] = "SPIR";
	this.targets.args["arg2"] = "PWR";
	this.targets.args["arg3"] = 5	// for a scenario of (A + B) * C for example

	
}

var someint; // just in case you boot this script up, I don't want stuff below to crash it because it ain't defined
	
	
	// a spellSVC object should hold a reference to the current spell, probably the discipline being applied to it.
	spellSVC.spell = a reference to a spell definition object;
	spellSVC.discipline = an instance of a DisciplineSVC; // which should have a reference to the discpline data from the character's skills.  Would probably need to require integration with the charater manager.  Until then, fake it somehow.


	spellSVC.prototype.calc_EPOTstrain = function(epot) { return someint}; // will look only at EPOT, return a value for use. Allows us to be flexible with the incoming data.  Or possibly it can return some kind of object that has an integer field and then also other useful feedback data which can be used on an as needed basis.  Up to you here, just an idea...
	spellSVC.prototype.calc_EPOTtav = function(epot) {return someint}; // just like above
	
	spellSVC.prototype.calc_AOEstrain = function(aoeUnits) {return someint};
	spellSVC.prototype.calc_AOEtav = function(aoeUnits) {return someint};


	spellSVC.prototype.calc_strain = function() {
		return (
			this.spell.base_strain + this.calc_EPOTstrain() + this.calc_AOEstrain() + .... + everything else strain related we want to calculate.  // we'll let those individual functions do all the hard work.  This one just calls them and doesn't give a damn.  In the event one of the functions is unnecessary or can't be calculated, it should always return a 0
		)
	}
	// repeat for targets, drain, staging, surge, range, karma, 