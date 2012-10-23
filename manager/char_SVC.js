CM.charSVC = function(aCharDAT) {
	this.d = aCharDAT;
	
	this.race = new CM.charRaceSVC(this.d.race, this);
	
	this.attributes = new CM.attributeSetSVC(this.d.attributes, this);
	this.calcStats = new CM.calculatedStatsSVC(this.d.calcStats, this);
	
	this.skills = new CM.skillCollectionSVC(this.d.skills, this, {"common":1, "physical":1, "social":1, "common combat":1});
	
	this.disciplines = new CM.disciplineCollectionSVC(this.d.disciplines, this, {} )

	// magic skills is its own collection but otherwise acts exactly like a skill without exception
	this.magicSkills = new CM.skillCollectionSVC(this.d.magicSkills, this, {}, true );
		this.magicSkills.defs = kantiaDefs.magicSkillDefs;
		this.magicSkills.attSkills = kantiaDefs.attributeMagicSkills;
		this.magicSkills.groups = kantiaDefs.magicGroups;
		this.magicSkills.initialize();

	this.spells = new CM.spellCollectionSVC(this.d.spells, this, {});

	this.inventory = new CM.inventorySetSVC(this.d.inventory, this);
	
	this.armor = new CM.armorSVC(this.d.armor, this, this.d.inventory);
	
	this.defense = new CM.defenseStatsSVC( this.d.defense, this);
	
	this.combatStats = new CM.combatStatsSVC ( this.d.combatStats, this, this.d.inventory);

	this.masteries = new CM.masteryCollectionSVC (this.d.masteries, this);	
	
	this.traitsHCs = new CM.traitHCSetSVC (this.d.traitsHCs, this);
	// modifiers must be last, all other objects must initialize first
	this.modifiers = new CM.charModifiersSVC(this.d.modifiers, this);
	

	this.CMCLASSNAME = "CM.charSVC";
	this.CMOBJNAME = this.d.name;
	
	this.initialize();
}

	CM.charSVC.prototype.initialize = function() {
	}

	CM.charSVC.prototype.setRace = function(raceName) {
		this.race.setRace(raceName);
	}
	
	CM.charSVC.prototype.destroy = CM.destroy;