CM.traitHCSetSVC = function(collectionDAT, aParChar) {
	this.d = collectionDAT;
	this.name = this.d.name;
	this.parChar = aParChar;
	
	this.list = {};
	this.initialize();
}

	CM.traitHCSetSVC.prototype.initialize = function() {
		this.initializeServices();
	}
	
	CM.traitHCSetSVC.prototype.addTraitHC = function(type, traitHC, ident, detail) {
		if (kantiaDefs.traitHCs[type]) {
			var name = "";
			if (kantiaDefs.traitHCs[type].reqIdent && ident) {
				name = kantiaDefs.traitHCs[type].name + ": " + trim(ident);
			}
			else {
				name = kantiaDefs.traitHCs[type].name;
			}
		
			if (traitHC == "traits") {
				this.d.traitsHash[name] = 1;
			} else if (traitHC == "HCs") {
				this.d.HCsHash[name] = 1;
			}
			
			this.d.list[name] = new CM.traitHCDAT(kantiaDefs.traitHCs[type], traitHC, ident, detail);
			this.list[name] = new CM.traitHCSVC(this.d.list[name], this.parChar);
		}
	}
	
	
	CM.traitHCSetSVC.prototype.initializeServices = function() {
		for (var trait in this.d.list) {
			this.list[trait] = new CM.traitHCSVC(this.d.list[trait], this.parChar);
		}
	}


	CM.traitHCSetSVC.prototype.removeTraitHC = function() {
	
	}