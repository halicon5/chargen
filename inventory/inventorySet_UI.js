CM.inventorySetUI = function(aUI, aManager, div, definitionSourceSet, groupSource, dataCollection, groupName, subGroups, UItype, triggeredUIs) {
	if (CM.debug) CM.log("[NEW] CM.inventorySetUI = function (): " + dataCollection + "." + groupName);
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.definitionSourceSet = definitionSourceSet;
	this.groups = groupSource;

	this.dataCollection = dataCollection;
	this.data = undefined;
	this.svc = undefined;


	this.groupName = groupName;		// armor, weapons, etc.
	this.subGroups = (subGroups) ? subGroups : new Array();
	/*
		subGroups is an array of objects [ {c: "head", l:"Helms/Head Protection"}, {c:"torso", l:"Body protection"}, ..... ]
	*/

	this.UItype = (UItype) ? UItype : "elective";
	
	this.subUIs = {};
	this.elements = {};

	/*
		triggeredUIs: this is an array of UI pointers that get automatically updated if changes occur in this UI set.
		For example, pointing to the armorPanelUI object to update that screen in the event that armor options have been added or removed.
	*/
	this.triggeredUIs = (triggeredUIs) ? triggeredUIs : [];	
	this.initialize();
}

	
	CM.inventorySetUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.defineInventoryRows();
	}
	

	CM.inventorySetUI.prototype.updateDisplay = function () {
		this.setSvcAndData();
	}
	
	
	CM.inventorySetUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d[this.dataCollection]) {
			this.data = this.Manager.activeChar.d[this.dataCollection];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar[this.dataCollection]) {
			this.svc = this.Manager.activeChar[this.dataCollection];
		}
		else {
			this.svc = undefined;
		}
	}


	CM.inventorySetUI.prototype.defineAddItemSelectForm = function () {
		if (CM.debug) CM.log("[CALL] CM.inventorySetUI.prototype.defineAddItemFromListForm = function ()");
		var sel = document.createElement("select");
//		sel.setAttribute("name", CM.formname + "_SELskillCollection_" + CM.safe_name(this.collectionName) );
		
		this.elements.electiveSelect = sel;
		this.dispBox.appendChild(sel);
		this.defineElectiveOptions(this.elements.electiveSelect);
		
		var btn = document.createElement("input");
		btn.setAttribute("value", "Add Item:");
		btn.setAttribute("type", "button");
		btn.setAttribute("onclick", "CMUI.addItemToInventory()");
		btn.CMUI = this;
		this.dispBox.appendChild(btn);
	}


	CM.inventorySetUI.prototype.defineInventoryRows = function() {
		switch (this.UItype) {
			case "static":
			case "s":
				// these will stay present for every character for ever and ever.  Probably will not be used
				this.defineStaticRows();
				break;
			case "elective":
			case "e":
				this.defineAddItemSelectForm();
				this.defineElectiveRows("e");
				break;
			case "write":
			case "w":
				this.defineAddWriteInItem();
				// similar to above but more complex
				break;
		}
	}


	CM.inventorySetUI.prototype.defineElectiveOptions = function(sel) {
		if (CM.debug) CM.log("[CALL] CM.inventorySetUI.prototype.defineElectiveOptions = function ()" + this.dataCollection + " " + this.groupName);
		var sc = this.subGroups;	// array of objects with c and l for collection and label
		var o = undefined;
		o = document.createElement("option");
		o.innerHTML = '=== Add ' + this.groupName + ' ===';
		o.setAttribute("value", "");
		sel.appendChild(o);
		var og = undefined;

		for (i = 0; i < sc.length; i++) {
			if (this.groups[sc[i].c]) {
				var grp = this.groups[sc[i].c];
				og = document.createElement("optgroup");
				og.setAttribute("label", sc[i].l);
				sel.appendChild(og);
				for (j = 0; j < grp.length; j++) {
					o = document.createElement("option");
					o.innerHTML = grp[j];
					o.setAttribute("value", grp[j]);
					og.appendChild(o);
				}
			}
		}
	}
	
	CM.inventorySetUI.prototype.defineElectiveRows = function () {
	
	}
	
	CM.inventorySetUI.prototype.addItemToInventory = function () {
		// check to see if item is already in inventory
		// if not, add item
			// check to find item in definitions file to gather the stats.
		if (this.data && this.svc && !this.data[this.elements.electiveSelect.value]) {
			var def = this.definitionSourceSet[this.elements.electiveSelect.value];
			this.svc.addItem(this.elements.electiveSelect.value, true, 1, true, def);
//	CM.inventorySetSVC.prototype.addReplaceItem = function(itemName, eq, qty, writeIn, itemStats) { 
			this.updateTriggeredUIs();
		} else {
			
		}
	}


	CM.inventorySetUI.prototype.updateTriggeredUIs = function() {
		for (var i = 0; i < this.triggeredUIs.length; i++) {
			if (this.triggeredUIs[i].updateDisplay) {
				this.triggeredUIs[i].updateDisplay();
			}
		}
	}