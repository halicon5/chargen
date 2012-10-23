CM.panelCharacterUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};

	
	this.drawRaceSelectionBox();

	this.subUIs.charRace = new CM.charRaceUI(aUI, aManager, this.elements.charRaceBox);

	this.tabLink = document.getElementById(CM.CSSname + "editCharTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}


	CM.panelCharacterUI.prototype.updateDisplay = function() {
	
	}
	
	
	CM.panelCharacterUI.prototype.drawRaceSelectionBox = function() {
		if (CM.debug) CM.log("[CALL] CM.panelCharacterUI.prototype.drawRaceSelectionBox = function ()");
		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIVeditCharRace");
		div.setAttribute("class", CM.CSSname + "editorGroup");
				
		this.panel.appendChild(div);

		this.elements.charRaceBox = div;
	}
	
	
	CM.panelCharacterUI.prototype.drawCharDetailsBox = function() {

	}