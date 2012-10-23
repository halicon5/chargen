CM.charDisciplineSVC = function(aCharSkillDAT, aParChar) {
	this.d = aCharSkillDAT;
	this.parChar = aParChar;
	
	this.xp = new CM.rankedXpSVC(this.d.xp, this, this.parChar);
	
	this.CMOBJNAME = this.d.name;
}

	CM.extend (CM.charDisciplineSVC, CM.charSkillSVC);
