CM.defenseStatsSVC = function(aDefenseInfoDAT, aCharSvc) {
	this.d = aDefenseInfoDAT;
	this.parChar = aCharSvc;

	this.armorSvc = this.parChar.armor;
	this.attribSvc = this.parChar.attributes;


	this.hitZones = {};
	for (var i = 0; i < kantiaDefs.hitZones.length; i++) {
		var name= kantiaDefs.hitZones[i].name;
		this.hitZones[ name ] = new CM.hitZoneSVC(this.d.hitZones[name], this.parChar, kantiaDefs.hitZones[i], this);
	}
	
	this.hitZones.update = function() {
		// this function is added just to make the calculation flow work. I was lazy and didn't want to create  separate DAT and SVC classes for the hitZones object

		for (var i = 0; i < kantiaDefs.hitZones.length; i++) {
			var name= kantiaDefs.hitZones[i].name;
			if (this[name] && this[name].update) this[name].update();
		}
	}
}

	CM.defenseStatsSVC.prototype.update = function(fullUpdate) {
		this.setAglArmorAdj();		

		this.setNatSize();
		this.d.natSizeTot = this.d.natSize + this.d.natSize_mod;

		this.setNatAgl();
		this.d.natAglTot = this.d.natAgl + this.d.natAgl_mod;

		this.setAglLimit();
		this.d.aglLimitTot = this.d.aglLimit + this.d.aglLimit_mod;
		this.setAglFinal();
	
		this.setNoAgl();
		this.d.noAglTot = this.d.noAgl + this.d.noAgl_mod;

		this.setBase();
		this.d.baseTot = this.d.base_mod + this.d.base;
		
		this.setArmorDef();
		this.d.armorDefTot = this.d.armorDef_mod + this.d.armorDef;
		
		this.setShieldDef();
		this.d.shieldDefTot = this.d.shieldDef_mod + this.d.shieldDef;
		

		this.setNatStaging();
		this.d.natDefStagingTot = this.d.natDefStaging_mod + this.d.natDefStaging;
		
		this.setStill();
		this.d.stillTot = this.d.still_mod + this.d.still;		
		
		this.d.touchTot = this.d.touch_mod + this.d.touch;
		this.d.natDeflectTot = this.d.natDeflect_mod + this.d.natDeflect;
		this.d.natAbsorbTot = this.d.natAbsorb_mod + this.d.natAbsorb;
		this.d.natDamTransTot = this.d.natDamTrans_mod + this.d.natDamTrans;
		
		this.setDRNormal();
		this.setDRNoAgl();
		this.setDRTouch();
		this.setDRStill();
		
		CM.Manager.refreshData("defense");
	}



	CM.defenseStatsSVC.prototype.setDefMod = function(value, key, wupdate) {
		if (this.d[key] !== undefined) {
			if (isNaN(value)) {
				value = 0;
			}
			this.d[key] = parseInt(value, 10);
		}
		if (wupdate) {
			this.update(false);
		}
	}
	
	
	CM.defenseStatsSVC.prototype.setNatSize = function() {
		if (this.attribSvc) {

			this.d.natSize = (this.attribSvc.d.SIZ.totAdj < 25) ? -this.attribSvc.d.SIZ.totAdj : -25;
		}
	}

	CM.defenseStatsSVC.prototype.setNatAgl = function(param) {
		if (this.attribSvc) {
			// must offset the armor adjustments for purposes of calculating DRs
			var natagl = this.attribSvc.d.AGL.totAdj - this.d.aglArmorAdj;
			this.d.natAgl = ( natagl > -25) ? natagl : -25;
		}
	}
	
	CM.defenseStatsSVC.prototype.setNatStaging = function() {
		if (this.attribSvc) {
			this.d.natDefStaging = this.attribSvc.d.FORT.totRank;
		}
	}

	CM.defenseStatsSVC.prototype.setBase = function() {
		this.d.base = 50 + this.d.aglFinal + this.d.natSizeTot;
	}

	CM.defenseStatsSVC.prototype.setArmorDef = function() {
		if (this.armorSvc) {
			this.d.armorDef = this.armorSvc.getWholeBodyStat("deflect", {"shield":1} );
		}
	}
	
	CM.defenseStatsSVC.prototype.setShieldDef = function () {
		if (this.armorSvc) {
			this.d.shieldDef = this.armorSvc.getPartialBodyStats("deflect", ["shield"] );
		}	
	}
	
	CM.defenseStatsSVC.prototype.setNoAgl = function() {
		var noAgl = (this.d.aglFinal <= 0) ? 0 : -this.d.aglFinal;
		this.d.noAgl = noAgl;
	}
	
	CM.defenseStatsSVC.prototype.setNoAglMod = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		m = parseInt(m, 10);
		this.d.noAgl_mod = ( (this.d.noAgl + m) > 0) ? -this.d.noAgl : m;
	}
	
	CM.defenseStatsSVC.prototype.setStill = function() {
		if (this.armorSvc) {
			this.d.still = this.d.noAglTot;
		}
	}
	
	CM.defenseStatsSVC.prototype.setAglLimit = function() {
		if (this.armorSvc) {
			this.d.aglLimit = this.armorSvc.getWholeBodyStat("AGL_limit");
		}
	}

	CM.defenseStatsSVC.prototype.setAglArmorAdj = function() {
		if (this.armorSvc) {
			this.d.aglArmorAdj = this.armorSvc.d.adjustments.AGL_tot;
		}
	}
	
	
	CM.defenseStatsSVC.prototype.setAglFinal = function() {
		var fin = 0;
		var cap = 0;
		fin = this.d.natAglTot;
		if (this.d.aglArmorAdj < 0) {
			cap = 30 + this.d.aglLimitTot;
			cap = (cap < 0) ? 0 : cap;
		}
		this.d.aglFinal = (fin >= 0 && cap > 0 && fin >= cap ) ? cap : fin;
	}
	
	
	CM.defenseStatsSVC.prototype.setDRNoAgl = function() {
		this.d.DRnoAgl = this.d.baseTot + this.blendedArmor(this.d.armorDefTot, this.d.natDeflectTot, 5) + this.d.noAglTot;
	}
	CM.defenseStatsSVC.prototype.setDRNormal = function() {
		this.d.DRnormal = this.d.baseTot + this.blendedArmor(this.d.armorDefTot, this.d.natDeflectTot, 5) + this.d.shieldDefTot;
	}
	CM.defenseStatsSVC.prototype.setDRStill = function() {
		this.d.DRstill = 10 + this.natSizeTot + this.blendedArmor(this.d.armorDefTot + this.d.natDeflectTot, 5) - this.d.baseTot;
	}

	CM.defenseStatsSVC.prototype.setDRTouch = function() {
		this.d.DRtouch = this.d.baseTot;
	}
	
	
	CM.defenseStatsSVC.prototype.blendedArmor = function(a, b, factor) {
		// this is used to handle the effects of natural armor combined with worn armor.
		if ( isNaN(a) ) a = 0;
		if ( isNaN(b) ) b = 0;
		var ret = 0;
		if (a > b) {
			ret = a + (b/2);
		} else {
			ret = b + (a/2);
		}
		return Math.ceil(ret / factor) * factor;
	}