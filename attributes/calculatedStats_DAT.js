CM.calculatedStatsDAT = function() {
	this.HP = new CM.calculatedStatsGroupDAT("HP");
	this.HP.BP = new CM.calculatedStatsGroupDAT("HP.BP");
	this.HP.WP = new CM.calculatedStatsGroupDAT("HP.WP");
	this.STAM = new CM.calculatedStatsGroupDAT("STAM");
	this.STAM.recover = new CM.calculatedStatsGroupDAT("STAM.recover");
	this.lift = new CM.calculatedStatsGroupDAT("lift");
	this.haul = new CM.calculatedStatsGroupDAT("haul");
	this.stun_pain = new CM.calculatedStatsGroupDAT("stun_pain");
	this.heal = new CM.calculatedStatsGroupDAT("heal");
	
	this.karma_base = 0;

	this.heal.bludg = new CM.calculatedStatsGroupDAT("heal.bludg");
	this.heal.wound = new CM.calculatedStatsGroupDAT("heal.wound");

	this.heal.LB = {};
	this.heal.LB.text = "";
	this.heal.LB.rate = "";
	this.heal.MB = {};
	this.heal.MB.text = "";
	this.heal.MB.rate = "";
	this.heal.SB = {};
	this.heal.SB.text = "";
	this.heal.SB.rate = "";
	this.heal.LW = {};
	this.heal.LW.text = "";
	this.heal.LW.rate = "";
	this.heal.MW = {};
	this.heal.MW.text = "";
	this.heal.MW.rate = "";
	this.heal.SW = {};
	this.heal.SW.text = "";
	this.heal.SW.rate = "";


	this.move = {};
	this.move.type = ""; // used to determine quadruped, biped, manual entry
	this.move.major = 1;
	this.move.free = 1;
}


CM.calculatedStatsGroupDAT = function(grp) {
	this.name = grp;
	this.base = 0;
	this.mod = 0;
	this.mult = 1;
	this.tot = 0;
}