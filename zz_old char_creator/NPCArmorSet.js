function NPCArmorSet(allarmor) {
	var safe_name;
	if (allarmor === true) {
		for (var i = 0; i < NPC_ARMOR.length; i++) {
			if (NPC_ARMOR[i].name) {
				safe_name = NPCtools.strip_specials(NPC_ARMOR[i].name);
				this[safe_name] = new NPCArmor(NPC_ARMOR[i]);
			}
		}
	}
}

	NPCArmorSet.prototype.getEditForm = function(set_name) {
		var col = 0, maxcol = 2;
		var h = "";
		h = h + "<table border='0'>";
		forEach (this, function(armor) {
			if (col % maxcol == 0) {
				h = h + "<tr>";
			}
			col++;
			h = h + "<td>";
			if (armor.getEditForm) {
				h = h + (armor.getEditForm(set_name));
			}
			h = h + "</td>";
			if (col % maxcol == 0) {
				h = h + "</tr>\n";
			}
		});
		h = h + "</table>";
		return h;

	}


	NPCArmorSet.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<table border='1' cellspacing=0>";
		h = h + "<tr class='topic'><td>Armor</td><td>Deflect</td><td>Called<br />Shot</td><td>Staging</td><td>Absorb</td><td>Ballistic</td><td>Bypass</td><td>Blocking</td><td class='pink'>Init</td><td class='pink'>Ranged</td><td class='pink'>PER</td><td class='pink'>AGL<br/>REF</td class='pink'><td class='pink'>Spell</td><td class='pink'>Psion</td><td>AGL bonus</td></tr>";
		forEach (this, function(a) {
			if (a.owned) {
				h = h + a.getPrintableHTML();
			}
		});
		h = h + "</table>";
		return h;

	}

	
	NPCArmorSet.prototype.addArmorFromArmorset = function(aName, aSource) {
		if (aSource && aName) {
			var safe_name = NPCtools.strip_specials(aName);
			if (aSource[safe_name]) {
				this[safe_name] = aSource[safe_name];
			} 
		}
	}
	
	
	NPCArmorSet.prototype.addArmorFromList = function(nameArray, aSource) {
		if ( aSource) {
			for (var i=0; i < nameArray.length; i++) {
				this.addArmorFromArmorset(nameArray[i], aSource);
			}
		}
	}
	

	NPCArmorSet.prototype.change_armor = function(armor) {
		forEach (this, function(ar) {
			if (ar.toggle_owned && ar.safe_name != armor) {
				ar.owned = 0;
			}
		});
		if (this[armor]) {
			this[armor].toggle_owned();
		}
	}
	
	
	NPCArmorSet.prototype.get_active_armor_stat = function(stat) {
		var val = 0;;
		forEach(this, function(ar) {
			if (stat in ar) {
				if (ar.owned) {
					val = ar[stat];	
				}
			}
		});	
		return val;
	}