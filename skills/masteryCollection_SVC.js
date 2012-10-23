CM.masteryCollectionSVC = function(aMasterCollectionDAT, aParChar) {
	this.d = aMasterCollectionDAT;
	this.name = this.d.name;
	this.parChar = aParChar;
		
	this.list = {};
	this.initialize();
}

	CM.masteryCollectionSVC.prototype.destroy = CM.destroy;

	CM.masteryCollectionSVC.prototype.initialize = function () {
		this.initializeData();
		this.initializeServices();	
	}


	CM.masteryCollectionSVC.prototype.initializeData = function() {
		if (CM.debug) CM.log("[CALL] CM.masteryCollectionSVC.prototype.initializeData = function()");
	}


	CM.masteryCollectionSVC.prototype.initializeServices = function() {
		if (CM.debug) CM.log("[CALL] CM.masteryCollectionSVC.prototype.initializeServices = function()");
	
		for (var mast in this.d.list) {
			this.list[mast] = new CM.masterySVC(this.d.list[mast], this.parChar);
		}
	}

	CM.masteryCollectionSVC.prototype.addMastery = function(defName, identName) {
		var def = this.getMasteryDef(defName);
		if (def && identName) {
			var name = this.createMasteryName(defName, identName);
			this.d.list[name] = new CM.masteryDAT(name, identName, def);
			this.list[name] = new CM.masterySVC(this.d.list[name], this.parChar);

			if (this.parChar.modifiers.masteries.list && this.parChar.d.modifiers.masteries.list) {
				this.parChar.modifiers.createModSet ( this.parChar.d.modifiers.masteries.list, this.parChar.modifiers.masteries.list, "masteries.list", name, this.list[name], kantiaDefs.modTypeDefs.masteries );
			}
		}
	}
	
	CM.masteryCollectionSVC.prototype.getMasteryDef = function(defName) {
		if (kantiaDefs.masteryDefs[defName]) {
			return kantiaDefs.masteryDefs[defName];
		} else {
			return null;
		}
	}
	
	CM.masteryCollectionSVC.prototype.createMasteryName = function(defName, identName) {
		return trim(defName) + ": " + trim(identName);
	}
	
	CM.masteryCollectionSVC.prototype.deleteMastery = function(masteryName) {
		if (CM.debug) CM.log("[CALL] CM.masteryCollectionSVC.prototype.deleteSkill = function(" + masteryName + ")");
		delete this.d.list[masteryName];
		delete this.list[masteryName];
		this.parChar.modifiers.deleteModSet(this.parChar.d.modifiers.masteries.list, this.parChar.modifiers.masteries.list, masteryName);	
	}
	CM.masteryCollectionSVC.prototype.deleteSkill = CM.masteryCollectionSVC.prototype.deleteMastery;
	
	
	CM.masteryCollectionSVC.prototype.removeMasteryUI = function(masteryName) {
		if (CM.debug) CM.log("[CALL] CM.masteryCollectionSVC.prototype.removeCharSkillUI = function (" + masteryName + ")");
		delete this.subUIs[masteryName];
	}
	CM.masteryCollectionSVC.prototype.removeSkillUI = CM.masteryCollectionSVC.prototype.removeMasteryUI;