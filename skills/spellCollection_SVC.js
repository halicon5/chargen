CM.spellCollectionSVC = function(aDisciplineCollectionDAT, aParChar, loadType) {
	this.d = aDisciplineCollectionDAT;
	this.name = this.d.name;
	this.parChar = aParChar;
	this.loadType = loadType;

	
	this.defs = kantiaDefs.spellDefs;
	this.attSkills = kantiaDefs.attributeMagicSkills; // probably doesn't do anything important
	this.groups = kantiaDefs.skillGroups;
	this.modTypeDef = kantiaDefs.modTypeDefs.spell;

	this.list = {};
	
	this.initialize();
}

	// handle inheritance of skillCollectionSVC, allows us to modify the prototypes as needed without affecting the parent class
	CM.extend (CM.spellCollectionSVC, CM.skillCollectionSVC);

	CM.spellCollectionSVC.prototype.initialize = function() {	
		this.setChildDatAndSvcTypes("charSpellDAT", "charSpellSVC");
		this.initializeServices();	
	}
