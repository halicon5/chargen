function NPCRangedWeapon(weap, skillSet) {
	this.name = (weap.name) ? weap.name : "blank";
	this.safe_name = NPCtools.strip_specials(this.name);
	this.range = ("range" in weap) ? weap.range : "";
	this.hands = ("hands" in weap) ? weap.hands : "";
	this.diff = ("diff" in weap) ? weap.diff : 0;
	this.diff_inc = ("diff_inc" in weap) ? weap.diff_inc : 0;
	this.recoil = ("recoil" in weap) ? weap.recoil : 0;
	this.staging = ("staging" in weap) ? weap.staging : "";
	this.damage = ("damage" in weap) ? weap.damage : "";
	this.dam_type = ("dam_type" in weap) ? weap.dam_type : "";
	this.failure = ("failure" in weap) ? weap.failure : "";
	this.ammo_type = ("ammo_type" in weap) ? weap.ammo_type : "";
	this.ammo_cap = ("ammo_cap" in weap) ? weap.ammo_cap : "";
	this.ROF = ("ROF" in weap) ? weap.ROF : "";
	this.skills = {}; // declare as empty object to use as associative array.
	this.owned = 0;
	this.set_skills(weap, skillSet);
}
	
	NPCRangedWeapon.prototype.set_skills = function(weap, skillSet) {
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
	
	NPCRangedWeapon.prototype.toggle_owned = function() {
		if (this.owned) {
			this.owned = 0;
		} else {
			this.owned = 1;
		}
	}
	
	NPCRangedWeapon.prototype.getHTML = function() {
		var h = "";
		h = h + this.name + ":";
		forEach(this.skills, function(sk) {
			h = h + sk.name + " ";
		});
		h = h + "<br />";
		return h;
	}
	

	NPCRangedWeapon.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<tr valign='top'>";
		h = h + "<td>" + this.name + "</td>";
		h = h + "<td>" + this.hands + "</td>";
		h = h + "<td>" + this.diff + "(" + this.diff_inc + ")</td>";
		h = h + "<td>" + this.staging + "</td>";
		h = h + "<td>" + this.damage + "</td>";
		h = h + "<td>" + this.dam_type + "</td>";
		h = h + "<td>" + this.range + "</td>";
		h = h + "<td>" + this.recoil + "</td>";
		h = h + "<td>" + this.failure + "%</td>";
		h = h + "<td>" + this.ammo_cap + "</td>";
		h = h + "<td>" + this.ROF + "</td>";
		h = h + "<td>" + this.ammo_type + "</td>";
		h = h + "</tr>\n";
		return h;
	}
	
	NPCRangedWeapon.prototype.getEditForm = function() {
		var h = "";
		var t = "";
		h = h + "<input type=\"checkbox\" name=\"activeNPC_ranged_weapons_" + this.safe_name + "_owned\" id=\"activeNPC_ranged_weapons_" + this.safe_name + "_owned\"";
		if (this.owned) {
			h = h + " checked=\"checked\" ";
		}
		h = h + " onChange=\'NPCformcontrol.add_remove_ranged_weapon(\"" + this.safe_name + "\")\'";
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
		h = h + "<label for=\"activeNPC_ranged_weapons_" + this.safe_name + "_owned\">"+ this.name +"</label>";
		return h;
	}