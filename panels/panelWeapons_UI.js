CM.panelWeaponsUI = function(aUI, aManager, aPanel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = aPanel;
	this.elements = {};
	this.subUIs = {};


	this.drawWeaponInventoryBox ("combatStats", "Combat Stats and AVs", this.panel);
	this.subUIs.combatStats = new CM.combatStatsUI(this.UI, this.Manager, this.elements["combatStatsBox"]);

//	this.drawWeaponInventoryBox ("defenseStats", "Defense Summary", this.panel);
//	this.subUIs.defenseStats = new CM.defenseStatsUI(this.UI, this.Manager, this.elements["defenseStatsBox"]);

//	this.drawWeaponInventoryBox("equippedArmor", "Equipped Armor and Protective Gear", this.panel);
//	this.subUIs.equippedArmor = new CM.armorUI(this.UI, this.Manager, this.elements["equippedArmorBox"], [this]);
	
	this.drawWeaponInventoryBox("weapons", "Add Weapons to Inventory", this.panel);
	this.subUIs.meleeWeaponInventory = new CM.inventorySetUI(this.UI, this.Manager, this.elements["weaponsBox"], kantiaDefs.meleeWeapons, kantiaDefs.itemGroups["melee weapons"], "inventory", "weapon",
		[ 	{c: "fist", l: "Punching"},		{c: "axe", l:"Axe"}, 	{c: "chain", l:"Chain Weapons"}  ],
		"elective", [ this ] );
	this.subUIs.rangedWeaponInventory = new CM.inventorySetUI(this.UI, this.Manager, this.elements["weaponsBox"], kantiaDefs.rangedWeapons, kantiaDefs.itemGroups["ranged weapons"], "inventory", "ranged weapon",
		[ 	{c: "bow", l: "Bows"}  ],
		"elective", [ this ] );
		
	this.tabLink = document.getElementById(CM.CSSname + "editWeaponsTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelWeaponsUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelWeaponsUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}

	CM.panelWeaponsUI.prototype.drawWeaponInventoryBox = function(grpName, header, targetBox) {
		if (CM.debug) CM.log("[CALL] CM.panelWeaponsUI.prototype.drawWeaponInventoryBox = function (" + grpName + ")");
		
		var div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "editorGroup");

		var head = document.createElement("h4");
		head.innerHTML = header;
		div.appendChild(head);
				
		targetBox.appendChild(div);

		this.elements[grpName + "Box"] = div;
	}
