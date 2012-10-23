function NPCformcontrol() {
	this.formDisplay = document.getElementById("edit_NPC_form");
}
	NPCformcontrol.change_attribute = function (attrib) {
		activeNPC.attributes[attrib].set(document.edit_NPC_form['activeNPC_attributes_'+attrib+'_rank'].value);
		activeNPC.update();
		this.display_update();
	}
	
	NPCformcontrol.change_skill = function (skill) {
		var safe_name = NPCtools.strip_specials(skill)
		var nspace = "activeNPC_skills_" + safe_name + "_rank";
		if (document.edit_NPC_form[nspace]) {
			activeNPC.skills[safe_name].set(document.edit_NPC_form[nspace].value);
		} else {
			alert(skill + "not found");
		}
		activeNPC.update();
		this.display_update();
	}
	
	NPCformcontrol.add_remove_melee_weapon = function(weapon) {
		var safe_name = NPCtools.strip_specials(weapon);
		var nspace = "activeNPC_melee_weapons_" + safe_name + "_owned";
		if (document.edit_NPC_form[nspace]) {
			activeNPC.all_melee_weapons[safe_name].toggle_owned();
		}
	}
	
	NPCformcontrol.add_remove_ranged_weapon = function(weapon) {
		var safe_name = NPCtools.strip_specials(weapon);
		var nspace = "activeNPC_ranged_weapons_" + safe_name + "_owned";
		if (document.edit_NPC_form[nspace]) {
			activeNPC.all_ranged_weapons[safe_name].toggle_owned();
		}
	}
	
	NPCformcontrol.add_remove_armor = function(armor, set_name) {
		var safe_name = NPCtools.strip_specials(armor);
		var nspace = "activeNPC_armor_" + armor + "_owned";
		if (document.edit_NPC_form[nspace]) {
			if (activeNPC[set_name]) {
				activeNPC[set_name].change_armor(armor);
			}
		}
		this.update_armor_display();
	}
	
	
	NPCformcontrol.display_update = function () {
		NPCformcontrol.update_attributes_display();
		NPCformcontrol.update_skills_display();	 
		NPCformcontrol.update_melee_weapon_display();
		NPCformcontrol.update_ranged_weapon_display();
		NPCformcontrol.update_armor_display();
	}
	
	
	NPCformcontrol.update_attributes_display = function() {
		forEach (activeNPC.attributes, function(att) {
			// Object can't process getHTML.getHTML, so we check for a function.
			if (typeof att !== "function") {
				document.edit_NPC_form['activeNPC_attributes_'+att.name+'_rank'].value = att.rank;
				document.edit_NPC_form['activeNPC_attributes_'+att.name+'_AV'].value = att.AV;
				document.edit_NPC_form['activeNPC_attributes_'+att.name+'_adj'].value = att.adj;
			}
		});
	}
	
	NPCformcontrol.update_skills_display = function() {
		var nspace = "";
		var mod_att_id;
		forEach (activeNPC.skills, function(sk) {
			// Object can't process getHTML.getHTML, so we check for a function.
			if (typeof sk !== "function") {
				nspace = "activeNPC_skills_" + sk.safe_name;
				if (document.edit_NPC_form[nspace+'_rank']) {
					mod_att_id = document.getElementById(nspace+'_mod_att');
					mod_att_id.innerHTML = sk.mod_att;
					document.edit_NPC_form[nspace+'_rank'].value = sk.rank;
					document.edit_NPC_form[nspace+'_AV'].value = sk.AV;
					document.edit_NPC_form[nspace+'_adj'].value = sk.adj;
					document.edit_NPC_form[nspace+'_xp'].value = sk.xp;
				}
			}
		});
	}
	
	
	NPCformcontrol.update_melee_weapon_display = function () {
		var nspace = "";
		forEach (activeNPC.all_melee_weapons, function(w) {
			if (typeof w !== "function") {
				nspace = "activeNPC_melee_weapons_" + w.safe_name + "_owned";
				if (document.edit_NPC_form[nspace]) {
					if (w.owned) {
						document.edit_NPC_form[nspace].checked = true;
					} else {
						document.edit_NPC_form[nspace].checked = false;
					}
				}
			}
		});
	}
	
	NPCformcontrol.update_ranged_weapon_display = function () {
		var nspace = "";
		forEach (activeNPC.all_ranged_weapons, function(w) {
			if (typeof w !== "function") {
				nspace = "activeNPC_ranged_weapons_" + w.safe_name + "_owned";
				if (document.edit_NPC_form[nspace]) {
					if (w.owned) {
						document.edit_NPC_form[nspace].checked = true;
					} else {
						document.edit_NPC_form[nspace].checked = false;
					}
				}
			}
		});
	}
	
	
	NPCformcontrol.update_armor_display = function () {
		var nspace = "";
		forEach (activeNPC.all_armor, function(a) {
			if (a.safe_name) {
				nspace = "activeNPC_armor_" + a.safe_name + "_owned";
				if (document.edit_NPC_form[nspace]) {
					if (a.owned) {
						document.edit_NPC_form[nspace].checked = true;
					} else {
						document.edit_NPC_form[nspace].checked = false;
					}
				}
			}
		});
	}
	

	NPCformcontrol.display_printable = function () {
		var win = window.open('','printableNPC','','');
		var windoc = win.document;
	
		activeNPC.update();
		windoc.write(activeNPC.getPrintableHTML());
		win.stop();	

	}
	
	
	
	
	
	NPCformcontrol.prototype.archiveable_character = function () {
		var win = window.open('', 'Archived Character', '', '');
		var windoc = win.document;
		
		activeNPC.update();
		windoc.write(activeNPC.get_archive_code());
		win.stop;
	}