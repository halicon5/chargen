CM.panelArmorUI = function(aUI, aManager, aPanel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = aPanel;
	this.elements = {};
	this.subUIs = {};


	this.drawArmorInventoryBox ("defenseStats", "Defense Summary", this.panel);
	this.subUIs.defenseStats = new CM.defenseStatsUI(this.UI, this.Manager, this.elements["defenseStatsBox"]);

	this.drawArmorInventoryBox("equippedArmor", "Equipped Armor and Protective Gear", this.panel);
	this.subUIs.equippedArmor = new CM.armorUI(this.UI, this.Manager, this.elements["equippedArmorBox"], [this]);
	
	this.drawArmorInventoryBox("armor", "Armor Listing", this.panel);
	this.subUIs.armorInventory = new CM.inventorySetUI(this.UI, this.Manager, this.elements["armorBox"], kantiaDefs.armorDefs, kantiaDefs.itemGroups["armor"], "inventory", "armor",
		[ 	{c: "head", l:"Helms/Head Gear"}, 		{c: "torso", l: "Body Armor"},		{c: "arms", l:"Arm Protection"}, 
			{c:"hands", l:"Gloves and Gauntlets"},	{c: "legs", l:"Leg Protection"},	{c: "shield", l:"Shields/Blocking Gear"} ], 
			"elective", [ this ] );
	
	
	this.tabLink = document.getElementById(CM.CSSname + "editArmorTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelArmorUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelArmorUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}

	CM.panelArmorUI.prototype.drawArmorInventoryBox = function(grpName, header, targetBox) {
		if (CM.debug) CM.log("[CALL] CM.panelArmorUI.prototype.drawArmorInventoryBox = function (" + grpName + ")");
		
		var div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "editorGroup");

		var head = document.createElement("h4");
		head.innerHTML = header;
		div.appendChild(head);
				
		targetBox.appendChild(div);

		this.elements[grpName + "Box"] = div;
	}
