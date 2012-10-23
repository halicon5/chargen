CM.charRaceSVC = function(aCharRaceDAT, aCharSVC) {
	this.d = aCharRaceDAT;
	this.parChar = aCharSVC;
}

	CM.charRaceSVC.prototype.destroy = CM.destroy;

	CM.charRaceSVC.prototype.setRace = function(raceName) {
		if (CM.debug) CM.log("[CALL] CM.charRaceSVC.prototype.setRace = function(" + raceName + ")");
		if (kantiaDefs.race[raceName]) {
			this.parChar.d.race = new CM.charRaceDAT(kantiaDefs.race[raceName]);
			this.d = this.parChar.d.race;
			this.applyMods();
		}
		else {
			if (CM.debug) CM.log("[ERROR] CM.charRaceSVC.prototype.setRace = function(" + raceName + "): Race does not exist.");
		}
	}
	
	
	CM.charRaceSVC.prototype.applyMods = function() {
		if (CM.debug) CM.log("[CALL] CM.charRaceSVC.prototype.applyMods = function()");
		this.parChar.modifiers.clearModsById("Race");

		if (this.d.mods) {
			for (var m in this.d.mods) {
			 this.parChar.modifiers.applyMod(this.d.mods[m]);
			}
		}
	}