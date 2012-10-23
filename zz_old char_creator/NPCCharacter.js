function NPCCharacter() {
	this.name = "";
	this.race = "";
	this.attributes = new NPCAttributeSet(10,10,10,10,10,10,10,10,10,10,10);
	this.vital_stats = new NPCCalculatedStats(this.attributes);

	// generate all skills and then break down into sub groups.
	this.skills = new NPCSkillSet(true, this.attributes);
		this.common_skills = new NPCSkillSet();
		this.common_skills.addSkillsFromList(NPC_COMMON_SKILLS, this.skills);

		this.physical_skills = new NPCSkillSet();
		this.physical_skills.addSkillsFromList(NPC_PHYSICAL_SKILLS, this.skills);

		this.social_skills = new NPCSkillSet();
		this.social_skills.addSkillsFromList(NPC_SOCIAL_SKILLS, this.skills);

		this.educ_skills = new NPCSkillSet();
		this.educ_skills.addSkillsFromList(NPC_EDUCATION_SKILLS, this.skills);
		
		this.common_combat_skills = new NPCSkillSet();
		this.common_combat_skills.addSkillsFromList(NPC_COMMON_COMBAT, this.skills);
		
		this.weapon_skills = new NPCWeaponSkillSet();
		this.weapon_skills.addSkillsFromList(NPC_WEAPON_SKILLS, this.skills);
		
		this.weapon_group_skills = new NPCWeaponSkillSet();
		this.weapon_group_skills.addSkillsFromList(NPC_WEAPON_GROUPS, this.skills);
		

	this.all_melee_weapons = new NPCMeleeWeaponSet(true, this.skills);
		this.melee_swords = new NPCMeleeWeaponSet();
		this.melee_swords.addWeaponFromList(NPC_WEAPONS_SWORDS, this.all_melee_weapons);

		this.melee_knives = new NPCMeleeWeaponSet();
		this.melee_knives.addWeaponFromList(NPC_WEAPONS_KNIVES, this.all_melee_weapons);

		this.melee_axes = new NPCMeleeWeaponSet();
		this.melee_axes.addWeaponFromList(NPC_WEAPONS_AXES, this.all_melee_weapons);

		this.melee_clubs = new NPCMeleeWeaponSet();
		this.melee_clubs.addWeaponFromList(NPC_WEAPONS_CLUBS, this.all_melee_weapons);

		this.melee_maces = new NPCMeleeWeaponSet();
		this.melee_maces.addWeaponFromList(NPC_WEAPONS_MACES, this.all_melee_weapons);

		this.melee_hammers = new NPCMeleeWeaponSet();
		this.melee_hammers.addWeaponFromList(NPC_WEAPONS_HAMMERS, this.all_melee_weapons);

		this.melee_polearms = new NPCMeleeWeaponSet();
		this.melee_polearms.addWeaponFromList(NPC_WEAPONS_POLEARMS, this.all_melee_weapons);

		this.melee_chains = new NPCMeleeWeaponSet();
		this.melee_chains.addWeaponFromList(NPC_WEAPONS_CHAINS, this.all_melee_weapons);

		this.melee_misc = new NPCMeleeWeaponSet();
		this.melee_misc.addWeaponFromList(NPC_WEAPONS_MISC, this.all_melee_weapons);

	this.all_ranged_weapons = new NPCRangedWeaponSet(true, this.skills);
		this.ranged_bows = new NPCRangedWeaponSet();
		this.ranged_bows.addWeaponFromList(NPC_RANGED_BOWS, this.all_ranged_weapons);

		this.ranged_crossbows = new NPCRangedWeaponSet();
		this.ranged_crossbows.addWeaponFromList(NPC_RANGED_CROSSBOWS, this.all_ranged_weapons);

		this.ranged_thrown = new NPCRangedWeaponSet();
		this.ranged_thrown.addWeaponFromList(NPC_RANGED_THROWN, this.all_ranged_weapons);
	
	this.all_armor = new NPCArmorSet(true);		
		this.armor_natural = new NPCArmorSet();
		this.armor_natural.addArmorFromList(NPC_ARMOR_NATURAL, this.all_armor);		
	
		this.armor_torso = new NPCArmorSet();
		this.armor_torso.addArmorFromList(NPC_ARMOR_TORSO, this.all_armor);

		this.armor_arms = new NPCArmorSet();
		this.armor_arms.addArmorFromList(NPC_ARMOR_ARMS, this.all_armor);

		this.armor_legs = new NPCArmorSet();
		this.armor_legs.addArmorFromList(NPC_ARMOR_LEGS, this.all_armor);

		this.armor_head = new NPCArmorSet();
		this.armor_head.addArmorFromList(NPC_ARMOR_HEAD, this.all_armor);

		this.armor_hands = new NPCArmorSet();
		this.armor_hands.addArmorFromList(NPC_ARMOR_HANDS, this.all_armor);

		this.armor_shield = new NPCArmorSet();
		this.armor_shield.addArmorFromList(NPC_ARMOR_SHIELDS, this.all_armor);

		this.armor_penalties = new NPCArmorPenalties(this.all_armor);

	this.defense_ratings = new NPCDefenseRatings(this.attributes, this.armor_torso, this.armor_arms, this.armor_legs, this.armor_head, this.armor_hands, this.armor_shield, this.armor_natural);
}

	NPCCharacter.prototype.getHTML = function() {
		var h = "";
		h = this.name + "<br />";
		h = h + this.race + "<br />";
		h = h + this.attributes.getHTML() + "<br />";
		h = h + this.common_skills.getHTML() + "<br />";
		h = h + this.physical_skills.getHTML() + "<br />";
		h = h + this.social_skills.getHTML() + "<br />";
		h = h + this.educ_skills.getHTML() + "<br />";
		return h;
	}
	
	NPCCharacter.prototype.update = function() {
		this.skills.update();
		this.vital_stats.update();
		this.armor_penalties.update();
		this.defense_ratings.update();
	}
	
	
	NPCCharacter.prototype.getEditForm = function() {
		var h = "<form name='edit_NPC_form' id='edit_NPC_form'>";
		h = h + "<input type='button' onClick='NPCformcontrol.display_update();' value='Update Display' />";
		h = h + "<input type='button' onClick='NPCformcontrol.display_printable()' value='Create Printable Page (in new window)' />";
		h = h + "<b>Name:</b><textarea cols='40' rows='1' name='activeNPC_name' id='activeNPC_name'>" + this.name + "</textarea>";
		h = h + this.attributes.getEditForm();

		h = h + "<table border='0'><tr valign='top'><td>";
			h = h + "<table border='1' cellspacing='0'>";
			h = h + this.common_skills.getEditForm("Common");
			h = h + this.physical_skills.getEditForm("Physical");
			h = h + this.social_skills.getEditForm("Social");
			h = h + "</table> ";
		h = h + "</td><td>";
			h = h + "<table border='1' cellspacing='0'>";
			h = h + this.educ_skills.getEditForm("Education");
			h = h + "</table>";
		h = h + "</td></tr></table>";


		h = h + "<table border='0'><tr valign='top'><td>";
			h = h + "<table border='1' cellspacing='0' >";
			h = h + this.common_combat_skills.getEditForm("Common Combat");
			h = h + this.weapon_group_skills.getEditForm("Weapon Group ");
			h = h + this.weapon_skills.getEditForm("Martial ");
			h = h + "</table>";
		h = h + "</td><td>";
			h = h + "<h2>Melee Weapons</h2><b>Swords</b>";
			h = h + this.melee_swords.getEditForm();
			h = h + "<b>Knives</b>";
			h = h + this.melee_knives.getEditForm();
			h = h + "<b>Axes</b>";
			h = h + this.melee_axes.getEditForm();
			h = h + "<b>Clubs</b>";
			h = h + this.melee_clubs.getEditForm();
			h = h + "<b>Maces</b>";
			h = h + this.melee_maces.getEditForm();
			h = h + "<b>Hammers</b>";
			h = h + this.melee_hammers.getEditForm();
			h = h + "<b>Polerarms and Spears</b>";
			h = h + this.melee_polearms.getEditForm();
			h = h + "<b>Chain weapons</b>";
			h = h + this.melee_chains.getEditForm();
			h = h + "<b>Misc</b>";
			h = h + this.melee_misc.getEditForm();
			h = h + "<h3>Ranged Weapons</h3>";
			h = h + "<b>Bows</b>";
			h = h + this.ranged_bows.getEditForm();
			h = h + "<b>Crossbows</b>";
			h = h + this.ranged_crossbows.getEditForm();
			h = h + "<b>Thrown weapons</b>";
			h = h + this.ranged_thrown.getEditForm();
		h = h + "</td><td>";
			h = h + "<h2>Armor</h2>";
			h = h + "<b>Torso</b>";
			h = h +	this.armor_torso.getEditForm("armor_torso");
			h = h + "<b>Head</b>";
			h = h +	this.armor_head.getEditForm("armor_head");
			h = h + "<b>Arms/Shoulders</b>";
			h = h +	this.armor_arms.getEditForm("armor_arms");
			h = h + "<b>Shield and Forearms</b>";
			h = h +	this.armor_shield.getEditForm("armor_shield");
			h = h + "<b>Legs</b>";
			h = h +	this.armor_legs.getEditForm("armor_legs");
			h = h + "<b>Hands</b>";
			h = h +	this.armor_hands.getEditForm("armor_hands");
			h = h + "<b>Natural</b>";
			h = h +	this.armor_natural.getEditForm("armor_natural");
			

		h = h + "</td></tr></table>";
		h = h + "</form>";
		return h;
	}
	
	
	
	NPCCharacter.prototype.getPrintableHTML = function () {
		var h = "";

		h = h + "<html><head>";
		h = h + "</head>";
		h = h + "<body>";
		
		h = h + "<style>td {font-size: .8em;} .topic {font-weight: bold;} .right {text-align: right;} .yellow{background-color: yellow;}  .pink {background-color: #FFCCCC;} .gray {background-color: #555555;}</style>";
		
		h = h + this.name;

		h = h + "<table border='0'>";
		h = h + "<tr valign='top'><td>";
			h = h + this.attributes.getPrintableHTML();
		h = h + "</td><td>";
			h = h + this.vital_stats.getPrintableHTML();
		h = h + "</td></tr></table>";

		h = h + "<table border='0'>";
		h = h + "<tr valign='top'><td>";
			h = h + this.defense_ratings.getPrintableHTML();
		h = h + "</td><td>";
			h = h + this.armor_penalties.getPrintableHTML();
		h = h + "</td></tr></table>";
		h = h + this.all_melee_weapons.getPrintableHTML() + "<br />";
		h = h + this.all_ranged_weapons.getPrintableHTML() + "<br />";
		h = h + this.all_armor.getPrintableHTML() + "<br />";

		h = h + this.getPrintableCommonCombatAVs() + "<br />";
		h = h + this.getPrintableMeleeAVs() + "<br />";
		h = h + this.getPrintableRangedAVs() + "<br />";

		h = h + "<table border='0'>";
		h = h + "<tr valign='top'><td>";
			h = h + "<table border='1' cellspacing='0'>";
			h = h + this.common_skills.getPrintableHTML("Common", true)
			h = h + this.physical_skills.getPrintableHTML("Physical", true)
			h = h + this.social_skills.getPrintableHTML("Social", true)
			h = h + "</table>";
		h = h + "</td><td>";
			h = h + "<table border='1' cellspacing='0'>";
			h = h + this.common_combat_skills.getPrintableHTML("Common Combat", true)
			h = h + this.educ_skills.getPrintableHTML("Education", false)
			h = h + this.weapon_group_skills.getPrintableHTML("Weapon Groups", false)
			h = h + this.weapon_skills.getPrintableHTML("Weapons", false)
			h = h + "</table>";
		h = h + "</td></tr></table>";
		h = h + "</body></html>";
		
		
		return h;		
	}
	
	
	
	
	NPCCharacter.prototype.getPrintableCommonCombatAVs = function() {
		var h = "";
		var num_attacks = 1;
		h = h + "<table border='1' cellspacing='0'>";
		h = h + "<tr class='topic'><td>Common Combat Skills</td><td>Rank</td><td># Actions</td><td>1st</td><td>2nd</td><td>3rd</td><td>4th</td><td>5th</td><td>6th</td></tr>";		
		forEach (this.common_combat_skills, function(sk) {
			// make sure the enumeration only pulls actual skills and not methods
			if ('rank' in sk) {
				num_attacks = (sk.rank > 6) ? Math.floor(sk.rank/3) : 1;
				num_attacks = (num_attacks > 6) ? 6 : num_attacks;
				
				// check for agility reflex penalties.
				var starting_AV = sk.AV + sk.adj;
				if (sk.att1 || sk.att2) {
					if (sk.att1 === activeNPC.attributes.AGL || sk.att1 === activeNPC.attributes.REF) {
						starting_AV = sk.AV + sk.adj + activeNPC.armor_penalties.agl_ref;
					}
					if (sk.att2 === activeNPC.attributes.AGL || sk.att2 === activeNPC.attributes.REF) {
						starting_AV = sk.AV + sk.adj + activeNPC.armor_penalties.agl_ref;
					}
				}
				
				h = h + "<tr class='right'><td>" + sk.name + "</td><td>" + sk.rank + "</td><td>" + num_attacks + "</td>";
				h = h + "<td class='yellow'>" + starting_AV + "</td>";
				for (var i = 1; i < 6; i++) {
					if (i < num_attacks) {
						h = h + "<td class='yellow'>" + (starting_AV - (i*20)) + "</td>";
					} else {
						h = h + "<td class='gray'>--</td>";
					}
				}
				h = h + "</tr>";
			}// end checking for 'rank' in sk
		}); // end forEach
		h = h + "</table>";
		return h;
	}
	
	
	
	
	NPCCharacter.prototype.getPrintableMeleeAVs = function() {
		/*
			Cycle through each melee weapon and identify the highest rank and applicable skill.
			Display combat AVs only for owned weapons.
		*/
		var h = "";
		var hi_AV = 0;
		var hi_rank = 0;
		var num_attacks = 1;
		h = h + "<table border='1' cellspacing='0'>";
		h = h + "<tr class='topic'><td>Melee Weapon Attacks</td><td>Rank</td><td># Att</td><td>1st</td><td>2nd</td><td>3rd</td><td>4th</td><td>5th</td><td>6th</td><td>Damage</td><td>Staging</td><td>Type</td></tr>";
		forEach (this.all_melee_weapons, function(w) {
			hi_AV = 0;
			hi_rank = 0;
			if (w.owned) {
				forEach (w.skills, function(sk) {
					if ((sk.AV + sk.adj) > hi_AV) {
						hi_AV = sk.AV + sk.adj;
						hi_rank = sk.rank;
					}					
				}); // end cycling through each skill
			
			num_attacks = (hi_rank >= 6) ? Math.floor(hi_rank/3) : 1;
			num_attacks = (num_attacks > 6) ? 6 : num_attacks;
			h = h + "<tr class='right'><td>" + w.name + "</td><td>" + hi_rank + "</td><td>" + num_attacks + "</td>";

			h = h + "<td class='yellow'>" + (hi_AV + activeNPC.armor_penalties.agl_ref - w.diff) + "</td>";
			for (var i = 1; i < 6; i++) {
				if (i < num_attacks) {
					h = h + "<td class='yellow'>" + (hi_AV + activeNPC.armor_penalties.agl_ref - w.diff - (i*20)) + "</td>";
				} else {
					h = h + "<td class='gray'>--</td>";
				}
			}
			h = h + "<td class='pink'>" + w.damage + "</td><td class='pink'>" + w.staging + "</td><td class='pink'>" + w.dam_type + "</td>";
			h = h + "</tr>";
			} // end check for owned.
		}); // end cycling through each weapon
		h = h + "</table>";
		return h;
	}
	
	
	
	
	
	NPCCharacter.prototype.getPrintableRangedAVs = function() {
		/*
			Cycle through each melee weapon and identify the highest rank and applicable skill.
			Display combat AVs only for owned weapons.
		*/
		var h = "";
		var hi_AV = 0;
		var hi_rank = 0;
		var num_attacks = 1;
		var AV;
		h = h + "<table border='1' cellspacing='0'>";
		h = h + "<tr class='topic'><td>Ranged Combat Attacks</td><td>Rank</td><td># Att</td><td>Recoil</td><td>1st</td><td>2nd</td><td>3rd</td><td>4th</td><td>5th</td><td>6th</td><td>Damage</td><td>Staging</td><td>Type</td></tr>";
		forEach (this.all_ranged_weapons, function(w) {
			hi_AV = 0;
			hi_rank = 0;
			if (w.owned) {
				forEach (w.skills, function(sk) {
					if ((sk.AV + sk.adj) > hi_AV) {
						hi_AV = sk.AV + sk.adj;
						hi_rank = sk.rank;
					}					
				}); // end cycling through each skill
			
			num_attacks = (hi_rank >= 6) ? Math.floor(hi_rank/3) : 1;
			num_attacks = (num_attacks > 6) ? 6 : num_attacks;
			h = h + "<tr class='right'><td>" + w.name + "</td><td>" + hi_rank + "</td><td>" + num_attacks + "</td><td>" + w.recoil + "</td>";

			h = h + "<td class='yellow'>" + (hi_AV + activeNPC.armor_penalties.agl_ref + activeNPC.armor_penalties.ranged - w.diff) + "</td>";
			for (var i = 1; i < 6; i++) {
				if (i < num_attacks) {
					AV = (hi_AV + activeNPC.armor_penalties.agl_ref + activeNPC.armor_penalties.ranged - w.diff - (i*20));
					
					h = h + "<td class='yellow'>" + AV;
					if (w.recoil > 0) {
						h = h + " (r " + (-i * w.recoil) + ")";
					}
					h = h + "</td>";
				} else {
					h = h + "<td class='gray'>--</td>";
				}
			}
			h = h + "<td class='pink'>" + w.damage + "</td><td class='pink'>" + w.staging + "</td><td class='pink'>" + w.dam_type + "</td>";
			h = h + "</tr>";
			} // end check for owned.
		}); // end cycling through each weapon
		h = h + "</table>";
		return h;
	}
	
	
	
	NPCCharacter.prototype.get_archive_code = function() {
	
	}