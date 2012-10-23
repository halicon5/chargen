CM.charSkillUI = function(aUI, aManager, skill, collection, table, skillCollectionUI, UItype) {
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

	CM.charSkillUI.prototype.updateDisplay = function() {
		if (Manager.activeChar && Manager.activeChar.d) {
			
			this.setSvcAndData();
			var skill = this.data;
			
			this.elements.rank.value 	= skill.rank;
			
			var mod = this.data.mod;
			this.elements.totRank.innerHTML = (mod > 0) ?"+" + mod : mod;
			this.elements.totRank.innerHTML += " (" + skill.totRank + ")";
			
			this.elements.AV.innerHTML 		= skill.AV;
			
			var adj = skill.adj;
			var adj_mod = skill.adj_mod;
			this.elements.adj.innerHTML = (adj >= 0) ?  "+" + adj : adj;
			this.elements.adj.innerHTML += (adj_mod >= 0) ? " +" + adj_mod : adj_mod;
			this.elements.adj.innerHTML += " (" + skill.totAdj + ")";

			this.elements.totAV.innerHTML = skill.totAV;

			this.elements.cost.innerHTML = "x" + skill.cost;
		}
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	CM.charSkillUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d[this.collection].list[this.name]) {
			this.data = this.Manager.activeChar.d[this.collection].list[this.name];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar[this.collection].list[this.name]) {
			this.svc = this.Manager.activeChar[this.collection].list[this.name];
		}
		else {
			this.svc = undefined;
		}
	}

	CM.charSkillUI.prototype.defineSkillFormElements = function() {
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

		var AV = document.createElement("div");
		AV.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_AV");
		this.elements.AV = AV;
		
		var totAV = document.createElement("div");
		totAV.setAttribute("id", CM.CSSname + "_DIV_skill" + this.name + "_totAV");
		this.elements.totAV = totAV;

		var adj = document.createElement("div");
		adj.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_adj");
		this.elements.adj = adj;

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
		row.appendChild(adj);
		row.appendChild(AV);
		row.appendChild(totAV);
		row.appendChild(cost);
		row.appendChild(xpCol);
		if (delbtn) {
			row.appendChild(delbtn);
		}
		this.parentTable.appendChild(row);		
	}
	
	CM.charSkillUI.prototype.getDeleteButton = function(row, table) {
		if (CM.debug) CM.log ("CM.charSkillUI.prototype.getDeleteButton = function() " + this.name );
		var wrap = document.createElement("div");
		var btn = document.createElement("input");
		
		btn.setAttribute("type", "button");
		btn.setAttribute("value", "del");
		btn.setAttribute("onclick", "this.CMUI.deleteSkill(true)");
		btn.CMUI = this;
		
		this.elements.deleteButton = btn;

		wrap.appendChild(btn);
		return wrap;
	}
	
	CM.charSkillUI.prototype.deleteSkill = function(manual) {
		// call a skillCollectionSVC.deleteSkill function
		if (CM.debug) CM.log ("CM.charSkillUI.prototype.deleteSkill = fucntion(" + manual + ")");
		if (manual) {
			if (!window.confirm("Are you sure you want to delete this skill (" + this.name + ")") ) return;
		}

		if (this.Manager.activeChar) {
			this.Manager.activeChar[this.collection].deleteSkill(this.name);
		}

		this.removeSelf();
/*		if (this.elements.row) {
			CM.removeDescendents(this.elements.row);
			this.parentTable.removeChild(this.elements.row);
		}
*/
		if (this.parentUI) {
			this.parentUI.removeSkillUI(this.name);
		}
	}
	
	
	CM.charSkillUI.prototype.setRankManually = function() {
		if (this.Manager.activeChar && this.Manager.activeChar[this.collection].list[this.name]) {
			var passflag = true;
			if (isNaN(parseInt(this.elements.rank.value, 10))) {
				passflag = false;
			}
			this.elements.rank.value = parseInt(this.elements.rank.value, 10);
			if (this.elements.rank.value == this.data.rank) {
				// valid value but no need to process since there is no actual change.
				passflag = false;
			}
			var xp = this.data.xp;
			if (passflag && (xp.applied || xp.checks || xp.spent || xp.burned || xp.deficit) ) {
				passflag = confirm("This skill has experience applied to it already.  Setting the rank manually will reset all experience values for this skill back to zero. Do you wish to continue?");
			}

			if (passflag) {
				this.Manager.activeChar[this.collection].list[this.name].setRank(this.elements.rank.value);
				this.Manager.activeChar[this.collection].list[this.name].xp.updateByRank();
			}
		}	
	}
	
	
	CM.charSkillUI.prototype.removeSelf = function() {
		// usually called as part of a cascading self-destruct chain.
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