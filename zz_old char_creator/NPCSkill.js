/*********************************************
    mixtype is used for those skills that are
    modified by more than one attribute.  Mixtype is 
    a character representation of which attribute to use
    
    > = the largest attribute bonus
    < = the smallest attribute bonus
    +- = add the first attribute, subtract the second
    -+ = subtract the first attribute, add the second
    ++ = add both attributes
    -- = subtract both attributes
    
    default condition is to add the first one only
 */

function NPCSkill (aName, xp_ratio, r, att1, att2, mixtype) {
    this.set(r);
    this.name = aName
    this.safe_name = NPCtools.strip_specials(this.name);
    if (!isNaN(xp_ratio)) {
        this.xp_ratio = xp_ratio;
    } else {
        this.xp_ratio = 1;
    }

    if (mixtype) {
        this.mixtype = mixtype;
    } else {
        this.mixtype = "";
    }

    this.att1 = att1;
    this.att2 = att2;
    this.mod_att="";
    
    this.update();
}


    /* Skill instance methods */
    NPCSkill.prototype.calc_AV = function () {
        if (!isNaN(this.rank)) {
            return this.rank * 5;
        } else {
            return 0;
        }
    }
    
    NPCSkill.prototype.calc_adjust = function() {
        var adj = 0;
        if (this.att1 && this.att2) {
            // verify that the attribute adjustments have been calculated
            if (!isNaN(this.att1.adj) && !isNaN(this.att2.adj)) {
                if (this.mixtype != "") {
                    switch(this.mixtype) {
                        case ">":
                            adj = this.adj = (this.att1.adj >= this.att2.adj) ? this.att1.adj : this.att2.adj;
                            this.mod_att = (this.att1.adj >= this.att2.adj) ? this.att1.name : this.att2.name;
                            break;
                        case "<":
                            adj = this.adj = (this.att1.adj <= this.att2.adj) ? this.att2.adj : this.att1.adj;
                            this.mod_att = (this.att1.adj <= this.att2.adj) ? this.att2.name : this.att1.name;
                            break;
                        case "++":
                            adj = this.adj = this.att1.adj + this.att2.adj;
                            this.mod_att = this.att1.name +"+" + this.att2.name;
                            break;
                        case "--":
                            adj = this.adj = -(this.att1.adj + this.att2.adj);
                            this.mod_att = "-(" + (this.att1.name) + " " + this.att2.name + ")";
                            break;
                        case "+-":
                            adj = this.adj = this.att1.adj - this.att2.adj;
                            this.mod_att = this.att1.name + "-" + this.att2.name;
                            break;
                        case "-+":
                            adj = this.adj = this.att2.adj - this.att1.adj;
                            this.mod_att = this.att2.name + "-" + this.att1.name;
                            break
                        default:
                            adj = this.adj = this.att1.adj;
                            this.mod_att = this.att1.name;
                            break;
                    if (this.name == "Resist Fear") {
                        alert("AFTER: " + this);
                    }

                    } // end swich this.mixtype
                } else {
                    adj = this.adj = (this.att1.adj) ? this.att1.adj : 0;
                    this.mod_att = (this.att1.name) ? this.att1.name : "--";
                }
            } // end check for this.att1.adj and this.att2.adj
        // end check for this.att1 and this.att2
        } else if (this.att1) {
            adj = this.adj = (this.att1.adj) ? this.att1.adj : 0;
            this.mod_att = (this.att1.name) ? this.att1.name : "--";
        } else {
            adj = this.adj = 0;
            this.mod_att = "--";
        }
        return adj;
    }
    

    NPCSkill.prototype.calc_xp = function() {
        var xp = 0;
        if (!isNaN(this.rank)) {
            for (var i = 1; i <= this.rank; i++) {
                if (i <= 5) {
                    xp = xp + 2;
                } else if (i > 5 && i <= 10) {
                    xp = xp + 5;
                } else if (i > 10 && i <= 15) {
                    xp = xp + 10;
                } else if (i > 15 && i <= 20) {
                    xp = xp + 15;
                } else if (i > 20 && i <= 25) {
                    xp = xp + 20;
                } else if (i > 25 && i <= 30) {
                    xp = xp + 30;
                } else if (i > 30) {
                    xp = xp + 40;
                }
            }
        }
        return xp*this.xp_ratio;
    }
    
    NPCSkill.prototype.set = function(r) {
        if (!isNaN(r)) {
            this.rank = parseInt(r, 10);
            this.update();
        }
    }

    NPCSkill.prototype.update = function() {
        this.AV = this.calc_AV();
        this.calc_adjust();
        this.xp = this.calc_xp();
    }
    
    NPCSkill.prototype.toString = function() {
        return this.safe_name + ' ' + this.name + ' ' + this.rank + ' ' + this.AV + ' ' + this.adj + ' x' + this.xp_ratio + ' ' + this.xp;
    }
    
    NPCSkill.prototype.getHTML = function() {
        return this.toString();
    }

    NPCSkill.prototype.getPrintableHTML = function() {
        var h = "";
        h = h + "<tr class='right'><td>" + this.name + "</td><td>" + this.rank + "</td><td>" + this.mod_att + "</td><td>" + this.AV + "</td>";
        h = h + "<td>" + this.adj + "</td><td class='yellow'>" + (this.AV+this.adj) + "</td><td>x" + this.xp_ratio + ": " + this.xp + "</td></tr>";
        return h;
    }


    NPCSkill.prototype.getEditForm = function() {
        var nspace = "activeNPC_skills_" + this.safe_name;
        var h = "";
        h = h + "<tr valign='top'><td>" + this.name + "</td>";
        h = h + "<td><input name='" + nspace + "_rank' id='" + nspace + "_rank' size='3' maxlength='3' value='" + this.rank + "'";
        h = h + " onBlur=\"NPCformcontrol.change_skill('" + this.safe_name + "');\"/></td>";
        h = h + "<td><span id='" + nspace + "_mod_att'>" + this.mod_att + "</span></td>";
        h = h + "<td><input name='" + nspace + "_AV' id='" + nspace + "_AV' size='4' disabled='disabled' value='" + this.AV + "'/></td>";
        h = h + "<td><input name='" + nspace + "_adj' id='" + nspace + "_adj' size='3' disabled='disabled' value='" + this.adj + "'/></td>";
        h = h + "<td><input name='" + nspace + "_xp_ratio' id='" + nspace + "_xp_ratio' size='3' disabled='disabled' value='" + this.xp_ratio + "x'/>";
        h = h + "<input name='" + nspace + "_xp' id='" + nspace + "_xp' size='3' disabled='disabled' value='" + this.xp + "'/></td>";
        h = h + "</tr>\n\n";
        return h;
    }




