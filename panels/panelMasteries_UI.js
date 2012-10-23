CM.panelMasteriesUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};
	
	this.elements.masteries = document.createElement("div");
	this.subUIs.masteries = new CM.masteryCollectionUI(aUI, aManager, this.panel);

	this.tabLink = document.getElementById(CM.CSSname + "editMasteriesTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}


	CM.panelMasteriesUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelMasteriesUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
