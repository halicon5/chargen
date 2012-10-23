CM.panelTraitHCsUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};
	

	this.buildHeaders();
	
	this.subUIs.traits = new CM.traitHCSetUI(aUI, aManager, this.elements.traitsBox, "traits");
	this.subUIs.HCs = new CM.traitHCSetUI(aUI, aManager, this.elements.HCBox, "HCs");

	this.tabLink = document.getElementById(CM.CSSname + "editTraitHCsTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelTraitHCsUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelMasteriesUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	CM.panelTraitHCsUI.prototype.buildHeaders = function() {
		var traitHeader = createSuperElement("h4", ["innerHTML", "Character Traits"] );
		var HCHeader = createSuperElement("h4", ["innerHTML", "Heroic Characteristics"] );

		var traits = createSuperElement("div", ["class", CM.CSSname + "editorGroup"]);
		var HCs= createSuperElement("div", ["class", CM.CSSname + "editorGroup"]);

		this.elements.traitsBox = document.createElement("div");
		this.elements.HCBox = document.createElement("div");

		traits.appendChild(this.elements.traitsBox);
		this.elements.traitsBox.appendChild(traitHeader);
		
		HCs.appendChild(this.elements.HCBox);
		this.elements.HCBox.appendChild(HCHeader);
		
		appendChildren(this.panel, traits, HCs);
	}