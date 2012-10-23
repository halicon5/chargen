CM.masteryCollectionUI = function(aUI, aManager, div) {
	if (CM.debug) CM.log("[NEW] CM.masteryCollectionUI = function (): ");
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.data = undefined;
	this.svc = undefined;
	this.combatAVs = undefined;	// a service object.

	this.subUIs = {};
	this.elements = {};
	
	this.initialize();
}


	CM.masteryCollectionUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		this.defineMasteryRows();
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) {
				this.subUIs[ui].updateDisplay();
			}
		}
	}

	CM.masteryCollectionUI.prototype.initialize = function () {
		this.setSvcAndData();
		this.defineMasteryTable();
		this.defineMasteryRows();
		
		this.defineAddNewMasteryForm();
	}
	

	CM.masteryCollectionUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.masteries) {
			this.data = this.Manager.activeChar.d.masteries;
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.masteries) {
			this.svc = this.Manager.activeChar.masteries;
		}
		else {
			this.svc = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.combatStats.combatAVs) {
			this.combatAVs = this.Manager.activeChar.combatStats.combatAVs;
		}
		else {
			this.combatAVs = undefined;
		}
	}
	
	CM.masteryCollectionUI.prototype.defineMasteryTable = function() {
		if (CM.debug) CM.log("[CALL] CM.masteryCollectionUI.prototype.defineMasteryTable = function ()");
				
		var table = document.createElement("ul");
		table.setAttribute("id", CM.CSSname + "_ULeditSkillSet_Masteries");
		table.setAttribute("class", CM.CSSname + "skillSet");
		
		this.elements.masterySetTable = table;
		this.dispBox.appendChild(table);

		var tr = document.createElement("li");
		tr.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "skillSetRow");
		table.appendChild(tr);
		
		var td = document.createElement("div");
		td.innerHTML = "Mastery Name";
		td.setAttribute("class", CM.CSSname + "COLmasteryName");
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Active";
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
		td.innerHTML = "Combat AVs";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "XP";
		tr.appendChild(td);

	}
	
	CM.masteryCollectionUI.prototype.defineMasteryRows = function () {
		if (this.data) {
			for (var mast in this.subUIs) {
				// delete unnecessary rows
				if (!this.data.list[mast]) {
					this.subUIs[mast].removeSelf();
					delete this.subUIs[mast];
				}
			}

			for (var mast in this.data.list) {
				if (!this.subUIs[mast]) {
					var row = new CM.masteryUI(this.UI, this.Manager, mast, this.elements.masterySetTable, this);
					this.subUIs[mast] = row;
				}
			}
		} else {
			for (var mast in this.subUIs) {
				if (this.subUIs[mast].removeSelf) {
					this.subUIs[mast].removeSelf();
					delete this.subUIs[mast];
				}
			}
		}
	}
	
	
	CM.masteryCollectionUI.prototype.defineAddNewMasteryForm = function() {
		this.elements.addForm = {};
		this.elements.addForm.div = createSuperElement("div");
		this.elements.addForm.formHead = createSuperElement("h4", ["innerHTML", "Add a Combat Mastery"]);
		

		this.elements.addForm.masterySelect = createSuperElement("select");
		this.createMasteryOptions(this.elements.addForm.masterySelect);

		this.elements.addForm.masteryIdent = createSuperElement("input");
	
		var mast = createSuperElement("div");
		var ident = createSuperElement("div");
		
		appendChildren(mast, "Mastery type: ", this.elements.addForm.masterySelect);
		appendChildren(ident, "Mastery name: ", this.elements.addForm.masteryIdent, " (e.g. longsword, handgun, archery)");
		
		var btn = createSuperElement("input", ["type", "button"], ["value", "Add Mastery"], ["onclick", "CMUI.addMastery()"]);
		btn.CMUI = this;
		
		appendChildren(this.elements.addForm.div, this.elements.addForm.formHead, mast, ident, btn);
		this.dispBox.appendChild(this.elements.addForm.div);
	}
	
	CM.masteryCollectionUI.prototype.createMasteryOptions = function(sel) {
		if (sel.appendChild) {
			var opts= [];
			for (var m in kantiaDefs.masteryDefs) {
				opts.push(m);
			}
			opts.sort();
			
			var o;
			for (var i = 0; i < opts.length; i++) {
				o = createSuperElement("option", ["innerHTML", opts[i]], ["value", opts[i]]);
				sel.appendChild(o);
			}
		}
	}
	
	CM.masteryCollectionUI.prototype.addMastery = function() {
		if (this.validateAddMastery()) {
			var mastname = this.svc.createMasteryName(this.elements.addForm.masterySelect.value, this.elements.addForm.masteryIdent.value);
			this.svc.addMastery(this.elements.addForm.masterySelect.value, this.elements.addForm.masteryIdent.value);
			this.subUIs[mastname] = new CM.masteryUI(this.UI, this.Manager, mastname, this.elements.masterySetTable, this);
			this.elements.addForm.masteryIdent.value = "";
		}
	}
	
	CM.masteryCollectionUI.prototype.validateAddMastery = function() {
		var err = "";
		var pass = true;
		var mastname = "";
		if (this.svc) {
			var mastname = this.svc.createMasteryName(this.elements.addForm.masterySelect.value, this.elements.addForm.masteryIdent.value);
		}
		else {
			pass = false;
			err += "No active character selected. \n";
		}

		if (trim(this.elements.addForm.masterySelect.value) == "") {
			pass = false;
			err += "Please select a mastery type.\n";
		}
		if (trim(this.elements.addForm.masteryIdent.value) == "") {
			pass = false;
			err += "Please name the mastery.\n";
		}
		if (this.data && this.data.list[mastname]) {
			pass = false;
			err += "Mastery already exists for this character.\n";
		}
		if (!pass) {
			alert(err);
		}
		return pass;
	}
	
	
	CM.masteryCollectionUI.prototype.removeMasteryUI = function(mastery) {
		delete this.subUIs[mastery];	
	}
	CM.masteryCollectionUI.prototype.removeSkillUI = CM.masteryCollectionUI.prototype.removeMasteryUI;