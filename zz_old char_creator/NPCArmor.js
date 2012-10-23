function NPCArmor(armor) {
	this.name = (armor.name) ? armor.name : "blank";
	this.safe_name = NPCtools.strip_specials(this.name);
	this.deflect = ("deflect" in armor) ? armor.deflect : 0;
	this.called_shot = ("called_shot" in armor) ? armor.called_shot : 0;
	this.staging = ("staging" in armor) ? armor.staging : 0;
	this.absorb = ("absorb" in armor) ? armor.absorb : 0;
	this.ballistic = ("ballistic" in armor) ? armor.ballistic : 0;
	this.bypass = ("bypass" in armor) ? armor.bypass : 0;
	this.blocking = ("blocking" in armor) ? armor.blocking : 0;
	this.pen_init = ("pen_init" in armor) ? armor.pen_init : 0;
	this.pen_ranged = ("pen_ranged" in armor) ? armor.pen_ranged : 0;
	this.pen_per = ("pen_per" in armor) ? armor.pen_per : 0;
	this.pen_aglref = ("pen_aglref" in armor) ? armor.pen_aglref : 0;
	this.pen_spell = ("pen_per" in armor) ? armor.pen_spell : 0;
	this.pen_psion = ("pen_per" in armor) ? armor.pen_psion : 0;
	this.bonus_agl = ("bonus_agl" in armor) ? armor.bonus_agl : 0;

	this.owned = 0;
}
		
	NPCArmor.prototype.toggle_owned = function() {
		if (this.owned) {
			this.owned = 0;
		} else {
			this.owned = 1;
		}
	}
	
	NPCArmor.prototype.getHTML = function() {
		var h = "";
		h = h + this.name + ":";
		h = h + "<br />";
		return h;
	}
	
	NPCArmor.prototype.getEditForm = function(set_name) {
		var h = "";
		var t = "";
		h = h + "<input type=\"checkbox\" name=\"activeNPC_armor_" + this.safe_name + "_owned\" id=\"activeNPC_armor_" + this.safe_name + "_owned\"";
		if (this.owned) {
			h = h + " checked=\"checked\" ";
		}
		h = h + " onChange=\'NPCformcontrol.add_remove_armor(\"" + this.safe_name + "\", \"" + set_name + "\")\'";
		h = h + "/> ";
		h = h + "<label for=\"activeNPC_armor_" + this.safe_name + "_owned\">"+ this.name +"</label>";
		return h;
	}
	


	NPCArmor.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<tr valign='top' class='right'>";
		h = h + "<td>" + this.name + "</td>";
		h = h + "<td>" + this.deflect + "</td>";
		h = h + "<td>" + this.called_shot + "</td>";
		h = h + "<td>" + this.staging + "</td>";
		h = h + "<td>" + this.absorb + "</td>";
		h = h + "<td>" + this.ballistic + "</td>";
		h = h + "<td>" + this.bypass + "</td>";
		h = h + "<td>" + this.blocking + "</td>";
		h = h + "<td class='pink'>" + this.pen_init + "</td>";
		h = h + "<td class='pink'>" + this.pen_ranged + "</td>";
		h = h + "<td class='pink'>" + this.pen_per + "</td>";
		h = h + "<td class='pink'>" + this.pen_aglref + "</td>";
		h = h + "<td class='pink'>" + this.pen_spell + "</td>";
		h = h + "<td class='pink'>" + this.pen_psion + "</td>";
		h = h + "<td>" + this.bonus_agl + "</td>";
		h = h + "</tr>\n";
		return h;
	}