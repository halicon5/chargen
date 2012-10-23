CM.combatStatsUI = function (aUI, aManager, div, triggeredUIs, readOnly) {
	this.UI = aUI;
	this.Manager = aManager;
	this.dispBox = div;

	this.elements = {};
	this.elements.addForm = {};

	this.readOnly = readOnly;

	this.data = undefined;
	this.svc = undefined;
	this.invData = undefined;
	
	this.subUIs = {};

	this.triggeredUIs = (triggeredUIs) ? triggeredUIs : [];	
	this.initialize();
}

	CM.combatStatsUI.prototype.updateDisplay = function () {
		this.setSvcAndData();
		this.buildWeaponOptions();
		this.drawCombatAVRows();

		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) {
				this.subUIs[ui].updateDisplay();
			}
		}
	}

	CM.combatStatsUI.prototype.initialize = function() {
		this.setSvcAndData();
		if (!this.readOnly) this.createAddCombatAVForm(this.dispBox);

		this.createCombatAVTable(this.dispBox);

		this.buildScenarioOptions();
		this.buildActionOptions();
		this.drawCombatAVRows();
	}

	CM.combatStatsUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.combatStats) {
			this.data = this.Manager.activeChar.d.combatStats;
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.combatStats) {
			this.svc = this.Manager.activeChar.combatStats;
		}
		else {
			this.svc = undefined;
		}
		
		if (this.Manager.activeChar && this.Manager.activeChar.d.inventory) {
			this.invData = this.Manager.activeChar.d.inventory;
		}
		else {
			this.invData = undefined;
		}
	}

	CM.combatStatsUI.prototype.createAddCombatAVForm = function(dispBox) {
		var div = createSuperElement("div", ["class", CM.CSSname + "editorGroup"]);
		var h4 = createSuperElement("h4", ["innerHTML", "Add a combat calculation"]);
		
		appendChildren(dispBox, h4, div);
		
		var weapSelect = createSuperElement("select");
		this.elements.addForm.weapSelect = weapSelect;
		
		var scenSelect = createSuperElement("select");
		this.elements.addForm.scenSelect = scenSelect;
		
		var actSelect = createSuperElement("select");
		this.elements.addForm.actSelect = actSelect;

		var btn = createSuperElement("input", ["value", "Add AV Calculation"], ["type", "button"], ["onclick", "this.CMUI.addCombatAV();"]);
		btn.CMUI = this;
		appendChildren (div, "Weapon/Action: ", weapSelect, " Situation: ", scenSelect, " Maneuver: ", actSelect, btn);
	}

	CM.combatStatsUI.prototype.buildScenarioOptions = function() {
		CM.removeDescendents(this.elements.addForm.scenSelect);
		var opt;
		for ( var scen in kantiaDefs.actionScenarios) {
			opt = createSuperElement("option", ["value", scen], ["innerHTML", scen] );
			this.elements.addForm.scenSelect.appendChild(opt);
		}
	}

	CM.combatStatsUI.prototype.buildActionOptions = function() {
		CM.removeDescendents(this.elements.addForm.actSelect);
		var opt;
		for ( var act in kantiaDefs.actions) {
			opt = createSuperElement("option", ["value", act], ["innerHTML", act] );
			this.elements.addForm.actSelect.appendChild(opt);
		}
	}
	

	CM.combatStatsUI.prototype.buildWeaponOptions = function() {
		CM.removeDescendents(this.elements.addForm.weapSelect);
		var opt;
		var og = createSuperElement("optgroup", ["label", "Common Combat Actions"]);		
		for ( var w in kantiaDefs.defaultCombatActions) {
			opt = createSuperElement("option", ["value", w], ["innerHTML", w] );
			og.appendChild(opt);
		}
		this.elements.addForm.weapSelect.appendChild(og);

		var glist = ["melee", "ranged", "armor"];
		// ugg, what a nasty rat nest of braces. 
		if (this.invData) {
			for (var i = 0; i < glist.length; i++) {
				if (this.invData.groups[glist[i]]) {
					var sc = this.invData.groups[glist[i]];
					for (var grp in sc) {
						if (glist[i] !== "armor" || (glist[i] == "armor" && grp == "shield") ) {
							og = createSuperElement("optgroup", ["label", grp ] );						
							this.elements.addForm.weapSelect.appendChild(og);
	
							for (var w in sc[grp]) {
								opt = createSuperElement("option", ["value", w], ["innerHTML", w]);
								og.appendChild(opt);
							}
						}
					}
				}
			}
		}
	}
	
	CM.combatStatsUI.prototype.addCombatAV = function() {
		if (this.svc && !this.readOnly) {
			var weapDef = this.getWeapDefFromName(this.elements.addForm.weapSelect.value);
			var name = this.svc.createNameIndex(weapDef, this.elements.addForm.scenSelect.value, this.elements.addForm.actSelect.value);
			this.svc.addCombatAVset(weapDef, this.elements.addForm.scenSelect.value, this.elements.addForm.actSelect.value);
			if (!this.subUIs[name]) {
				this.subUIs[name] = new CM.combatActionUI(this.UI, this.Manager, this.elements.combatAVs, name, this);
			}
		}
	}
	
	CM.combatStatsUI.prototype.getWeapDefFromName = function(aName) {
		// check inventory, then common combat actions, then kantiaDefs
		var def = {name: aName, diff: 0};
		if (this.invData && this.invData.items[aName]) {
			def = this.invData.items[aName].stats;
		} else if (kantiaDefs.defaultCombatActions[aName]) {
			def = kantiaDefs.defaultCombatActions[aName];
		} else if (kantiaDefs.meleeWeapons[aName]) {
			def = kantiaDefs.meleeWeapons[aName];
		} else if (kantiaDefs.rangedWeapons[aName]) {
			def = kantiaDefs.rangedWeapons[aName];
		}
		return def;
	}
	
	
	CM.combatStatsUI.prototype.createCombatAVTable = function() {
		var wrapper = document.createElement("div");
		this.dispBox.appendChild(wrapper);
		wrapper.setAttribute("class", CM.CSSname + "editorGroup");

		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "HitZones");
		this.elements.combatAVs = table;
		wrapper.appendChild(table);
		
		var thead = document.createElement("thead");
		table.appendChild(thead);
		
		var body = document.createElement("tbody");
		this.elements.combatAVs = body;
		table.appendChild(body);
		
		this.dispBox.appendChild(wrapper);

		var head = document.createElement("tr");
		head.setAttribute("class", CM.CSSname + "header");
		thead.appendChild(head);

		var td = document.createElement("td");
		td.innerHTML = "Combat Action";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Diff";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Base AV";
		head.appendChild(td);
	
		td = document.createElement("td");
		td.innerHTML = "AV 1";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "AV 2";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "AV 3";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "AV 4";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "AV 5";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "AV 6";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Damage";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Staging";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Type";
		head.appendChild(td);
	}
	
	CM.combatStatsUI.prototype.drawCombatAVRows = function() {
		if (this.data) {
			for (var CAV in this.subUIs) {
				// delete unnecessary rows
				if (!this.data.combatAVs[CAV]) {
					this.subUIs[CAV].removeSelf();
					delete this.subUIs[CAV];
				}
			}

			for (var CAV in this.data.combatAVs) {
				if (!this.subUIs[CAV]) {
					var row = new CM.combatActionUI(this.UI, this.Manager, this.elements.combatAVs, CAV, this);
					this.subUIs[CAV] = row;
				}
			}
		} else {
			for (var CAV in this.subUIs) {
				if (this.subUIs[CAV].removeSelf) {
					//var row = new CM.combatActionUI(this.UI, this.Manager, this.elements.combatAVs, CAV, this);  I think this line is a bug....
					this.subUIs[CAV].removeSelf();
					delete this.subUIs[CAV];
				}
			}
		}
	}
