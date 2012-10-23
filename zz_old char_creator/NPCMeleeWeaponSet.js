function NPCMeleeWeaponSet(allweapons, skillSet) {
	var safe_name;
	if (allweapons === true && skillSet) {
		for (var i = 0; i < NPC_MELEE_WEAPONS.length; i++) {
			if (NPC_MELEE_WEAPONS[i].name) {
				safe_name = NPCtools.strip_specials(NPC_MELEE_WEAPONS[i].name);
				this[safe_name] = new NPCMeleeWeapon(NPC_MELEE_WEAPONS[i], skillSet);
			}
		}
	}
}

	NPCMeleeWeaponSet.prototype.getEditForm = function() {
		var col = 0, maxcol = 3;
		var h = "";
		h = h + "<table border='0'>";
		forEach (this, function(w) {
			if (col % maxcol == 0) {
				h = h + "<tr>";
			}
			col++;
			h = h + "<td>";
			if (w.getEditForm) {
				h = h + (w.getEditForm());
			}
			h = h + "</td>";
			if (col % maxcol == 0) {
				h = h + "</tr>\n";
			}
		});
		h = h + "</table>";
		return h;

	}
	

	NPCMeleeWeaponSet.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<table border='1' cellspacing=0>";
		h = h + "<tr class='topic'><td>Melee Weapon</td><td># Hands</td><td>Diff</td><td>Staging</td><td>Dam</td><td>Type</td></tr>";
		forEach (this, function(w) {
			if (w.owned) {
				h = h + w.getPrintableHTML();
			}
		});
		h = h + "</table>";
		return h;

	}



	NPCMeleeWeaponSet.prototype.addWeaponFromMeleeWeaponset = function(aName, aSource) {
		if (aSource && aName) {
			var safe_name = NPCtools.strip_specials(aName);
			if (aSource[safe_name]) {
				this[safe_name] = aSource[safe_name];
			} 
		}
	}
	
	
	NPCMeleeWeaponSet.prototype.addWeaponFromList = function(nameArray, aSource) {
		if ( aSource) {
			for (var i=0; i < nameArray.length; i++) {
				this.addWeaponFromMeleeWeaponset(nameArray[i], aSource);
			}
		}
	}
	
