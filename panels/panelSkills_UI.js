CM.panelSkillsUI = function(aUI, aManager, panel) {
	this.UI = aUI;
	this.Manager = aManager;
	this.panel = panel;
	this.elements = {};
	this.subUIs = {};

	this.initializeCols();
	
	this.drawSkillsListBox("common", "Common Skills", this.elements.leftCol);
	this.drawSkillsListBox("physical", "Physical Skills", this.elements.leftCol);
	this.drawSkillsListBox("social", "Social Skills", this.elements.leftCol);
	this.drawSkillsListBox("practical", "Academic, Background, Practical Skills", this.elements.rightCol);
	this.drawSkillsListBox("common combat", "Common Combat Skills", this.elements.rightCol);
	this.drawSkillsListBox("combat", "Weapon/Combat Skills", this.elements.rightCol);
	this.drawSkillsListBox("write in", "Write In Skills", this.elements.rightCol);
	
	this.subUIs.common = new CM.skillCollectionUI(aUI, aManager, this.elements["commonBox"], "skills", "common", "static");
	this.subUIs.physical = new CM.skillCollectionUI(aUI, aManager, this.elements["physicalBox"], "skills", "physical", "static");
	this.subUIs.social = new CM.skillCollectionUI(aUI, aManager, this.elements["socialBox"], "skills", "social", "static");
	this.subUIs.practical = new CM.skillCollectionUI(aUI, aManager, this.elements["practicalBox"], "skills", "practical", "elective", [ {c:'practical', l:"Academic, Background, Practical"}]);
	this.subUIs.commonCombat = new CM.skillCollectionUI(aUI, aManager, this.elements["common combatBox"], "skills", "common combat", "static");
	this.subUIs.combat = new CM.skillCollectionUI(aUI, aManager, this.elements["combatBox"], "skills", "combat", "elective", 
		[ {c:'unarmed', l:'Unarmed'}, {c:'ranged', l:'Ranged'}, {c:'axe', l:'Axes'}, {c:'chain', l:'Chain Weapons'}, {c:'shapeshift', l:'Shape Shift Combat' } ]);
		
	this.subUIs.writeIn = new CM.skillCollectionUI(aUI, aManager, this.elements["write inBox"], "skills", "write in", "write");
	
	this.tabLink = document.getElementById(CM.CSSname + "editSkillsTabLink");
	if (this.tabLink) {
		this.tabLink.CMUI = this;
	}
}

	CM.panelSkillsUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.panelSkillsUI.prototype.updateDisplay = function()");
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	CM.panelSkillsUI.prototype.initializeCols = function() {
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

	CM.panelSkillsUI.prototype.drawSkillsListBox = function(grpName, header, targetBox) {
		if (CM.debug) CM.log("[CALL] CM.panelCharacterUI.prototype.drawSkillsListBox = function (" + grpName + ")");
		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIVskillList_" + grpName);
		div.setAttribute("class", CM.CSSname + "editorGroup");

		var head = document.createElement("h4");
		head.innerHTML = header;
		div.appendChild(head);
				
		targetBox.appendChild(div);

		this.elements[grpName + "Box"] = div;
	}
	
	
