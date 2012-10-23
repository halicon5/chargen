CM.panelAttributesUI = function (aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};
	
	this.drawAttributeSetBox();
	this.subUIs.attributeSet = new CM.attributeSetUI(this.UI, this.Manager, this.elements.attributeSetBox, this.elements.attributeList);

	this.drawCalculatedStatsBox();
	this.subUIs.calculatedStats = new CM.calculatedStatsUI(this.UI, this.Manager, this.elements.calculatedStatsBox);
	
	// all sub UIs get a shortcut
	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}

	this.tabLink = document.getElementById(CM.CSSname + "editAttribsTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelAttributesUI.prototype.updateDisplay = function () {
		this.UI.activePanel = this;
		for (var ui in this.subUIs) {
			this.subUIs[ui].updateDisplay();
		}
	}


	CM.panelAttributesUI.prototype.drawAttributeSetBox = function () {
		if (CM.debug) CM.log("[CALL] CM.panelAttributesUI.prototype.drawAttributeSetBox = function ()");
		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIVeditAttributeSet");
		div.setAttribute("class", CM.CSSname + "editorGroup");
		
		
		var ul = document.createElement("ul");
		ul.setAttribute("id", CM.CSSname + "_ULeditAttributeSet");
		ul.setAttribute("class", CM.CSSname + "attributeSet");
		
		div.appendChild(ul);
		this.panel.appendChild(div);

		this.elements.attributeSetBox = div;
		this.elements.attributeList = ul;
	}
	
	
	CM.panelAttributesUI.prototype.drawCalculatedStatsBox = function() {
		if (CM.debug) CM.log("[CALL] CM.panelAttributesUI.prototype.drawCalculatedStats = function ()");

		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIVeditCalculatedStats");
		div.setAttribute("class", CM.CSSname + "editorGroup");

		this.panel.appendChild(div);

		this.elements.calculatedStatsBox = div;
	}