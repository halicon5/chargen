function NPCWeaponSkillSet(skill_list, AttSet) {
	if ( AttSet && skill_list) {
		for (var i=0; i < skill_list.length; i++) {
			this.addSkillFromSkillset(nameArray[i], aSource);
		}
	}
}

	/* NPCWeaponSkillSet instance methods */
	NPCWeaponSkillSet.prototype.getHTML = function() {
		var h = "";
		forEach (this, function(sk) {
			// Object can't process getHTML.getHTML, so we check for a function.
			if (typeof sk !== "function") {
				if (sk.rank > 0) {
					h = h + (sk.getHTML()) + "<br />";
				}
			}
		});
		return h;
	}
	
	NPCWeaponSkillSet.prototype.set_skill = function (aName, r) {
		if (this[aName]) {
			if (this[aName].set) {
				this[aName].set(r);
			}
		}
	}
	
	NPCWeaponSkillSet.prototype.addArbitrarySkill = function(aName, xp_ratio, r, att1, att2, mixtype) {
	
	}
	
	
	NPCWeaponSkillSet.prototype.update = function() {
		forEach (this, function(sk) {
			if (sk.update) {
				sk.update();
			}
		});
	}
	
	NPCWeaponSkillSet.prototype.addSkillFromSkillset = function(aName, aSource) {
		if (aSource && aName) {
			var safe_name = NPCtools.strip_specials(aName);
			if (aSource[safe_name]) {
				this[safe_name] = aSource[safe_name];
			} 
		}
	}
	
	
	NPCWeaponSkillSet.prototype.addSkillsFromList = function(nameArray, aSource) {
		if ( aSource) {
			for (var i=0; i < nameArray.length; i++) {
				this.addSkillFromSkillset(nameArray[i], aSource);
			}
		}
	}
	
	
	NPCWeaponSkillSet.prototype.removeSkill = function(aName) {
		if (this[aName]) {
			delete this[aName];
		}
	}
	
	
	
	NPCWeaponSkillSet.prototype.getEditForm = function(sgroup_name) {
		var h = "";
		h = h + "<tr valign='top' class='topic'>";
		h = h + "<td>" + sgroup_name + " Skills</td><td>Rank</td><td>Attrib</td><td>AV</td><td>Adj</td><td>XP</td>";
		h = h + "</tr>";
		forEach (this, function(sk) {
			if (sk.getEditForm) {
				h = h + (sk.getEditForm());
			}
		})
		return h;
	}
	

	NPCWeaponSkillSet.prototype.getPrintableHTML = function(setname, include_all) {
		var h = "";
		h = h + "<tr class='topic'><td>" + setname + " Skills</td><td>Rank</td><td>Attribute</td><td>AV</td><td>Adj</td><td>Total AV</td><td>XP</td></tr>";
		forEach (this, function(sk) {
			if ('rank' in sk) {
				if (sk.rank || include_all) {
					h = h + sk.getPrintableHTML();
				}
			}
		});
		return h;
	}
	
	
	
	
	
	