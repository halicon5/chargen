

CM.panelMagicUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};

	this.initializeCols();

	this.drawSkillsListBox("disciplines", "Disciplines", this.elements.leftCol);
	this.drawSkillsListBox("casting", "Casting Skills", this.elements.leftCol);
	this.drawSkillsListBox("utility", "Magic Utility Skills", this.elements.leftCol);
	this.drawSkillsListBox("spells", "Spells", this.elements.rightCol);

	this.subUIs.disciplines = new CM.disciplineCollectionUI(aUI, aManager, this.elements["disciplinesBox"], "disciplines", "disciplines", "elective", 
	[ {c:'arcanum', l:'Arcanum'}, {c:'elemental', l:'Elemental'}, {c:'manipulation', l:'Manipulation'}, {c:'shuri', l:'Shuri'}, {c: 'psychic', l:'Psychic'} ]);


	this.subUIs.casting = new CM.skillCollectionUI(aUI, aManager, this.elements["castingBox"], "magicSkills", "casting", "elective", [ {c:'casting', l:'Casting'}, {c: 'countering', l: 'Countering'} ], true )
	// manually override some default settings and then run it
	this.subUIs.casting.collection = kantiaDefs.magicGroups["casting"];
	this.subUIs.casting.groups = kantiaDefs.magicGroups;
	this.subUIs.casting.initialize()

	this.subUIs.countering = new CM.skillCollectionUI(aUI, aManager, this.elements["utilityBox"], "magicSkills", "magic utility", "elective", [ {c: 'magic utility', l: 'Utility Skills'} ], true )
	// manually override some default settings and then run it
	this.subUIs.countering.collection = kantiaDefs.magicGroups["magic utility"];
	this.subUIs.countering.groups = kantiaDefs.magicGroups;
	this.subUIs.countering.initialize()

	
	this.subUIs.spells = new CM.spellCollectionUI(aUI, aManager, this.elements["spellsBox"], "disciplines", "spells", "elective");

	this.tabLink = document.getElementById(CM.CSSname + "editMagicTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelMagicUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelMagicUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	CM.panelMagicUI.prototype.initializeCols = function() {
		var div;
		div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "skillListCol");
		this.panel.appendChild(div);
		this.elements.leftCol = div;

		div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "skillListCol");
		this.panel.appendChild(div);
		this.elements.rightCol = div;
	}

	CM.panelMagicUI.prototype.drawSkillsListBox = function(grpName, header, targetBox) {
		if (CM.debug) CM.log("[CALL] CM.panelMagicUI.prototype.drawSkillsListBox = function (" + grpName + ")");
		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIVskillList_" + grpName);
		div.setAttribute("class", CM.CSSname + "editorGroup");

		var head = document.createElement("h4");
		head.innerHTML = header;
		div.appendChild(head);
				
		targetBox.appendChild(div);

		this.elements[grpName + "Box"] = div;
	}