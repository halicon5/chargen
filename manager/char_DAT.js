CM.charDAT = function(name) {
	this.name = name;
	
	this.race = new CM.charRaceDAT();

	this.attributes = new CM.attributeSetDAT();	
	this.calcStats = new CM.calculatedStatsDAT();
	
	this.skills = new CM.skillCollectionDAT("skills");
	this.writeInSkillHash = {};  // hash table used to quickly look through write in skills.
	
	this.disciplines = new CM.disciplineCollectionDAT("disciplines");
	this.magicSkills = new CM.skillCollectionDAT("magicSkills");
	this.spells = new CM.spellCollectionDAT("spells");
	
	this.inventory = new CM.inventorySetDAT("inventory");
	
	this.armor = new CM.armorDAT("armor");
	
	this.defense = new CM.defenseStatsDAT("defense");
	this.combatStats = new CM.combatStatsDAT("combatStats");
	
	this.masteries = new CM.masteryCollectionDAT("masteries");
	
	this.traitsHCs = new CM.traitHCSetDAT("traitsHCs");
	
	this.modifiers = new CM.charModifiersDAT();
}