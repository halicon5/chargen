CM.traitHCUI = function(aUI, aManager, name, table) {
	this.name = skill;
	this.CMname = this.name;  // not sure this is being used anymore. no idea why it's here
	this.UI = aUI;
	this.Manager = aManager;
	this.parentTable = table;

	this.data = undefined;
	this.svc = undefined;

	this.setSvcAndData();

	this.subUIs = {};
	this.elements = {};
	
	this.defineFormElements();
}

	CM.traitHCUI.prototype.updateDisplay = function() {
/*			
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
*/
	}
	
	CM.traitHCUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d.traitsHCs.list[this.name]) {
			this.data = this.Manager.activeChar.d.traitsHCs.list[this.name];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.traitsHCs.list[this.name]) {
			this.svc = this.Manager.activeChar.traitsHCs.list[this.name];
		}
		else {
			this.svc = undefined;
		}
	}

	CM.traitHCUI.prototype.defineFormElements = function() {
		if (CM.debug) CM.log ("CM.traitHCUI.prototype.defineFormElements = fucntion()");
		var row = document.createElement("li");
		row.setAttribute("class", CM.CSSname + "TraitSetRow");
		this.elements.row = row;
		

		var type = createSuperElement("div", CM.CSSname + "COLtraitType");
		this.elements.type = type;
		
		var identity = createSuperElement("div", CM.CSSname + "COLtraitIdentity");
		this.elements.identity = identity;

		var cost = createSuperElement("div");
		this.elements.cost = cost;

		var detailsWrapper = createSuperElement("div");
		detailsWrapper.appendChild(details);
		var details = createSuperElement("div");
		this.elements.details;
		
		var buttonWrapper = createSuperElement("div");
		var refreshBtn = createSuperElement("input", ["type", "button"], ["value", "Refresh"], ["onclick", "this.CMUI.refreshTraitHC();"] );
		refreshBtn.CMUI = this;
		this.elements.refreshBtn = refreshBtn;

		var removeBtn = createSuperElement("input", ["type", "button"], ["value", "Remove"], ["onclick", "this.CMUI.removeTraitHC();"] );
		removeBtn.CMUI = this;
		this.elements.removeBtn = removeBtn;

		appendChildren(buttonWrapper, refreshBtn, removeBtn);

		row.appendChild(type);
		row.appendChild(identity);
		row.appendChild(cost);
		row.appendChild(detailsWrapper);
		row.appendChild(buttonWrapper);
		this.parentTable.appendChild(row);		
	}
	
	
	CM.traitHCUI.prototype.removeTraitHC = function() {
		// call a skillCollectionSVC.deleteSkill function
		if (CM.debug) CM.log ("CM.traitHCUI.prototype.deleteSkill = fucntion(" + manual + ")");
		if (manual) {
			if (!window.confirm("Are you sure you want to delete this skill (" + this.name + ")") ) return;
		}

		if (this.Manager.activeChar) {
			this.Manager.activeChar.traitsHCs.removeTraitHC(this.name);
		}

		this.removeSelf();
	}
	
	
	CM.traitHCUI.prototype.refreshTraitHC = function() {
	
	}
	
	
	CM.traitHCUI.prototype.removeSelf = function() {
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