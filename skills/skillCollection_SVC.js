CM.skillCollectionSVC = function(aSkillCollectionDAT, aParChar, loadType, requireManualInitialization) {
	this.d = aSkillCollectionDAT;
	this.name = this.d.name;
	this.parChar = aParChar;
	this.loadType = loadType;
	

	this.defs = kantiaDefs.skillDefs;
	this.attSkills = kantiaDefs.attributeSkills;
	this.groups = kantiaDefs.skillGroups;
	this.modTypeDef = kantiaDefs.modTypeDefs.skill;
	
	this.list = {};
	if (!requireManualInitialization) {
		this.initialize();
	}
}

	CM.skillCollectionSVC.prototype.destroy = CM.destroy;

	CM.skillCollectionSVC.prototype.initialize = function () {
		this.setChildDatAndSvcTypes();
		this.initializeData();
		this.initializeServices();	
	}
	
	CM.skillCollectionSVC.prototype.setChildDatAndSvcTypes = function(datType, svcType) {
		this.childDAT = (datType && CM[datType]) ? CM[datType] : CM.charSkillDAT;
		this.childSVC = (svcType && CM[svcType]) ? CM[svcType] : CM.charSkillSVC;		
	}
	
	CM.skillCollectionSVC.prototype.updateByAttribute = function(attrib) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.updateByAttribute = function(" + attrib + ")");
		
		if (this.attSkills[attrib]) {
			for (var sk in this.attSkills[attrib]) {
				if (this.list[sk] && this.list[sk].update) {
					this.list[sk].update();
				}
			}
		}
	}
	
	CM.skillCollectionSVC.prototype.updateWriteInSkills = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.updateWriteInSkills = function()");

		if (this.parChar.d.writeInSkillHash) {
			for (var sk in this.parChar.d.writeInSkillHash) {
				if (this.list[sk] && this.list[sk].update) {
					this.list[sk].update();
				}
			}
		}
	}

	CM.skillCollectionSVC.prototype.initializeData = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.initializeData = function()");

		var skillDefs = this.defs;

		// add any skills missing from the collection.
		for (var grp in this.loadType) {
			var groupList = this.groups[grp];
			for (var i = 0; i < groupList.length; i++) {
				if ( !this.d.list[groupList[i]] && skillDefs[groupList[i]] ) {
					this.d.list[groupList[i]] = new this.childDAT(skillDefs[groupList[i]]);
				}
			}
		}
	}
	
	
	CM.skillCollectionSVC.prototype.initializeServices = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.initializeServices = function()");
	
		for (var skill in this.d.list) {
			this.list[skill] = new this.childSVC(this.d.list[skill], this.parChar);
		}
	}
	
	
	CM.skillCollectionSVC.prototype.addElectiveSkill = function(skillName) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.addElectiveSkill = function(" + skillName + ")");
		// check to see if the skill has been defined.
		if (this.defs[skillName]) {
			if (this.d.list && !this.d.list[skillName]) {
				this.d.list[skillName] = new this.childDAT(this.defs[skillName]);
				this.d.list[skillName].skType = 'e';
			}
		}

		if (this.d.list[skillName] && !this.list[skillName]) {
			this.list[skillName] = new this.childSVC(this.d.list[skillName], this.parChar);
		}
		
		if (this.parChar) {
			if (this.parChar.modifiers[this.name].list && this.parChar.d.modifiers[this.name].list) {
				this.parChar.modifiers.createModSet ( this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, this.name + ".list", skillName, this.list[skillName], this.modTypeDef );
			}
		}
		
		if (this.d.list[skillName] && this.list[skillName]) {
			return true;
		}
	}
	
	CM.skillCollectionSVC.prototype.addWriteInSkill = function(skillDef) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.addWriteInSkill = function(skillDef)");
		var errMsg = "";
		var success = true;
		if (skillDef.name) {
			if (this.defs[skillDef.name]) {
				success = false;
				errMsg = "Default skill definition already exists.\n";
			}

			if (this.d.list[skillDef.name]) {
				if (CM.debug) CM.log("[ALERT] CM.skillCollectionSVC.prototype.addWriteInSkill = function(skillDef): Character already possesses the skill " + skillDef.name);
			}
		} 
		else {
			success = false;
			errMsg += "Skill Definition invalid.\n";
		}
		
		if (success) {
			if (!this.d.list[skillDef.name]) {
				this.d.list[skillDef.name] = new this.childDAT(skillDef);
				this.d.list[skillDef.name].skType = 'w';
			}
			this.list[skillDef.name] = new this.childSVC(this.d.list[skillDef.name], this.parChar);
			this.parChar.d.writeInSkillHash[skillDef.name] = 1;
			if (this.parChar.modifiers[this.name].list && this.parChar.d.modifiers[this.name].list) {
				this.parChar.modifiers.createModSet ( this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, this.name + ".list", skillDef.name, this.list[skillDef.name], this.modTypeDef );
			}
		}
		else {
			alert(errMsg);
			return;
		}
	}
	
	CM.skillCollectionSVC.prototype.deleteSkill = function(skillName) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionSVC.prototype.deleteSkill = function(" + skillName + ")");
		delete this.parChar.d.writeInSkillHash[skillName];
		delete this.d.list[skillName];
		delete this.list[skillName];
		this.parChar.modifiers.deleteModSet(this.parChar.d.modifiers[this.name].list, this.parChar.modifiers[this.name].list, skillName);
	}