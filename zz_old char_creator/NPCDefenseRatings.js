function NPCDefenseRatings(attribs, torso, arms, legs, head, hands, shield, natural) {
	this.attributes = attribs;
	this.torso_armor = torso;
	this.arms_armor = arms;
	this.legs_armor = legs;
	this.head_armor = head;
	this.hands_armor = hands;
	this.shield_armor = shield;
	this.natural_armor = natural;

	this.deflect_base = 50;
	this.natural_deflect = 0;
	this.natural_absorb = 0;
	this.natural_staging = 0;
	
	this.torso_deflect = 0;
	this.torso_absorb = 0;
	this.torso_staging = 0;
	
	this.arms_deflect = 0;
	this.arms_absorb = 0;
	this.arms_staging = 0;
	
	this.legs_deflect = 0;
	this.legs_deflect = 0;
	this.legs_staging = 0;
	
	this.head_deflect = 0;
	this.head_absorb = 0;
	this.head_staging = 0;
	
	this.hands_deflect = 0;
	this.hands_absorb = 0;
	this.hands_staging = 0;
	
	this.shield_deflect = 0;
	this.shield_absorb = 0;
	this.shield_staging = 0;
	
	this.size_adj = 0;
	this.agility_adj = 0;
	this.other_agility = 0;

	this.normal_DR = 0;
	this.touch_DR = 0;
	this.no_agl_DR = 0;
	this.no_agl_touch_DR = 0;

	this.update();
}


	NPCDefenseRatings.prototype.update = function() {
		this.torso_deflect = this.torso_armor.get_active_armor_stat("deflect");
		this.arms_deflect = this.arms_armor.get_active_armor_stat("deflect");
		this.legs_deflect = this.legs_armor.get_active_armor_stat("deflect");
		this.head_deflect = this.head_armor.get_active_armor_stat("deflect");
		this.hands_deflect = this.hands_armor.get_active_armor_stat("deflect");
		this.shield_deflect = this.shield_armor.get_active_armor_stat("deflect");
		this.natural_deflect = this.natural_armor.get_active_armor_stat("deflect");

		this.torso_absorb = this.torso_armor.get_active_armor_stat("absorb");
		this.arms_absorb = this.arms_armor.get_active_armor_stat("absorb");
		this.legs_absorb = this.legs_armor.get_active_armor_stat("absorb");
		this.head_absorb = this.head_armor.get_active_armor_stat("absorb");
		this.hands_absorb = this.hands_armor.get_active_armor_stat("absorb");
		this.shield_absorb = this.shield_armor.get_active_armor_stat("absorb");
		this.natural_absorb = this.natural_armor.get_active_armor_stat("absorb");

		this.natural_bonus_agl = this.natural_armor.get_active_armor_stat("bonus_agl");

		this.torso_staging = this.torso_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.arms_staging = this.arms_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.legs_staging = this.legs_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.head_staging = this.head_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.hands_staging = this.hands_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.shield_staging = this.shield_armor.get_active_armor_stat("staging") + this.attributes.FORT.rank;
		this.natural_staging = this.natural_armor.get_active_armor_stat("staging");

		this.set_size_adj();
		this.agility_adj = this.attributes.AGL.adj;
		this.other_agility = this.natural_bonus_agl;
		
		this.normal_DR = this.deflect_base + this.natural_deflect + this.torso_deflect + this.arms_deflect + this.legs_deflect + this.head_deflect + this.shield_deflect + this.hands_deflect + this.size_adj + this.agility_adj + this.other_agility;
		this.touch_DR = this.deflect_base + this.size_adj + this.agility_adj + this.other_agility;
		this.no_agl_DR = this.deflect_base + this.natural_deflect + this.torso_deflect + this.arms_deflect + this.legs_deflect + this.head_deflect + this.size_adj;
		this.no_agl_touch_DR = this.deflect_base + this.size_adj;
	}
	
	
	NPCDefenseRatings.prototype.set_size_adj = function() {
		this.size_adj = -1 * (this.attributes.SIZ.adj);
		if (this.size_adj < -25) {
			this.size_adj = -25;
		}
	}
	

	NPCDefenseRatings.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<table border='1' cellspacing=0>";
		h = h + "<tr valign='top'><td>"
			
			h = h + "<table border='0'>";
			h = h + "<tr class='topic'><td>Defense Detail</td><td>Deflect</td><td>Absorb</td></tr>";
			h = h + "<tr class='right'><td>Natural Defense Base</td><td>" + this.deflect_base + "</td></tr>";
			h = h + "<tr class='right'><td>Natural</td><td>" + this.natural_deflect + "</td><td>" + this.natural_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Torso</td><td>" + this.torso_deflect + "</td><td>" + this.torso_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Arms</td><td>" + this.arms_deflect + "</td><td>" + this.arms_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Legs</td><td>" + this.legs_deflect + "</td><td>" + this.legs_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Head</td><td>" + this.head_deflect + "</td><td>" + this.head_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Shield</td><td>" + this.shield_deflect + "</td><td>" + this.shield_absorb + "</td></tr>";
			h = h + "<tr class='right'><td>Size</td><td>" + this.size_adj + "</td></tr>";
			h = h + "<tr class='right'><td>Agility</td><td>" + this.agility_adj + "</td></tr>";
			h = h + "<tr class='right'><td>Misc Agility</td><td>" + this.other_agility + "</td></tr>";
			h = h + "</table>";
			
		h = h + "</td><td>"
			h = h + "<b>Defense Ratings</b><br />";
			h = h + "<table border='0'>";
			h = h + "<tr class='right'><td>Normal DR:</td><td>" + this.normal_DR + "</td></tr>";
			h = h + "<tr class='right'><td>Touch DR:</td><td>" + this.touch_DR + "</td></tr>";
			h = h + "<tr class='right'><td>No AGL DR:</td><td>" + this.no_agl_DR + "</td></tr>";
			h = h + "<tr class='right'><td>No AGL Touch:</td><td>" + this.no_agl_touch_DR + "</td></tr>";
			h = h + "</table>";

			h = h + "<b>Defensive Staging</b><br />";
			h = h + "<table border='0'>";
			h = h + "<tr class='right'><td>Torso:</td><td>" + this.torso_staging + "</td></tr>";
			h = h + "<tr class='right'><td>Arms:</td><td>" + this.arms_staging + "</td></tr>";
			h = h + "<tr class='right'><td>Legs:</td><td>" + this.legs_staging + "</td></tr>";
			h = h + "<tr class='right'><td>Head:</td><td>" + this.head_staging + "</td></tr>";
			h = h + "<tr class='right'><td>Hands:</td><td>" + this.hands_staging + "</td></tr>";
			h = h + "<tr class='right'><td>Shield:</td><td>" + this.shield_staging + "</td></tr>";
			h = h + "</table>";
			
		h = h + "</td></tr></table>";
		return h;

	}

	
