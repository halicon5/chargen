CM.traitHCSVC = function(aTraitHCDAT, aParChar) {
	this.d = aTraitHCDAT;
	this.parChar = aParChar;
	
	this.CMOBJNAME = this.d.name;

	this.update();
}

	CM.traitHCSVC.prototype.update = function() {
		this.refreshMods();
	}

	CM.traitHCSVC.prototype.refreshMods = function() {
		this.clearMods();
		this.assignMods();	
	}
	
	CM.traitHCSVC.prototype.clearMods = function() {
		var def = kantiaDefs.traitHCs[this.d.type];
		if (def.mods) {
			for (var i = 0; i < def.mods.length; i++) {
				this.d.modIds[def.mods[i].id] = 1;
				this.parChar.modifiers.clearModsById(def.mods[i]);
			}
		}		
	}
	
	CM.traitHCSVC.prototype.assignMods = function() {
		var def = kantiaDefs.traitHCs[this.d.type];
		if (def.mods) {
			for (var i = 0; i < def.mods.length; i++) {
				this.d.modIds[def.mods[i].id] = 1;
				this.parChar.modifiers.applyMod(def.mods[i]);
			}
		}
	}