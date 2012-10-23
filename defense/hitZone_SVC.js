CM.hitZoneSVC = function(aDat, aCharSVC, hitZoneDef, defenseSvc) {
	this.d = aDat;
	this.parChar = aCharSVC;
	this.hitZoneDef = hitZoneDef;

	this.defense = defenseSvc;	
	this.calcStats = this.parChar.calcStats;
	this.armor = this.parChar.armor;
}

	
	CM.hitZoneSVC.prototype.update = function(fullupdate) {		
		this.setCalledShot();
		this.d.calledShotTot = this.d.calledShot + this.d.calledShot_mod;
		
		this.setAbsorb();
		this.d.absorbTot = this.d.absorb + this.d.absorb_mod;
		
		this.setStaging();
		this.d.defStagingTot = this.d.defStaging + this.d.defStaging_mod;

		this.setDamTrans();
		this.d.damTransTot = this.d.damTrans + this.d.damTrans_mod;
		
		this.setTargetDR();
		this.setNoAglDR();
		this.setTouchDR();
		
		this.setIncapLimit();
		this.setMaimLimit();
		
		
	}

	CM.hitZoneSVC.prototype.setValue = function(value, key, wupdate) {
		if (this.d[key] !== undefined) {
			if (isNaN(value)) {
				value = 0;
			}
			this.d[key] = parseInt(value, 10);
			if (wupdate) this.update(false);
		}
	}
	
	CM.hitZoneSVC.prototype.setCalledShot = function () {
		this.d.calledShot = this.getArmorStat("called_shot");
	}
	
	CM.hitZoneSVC.prototype.setTargetDR = function() {
		this.d.targetDR = this.defense.d.baseTot + this.defense.d.shieldDefTot + this.hitZoneDef.penalty + this.d.calledShotTot;
	}
	
	CM.hitZoneSVC.prototype.setNoAglDR = function() {
		this.d.noAglDR = this.defense.d.baseTot + this.hitZoneDef.penalty + this.d.calledShotTot + this.defense.d.noAglTot;
	}
	
	CM.hitZoneSVC.prototype.setTouchDR = function() {
		this.d.touchDR = this.defense.d.baseTot + this.hitZoneDef.penalty;
	}
	
	CM.hitZoneSVC.prototype.getArmorStat = function(stat, def) {
		if (!def) def = 0;
		if (this.armor.d.zones[this.d.armorZone] && this.armor.d.zones[this.d.armorZone][stat]) {
			return this.armor.d.zones[this.d.armorZone][stat];
		}
		else {
			return def;
		}
	}


	CM.hitZoneSVC.prototype.setAbsorb = function() {
		this.d.absorb = this.defense.blendedArmor(this.defense.d.natAbsorbTot, this.getArmorStat("absorb", 0), 1);
	}

	CM.hitZoneSVC.prototype.setDamTrans = function() {
		this.d.damTrans = this.defense.blendedArmor(this.defense.d.natDamTrans, this.getArmorStat("damTrans", 0), 1);
	}
	
	CM.hitZoneSVC.prototype.setStaging = function() {
		this.d.defStaging = this.defense.d.natDefStagingTot + this.getArmorStat("defStaging", 0);
	}
	
	CM.hitZoneSVC.prototype.setIncapLimit = function() {
		this.d.incapLimit = Math.ceil( (this.calcStats.d.HP.tot * this.hitZoneDef.percent) / 2);
	}
	
	CM.hitZoneSVC.prototype.setMaimLimit = function() {
		this.d.maimLimit = Math.ceil( (this.calcStats.d.HP.tot * this.hitZoneDef.percent) / 1);
	}