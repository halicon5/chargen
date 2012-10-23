function NPCCalculatedStats(AttSet) {
    this.attributes = AttSet
    this.total_HP = 0;
    this.STAM = 0;
    this.STAM_recover = 0;
    this.weight = 0;
    this.lift = 0;
    this.haul = 0;
    this.stun_pain = 0;
    this.karma = 0;

    this.LB_heal = "";
    this.MB_heal = "";
    this.SB_heal = "";
    this.LW_heal = "";
    this.MW_heal = "";
    this.SW_heal = "";

    this.major_move = 1;
    this.free_move = 1;

    this.update();
}

    NPCCalculatedStats.prototype.update = function() {
        this.total_HP = this.calc_hp();
        this.STAM = this.calc_stam();
        this.STAM_recover = this.calc_stam_recover();
        this.weight = this.calc_weight();
        this.lift = this.calc_lift();
        this.haul = this.calc_haul();
        this.karma = this.attributes.SPIR.rank;
        this.set_healing_rates();
        this.set_stun_pain();
        this.set_major_move();
        this.set_free_move();
    }

    NPCCalculatedStats.prototype.calc_hp = function() {
        // hp can never be less than 4.
        var hp = 4;
        if (this.attributes) {
            hp = this.attributes.SIZ.rank * 2;
            hp = hp + this.attributes.CON.rank;
            hp = hp + this.attributes.FORT.rank;
            hp = hp + this.attributes.WILL.rank;
            hp = hp - 10;
            if (hp < 4) {
                hp = 4;
            }
        }
        return hp;
    }

    NPCCalculatedStats.prototype.calc_stam = function() {
        var stam = 0;
        if (this.attributes) {
            stam = this.attributes.CON.rank;
            stam = stam + this.attributes.FORT.rank;
            stam = stam + this.attributes.WILL.rank;
            stam = stam + this.attributes.SPIR.rank;
        } 
        return stam;
    }
    
    
    NPCCalculatedStats.prototype.calc_stam_recover = function() {
        var recov = 0;
        if (this.attributes) {
            recov = Math.floor( this.attributes.CON.rank/3 );
            if (recov < 1) {
                recov = 1;
            }
        }
        return recov;
    }
    
    NPCCalculatedStats.prototype.calc_weight = function() {
        var weight = 0;
        if (this.attributes) {
            weight = NPCtools.calc_weight(this.attributes.SIZ);
        }
        return weight;
    }


    NPCCalculatedStats.prototype.calc_lift = function() {
        var weight = 0;
        if (this.attributes) {
            weight = NPCtools.calc_weight(this.attributes.STR);
        }
        return weight;
    }
    
    
    NPCCalculatedStats.prototype.calc_haul = function() {
        if (this.lift) {
            return NPCtools.calc_haul(this.lift);
        }
    }

    NPCCalculatedStats.prototype.set_healing_rates = function() {
        if (this.attributes) {
            if (this.attributes.CON.rank > 0) {
                // changes in increments of 4.  Offset the rank by -1 so that floor(rank/4) = 0 for values 1-4
                /*  LB is offset by 10      MB is offset by 8       SB by 3
                    LW is offset by 8       MW by 3                 SW by 0
                */
                this.LB_heal = (this.attributes.CON.rank > 56) ? "--" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4 + 10)];
                this.MB_heal = (this.attributes.CON.rank > 68) ? "--" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4 + 7)];
                this.SB_heal = (this.attributes.CON.rank > 88) ? "--" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4 + 2)];
                this.LW_heal = (this.attributes.CON.rank > 68) ? "--" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4 + 7)];
                this.MW_heal = (this.attributes.CON.rank > 88) ? "--" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4 + 2)];
                this.SW_heal = (this.attributes.CON.rank > 88) ? "32/round" : NPC_HEALING_RATES[Math.floor((this.attributes.CON.rank-1)/4)];
            }
        }
    }

    NPCCalculatedStats.prototype.set_stun_pain = function() {
        var sp = 0;
        if (this.attributes) {
            if (this.attributes.FORT && this.attributes.SIZ) {
                sp = this.attributes.FORT.rank + this.attributes.SIZ.rank
                sp = sp - 20;
                sp = Math.floor(sp/2) * 5;
                if (sp < 0) {
                    sp = 0;
                }
            }
        }
        this.stun_pain = sp;
    }

    NPCCalculatedStats.prototype.set_major_move = function() {
        var m = 1;
        if (this.attributes) {
            if (this.attributes.SIZ && this.attributes.STR) {
                m = this.attributes.STR.rank - this.attributes.SIZ.rank;
                if (m > 3) {
                    m = 3;
                }
                m = m + 10;
                if (m < 1) {
                    m = 1;
                }
            }
        }
        this.major_move = m;
    }
    
    NPCCalculatedStats.prototype.set_free_move = function() {
        var m = Math.floor(this.major_move/3);
        if (m < 1) {
            m = 1;
        }
        this.free_move = m;
    }


    NPCCalculatedStats.prototype.getHTML = function() {
        var h = "";
        h = h + "Total HP: " + this.total_HP + "<br />";
        h = h + "Total STAM: " + this.STAM + "<br />";
        h = h + "Stun/Pain: " + this.stun_pain + "<br />";
        h = h + "Lift: " + this.lift + "<br />";
        h = h + "Haul: " + this.haul + "<br />";
        h = h + "Free/Major Move: " + this.free_move + "/" + this.major_move + "<br />";
        h = h + this.LB_heal + " " + this.MB_heal + " " + this.SB_heal + ' ' + this.LW_heal + ' ' + this.MW_heal + ' ' + this.SW_heal + "<br />";
        return h;
    }
    
    NPCCalculatedStats.prototype.getPrintableHTML = function() {
        var h = "";
        h = h + "<table border='1' cellspacing='0'>";
        h = h + "<tr valign='top'>";
		h = h + "<td>";
        h = h + "<b>Total HP:</b> " + this.total_HP + "<br />";
        h = h + "<b>Total STAM:</b> " + this.STAM + "<br />";
        h = h + "<b>Weight:</b> " + this.weight + "<br />";
        h = h + "<b>Lift:</b> " + this.lift + "<br />";
        h = h + "<b>Haul:</b> " + this.haul + "<br />";
        h = h + "<b>Free Move:</b> " + this.free_move + " yds<br />";
        h = h + "<b>Major Move:</b> " + this.major_move + " yds<br />";
        h = h + "<b>Stun/Pain:</b> " + this.stun_pain + "<br />";
        h = h + "</td><td>";
		h = h + "<b>Bludgeon Points</b> " + Math.floor(this.total_HP/2);
		
		for (var i = 0; i < Math.floor(this.total_HP/2); i++) {
			if (i % 5 === 0 ) {
				h = h + " ";
			}
			if (i % 15 === 0 ) {
				h = h + "<br />";
			}
			h = h + "O";
		}
		h = h + "<div><b>Healing rate</b><br />";
		h = h + "<b>LB:</b> " + this.LB_heal + "<br />";
		h = h + "<b>MB:</b> " + this.MB_heal + "<br />";
		h = h + "<b>SB:</b> " + this.SB_heal + "</div>";
		
		h = h + "</td><td>"

		h = h + "<b>Wound points</b> " + Math.ceil(this.total_HP/2);
		for (var i = 0; i < Math.ceil(this.total_HP/2); i++) {
			if (i % 5 === 0 ) {
				h = h + " ";
			}
			if (i % 15 === 0 ) {
				h = h + "<br />";
			}
			h = h + "O";
		}
		h = h + "<div><b>Healing rate</b><br />";
		h = h + "<b>LW:</b> " + this.LW_heal + "<br />";
		h = h + "<b>MW:</b> " + this.MW_heal + "<br />";
		h = h + "<b>SW:</b> " + this.SW_heal + "</div>";
		
		h = h + "</td></tr></table>";		
        return h;
    }