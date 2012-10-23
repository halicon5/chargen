CM.attributeUI = function(aUI, aManager, attrib, ul) {
	this.name = attrib;
	this.CMname = this.name;
	this.UI = aUI;
	this.Manager = aManager;
	this.parentList = ul;
	
	this.data = undefined;
	this.svc = undefined;
	
	this.defineAttributeFormElements();
}

	CM.attributeUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		if (this.data && this.svc) {
		
			this.rank.value 		= this.data.rank;
			
			this.totRank.innerHTML	= (this.data.mod > 0 ) ? "+" : "";
			this.totRank.innerHTML += this.data.mod + " (" + this.data.totRank + ")";

			this.AV.innerHTML 		= this.data.AV + " " + (this.data.AV_mod > 0) ? "+" : "";
			this.AV.innerHTML 		+= this.data.AV_mod + " (" + this.data.totAV + ")";
			
			this.adj.innerHTML 		= (this.data.adj > 0) ?  "+" + this.data.adj : this.data.adj;
			this.adj.innerHTML		+= (this.data.adj_mod >= 0) ? " +" + this.data.adj_mod + " (": " " + this.data.adj_mod + " (";
			this.adj.innerHTML		+= (this.data.totAdj > 0 ) ? "+" + this.data.totAdj + ")": this.data.totAdj + ")"; 
		}
	}

	CM.attributeUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d.attributes[this.name]) {
			this.data = this.Manager.activeChar.d.attributes[this.name];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.attributes[this.name]) {
			this.svc = this.Manager.activeChar.attributes[this.name];
		}
		else {
			this.svc = undefined;
		}
	}



	CM.attributeUI.prototype.defineAttributeFormElements = function() {
		if (CM.debug) CM.log ("CM.attributeUI.prototype.defineAttributeFormElements = fucntion()");
		var li = document.createElement("li");
		li.setAttribute("id", CM.CSSname + "_LIattribute" + this.name);
		li.setAttribute("class", CM.CSSname + "_LIattribute " + CM.CSSname + "attributeSetRow");
		this.li = li;
		
		var rankWrapper = document.createElement("div");
		rankWrapper.setAttribute("class", CM.CSSname + "COLattribRank");
		
		
		var rank = document.createElement("input");
		rank.setAttribute("id", CM.CSSname + "_TXTattribute" + this.name + "_rank");
		rank.setAttribute("name", CM.formname + "_TXTattribute" + this.name + "_rank");
		rank.setAttribute("class", CM.CSSname + "_TXTattribute");
		rank.setAttribute("size", 3);
		rank.setAttribute("maxlength", 3);
		rank.setAttribute("onchange", "CM.Manager.activeChar.attributes['" + this.name + "'].setRank(this.value); this.CMUI.updateDisplay();");
		rank.CMUI = this;
		this.rank = rank;

		var label = document.createElement("label");
		label.innerHTML = kantiaDefs.attributes[this.name].fullname;
		label.setAttribute("class", CM.CSSname + "COLattribName");
		label.setAttribute("for", rank.id);
		this.label = label;				
		
		var totRank = document.createElement("div");
		totRank.setAttribute("id", CM.CSSname + "_DIVattribute" + this.name + "_totRank");
		this.totRank = totRank;

		var AV = document.createElement("div");
		AV.setAttribute("id", CM.CSSname + "_DIVattribute" + this.name + "_AV");
		this.AV = AV;

		var adj = document.createElement("div");
		adj.setAttribute("id", CM.CSSname + "_DIVattribute" + this.name + "_adj");
		this.adj = adj;

		li.appendChild(label);
		li.appendChild(rankWrapper);
		rankWrapper.appendChild(rank);
		li.appendChild(totRank);
		li.appendChild(AV);
		li.appendChild(adj);
		this.parentList.appendChild(li);		
	}
	
	