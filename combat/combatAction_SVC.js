CM.combatActionSVC = function (aData, aParChar, invData) {
	this.d = aData;
	this.parChar = aParChar;
	this.invData = invData;
	
	this.weaponData = undefined;
	
	this.initialize();
}


	CM.combatActionSVC.prototype.initialize = function() {
		this.update();
	}


	CM.combatActionSVC.prototype.setValue = function(value, key, wupdate) {
		if (this.d[key] !== undefined) {
			if (isNaN(value)) {
				value = 0;
			}
			this.d[key] = parseInt(value, 10);
			if (wupdate) this.update(false);
		}
	}


	CM.combatActionSVC.prototype.update = function() {
		this.setSkillBasedValues();
		this.setWeaponData();
		this.setDiff();
		this.setOffStaging();
		this.setDamage();
		this.d.offStagingTot = this.d.offStaging + this.d.offStaging_mod;
		
		this.d.baseAVTot = this.d.baseAV + this.d.baseAV_mod;
		
		this.d.actAdjTot = this.d.actAdj + this.d.actAdj_mod;
		
		this.setSceneAdj();
		this.d.sceneAdjTot = this.d.sceneAdj + this.d.sceneAdj_mod;

		this.setAVs();
	}

	CM.combatActionSVC.prototype.setWeaponData = function() {
		if (this.invData.items[this.d.weaponName]) {
			this.weaponData = this.invData.items[this.d.weaponName].stats;
		}		
		else if ( kantiaDefs.meleeWeapons[this.d.weaponName] ) {
			this.weaponData = kantiaDefs.meleeWeapons[this.d.weaponName];
		}
		else if ( kantiaDefs.defaultCombatActions[this.d.weaponName] ) {
			this.weaponData = kantiaDefs.defaultCombatActions[this.d.weaponName];
		}
	}
	
	CM.combatActionSVC.prototype.setDiff = function() {
		if (this.weaponData) {
			if (this.weaponData[this.d.scene + this.d.act + "Diff"] !== undefined) {
				this.d.diff = this.weaponData[this.d.scene + this.d.act + "Diff"];
			}
			else if (this.weaponData[this.d.scene + "Diff"] !== undefined) {
				this.d.diff = this.weaponData[this.d.scene + "Diff"];
			} 
			else if (this.weaponData[this.d.act + "Diff"] !== undefined) {
				this.d.diff = this.weaponData[this.d.act + "Diff"];
			}
			else if (this.weaponData.diff) {
				this.d.diff = this.weaponData.diff;
			}
			else {
				this.d.diff = 0;
			}
		} 
		else {
			this.d.diff = 0;
		}
	}

	CM.combatActionSVC.prototype.setDamage = function() {
		if (this.weaponData && this.weaponData.damage && this.d.act == "attack") {
			this.d.damage = this.weaponData.damage;
		}
		else {
			this.d.damage = "";
		}
	}
	

	CM.combatActionSVC.prototype.setOffStaging = function() {
		var s = 0;
		if (this.weaponData) {
			if (this.weaponData.stagingSource) {
				if (this.parChar.attributes[this.weaponData.stagingSource]) {
					s += parseInt(this.parChar.d.attributes[this.weaponData.stagingSource].totRank);
				}
			}
			if (this.weaponData.stagingLimit) {
				s = (this.weaponData.stagingLimit > s) ? s : parseInt(this.weaponData.stagingLimit, 10);
			}

			if (this.d.scenario == "two handed" && this.weaponData.offStaging2) {
				s += parseInt(this.weaponData.offStaging2);
			} else if (this.weaponData.offStaging) {
				s += parseInt(this.weaponData.offStaging);
			}
		}
		this.d.offStaging = s;
	}

	
	CM.combatActionSVC.prototype.createNameIndex = function(def, scenario, act) {
		var n = "";
		if (def.name) {
			n = def.name + ": " + scenario;
			n += (act) ? " (" + act + ")" : "";
		}
		return n;
	}

	CM.combatActionSVC.prototype.setSkillBasedValues = function () {
		var bestRank = -9999;
		var bestAV = -9999;
		var actions = 0;

		var skills = this.parChar.skills.d.list;
		for (var sk in this.d.skillOpts) {
			if (skills[sk]) {
				if (skills[sk].totAV > bestAV) {
					bestAV = skills[sk].totAV;
				}
				if (skills[sk].totRank > bestRank) {
					bestRank = skills[sk].totRank;
				}
			}
		}
		if (bestAV == -9999) bestAV = 0;
		if (bestRank == -9999) bestRank = 0;

		this.d.baseAV = bestAV;
		actions = Math.ceil(bestRank/3);
		this.d.actions = (actions > this.d.minActions) ? actions : this.d.minActions;
	}
	
	
	CM.combatActionSVC.prototype.setSceneAdj = function() {
		// in the future this will check to see if the Ambidexterity trait or HC is present.
		if ( kantiaDefs.actionScenarios[this.d.scenario] ) {
			if (this.parChar.d.traitsHCs.list["Ambidexterity"]) {
				this.d.sceneAdj = kantiaDefs.actionScenarios[this.d.scenario].ambidex;
			} 
			else {
				this.d.sceneAdj = kantiaDefs.actionScenarios[this.d.scenario].standard;
			}
		}
		else {
			this.d.sceneAdj = 0;
		}
	}
	
	
	CM.combatActionSVC.prototype.setAVs = function() {
		var AV = this.d.baseAVTot + this.d.actAdjTot + this.d.sceneAdjTot;
		for (var i = 1; i <= 6; i++) {
			this.d["AV" + i] = AV - (20*(i-1)) - this.d.diff;
			this.d["AV" + i + "Tot"] = this.d["AV" + i] + this.d["AV" + i + "_mod"];
		}
	}