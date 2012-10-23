CM.charSpellUI = function(aUI, aManager, discipline, skill, collection, table, disciplineSpellsUI, UItype) {
	this.name = skill;
	this.CMname = this.name;  // not sure this is being used anymore. no idea why it's here
	this.UI = aUI;
	this.Manager = aManager;
	this.parentTable = table;
	this.UItype = (UItype) ? UItype : 'elective';
	this.parentUI = disciplineSpellsUI;

	this.collection = collection;  
	this.data = undefined;
	this.svc = undefined;
	this.discipline = discipline;

	this.setSvcAndData();

	this.subUIs = {};
	this.elements = {};
	
	this.defineSkillFormElements();
}

	CM.extend ( CM.charSpellUI, CM.charSkillUI );
	

	CM.charSpellUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		if (this.data && this.svc && this.discData) {
			var skill = this.data;
			
			this.elements.rank.value 	= skill.rank;
			
			var mod = this.data.mod;
			this.elements.totRank.innerHTML = (mod > 0) ?"+" + mod : mod;
			this.elements.totRank.innerHTML += " (" + skill.totRank + ")";
			
			this.elements.power.innerHTML 		= skill.totRank + this.discData.totRank;
			
			this.elements.cost.innerHTML = "x" + skill.cost;
		}
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}


	CM.charSpellUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar) {
			if (this.Manager.activeChar.d[this.collection].list[this.name]) {
				this.data = this.Manager.activeChar.d.spells.list[this.name];
			}
			else {
				this.data = undefined;
			}
	
			if (this.Manager.activeChar[this.collection].list[this.name]) {
				this.svc = this.Manager.activeChar.spells.list[this.name];
			}
			else {
				this.svc = undefined;
			}
	
			if (this.Manager.activeChar.d.disciplines.list[this.discipline]) {
				this.discData = this.Manager.activeChar.d.disciplines.list[this.discipline];
			}
			else {
				this.discData = undefined;
			}
		}
	}

	CM.charSpellUI.prototype.defineSkillFormElements = function() {
		if (CM.debug) CM.log ("CM.charSpellUI.prototype.defineSkillFormElements = fucntion()");
		var row = document.createElement("li");
		row.setAttribute("class", CM.CSSname + "skillSetRow");
		this.elements.row = row;		
				
		var rankWrapper = document.createElement("div");
		rankWrapper.setAttribute("class", CM.CSSname + "COLskillRank");
		
		var rank = document.createElement("input");
		rank.setAttribute("class", CM.CSSname + "_TXTskill");
		rank.setAttribute("size", 2);
		rank.setAttribute("maxlength", 2);
		rank.setAttribute("onchange", "this.CMUI.setRankManually(); this.CMUI.UI.panelUIs.magicPanel.updateDisplay();");
		rank.CMUI = this;
		this.elements.rank = rank;
		rankWrapper.appendChild(rank);

		var label = document.createElement("label");
		label.innerHTML = this.name;
		label.setAttribute("class", CM.CSSname + "COLskillName");
		this.elements.label = label;				


		var mod = document.createElement("div");
		this.elements.mod = mod;
		
		var totRank = document.createElement("div");
		this.elements.totRank = totRank;

		var power = document.createElement("div");
		this.elements.power = power;
		
		var cost = document.createElement("div");
		this.elements.cost = cost;

		var xpCol = document.createElement("div");
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
		row.appendChild(power);
		row.appendChild(cost);
		row.appendChild(xpCol);
		if (delbtn) {
			row.appendChild(delbtn);
		}
		this.parentTable.appendChild(row);		
	}


	CM.charSpellUI.prototype.getDeleteButton = function(row, table) {
		if (CM.debug) CM.log ("CM.charSkillUI.prototype.getDeleteButton = function() " + this.name );
		var wrap = document.createElement("div");
		var btn = document.createElement("input");
		
		btn.setAttribute("type", "button");
		btn.setAttribute("value", "del");
		btn.setAttribute("onclick", "this.CMUI.deleteSkill(true); this.CMUI.UI.panelUIs.magicPanel.updateDisplay();");
		btn.CMUI = this;
		
		this.elements.deleteButton = btn;

		wrap.appendChild(btn);
		return wrap;
	}


	CM.charSpellUI.prototype.deleteSkill = function(manual) {
		// call a skillCollectionSVC.deleteSkill function
		if (CM.debug) CM.log ("CM.charSpellUI.prototype.deleteSkill = fucntion(" + manual + ")");
		if (manual) {
			if (!window.confirm("Are you sure you want to delete this spell (" + this.name + ")") ) return;
		}

		if (this.Manager.activeChar) {
			this.Manager.activeChar[this.collection].deleteSkill(this.name);
		}

		if (this.elements.row) {
			CM.removeDescendents(this.elements.row);
			
			this.parentTable.removeChild(this.elements.row);
		}

		if (this.parentUI) {
			this.parentUI.removeSkillUI(this.name);
		}
	}
	

	CM.charSpellUI.prototype.removeSelf = function() {
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].removeSelf) this.subUIs[ui].removeSelf();
			delete this.subUIs[ui];
		}
		if (this.elements.row) {
			CM.removeDescendents(this.elements.row);
			this.parentTable.removeChild(this.elements.row);
		}
		for (var elem in this.elements) {
			delete this.elements[elem];
		}
	}
