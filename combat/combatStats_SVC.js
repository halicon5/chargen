CM.combatStatsSVC = function (aData, aParChar, invData) {
	this.d = aData;
	this.parChar = aParChar;
	this.invData = invData;

	this.combatAVs = {};
	
	this.initialize();
}


	CM.combatStatsSVC.prototype.initialize = function() {
		for (var CAV in this.d.combatAVs) {
			this.combatAVs[CAV] = new CM.combatActionSVC(this.d.combatAVs[CAV], this.parChar, this.invData);
		}
	}


	CM.combatStatsSVC.prototype.update = function() {		
		for (var k in this.combatAVs) {
			if (this.combatAVs[k].update) {
				this.combatAVs[k].update();
			}
		}
	}

	CM.combatStatsSVC.prototype.setValue = function(value, key, wupdate) {
		if (this.d[key] !== undefined) {
			if (isNaN(value)) {
				value = 0;
			}
			this.d[key] = parseInt(value, 10);
			if (wupdate) this.update(false);
		}
	}

	
	CM.combatStatsSVC.prototype.addCombatAVset = function(weaponDef, scenario, act) {
		var n = this.createNameIndex(weaponDef, scenario, act);

		this.d.combatAVs[n] = new CM.combatActionDAT(weaponDef, scenario, act);
		this.combatAVs[n] = new CM.combatActionSVC(this.d.combatAVs[n], this.parChar, this.invData);

		if (this.parChar.modifiers.combatStats.combatAVs && this.parChar.d.modifiers.combatStats.combatAVs) {
			this.parChar.modifiers.createModSet ( this.parChar.d.modifiers.combatStats.combatAVs, this.parChar.modifiers.combatStats.combatAVs, "combatStats.combatAVs", n, this.combatAVs[n], kantiaDefs.modTypeDefs.combatAV);
		}

	}
	
	CM.combatStatsSVC.prototype.createNameIndex = function(def, scenario, act) {
		var n = "";
		if (def.name) {
			n = def.name + ": " + scenario;
			n += (act) ? " (" + act + ")" : "";
		}
		return n;
	}

	CM.combatStatsSVC.prototype.removeCombatAV = function(CAV) {
		if (this.d.combatAVs[CAV]) {
			delete this.d.combatAVs[CAV];
		}
		if (this.combatAVs[CAV]) {
			delete this.combatAVs[CAV];
		}

		this.parChar.modifiers.deleteModSet(this.parChar.d.modifiers.combatStats.combatAVs, this.parChar.modifiers.combatStats.combatAVs, CAV);
	}