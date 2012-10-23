CM.disciplineCollectionUI = function(aUI, aManager, div, dataCollection, collectionName, UItype, subCollections) {
	if (CM.debug) CM.log("[NEW] CM.skillCollectionUI = function (): " + collectionName);
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.dataCollection = dataCollection;
	this.data = undefined;
	this.svc = undefined;

	this.collectionName = collectionName;
	this.subCollections = (subCollections) ? subCollections : new Array();

	this.UItype = (UItype) ? UItype : "static";
	this.collection = kantiaDefs.magicGroups[collectionName];

	this.groups = kantiaDefs.magicGroups;

	this.subUIs = {};
	this.elements = {};
	
	this.initialize();
}

	// handle inheritance of skillCollectionUI, allows us to modify the prototypes as needed without affecting the parent class
	CM.extend (CM.disciplineCollectionUI, CM.skillCollectionUI);


	CM.disciplineCollectionUI.prototype.defineSkillTable = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineSkillList = function ()");
				
		var table = document.createElement("ul");
		table.setAttribute("id", CM.CSSname + "_ULeditSkillSet_" + this.collectionName);
		table.setAttribute("class", CM.CSSname + "skillSet");
		
		this.elements.skillSetTable = table;
		this.dispBox.appendChild(table);

		var tr = document.createElement("li");
		tr.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "skillSetRow");
		table.appendChild(tr);
		
		var td = document.createElement("div");
		td.innerHTML = "Skill Name";
		td.setAttribute("class", CM.CSSname + "COLskillName");
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Rank";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "Tot Rank";
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Cost";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "XP";
		tr.appendChild(td);
	}


	CM.disciplineCollectionUI.prototype.addElectiveSkill = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.addElectiveSkill = function ()");

		var skillName = undefined;
		if (this.Manager.activeChar) {
			if (this.elements.electiveSelect) {
				skillName = this.elements.electiveSelect.value;
				var inputName = CM.formname + "_TXTskill_" + skillName + "_rank";
			}
	
			if (skillName && this.Manager.activeChar) {
				// create the service and data objects
				this.Manager.activeChar[this.dataCollection].addElectiveSkill(skillName);
				this.Manager.activeChar.magicSkills.addElectiveSkill(skillName + ": Casting");
			}
			
			if ( this.Manager.activeChar.d[this.dataCollection].list[skillName] &&
					this.Manager.activeChar[this.dataCollection].list[skillName] &&
					!document.forms[CM.formname].elements[inputName]) {
					
				var row = new this.uiClass(this.UI, this.Manager, skillName, this.dataCollection, this.elements.skillSetTable, this, "e");		
				this.subUIs[skillName] = row;
				this.subUIs[skillName].updateDisplay();
			}
			else if (document.forms[CM.formname].elements[inputName]) {
				alert("Error: " + skillName + " already exists for this character.");
			}

			if (this.UI.panelUIs.magicPanel) {
				this.UI.panelUIs.magicPanel.updateDisplay();
			}
		}
	}
