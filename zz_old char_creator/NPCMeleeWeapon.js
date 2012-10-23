function NPCMeleeWeapon(weap, skillSet) {
	this.name = (weap.name) ? weap.name : "blank";
	this.safe_name = NPCtools.strip_specials(this.name);
	this.hands = ("hands" in weap) ? weap.hands : "";
	this.diff = ("diff" in weap) ? weap.diff : 0;
	this.staging = ("staging" in weap) ? weap.staging : "";
	this.damage = ("damage" in weap) ? weap.damage : "";
	this.dam_type = ("dam_type" in weap) ? weap.dam_type : "";
	this.skills = {}; // declare as empty object to use as associative array.
	this.owned = 0;
	this.set_skills(weap, skillSet);
}
	
	NPCMeleeWeapon.prototype.set_skills = function(weap, skillSet) {
		var skillbucket = {};
		var safe_name;
		if (weap.skills && skillSet) {
			forEach (weap.skills, function(n) {
				safe_name = NPCtools.strip_specials(n);
				if (skillSet[safe_name]) {
					skillbucket[safe_name] = skillSet[safe_name];
				}
			});
		}
		this.skills = skillbucket;
	}
	
	NPCMeleeWeapon.prototype.toggle_owned = function() {
		if (this.owned) {
			this.owned = 0;
		} else {
			this.owned = 1;
		}
	}
	
	NPCMeleeWeapon.prototype.getHTML = function() {
		var h = "";
		h = h + this.name + ":";
		forEach(this.skills, function(sk) {
			h = h + sk.name + " ";
		});
		h = h + "<br />";
		return h;
	}

	NPCMeleeWeapon.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<tr valign='top'>";
		h = h + "<td>" + this.name + "</td>";
		h = h + "<td>" + this.hands + "</td>";
		h = h + "<td>" + this.diff + "</td>";
		h = h + "<td>" + this.staging + "</td>";
		h = h + "<td>" + this.damage + "</td>";
		h = h + "<td>" + this.dam_type + "</td>";
		h = h + "</tr>\n";
		return h;
	}

	
	NPCMeleeWeapon.prototype.getEditForm = function() {
		var h = "";
		var t = "";
		h = h + "<input type=\"checkbox\" name=\"activeNPC_melee_weapons_" + this.safe_name + "_owned\" id=\"activeNPC_melee_weapons_" + this.safe_name + "_owned\"";
		if (this.owned) {
			h = h + " checked=\"checked\" ";
		}
		h = h + " onChange=\'NPCformcontrol.add_remove_melee_weapon(\"" + this.safe_name + "\")\'";
		t = this.name + " applicable skills: ";
		if (this.skills) {
			forEach (this.skills, function(sk) {
				if (sk.name) {
					t = t + sk.name + ", ";
				}
			});
		}
		h = h + " title=\"" + t + "\"";
		h = h + "/> ";
		h = h + "<label for=\"activeNPC_melee_weapons_" + this.safe_name + "_owned\">"+ this.name +"</label>";
		return h;
	}