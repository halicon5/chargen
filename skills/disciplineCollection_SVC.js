CM.disciplineCollectionSVC = function(aDisciplineCollectionDAT, aParChar, loadType) {
	this.d = aDisciplineCollectionDAT;
	this.name = this.d.name;
	this.parChar = aParChar;
	this.loadType = loadType;

	
	this.defs = kantiaDefs.disciplineDefs;
	this.attSkills = kantiaDefs.attributeMagicSkills;
	this.groups = kantiaDefs.skillGroups;
	this.modTypeDef = kantiaDefs.modTypeDefs.discipline;


	this.list = {};
	
//	this.initializeData();	// don't think we need this since every discipline is considered elective.
	this.initialize();
}

	// handle inheritance of skillCollectionSVC, allows us to modify the prototypes as needed without affecting the parent class
	CM.extend (CM.disciplineCollectionSVC, CM.skillCollectionSVC);

	CM.disciplineCollectionSVC.prototype.initialize = function() {
		this.setChildDatAndSvcTypes("charDisciplineDAT", "charDisciplineSVC");
		this.initializeServices();	
	}