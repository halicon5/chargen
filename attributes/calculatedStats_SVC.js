CM.calculatedStatsSVC = function (aCalculatedStatsDAT, aCharSVC) {
	if (CM.debug) CM.log("[NEW] CM.calculatedStatsSVC = function()");

	this.d = aCalculatedStatsDAT;
	this.parChar = aCharSVC;

	this.CMCLASSNAME = "CM.calculatedStatsSVC";
	
	this.HP = new CM.calculatedStatsGroupSVC(this.d.HP, this.parChar, this);
	this.HP.BP = new CM.calculatedStatsGroupSVC(this.d.HP.BP, this.parChar, this);
	this.HP.WP = new CM.calculatedStatsGroupSVC(this.d.HP.WP, this.parChar, this);
	this.STAM = new CM.calculatedStatsGroupSVC(this.d.STAM, this.parChar, this);
	this.STAM.recover = new CM.calculatedStatsGroupSVC(this.d.STAM.recover, this.parChar, this);
	this.lift = new CM.calculatedStatsGroupSVC(this.d.lift, this.parChar, this);
	this.haul = new CM.calculatedStatsGroupSVC(this.d.haul, this.parChar, this);
	this.stun_pain = new CM.calculatedStatsGroupSVC(this.d.stun_pain, this.parChar, this);
	this.heal = new CM.calculatedStatsGroupSVC(this.d.heal, this.parChar, this);
	
	this.heal.bludg = new CM.calculatedStatsGroupSVC(this.d.heal.bludg, this.parChar, this);
	this.heal.wound = new CM.calculatedStatsGroupSVC(this.d.heal.wound, this.parChar, this);
}

	CM.calculatedStatsSVC.prototype.destroy = CM.destroy;
	
	CM.calculatedStatsSVC.prototype.update = function() {
		if (CM.debug) CM.log("[CALL] CM.calculatedStatsSVC.prototype.update = function()");
		this.HP.update();
		this.HP.BP.update();
		this.HP.WP.update();
		this.STAM.update();
		this.STAM.recover.update();
		this.lift.update();
		this.haul.update();
		this.stun_pain.update();
		this.heal.update();
	}



CM.calculatedStatsGroupSVC = function(dat, aCharSVC, par) {
	if (CM.debug) CM.log("[NEW] CM.calculatedStatsGroupSVC = function()");
	this.d = dat;
	this.parChar = aCharSVC;
	this.parent = par;
	
	this.setCalcAndUpdateFunctions(this.d.name);
	this.CMCLASSNAME = "CM.calculatedStatsGroupSVC";
	this.CMOBJNAME = "calcStats." + dat.name;
}

	CM.calculatedStatsGroupSVC.prototype.update = function() {
		// a shell function we will override from object to object.
	}
	
	CM.calculatedStatsGroupSVC.prototype.calc = function() {
		// another shell function we override when object is called.
	}

	CM.calculatedStatsGroupSVC.prototype.setModifier = function(m) {
		this.d.mod = CM.processModifier(m);
		this.update();
	}
	
	CM.calculatedStatsGroupSVC.prototype.applyModifier = function(m) {
		this.d.mod = CM.processModifier(m);
		this.update();
	}

	CM.calculatedStatsGroupSVC.prototype.setMultiplier = function(m) {
		this.d.mult = CM.processMultiplier(m);
		this.update();
	}

	CM.calculatedStatsGroupSVC.prototype.applyMultiplier = function(m) {
		this.d.mult = CM.calculateMultiplier(this.mult, m);
		this.update();
	}

	// This convoluted mess is kind of practice, and kind of for functionality. 
	// These next two methods are returning functions that override the calc or update functions of each calcStatsGroup object based
	// upon the name of the source data (HP, STAM, BP, WP, etc);
	/* This is such a mess because I didn't want to re-assign each of the member methods to anonymous functions.
		That is why the parent calcStatsSVC has a copy of each of the calc and update functions.
	*/
	CM.calculatedStatsGroupSVC.prototype.setCalcAndUpdateFunctions = function(groupType) {
		var u = this.update;
		var c = this.calc;
		switch (groupType) {
			case "HP":
				u = this.parent.updateHP;
				c = this.parent.calc_HP;
				break;
			case "HP.BP":
				u = this.parent.updateBP;
				c = this.parent.calc_BP;
				break;
			case "HP.WP":
				u = this.parent.updateWP;
				c = this.parent.calc_WP;
				break;
			case "STAM":
				u = this.parent.updateSTAM;
				c = this.parent.calc_STAM;
				break;
			case "STAM":
				u = this.parent.updateSTAM;
				c = this.parent.calc_STAM;
				break;
			case "STAM.recover":
				u = this.parent.updateSTAM_recover;
				c = this.parent.calc_STAM_recover;
				break;
			case "lift":
				u = this.parent.updateLift;
				c = this.parent.calc_lift;
				break;
			case "haul":
				u = this.parent.updateHaul;
				c = this.parent.calc_haul;
				break;
			case "stun_pain":
				u = this.parent.updateStunPain;
				c = this.parent.calc_stun_pain;
				break;
			case "heal":
				u = this.parent.updateHealingRates;
				c = this.parent.calc_healing_rates;
				break;
			default:
				if (CM.debug) CM.log("CM.calculatedStatsGroupSVC.prototype.getUpdateFunction = function(" + groupType +"): Error. Unable to find update function");
		}
		this.update = u;
		this.calc = c;
	}




	/****************
	Basic HP service functions
	*****************/	
	CM.calculatedStatsSVC.prototype.updateHP = function() {
		this.d.base = this.calc();
		var hp_tot = this.d.base + this.d.mod;
		this.d.tot = ( hp_tot < 4 ) ? 4 : hp_tot;
	}

	CM.calculatedStatsSVC.prototype.calc_HP = function () {
		var hp = 4;
		if (this.parChar.d.attributes) {
			var attribs = this.parChar.d.attributes;
			
            hp = attribs.SIZ.totRank * 2;
            hp = hp + attribs.CON.totRank;
            hp = hp + attribs.FORT.totRank;
            hp = hp + attribs.WILL.totRank;
            hp = hp - 10;
            if (hp < 4) {
                hp = 4;
            }
		}
		return hp;
	}
	
	
	
	/****************
	bludgeon point service functions
	*****************/
	CM.calculatedStatsSVC.prototype.updateBP = function() {
		this.d.base = this.calc();
		var bp_tot = this.d.base + this.d.mod;
		this.d.tot = ( bp_tot < 2 ) ? 2 : bp_tot;
	}
	
	CM.calculatedStatsSVC.prototype.calc_BP = function() {
		var bp = Math.floor(this.parChar.d.calcStats.HP.tot/2);
		return (bp < 2) ? 2 : bp;
	}
	
	
	/****************
	Wound point service functions
	*****************/
	CM.calculatedStatsSVC.prototype.updateWP = function() {
		this.d.base = this.calc();
		var wp_tot = this.d.base + this.d.mod;
		this.d.tot = ( wp_tot < 2 ) ? 2 : wp_tot;
	}
	
	CM.calculatedStatsSVC.prototype.calc_WP = function() {
		var wp = Math.ceil(this.parChar.d.calcStats.HP.tot/2);
		return (wp < 2) ? 2 : wp;
	}
	
	
	
	/****************
	STAM service functions
	*****************/
	CM.calculatedStatsSVC.prototype.updateSTAM = function() {
		this.d.base = this.calc();
		var stam_tot = this.d.base + this.d.mod;
		this.d.tot = ( stam_tot < 2 ) ? 2 : stam_tot;
	}
	
	CM.calculatedStatsSVC.prototype.calc_STAM = function() {
		var stam = 1;
		if (this.parChar.d.attributes) {
			var attribs = this.parChar.d.attributes;
			
			stam = attribs.FORT.totRank + attribs.CON.totRank + attribs.WILL.totRank + attribs.SPIR.totRank;
			if (stam < 2) {
				stam = 2;
			}
		}
		return stam;
	}
	
	
	
	/****************
	STAM_recover service functions
	*****************/
	CM.calculatedStatsSVC.prototype.updateSTAM_recover = function() {
		this.d.base = this.calc();

		var rate = 0;
		rate = (this.d.base * this.d.mult) + this.d.mod;
		if (rate < 0) {
			rate = 0;
		}
		
		this.d.tot = rate;
	}
		
	CM.calculatedStatsSVC.prototype.calc_STAM_recover = function() {
		var rate = 1;
		if (this.parChar.d.attributes) {
			rate = Math.floor(this.parChar.d.attributes.CON.totRank/3);
			if (rate < 1) {
				rate = 1;
			}
		}
		return rate;
	}
	
	
	
	/****************
	lift service functions
	*****************/	
	CM.calculatedStatsSVC.prototype.updateLift = function() {
		this.d.base = this.calc();
		var lift = 0;
		lift = (this.d.base * this.d.mult) + this.d.mod;
		if (lift < 0) {
			lift = 0;
		}

		this.d.tot = lift;
	}
		
	CM.calculatedStatsSVC.prototype.calc_lift = function() {
		var lift = 1;
		if (this.parChar.d.attributes) {
			lift = CM.calc_weight(this.parChar.d.attributes.STR.totRank);
		}
		return lift;
	}
	


	/****************
	haul service functions
	*****************/	
	CM.calculatedStatsSVC.prototype.updateHaul = function() {
		this.d.base = this.calc();
		var haul = 0;
		haul = (this.d.base * this.d.mult) + this.d.mod;
		if (haul < 0) {
			haul = 0;
		}
		this.d.tot =  haul;
	}
	
	CM.calculatedStatsSVC.prototype.calc_haul = function() {
		var haul = 1;
		if (this.parChar.d.calcStats) {
			haul = CM.calc_haul(this.parChar.d.calcStats.lift.base);
		}
		return haul;
	}
	



	/****************
	stunpain service functions
	*****************/	
	CM.calculatedStatsSVC.prototype.updateStunPain = function() {
		this.d.base = this.calc();
		var stunpain = 0;
		stunpain = (this.d.base * this.d.mult) + this.d.mod;
		if (stunpain < 0) {
			stunpain = 0;
		}
		this.d.tot = stunpain;
	}
		
	CM.calculatedStatsSVC.prototype.calc_stun_pain = function() {
        var sp = 0;
        if (this.parChar.attributes) {
            if (this.parChar.d.attributes.FORT.totRank && this.parChar.d.attributes.SIZ.totRank) {
                sp = this.parChar.d.attributes.FORT.totRank + this.parChar.d.attributes.SIZ.totRank;
                sp = sp - 20;
                sp = Math.floor(sp/2) * 5;
                if (sp < 0) {
                    sp = 0;
                }
            }
        }
        return sp;
	}




	/********************
	Healing rate service functions
	*/
	CM.calculatedStatsSVC.prototype.updateHealingRates = function() {
		this.calc();
	}


	CM.calculatedStatsSVC.prototype.setHealConBpModifier = function(m) {
		this.d.heal.con_B_mod = CM.processModifier(m);
		this.updateHealingRates();
	}

	CM.calculatedStatsSVC.prototype.setHealConWpModifier = function(m) {
		this.d.heal.con_W_mod = CM.processModifier(m);
		this.updateHealingRates();
	}
	
	CM.calculatedStatsSVC.prototype.applyHealConBpModifier = function(m) {
		this.d.heal.con_B_mod += CM.processModifier(m);
		this.updateHealingRates();
	}

	CM.calculatedStatsSVC.prototype.applyHealConBpModifier = function(m) {
		this.d.heal.con_W_mod += CM.processModifier(m);
		this.updateHealingRates();
	}

	CM.calculatedStatsSVC.prototype.calc_healing_rates = function() {
		if (this.parChar.d.attributes && this.parChar.d.attributes.CON && this.parChar.d.calcStats.heal) {
			var c = this.parChar.d.attributes.CON.totRank;
			if (c > 0) {
				c = c - 1; 	// changes in increments of 4.  Offset the rank by -1 so that floor(rank/4) = 0 for values 1-4
				bmod = this.parChar.d.calcStats.heal.bludg.mod;
				wmod = this.parChar.d.calcStats.heal.wound.mod;
				var cb = c + bmod;
				var cw = c + wmod;
				/*  LB is offset by 10	  MB is offset by 8	   SB by 3
					LW is offset by 8	   MW by 3				 SW by 0
				*/
				var stats = this.parChar.d.calcStats.heal;
				stats.LB.text = (cb > 56) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 10 )]["text"];
				stats.MB.text = (cb > 68) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 7 )]["text"];
				stats.SB.text = (cb > 88) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 2 )]["text"];
				stats.LW.text = (cw > 68) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cw) /4) + 7 )]["text"];
				stats.MW.text = (cw > 88) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cw) /4) + 2 )]["text"];
				stats.SW.text = (cw > 88) ? "32/round" : kantiaDefs.healing_rates[Math.floor( (cw)/4 )]["text"];

				// stores the number of minutes required to heal one point.
				stats.LB.rate = (cb > 56) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 10 )]["minutes"];
				stats.MB.rate = (cb > 68) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 7 )]["minutes"];
				stats.SB.rate = (cb > 88) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cb) /4) + 2 )]["minutes"];
				stats.LW.rate = (cw > 68) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cw) /4) + 7 )]["minutes"];
				stats.MW.rate = (cw > 88) ? "--" : kantiaDefs.healing_rates[Math.floor( ((cw) /4) + 2 )]["minutes"];
				stats.SW.rate = (cw > 88) ? (1/192) : kantiaDefs.healing_rates[Math.floor( (cw)/4 )]["minutes"];
			}
		}
	}