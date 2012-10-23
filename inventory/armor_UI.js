CM.armorUI = function (aUI, aManager, div, triggeredUIs) {
	this.UI = aUI;
	this.Manager = aManager;
	this.dispBox = div;

	this.elements = {};
	this.elements.rows = {};
	this.elements.cats = {};
	this.elements.radios = {};

	this.data = undefined;
	this.svc = undefined;
	this.invData = undefined;

	this.statOrder = [ {deflect: "Deflect" }, {called_shot: "Called"}, {defStaging: "Staging"}, {absorb: "Abs"}, {damTrans: "Trans"}, {bypass: "Bypass"}, 
		{blocking: "Blocking"}, {init: "Init"}, {AGL_limit: "AGL limit"} ]
	
	this.subUIs = {};

	this.triggeredUIs = (triggeredUIs) ? triggeredUIs : [];	
	
	this.initialize();
}

	CM.armorUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.createArmorTable();
		this.defineArmorCats();
		this.defineArmorRows();
	}
	

	CM.armorUI.prototype.updateDisplay = function () {
		if (CM.debug) CM.log("[CALL] 	CM.armorUI.prototype.updateDisplay = function () ");

		this.setSvcAndData();
		this.defineArmorRows();
	}
	
	
	CM.armorUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d.armor) {
			this.data = this.Manager.activeChar.d.armor;
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.armor) {
			this.svc = this.Manager.activeChar.armor;
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

	CM.armorUI.prototype.createArmorTable = function() {
		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "armor");

		var header = document.createElement("tr");
		header.setAttribute("class", CM.CSSname + "header");
		table.appendChild(header);
		
		var td = document.createElement("td");
		td.innerHTML = "Equip";
		header.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = " ";
		header.appendChild(td);

		for (var i = 0; i < this.statOrder.length; i++) {
			for (var k in this.statOrder[i]) {
				td = document.createElement("td");
				td.innerHTML = this.statOrder[i][k];
				header.appendChild(td);
			}
		}
		
		td = document.createElement("td");
		td.innerHTML = "Adjustments";
		header.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Mods";
		header.appendChild(td);
				

		this.elements.armorTable = table;
		this.dispBox.appendChild(table);
	}

	CM.armorUI.prototype.defineArmorCats = function() {
		for (var i = 0; i < kantiaDefs.armorZoneOrder.length; i++) {
			if (kantiaDefs.armorZones[kantiaDefs.armorZoneOrder[i]]) {			
				this.createArmorCatRow(kantiaDefs.armorZoneOrder[i], kantiaDefs.armorZones[kantiaDefs.armorZoneOrder[i]] );
			}
		}
	}
	
	CM.armorUI.prototype.createArmorCatRow = function(cat, label) {
		if (cat && label) {
			var row = document.createElement("tr");
			row.setAttribute("class", CM.CSSname + "header");
			
			var eq  = document.createElement("td");

			var rad = document.createElement("input");
			rad.setAttribute("type", "radio");
			rad.setAttribute("name", CM.formname + "_EquipArmor_" + cat);
			rad.setAttribute("onclick", "this.CMUI.equipItem('" + cat + "', null);");
			rad.CMUI = this;
			eq.appendChild(rad)
			row.appendChild(eq);

			var lab = document.createElement("td");
			lab.innerHTML = label;
			lab.setAttribute("class", CM.formname + "COLarmorName");
			row.appendChild(lab);
			
			var td = document.createElement("td");
			td.setAttribute("colspan", this.statOrder.length + 2);
			row.appendChild(td);
			
			this.elements.cats[cat] = row;
			this.elements.armorTable.appendChild(row);
		}
	}
	
	CM.armorUI.prototype.defineArmorRows = function() {
		if (this.data && this.invData) {
			for ( var item in this.elements.rows) {
				if ( !this.invData.items[item] ) {
					this.deleteArmorRow(item);
				}
			}

			if (this.invData.groups["armor"]) {
				for ( var zone in this.invData.groups["armor"] ) {
					if (this.elements.cats[zone]) {
						for (var item in this.invData.groups["armor"][zone]) {
							if (this.invData.items[item] && !this.elements.rows[item]) {
								this.createArmorRow(this.invData.items[item], this.elements.cats[zone], zone);
							}
						}
					}
				}			
			}
		}
	}
	
	CM.armorUI.prototype.createArmorRow = function(armorData, catRow, zone) {
		if (armorData && catRow && armorData.stats) {
			var row = document.createElement("tr");
			
			var eq = document.createElement("td");
			this.createEquipButton(zone, armorData.name, eq);
			row.appendChild(eq);

			var lab = document.createElement("td");
			lab.setAttribute("class", CM.CSSname + "COLarmorName");
			lab.innerHTML = armorData.name;
			row.appendChild(lab);

			var td;
			for (var i = 0; i < this.statOrder.length; i++) {
				for (var k in this.statOrder[i]) {
					td = document.createElement("td");
					td.innerHTML = (armorData.stats[k] !== undefined)  ? armorData.stats[k] : " ";
					row.appendChild(td);
				}
			}
			
			td = document.createElement("td");
			if (armorData.stats.adjusts) {
				for (var k in armorData.stats.adjusts) {
					td.innerHTML += k + ":" + armorData.stats.adjusts[k] + " ";
				}
			}
			row.appendChild(td);
						
			td = document.createElement("td");
			if (armorData.stats.mods) {
				for (var k in armorData.stats.mods) {
					td.innerHTML += armorData.stats.mods[k].name + " ";
				}
			}
			row.appendChild(td);
	
			var remBtn = createSuperElement("input", ["type", "button"], ["value", "Discard"], ["onclick", "this.CMUI.removeArmorFromInventory(this.itemName);"]);
			remBtn.itemName = armorData.name;
			remBtn.CMUI = this;
			td = document.createElement("td");
			td.appendChild(remBtn);
			row.appendChild(td);
			
			this.elements.armorTable.insertBefore(row, catRow.nextSibling);
			this.elements.rows[armorData.name] = row;
		}
	}

	CM.armorUI.prototype.removeArmorFromInventory = function(item) {
		if (this.svc) {
			this.svc.removeArmorFromInventory(item);
		}
		this.deleteArmorRow(item);
	}

	CM.armorUI.prototype.deleteArmorRow = function(item) {
		if (this.elements.rows[item]) {
			CM.removeDescendents(this.elements.rows[item]);
		}
		delete this.elements.rows[item];
		delete this.elements.radios[item];
	}
	
	CM.armorUI.prototype.createEquipButton = function(zone, value, container) {
		var rad = document.createElement("input");
		rad.setAttribute("type", "radio");
		rad.setAttribute("name", CM.formname + "_EquipArmor_" + zone);
		rad.setAttribute("value", value);
		rad.setAttribute("onclick", "this.CMUI.equipItem('" + zone + "', this.value);");
		rad.CMUI = this;
		this.elements.radios[value] = rad;
		container.appendChild(rad);
	}


	CM.armorUI.prototype.equipItem = function(zone, item) {
		if (this.svc && zone !== undefined && item !== undefined) {
			this.svc.equipArmor(zone, item);
		}
		this.updateTriggeredUIs();
	}
	
	CM.armorUI.prototype.updateTriggeredUIs = function() {
		for (var i = 0; i < this.triggeredUIs.length; i++) {
			if (this.triggeredUIs[i].updateDisplay) {
				this.triggeredUIs[i].updateDisplay();
			}
		}
	}