CM.disciplineSpellsUI = function(aUI, aManager, div, dataCollection, discipline, parentUI) {
	if (CM.debug) CM.log("[NEW] CM.disciplineSpellsUI = function (): " + discipline);
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;
	this.parentUI = parentUI;

	this.dataCollection = dataCollection;
	this.data = undefined;
	this.svc = undefined;
	this.discipline = discipline;

	this.collection = kantiaDefs.disciplineSpellLists[discipline];
	this.subCollections = [discipline];

	this.groups = kantiaDefs.disciplineSpellLists[discipline];

	this.subUIs = {};
	this.elements = {};
	
	this.initialize();
}

	CM.disciplineSpellsUI.prototype.initialize = function () {
		this.setSvcAndData();
		this.drawDisciplineBox();
	}
	
	CM.disciplineSpellsUI.prototype.setSvcAndData =	function () {
		if (this.Manager.activeChar && this.Manager.activeChar.d.spells && this.Manager.activeChar.d.spells.list[this.discipline]) {
			this.data = this.Manager.activeChar.d.spells.list[this.discipline];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.spells && this.Manager.activeChar.spells.list[this.discipline] ) {
			this.svc = this.Manager.activeChar.spells.list[this.discipline];
		}
		else {
			this.svc = undefined;
		}
	
	}
	
	CM.disciplineSpellsUI.prototype.updateDisplay = function () {
		this.setSvcAndData();
		this.defineElectiveRows();
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	CM.disciplineSpellsUI.prototype.drawDisciplineBox = function () {
		var box = document.createElement("div");
		box.setAttribute("class", CM.CSSname + "disciplineSpells");
		var head = document.createElement("h4");
		head.innerHTML = this.discipline;
		
		box.appendChild(head);
		
		this.elements.box = box;
		this.dispBox.appendChild(box);
		
		this.defineSpellTable();
		this.defineAddElectiveSpellForm();
		
		this.elements.box.appendChild(this.elements.skillSetTable);
	}

	CM.disciplineSpellsUI.prototype.defineSpellTable = function() {
		if (CM.debug) CM.log("[CALL] CM.disciplineSpellsUI.prototype.defineSpellTable = function ()");
				
		var table = document.createElement("ul");
		table.setAttribute("class", CM.CSSname + "skillSet");
		
		this.elements.skillSetTable = table;

		var tr = document.createElement("li");
		tr.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "skillSetRow");
		table.appendChild(tr);
		
		var td = document.createElement("div");
		td.innerHTML = "Spell Name";
		td.setAttribute("class", CM.CSSname + "COLskillName");
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Rank";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "Tot Rank";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "Power";
		tr.appendChild(td);
				
		td = document.createElement("div");
		td.innerHTML = "Cost";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "XP";
		tr.appendChild(td);
	}

	
	CM.disciplineSpellsUI.prototype.defineAddElectiveSpellForm = function () {
		if (CM.debug) CM.log("[CALL] CM.disciplineSpellsUI.prototype.defineAddElectiveSpellForm = function ()");
		var sel = document.createElement("select");
		
		this.elements.electiveSelect = sel;
		this.elements.box.appendChild(sel);
		this.defineElectiveOptions(this.elements.electiveSelect);
		
		var btn = document.createElement("input");
		btn.setAttribute("value", "Add spell");
		btn.setAttribute("type", "button");
		btn.setAttribute("onclick", "this.CMUI.addElectiveSkill(); this.CMUI.UI.panelUIs.magicPanel.updateDisplay();");
		btn.CMUI = this;
		this.elements.box.appendChild(btn);
	}
	
	CM.disciplineSpellsUI.prototype.defineElectiveOptions = function(sel) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineElectiveOptions = function ()" + this.collectionName);
		var sc = this.collection;	// array of objects with c and l for collection and label
		var o = undefined;
		o = document.createElement("option");
		o.innerHTML = '=== Add Spell ===';
		o.setAttribute("value", "");
		sel.appendChild(o);

		for (var i = 0; i < sc.length; i++) {
			o = document.createElement("option");
			o.setAttribute("class", CM.CSSname + "monospace");
			o.innerHTML = sc[i];
			o.setAttribute("value", sc[i]);
			sel.appendChild(o);
		}
	}
	
	CM.disciplineSpellsUI.prototype.addElectiveSkill = function() {
		if (CM.debug) CM.log("[CALL] CM.disciplineSpellsUI.prototype.addElectiveSkill = function ()");

		var skillName = undefined;
		if (this.Manager.activeChar) {
			if (this.elements.electiveSelect) {
				skillName = this.elements.electiveSelect.value;
			}
	
			if (skillName && this.Manager.activeChar) {
				// create the service and data objects
				this.Manager.activeChar.spells.addElectiveSkill(skillName);
			}
			
			if ( this.Manager.activeChar.d.spells.list[skillName] &&
					this.Manager.activeChar.spells.list[skillName] &&
					!this.subUIs[skillName]) {
					
				var row = new CM.charSpellUI(this.UI, this.Manager, this.discipline, skillName, "spells", this.elements.skillSetTable, this, "e");		
				this.subUIs[skillName] = row;
				this.subUIs[skillName].updateDisplay();
			}
			else if (this.subUIs[skillName]) {
				alert("Error: " + skillName + " already exists for this character.");
			}
		}
	}

	CM.disciplineSpellsUI.prototype.defineElectiveRows = function() {
		if (CM.debug) CM.log("[CALL] CM.disciplineSpellsUI.prototype.defineElectiveRows = function ()");
		if (this.Manager.activeChar) {
			for (var spell in this.subUIs) {
				// delete unnecessary rows
				if (!this.Manager.activeChar.d.spells.list[spell]) {
					this.subUIs[spell].deleteSkill();
				}
			}
			for (var i = 0; i < this.collection.length; i++) {
				// if char has skill and the UI doesn't exist, create it.
				if (this.Manager.activeChar.d.spells.list[this.collection[i]] && !this.subUIs[this.collection[i]]) {
					var row = new CM.charSpellUI(this.UI, this.Manager, this.discipline, this.collection[i], "spells", this.elements.skillSetTable, this, "e");
					this.subUIs[this.collection[i]] = row;
					this.subUIs[this.collection[i]].updateDisplay();
				}
			}
		}
	}
	
	CM.disciplineSpellsUI.prototype.removeSkillUI = function(skillName) {
		alert("delete " + skillName);
		delete this.subUIs[skillName];
	}
	
	CM.disciplineSpellsUI.prototype.removeSelf = function() {
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].removeSelf) this.subUIs[ui].removeSelf();
			delete this.subUIs[ui];
		}
		if (this.elements.box) {
			CM.removeDescendents(this.elements.box);
			this.dispBox.removeChild(this.elements.box);
		}
		for (var elem in this.elements) {
			delete this.elements[elem];
		}
	}
