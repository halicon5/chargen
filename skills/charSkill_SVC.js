CM.charSkillSVC = function(aCharSkillDAT, aParChar) {
	this.d = aCharSkillDAT;
	this.parChar = aParChar;
	
	this.xp = new CM.rankedXpSVC(this.d.xp, this, this.parChar);
	
	this.CMOBJNAME = this.d.name;
}

	CM.charSkillSVC.prototype.destroy = CM.destroy;

	CM.charSkillSVC.prototype.update = function(param) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.update = function() " + this.d.name);
		this.d.totRank = this.calc_totRank();
		this.d.adj = this.calc_adjust();
		this.d.totAdj = this.d.adj_mod + this.d.adj;
		this.d.AV = this.calc_AV();
		this.d.totAV = this.d.totAdj + this.d.AV;
		
		CM.Manager.refreshData("charSkill", this.d.name);
	}


	CM.charSkillSVC.prototype.reset = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.reset = function() " + this.d.name);
		this.d.mod = 0;
		this.d.adj_mod = 0;
		this.d.mult = 1;
	}


	CM.charSkillSVC.prototype.calc_adjust = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.calc_adjust = function() " + this.d.name);

		var adj = 0;
		var cur = null;
		var att = new Array();
		att[0] = (this.d.attrib1 && this.parChar.d.attributes[this.d.attrib1]) ? this.parChar.d.attributes[this.d.attrib1].totAdj : null;
		att[1] = (this.d.attrib2 && this.parChar.d.attributes[this.d.attrib2]) ? this.parChar.d.attributes[this.d.attrib2].totAdj : null;
		att[2] = (this.d.attrib3 && this.parChar.d.attributes[this.d.attrib3]) ? this.parChar.d.attributes[this.d.attrib3].totAdj : null;
		att[3] = (this.d.attrib4 && this.parChar.d.attributes[this.d.attrib4]) ? this.parChar.d.attributes[this.d.attrib4].totAdj : null;

		switch (this.d.mixtype) {
			case "+":
				adj = (att[0]) ? att[0] : 0;
				break;
			case ">":
				var cur = (!isNaN(att[0]) ) ? att[0] : null;
				for (var i = 1; i < att.length; i++) {
					cur = (!isNaN(att[i]) && att[i] > cur) ? att[i] : cur;
				}
				adj = cur;
				break;
			case "++":
				break;
			case "+-":
				adj = ( !isNaN(att[0]) && !isNaN(att[1]) ) ? att[0] - att[1] : 0;
				break;
			case "-":
				adj = (att[0]) ? -att[0] : 0;
				break;
			case "-+":
				adj = ( !isNaN(att[0]) && !isNaN(att[1]) ) ? -att[0] + att[1] : 0;
				break;
			default:
				// the "+" mixtype
				adj = (att[0]) ? att[0] : 0;
		}

		return adj;
	}



	CM.charSkillSVC.prototype.calc_AV = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.calc_AV = function() " + this.d.name);

		if (!isNaN(this.d.totRank)) {
			return this.d.totRank * 5;
		} else {
			return 0;
		}
	}



	CM.charSkillSVC.prototype.calc_totRank = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.calc_totRank = function() " + this.d.name);
		return this.d.rank + this.d.mod;
	}


	CM.charSkillSVC.prototype.calc_totAdj = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.calc_totAdj = function() " + this.d.name);
		return this.d.adj + this.d.adj_mod;
	}
	
	CM.charSkillSVC.prototype.calc_totAV = function() {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.calc_totAV = function() " + this.d.name);
		return this.d.AV + this.d.totAdj;	
	}
	
	
	
	CM.charSkillSVC.prototype.setRank = function(r) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.setRank = function(" + r + ") " + this.d.name);
		if (isNaN(r)) {
			r = 0;
		}
		this.d.rank = parseInt(r, 10);
		this.update();	
	}
	

	CM.charSkillSVC.prototype.setAdjMod = function(m) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.setAdjMod = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.adj_mod = parseInt(m, 10);
		this.update();
	}


	CM.charSkillSVC.prototype.applyAdjMod = function(m) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.applyAdjMod = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.adj_mod += parseInt(m, 10);
		this.update();
	}
	
	
	CM.charSkillSVC.prototype.setModifier = function(m) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.setModifier = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.mod = parseInt(m, 10);
		this.update();
	}
	
	
	
	CM.charSkillSVC.prototype.applyModifier = function(m) {
		if (CM.debug) CM.log("[CALL] CM.charSkillSVC.prototype.applyModifier = function(" + m + ") " + this.d.name);
		if (isNaN(m)) {
			m = 0;
		}
		this.d.mod += parseInt(m, 10);
		this.update();
	}