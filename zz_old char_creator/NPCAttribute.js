function NPCAttribute (aName, r) {
	this.name = aName;
	this.set(r);
}

	/* Attribute instance methods */
	NPCAttribute.prototype.calc_adjust = function () {
		var adj = 0;
		if (!isNaN(this.rank)) {
			if (this.rank > 10) {
				return (this.rank - 10) * 2;
			} else {
				for (var i = this.rank - 10; i < 0; i++) {
					adj = adj + i;
				}
				return adj;
			}
		} else {
			return 0;
		}
	}

	NPCAttribute.prototype.calc_AV = function () {
		if (!isNaN(this.rank)) {
			return this.rank * 5;
		} else {
			return 0;
		}
	}
	
	NPCAttribute.prototype.update = function() {
		this.AV = this.calc_AV();
		this.adj = this.calc_adjust();
	}
	
	NPCAttribute.prototype.set = function(r) {
		if (isNaN(r)) {
			r = 10;
		}
		this.rank = parseInt(r, 10);
		this.update();
	}
	
	NPCAttribute.prototype.toString = function() {
		return this.name + ' ' + this.rank + ' ' + this.AV + ' ' + this.adj;
	}
	
	NPCAttribute.prototype.getHTML = function() {
		return this.name + ' ' + this.rank + ' ' + this.AV + ' ' + this.adj;
	}
	
	NPCAttribute.prototype.getEditForm = function() {
		var nspace = "activeNPC_attributes_" + this.name
		var h = "";
		h = h + "<tr valign='top'><td class='topic'>" + this.name + "</td>";
		h = h + "<td><input name='" + nspace + "_rank' id='" + nspace + "_rank' size='3' maxlength='3' value='" + this.rank + "'";
		h = h + " onBlur=\"NPCformcontrol.change_attribute('" + this.name + "');\"/></td>";
		h = h + "<td><input name='" + nspace + "_AV' id='" + nspace + "_AV' size='4' disabled='disabled' value='" + this.AV + "'/></td>";
		h = h + "<td><input name='" + nspace + "_adj' id='" + nspace + "_adj' size='3' disabled='disabled' value='" + this.adj + "'/></td>";
		h = h + "</tr>";
		return h;
	}
	
	
	NPCAttribute.prototype.getPrintableHTML = function() {
		var h = "";
		h = h + "<tr>";
		h = h + "<td class='topic'>" + this.name + "</td>";
		h = h + "<td>" + this.rank + "</td>";
		h = h + "<td>" + this.AV + "</td>";
		h = h + "<td>" + this.adj + "</td>";
		h = h + "</tr>";
		return h;
	}