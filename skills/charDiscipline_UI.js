CM.charDisciplineUI = function(aUI, aManager, skill, collection, table, skillCollectionUI, UItype) {
	this.name = skill;
	this.CMname = this.name;  // not sure this is being used anymore. no idea why it's here
	this.UI = aUI;
	this.Manager = aManager;
	this.parentTable = table;
	this.UItype = (UItype) ? UItype : 'static';
	this.parentUI = skillCollectionUI;

	this.collection = collection; 
	this.data = undefined;
	this.svc = undefined;

	this.setSvcAndData();

	this.subUIs = {};
	this.elements = {};
	
	this.defineSkillFormElements();
}

	CM.extend (CM.charDisciplineUI, CM.charSkillUI);


	CM.charDisciplineUI.prototype.updateDisplay = function() {
		if (Manager.activeChar && Manager.activeChar.d) {
			
			this.setSvcAndData();
			var skill = this.data;
			
			this.elements.rank.value 	= skill.rank;
			
			var mod = this.data.mod;
			this.elements.totRank.innerHTML = (mod > 0) ?"+" + mod : mod;
			this.elements.totRank.innerHTML += " (" + skill.totRank + ")";
			
			this.elements.cost.innerHTML = "x" + skill.cost;

			this.UI.panelUIs.magicPanel.subUIs.spells.updateDisplay();
		}
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
		
	}


	CM.charDisciplineUI.prototype.defineSkillFormElements = function() {
		if (CM.debug) CM.log ("CM.charSkillUI.prototype.defineSkillFormElements = fucntion()");
		var row = document.createElement("li");
		row.setAttribute("class", CM.CSSname + "skillSetRow");
		this.elements.row = row;
				
		var rankWrapper = document.createElement("div");
		rankWrapper.setAttribute("class", CM.CSSname + "COLskillRank");
		
		var rank = document.createElement("input");
		rank.setAttribute("id", CM.CSSname + "_TXTskill_" + this.name + "_rank");
		rank.setAttribute("name", CM.formname + "_TXTskill_" + this.name + "_rank");
		rank.setAttribute("class", CM.CSSname + "_TXTskill");
		rank.setAttribute("size", 2);
		rank.setAttribute("maxlength", 2);
		rank.setAttribute("onchange", "this.CMUI.setRankManually(); this.CMUI.updateDisplay();");
		rank.CMUI = this;
		this.elements.rank = rank;
		rankWrapper.appendChild(rank);

		var label = document.createElement("label");
		label.innerHTML = this.name;
		label.setAttribute("class", CM.CSSname + "COLskillName");
		label.setAttribute("for", rank.id);
		this.elements.label = label;				


		var mod = document.createElement("div");
		mod.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_mod");
		this.elements.mod = mod;
		
		var totRank = document.createElement("div");
		totRank.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_totRank");
		this.elements.totRank = totRank;

		var cost = document.createElement("div");
		cost.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_cost");
		this.elements.cost = cost;

		var xpCol = document.createElement("div");
		xpCol.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_xpCost");
		this.subUIs.xp = new CM.rankedXpUI(this.UI, this.Manager, this.collection, this.name, xpCol, this);

		var delbtn = null;		
		switch (this.UItype) {
			case "e":
			case "elective":
			case "w":
			case "write":
				var delbtn = this.getDeleteButton(row, this.parentTable);
				break;
			default:
				break;
		}
		
		row.appendChild(label);
		row.appendChild(rankWrapper);
		rankWrapper.appendChild(rank);
		row.appendChild(totRank);
		row.appendChild(cost);
		row.appendChild(xpCol);
		if (delbtn) {
			row.appendChild(delbtn);
		}
		this.parentTable.appendChild(row);		
	}
