CM.masterySVC = function(aMasteryDAT, aParChar) {
	this.d = aMasteryDAT;
	this.parChar = aParChar;
	
	this.xp = new CM.rankedXpSVC(this.d.xp, this, this.parChar);
	
	this.CMOBJNAME = this.d.name;
	this.initialize();
}

	CM.masterySVC.prototype.destroy = CM.destroy;

	CM.masterySVC.prototype.initialize = function() {
		this.combatAVs = this.parChar.combatStats.combatAVs;
		this.update();
	}

	CM.masterySVC.prototype.update = function(param) {
		if (CM.debug) CM.log("[CALL] CM.masterySVC.prototype.update = function() " + this.d.name);
		this.d.totRank = this.calc_totRank();
		if (this.parChar.modifiers) {
			this.processMastery();
		}
	}

	CM.masterySVC.prototype.calc_totRank = function() {
		if (CM.debug) CM.log("[CALL] CM.masterySVC.prototype.calc_totRank = function() " + this.d.name);
		return this.d.rank + this.d.rank_mod;
	}

	CM.masterySVC.prototype.setRank = function(r) {
		if (CM.debug) CM.log("[CALL] CM.masterySVC.prototype.setRank = function(" + r + ") " + this.d.name);
		if (isNaN(r)) {
			r = 0;
		}
		this.d.rank = parseInt(r, 10);
		this.update();	
	}

	CM.masterySVC.prototype.setRankMod = function(m) {
		if (CM.debug) CM.log("[CALL] CM.masterySVC.prototype.setRankMod = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.rank_mod = parseInt(m, 10);
		this.update();
	}
	
	CM.masterySVC.prototype.toggleActive = function() {
		this.d.active = (this.d.active) ? 0 : 1;
		this.update();
	}

	CM.masterySVC.prototype.bindCombatAV = function(cav) {
		if (this.combatAVs[cav] && kantiaDefs.masteryDefs[this.d.type].actions[this.combatAVs[cav].d.act]) {
			this.d.attachedAVs[cav] = 1;
			this.update();
		}
		else {
			alert(this.d.type + " " + cav + " is not a valid combination");
		}
	}
	
	CM.masterySVC.prototype.unbindCombatAV = function(cav) {
		this.clearMasteryMods();
		delete this.d.attachedAVs[cav];
		this.update();
	}
	
	CM.masterySVC.prototype.processMastery = function() {
		if (this[this.d.type]) {
			this.clearMasteryMods();
			if (this.d.rank > 0) {
				this[this.d.type]();
			}
		}
	}
	
	CM.masterySVC.prototype["Lethal Strike"] = function() {
		var def = kantiaDefs.masteryDefs["Lethal Strike"];
		this.createStandardMod(def);
	}
	
	CM.masterySVC.prototype["Disarm"] = function() {
		var def = kantiaDefs.masteryDefs["Disarm"];
		this.createStandardMod(def);
	}

	CM.masterySVC.prototype["Shield Mastery"] = function() {
		var def = kantiaDefs.masteryDefs["Shield Mastery"];
		this.createStandardMod(def);
		this.createDRMod();
	}

	CM.masterySVC.prototype["Weapon Defense"] = function() {
		var def = kantiaDefs.masteryDefs["Weapon Defense"];
		this.createStandardMod(def);
		this.createDRMod();
	}

	CM.masterySVC.prototype["Two-Weapon"] = function() {
		//var def = kantiaDefs.masteryDefs["Disarm"];
		//this.createStandardMod(def);
	}

	CM.masterySVC.prototype.createDRMod = function( mastDef ) {
		if (this.d.active) {
			// only one mod of a given type can affect the defense rating.
			var r = (this.d.rank > 16) ? 16 : this.d.rank;
			var mod = {};
			mod.id = this.d.type;
			mod.target = "defense";
			mod.shieldDef_mod = kantiaDefs.masteryTables.DRbonus[r];

			this.parChar.modifiers.applyMod(mod);
		}
	}
	
	CM.masterySVC.prototype.createStandardMod = function( mastDef ) {
		if (CM.debug) CM.log("[CALL] CM.masterySVC.prototype.createStandardMod");
		var r = (this.d.rank > 16) ? 16 : this.d.rank;
		var mod = {};
		mod.mass = true;
		mod.id = this.d.type + " " + this.d.identName;
		mod.group = null;
		for (var av in this.d.attachedAVs) {
			if (!mod.include) mod.include = {};
			mod.include[av] = 1;
		}

		if (this.d.type == "Two-Weapon") {
			// separate logic process to assign values to the mod.
		}
		else {
			if (mastDef.tables) {
				for (var tab in mastDef.tables) {
					var details = kantiaDefs.masteryMatrix[tab];
					mod.target = details.path;
					if (tab != "DRbonus") {
						mod[details.modKey] = mastDef.tables[tab][r];
					}
				}
			}
		}
		
		// this little if statement checks there are any AVs tied to this mod.  
		// Without this odd little check the mod is applied to every combat AV on the character.  That's bad.
		if (mod.include) {	
			this.parChar.modifiers.applyMod(mod);
		}
	}
	
	
	CM.masterySVC.prototype["Mult Attack x2"] = function() {
		this.multAttack(2);
	}
	CM.masterySVC.prototype["Mult Attack x3"] = function() {
		this.multAttack(3);
	}
	CM.masterySVC.prototype["Mult Attack x4"] = function() {
		this.multAttack(4);
	}
	CM.masterySVC.prototype["Mult Attack x5"] = function() {
		this.multAttack(5);
	}
	CM.masterySVC.prototype["Mult Attack x6"] = function() {
		this.multAttack(6);
	}
	
	CM.masterySVC.prototype.multAttack = function(tier) {
		/*
		each tier will inherit the values of each tier below it up to a maximum of 20 * the tier -1
		*/
		var max = (tier-1)*20;
		var value = 0;
		var id = "";
		for (var i = tier; i <= 6; i++) {
			id = "Mult Attack x" + i + ": " + this.d.identName;
			if (this.parChar.masteries.list[id]) {
				value += this.parChar.masteries.list[id].d.totRank;
			}
		}
		value = (value > max) ? max : value;
		alert(value);
		var mod = {};
		mod.mass = true;
		mod.id = this.d.type + " " + this.d.identName;
		mod["AV" + tier + "_mod"] = value;
		mod.target = "combatStats.combatAVs";
		for (var av in this.d.attachedAVs) {
			if (!mod.include) mod.include = {};
			mod.include[av] = 1;
		}

		if (mod.include) {	
			this.parChar.modifiers.applyMod(mod);
		}
	}
	
	
	CM.masterySVC.prototype.clearMasteryMods = function() {
		if (this.parChar.modifiers) {
			this.parChar.modifiers.clearModsById(this.d.type + " " + this.d.identName);
			this.parChar.modifiers.clearModsById(this.d.type);
		}
	}