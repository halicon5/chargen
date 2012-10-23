function NPCAttributeSet(aStr, aSiz, aAgl, aRef, aCon, aFort, aRea, aWill, aSpir, aPer) {
    this.STR = new NPCAttribute("STR", aStr);
    this.SIZ = new NPCAttribute("SIZ", aSiz);
    this.AGL = new NPCAttribute("AGL", aAgl);
    this.REF = new NPCAttribute("REF", aRef);
    this.CON = new NPCAttribute("CON", aCon);
    this.FORT = new NPCAttribute("FORT", aFort);
    this.REA = new NPCAttribute("REA", aRea);
    this.WILL = new NPCAttribute("WILL", aWill);
    this.SPIR = new NPCAttribute("SPIR", aSpir);
    this.PER = new NPCAttribute("PER", aPer);
    this.update();
}
    NPCAttributeSet.prototype.set_all = function(aStr, aSiz, aAgl, aRef, aCon, aFort, aRea, aWill, aSpir, aPer) {
        this.STR.set(aStr);
        this.SIZ.set(aSiz);
        this.AGL.set(aAgl);
        this.REF.set(aRef);
        this.CON.set(aCon);
        this.FORT.set(aFort);
        this.REA.set(aRea);
        this.WILL.set(aWill);
        this.SPIR.set(aSpir);
        this.PER.set(aPer);
    }

    NPCAttributeSet.prototype.update = function() {
        this.STR.update();
        this.SIZ.update();
        this.AGL.update();
        this.REF.update();
        this.CON.update();
        this.FORT.update();
        this.REA.update();
        this.WILL.update();
        this.SPIR.update();
        this.PER.update();
    }

    NPCAttributeSet.prototype.set_str = function(r) {
        this.STR.set(r);
    }
    
    NPCAttributeSet.prototype.set_siz = function(r) {
        this.SIZ.set(r);
    }

    NPCAttributeSet.prototype.set_agl = function(r) {
        this.AGL.set(r);
    }
    
    NPCAttributeSet.prototype.set_ref = function(r) {
        this.REF.set(r);
    }
    
    NPCAttributeSet.prototype.set_con = function(r) {
        this.CON.set(r);
    }

    NPCAttributeSet.prototype.set_fort = function(r) {
        this.FORT.set(r);
    }

    NPCAttributeSet.prototype.set_rea = function(r) {
        this.REA.set(r);
    }

    NPCAttributeSet.prototype.set_will = function(r) {
        this.WILL.set(r);
    }

    NPCAttributeSet.prototype.set_spir = function(r) {
        this.SPIR.set(r);
    }

    NPCAttributeSet.prototype.set_per = function(r) {
        this.PER.set(r);
    }

    NPCAttributeSet.prototype.getHTML = function() {
        var h = "";
        forEach (this, function(att) {
            // Object can't process getHTML.getHTML, so we check for a function.
            if (typeof att !== "function") {
                h = h + (att.getHTML()) + "<br />";
            }
        })
        return h;
    }
    
	
	NPCAttributeSet.prototype.getEditForm = function() {
		var h = "";
		h = h + "<table border='1' cellspacing='0'>";
		h = h + "<tr valign='top' class='topic'>";
		h = h + "<td>Attribute</td><td>Rank</td><td>AV</td><td>Adj</td>";
		h = h + "</tr>";
		forEach (this, function(att) {
			if (typeof att !== "function") {
				h = h + (att.getEditForm());
			}
		})
		h = h + "</table>";
		return h;
	}


	NPCAttributeSet.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<table border='1' cellspacing='0'>";
		h = h + "<tr valign='top' class='topic'>";
		h = h + "<td>Attribute</td><td>Rank</td><td>AV</td><td>Adj</td>";
		h = h + "</tr>";
		forEach (this, function(att) {
			if (typeof att !== "function") {
				h = h + (att.getPrintableHTML());
			}
		})
		h = h + "</table>";
		return h;
	}
	
	
	
	
	
	
	
	
	