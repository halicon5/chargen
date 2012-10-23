CM.armorSVC = function (aData, aParChar, invData) {
	this.d = aData;
	this.parChar = aParChar;
	this.invData = invData;


}

	CM.armorSVC.prototype.update = function(param) {
		CM.Manager.refreshData("equip armor", this.d.name);
	}

	CM.armorSVC.prototype.equipArmor = function(zone, itemName) {
		this.clearAdjustMods();
		this.clearZoneMods(zone);
		this.resetAdjustments();
		if (this.invData && this.invData.items[itemName]) {
			this.d.zones[zone] = this.invData.items[itemName].stats;
			this.applyZoneMods(zone);
		} else {
			this.d.zones[zone] = null;
		}
		this.setAdjustments();
		this.applyArmorAdjustMods();
		this.update();
	}

	CM.armorSVC.prototype.clearAdjustMods = function() {
		for (var i = 0; i < kantiaDefs.armorAdjustmentTypes.length; i++) {
			this.parChar.modifiers.clearModsById("armorAdj " + kantiaDefs.armorAdjustmentTypes[i]);
		}
	}
	
	CM.armorSVC.prototype.clearZoneMods = function(zone) {
		if (this.d.zoneMods[zone]) {
			for (var m in this.d.zoneMods[zone]) {
				this.parChar.modifiers.clearModsById(m);
				delete this.d.zoneMods[zone][m];	// clear the hash table
			}
		}
	}
	
	CM.armorSVC.prototype.resetAdjustments = function() {
		for (var k in kantiaDefs.armorAdjustmentTypes) {
			this.d.adjustments[kantiaDefs.armorAdjustmentTypes[k]] = 0;
			this.d.adjustments[kantiaDefs.armorAdjustmentTypes[k] + "_tot"] = 0;
		}
	}
	
	CM.armorSVC.prototype.setAdjustments = function() {
		for (var z in this.d.zones) {
			for (var i = 0; i < kantiaDefs.armorAdjustmentTypes.length; i++) {
				adj = kantiaDefs.armorAdjustmentTypes[i];
				if ( this.d.zones[z] && this.d.zones[z].adjusts[adj] ) {
					this.d.adjustments[adj] += this.d.zones[z].adjusts[adj];
				}
				else {
					this.d.adjustments[adj] 
				}
				this.d.adjustments[adj + "_tot"] = this.d.adjustments[adj] + this.d.adjustments[adj + "_adj"];
			}
		}
	}
	
	CM.armorSVC.prototype.applyArmorAdjustMods = function () {
		for (var i = 0; i < kantiaDefs.armorAdjustmentTypes.length; i++) {
			var adj = kantiaDefs.armorAdjustmentTypes[i];
			var id = "armorAdj " + adj;
			if ( this.d.adjustments[adj + "_tot"] ) {
				var value = this.d.adjustments[adj + "_tot"];
				var mod = {};
				mod.id = id;
				switch (adj) {
					case "spell":
						mod.target = "magicSkills.list";
						mod.mass = true;
						mod.subGroup = {arcanum: 1, shuri: 1, elemental: 1, manipulation: 1};
						mod.adj_mod = value;
						break;
					case "psion":
						mod.target = "magicSkills.list";
						mod.mass = true;
						mod.subGroup = {psychic: 1};
						mod.adj_mod = value;
						break;
					case "ranged":
					case "init":
						break;
					default:
						mod.target = "attributes." + adj;
						mod.name = "Armor " + adj + " adjustment " + value;
						mod["adj_mod"] = value;
						mod["AV_mod"] = value;
				}	// end switch

				this.parChar.modifiers.applyMod(mod);
			}
		}
	}

	CM.armorSVC.prototype.setAdjAdj = function (obj) {
		// object must be an array [key, value]
	
	}
	
	CM.armorSVC.prototype.applyZoneMods = function(zone) {
		if (this.d.zones[zone] && this.d.zones[zone].mods) {
			for (var mod in this.d.zones[zone].mods) {
				var id = this.d.zones[zone].mods[mod].id;
				this.d.zoneMods[zone][id] = true;
				this.parChar.modifiers.applyMod( this.d.zones[zone].mods[mod] );
			}
		}
	}
	
	
	CM.armorSVC.prototype.getWholeBodyStat = function(stat, except) {
		if (!except || except.constructor != Object) {
			except = {};
		}
		var tot = 0;
		for (var z in this.d.zones) {
			if (!except[z] && this.d.zones[z] && this.d.zones[z][stat]) {
				tot += this.d.zones[z][stat];
			}
			else {
				tot += 0;
			}
		}
		return tot;
	}
	
	CM.armorSVC.prototype.getPartialBodyStats = function(stat, inc) {
		if (inc.constructor != Array) {
			return 0;
		}
		var tot = 0;		
		for (i = 0; i < inc.length; i++) {
			if (this.d.zones[inc[i]] && this.d.zones[inc[i]][stat]) {
				tot += this.d.zones[inc[i]][stat];
			}
			else {
				tot += 0;
			}
		}
		return tot;
	}
	
	CM.armorSVC.prototype.removeArmorFromInventory = function(aName) {
		if (this.parChar && this.parChar.inventory) {
			this.parChar.inventory.removeItem(aName);
		}
	}