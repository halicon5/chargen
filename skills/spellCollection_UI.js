/*
	This is a weird one, but since it holds all of the spells and collections of spells by discipline I'll stay with the name.
*/
CM.spellCollectionUI = function(aUI, aManager, div, dataCollection, collectionName, UItype, subCollections, requireManualInitialization) {
	if (CM.debug) CM.log("[NEW] CM.spellCollectionUI = function (): " + collectionName);
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.dataCollection = dataCollection;
	this.data = undefined;
	this.svc = undefined;

	this.collectionName = collectionName;
	this.subCollections = (subCollections) ? subCollections : new Array();

	this.UItype = (UItype) ? UItype : "static";
	this.collection = kantiaDefs.disciplineDefs;

	this.uiClass = CM.disciplineSpellsUI;

	this.subUIs = {};
	this.elements = {};
	
	if (!requireManualInitialization) {
		this.initialize();
	}
}

	CM.extend( CM.spellCollectionUI, CM.skillCollectionUI);

	CM.spellCollectionUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("CM.skillCollectionUI.prototype.updateDisplay");
		this.setSvcAndData();
		this.defineDisciplineSpellUIs();
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}


	CM.spellCollectionUI.prototype.initialize = function () {
		this.setSvcAndData();
		this.defineDisciplineSpellUIs();
	}
		
	CM.spellCollectionUI.prototype.defineDisciplineSpellUIs = function () {
		if (this.Manager.activeChar) {
			for (var discp in this.subUIs) {
				if (!this.data.list[discp]) {
					this.subUIs[discp].removeSelf();
					this.removeDisciplineSpellUI(discp);
					// some code to delete the subUI
				}
			}
			for (var discp in this.data.list) {
				CM.log(discp);
				if (this.subUIs[discp]) {
					CM.log(discp + " disciplineSpellsUI exists");
					this.subUIs[discp].updateDisplay();
					if (!this.elements[discp]) this.elements[discp] = {};
					this.elements[discp].box = this.subUIs[discp].elements.box;
				}
				else {
					CM.log(discp + " create disciplineSpellsUI ");
					this.subUIs[discp] = new CM.disciplineSpellsUI(this.UI, this.Manager, this.dispBox, "disciplines", discp, this);
					if (!this.elements[discp]) this.elements[discp] = {};
					this.elements[discp].box = this.subUIs[discp].elements.box;
				}
			}
		}
	}
	
	CM.spellCollectionUI.prototype.removeDisciplineSpellUI = function (discp) {
		delete this.subUIs[discp];
	}