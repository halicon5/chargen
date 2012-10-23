function NPCSkillSet(allskills, AttSet) {
	var attr1, attr2, safe_name;
	if (allskills === true && AttSet) {
		for (var i = 0; i < NPC_SKILL_LIST.length; i++) {
			attr1 = (AttSet[NPC_SKILL_LIST[i][ATT1]]) ? AttSet[NPC_SKILL_LIST[i][ATT1]] : null;
			attr2 = (AttSet[NPC_SKILL_LIST[i][ATT2]]) ? AttSet[NPC_SKILL_LIST[i][ATT2]] : null;
			safe_name = NPCtools.strip_specials(NPC_SKILL_LIST[i][0]);
			this[safe_name] = new NPCSkill(NPC_SKILL_LIST[i][0], NPC_SKILL_LIST[i][1], NPC_SKILL_LIST[i][2], attr1, attr2, NPC_SKILL_LIST[i][5]);
		}
	}
}

	/* NPCSkillSet instance methods */
	NPCSkillSet.prototype.getHTML = function() {
		var h = "";
		forEach (this, function(sk) {
			// Object can't process getHTML.getHTML, so we check for a function.
			if (typeof sk !== "function") {
				h = h + (sk.getHTML()) + "<br />";
			}
		});
		return h;
	}
	
	NPCSkillSet.prototype.set_skill = function (aName, r) {
		var safe_name = NPCtools.strip_specials(aName);
		if (this[safe_name]) {
			if (this[safe_name].set) {
				this[safe_name].set(r);
			}
		}
	}
	
	NPCSkillSet.prototype.addArbitrarySkill = function(aName, xp_ratio, r, att1, att2, mixtype) {
	
	}
	
	
	NPCSkillSet.prototype.update = function() {
		forEach (this, function(sk) {
			if (sk.update) {
				sk.update();
			}
		});
	}
	
	NPCSkillSet.prototype.addSkillFromSkillset = function(aName, aSource) {
		if (aSource && aName) {
			var safe_name = NPCtools.strip_specials(aName);
			if (aSource[safe_name]) {
				this[safe_name] = aSource[safe_name];
			} 
		}
	}
	
	
	NPCSkillSet.prototype.addSkillsFromList = function(nameArray, aSource) {
		if ( aSource) {
			for (var i=0; i < nameArray.length; i++) {
				this.addSkillFromSkillset(nameArray[i], aSource);
			}
		}
	}
	
	
	NPCSkillSet.prototype.removeSkill = function(aName) {
		if (this[aName]) {
			delete this[aName];
		}
	}
	
	
	
	NPCSkillSet.prototype.getEditForm = function(sgroup_name) {
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
	
	
	NPCSkillSet.prototype.getPrintableHTML = function(setname, include_all) {
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

	
	
	
	