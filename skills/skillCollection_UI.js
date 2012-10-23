CM.skillCollectionUI = function(aUI, aManager, div, dataCollection, collectionName, UItype, subCollections, requireManualInitialization) {
	if (CM.debug) CM.log("[NEW] CM.skillCollectionUI = function (): " + collectionName);
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.dataCollection = dataCollection;
	this.data = undefined;
	this.svc = undefined;

	this.collectionName = collectionName;
	this.subCollections = (subCollections) ? subCollections : new Array();

	this.UItype = (UItype) ? UItype : "static";
	this.collection = kantiaDefs.skillGroups[collectionName];

	this.groups = kantiaDefs.skillGroups;


	this.subUIs = {};
	this.elements = {};
	
	if (!requireManualInitialization) {
		this.initialize();
	}
}

	CM.skillCollectionUI.prototype.initialize = function () {
		this.setSvcAndData();
		this.setUIClass();
		this.defineSkillTable();
		this.defineSkillRows();
	}

	CM.skillCollectionUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		if (this.UItype == 'e' || this.UItype == 'elective') {
			this.defineElectiveRows("e");
		}
		
		if (this.UItype == 'w' || this.UItype == 'write' || this.UItype == 'writein') {
			this.defineWriteInRows();
		}

		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}
	
	
	CM.skillCollectionUI.prototype.setSvcAndData = function() {
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
	

	CM.skillCollectionUI.prototype.setUIClass = function() {	
		this.uiClass = undefined;
		switch (this.dataCollection) {
			case "skills":
				this.uiClass = CM.charSkillUI;
				break;
			case "disciplines":
				this.uiClass = CM.charDisciplineUI;
				break;
			case "spells":
				this.uiClass = CM.charSpellUI;
				break;						
			default:
				this.uiClass = CM.charSkillUI;
				break;
		}
	}
	
	CM.skillCollectionUI.prototype.defineSkillTable = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineSkillList = function ()");
				
		var table = document.createElement("ul");
		table.setAttribute("id", CM.CSSname + "_ULeditSkillSet_" + this.collectionName);
		table.setAttribute("class", CM.CSSname + "skillSet");
		
		this.elements.skillSetTable = table;
		this.dispBox.appendChild(table);

		var tr = document.createElement("li");
		tr.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "skillSetRow");
		table.appendChild(tr);
		
		var td = document.createElement("div");
		td.innerHTML = "Skill Name";
		td.setAttribute("class", CM.CSSname + "COLskillName");
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Rank";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "Tot Rank";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "Adj";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "AV";
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Tot AV";
		tr.appendChild(td);
		
		td = document.createElement("div");
		td.innerHTML = "Cost";
		tr.appendChild(td);

		td = document.createElement("div");
		td.innerHTML = "XP";
		tr.appendChild(td);
	}
	

	CM.skillCollectionUI.prototype.defineSkillRows = function() {
		switch (this.UItype) {
			case "static":
			case "s":
				// these will stay present for every character for ever and ever.
				this.defineStaticRows();
				break;
			case "elective":
			case "e":
				this.defineAddElectiveSkillForm();
				this.defineElectiveRows("e");
				break;
			case "write":
			case "w":
				this.defineWriteInSkillForm();
				// similar to above but more complex
				break;
		}
	}


	CM.skillCollectionUI.prototype.defineElectiveRows = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineElectiveRows = function ()");
		if (this.Manager.activeChar) {
			for (var sk in this.subUIs) {
				// delete unnecessary rows
				if (!this.Manager.activeChar.d[this.dataCollection].list[sk]) {
					this.subUIs[sk].deleteSkill();
				}
			}
			for (var i = 0; i < this.collection.length; i++) {
				// if char has skill and the UI doesn't exist, create it.
				if (this.Manager.activeChar.d[this.dataCollection].list[this.collection[i]] && !this.subUIs[this.collection[i]]) {
					var row = new this.uiClass(this.UI, this.Manager, this.collection[i], this.dataCollection, this.elements.skillSetTable, this, "e");
					this.subUIs[this.collection[i]] = row;
				}
			}
		}
	}
	
	CM.skillCollectionUI.prototype.defineStaticRows = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineStaticRows = function ()");
		for (var i = 0; i < this.collection.length; i++) {
			var row = new this.uiClass(this.UI, this.Manager, this.collection[i], this.dataCollection, this.elements.skillSetTable);		
			this.subUIs[this.collection[i]] = row;
		}

	}
	

	CM.skillCollectionUI.prototype.defineWriteInRows = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineWriteInRows = function ()");
		if (this.Manager.activeChar) {
			for (var sk in this.subUIs) {
				// delete unnecessary rows
				if (!this.Manager.activeChar.d[this.dataCollection].list[sk]) {
					this.subUIs[sk].deleteSkill();
				}
			}
			for (var sk in this.Manager.activeChar.d.writeInSkillHash) {
				// if char has skill and the UI doesn't exist, create it.
				if (this.Manager.activeChar.d[this.dataCollection].list[sk] && !this.subUIs[sk]) {
					var row = new this.uiClass(this.UI, this.Manager, sk, this.dataCollection, this.elements.skillSetTable, this, "w");
					this.subUIs[sk] = row;
				}
			}
		}
	}
	
	CM.skillCollectionUI.prototype.defineAddElectiveSkillForm = function () {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineAddElectiveSkillForm = function ()");
		var sel = document.createElement("select");
		sel.setAttribute("name", CM.formname + "_SELskillCollection_" + CM.safe_name(this.collectionName) );
		
		this.elements.electiveSelect = sel;
		this.dispBox.appendChild(sel);
		this.defineElectiveOptions(this.elements.electiveSelect);
		
		var btn = document.createElement("input");
		btn.setAttribute("value", "Add Skill");
		btn.setAttribute("type", "button");
		btn.setAttribute("onclick", "CMUI.addElectiveSkill()");
		btn.CMUI = this;
		this.dispBox.appendChild(btn);
	}
	
	CM.skillCollectionUI.prototype.defineElectiveOptions = function(sel) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineElectiveOptions = function ()" + this.collectionName);
		var sc = this.subCollections;	// array of objects with c and l for collection and label
		var o = undefined;
		o = document.createElement("option");
		o.innerHTML = '=== Add Skill ===';
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
					o.setAttribute("class", CM.CSSname + "monospace");
					o.innerHTML = grp[j];
					o.setAttribute("value", grp[j]);
					og.appendChild(o);
				}
			}
		}
	}
	
	CM.skillCollectionUI.prototype.defineWriteInSkillForm = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.defineWriteInSkillForm = function ()");

		this.elements.writeIn = {};

		var shortHand;
		var skFormTable = document.createElement("table");
		var head = document.createElement("tr");
		skFormTable.appendChild(head);
		var td;
		td = document.createElement("td");
		td.innerHTML = "Skill name";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Cost";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Attributes";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Attribute Preference";
		head.appendChild(td);
		
		var body = document.createElement("tr");
		skFormTable.appendChild(body);
		
		td = document.createElement("td");
		body.appendChild(td);
		var skName = document.createElement("input");
		shortHand = "_TXTwriteIn_skillName_" + CM.safe_name(this.collectionName)
		skName.setAttribute("name", CM.formname + shortHand );
		skName.setAttribute("id", CM.CSSname + shortHand );
		skName.setAttribute("size", "20");
		skName.setAttribute("maxlength", "30");
		td.appendChild(skName);
		this.elements.writeIn.skillName = skName;

		td = document.createElement("td");
		body.appendChild(td);
		var cost = document.createElement("input");
		shortHand = "_TXTwriteIn_skillCost_" + CM.safe_name(this.collectionName)
		cost.setAttribute("name", CM.formname + shortHand );
		cost.setAttribute("id", CM.CSSname + shortHand );
		cost.setAttribute("size", "1");
		cost.setAttribute("maxlength", "1");
		td.appendChild(cost);
		this.elements.writeIn.cost = cost;
		
		td = document.createElement("td");
		body.appendChild(td);
		var attribs = document.createElement("input");
		shortHand = "_TXTwriteIn_skillAttributes_" + CM.safe_name(this.collectionName)
		attribs.setAttribute("name", CM.formname + shortHand );
		attribs.setAttribute("id", CM.CSSname + shortHand );
		attribs.setAttribute("size", "8");
		attribs.setAttribute("maxlength", "25");
		td.appendChild(attribs);
		this.elements.writeIn.attributes = attribs;

		td = document.createElement("td");
		body.appendChild(td);
		var mixsel = document.createElement("select");
		shortHand = "_SELwriteIn_skillMixType_" + CM.safe_name(this.collectionName)
		mixsel.setAttribute("name", CM.formname + shortHand );
		mixsel.setAttribute("id", CM.CSSname + shortHand );
		var opt;
		for (var i = 0; i < kantiaDefs.mixTypes.length; i++) {
			opt = document.createElement("option");
			opt.innerHTML = kantiaDefs.mixTypes[i].label;
			opt.setAttribute("value", kantiaDefs.mixTypes[i].mixType);
			mixsel.appendChild(opt);
		}
		td.appendChild(mixsel);
		this.elements.writeIn.mixType = mixsel;

		var btn = document.createElement("input");
		btn.setAttribute("value", "Add Skill");
		btn.setAttribute("type", "button");
		btn.setAttribute("onclick", "CMUI.addWriteInSkill()");
		btn.CMUI = this;
		
		this.dispBox.appendChild(skFormTable);
		this.dispBox.appendChild(btn);
	}

	CM.skillCollectionUI.prototype.addElectiveSkill = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.addElectiveSkill = function ()");

		var skillName = undefined;
		if (this.Manager.activeChar) {
			if (this.elements.electiveSelect) {
				skillName = this.elements.electiveSelect.value;
				var inputName = CM.formname + "_TXTskill_" + skillName + "_rank";
			}
	
			if (skillName && this.Manager.activeChar) {
				// create the service and data objects
				this.Manager.activeChar[this.dataCollection].addElectiveSkill(skillName);
			}
			
			if ( this.Manager.activeChar.d[this.dataCollection].list[skillName] &&
					this.Manager.activeChar[this.dataCollection].list[skillName] &&
					!document.forms[CM.formname].elements[inputName]) {
					
				var row = new this.uiClass(this.UI, this.Manager, skillName, this.dataCollection, this.elements.skillSetTable, this, "e");		
				this.subUIs[skillName] = row;
				this.subUIs[skillName].updateDisplay();
			}
			else if (document.forms[CM.formname].elements[inputName]) {
				alert("Error: " + skillName + " already exists for this character.");
			}
		}
	}
	
	
	CM.skillCollectionUI.prototype.removeSkillUI = function(skillName) {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.removeCharSkillUI = function (" + skillName + ")");
		delete this.subUIs[skillName];
	}
	
	CM.skillCollectionUI.prototype.addWriteInSkill = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.addWriteInSkill = function ()");
		skDef = this.validateWriteInSkillDef();
		if (skDef && this.Manager.activeChar) {
			var inputName = CM.formname + "_TXTskill_" + skDef.name + "_rank";
			
			this.Manager.activeChar[this.dataCollection].addWriteInSkill(skDef);
			if ( this.Manager.activeChar.d[this.dataCollection].list[skDef.name] &&
					this.Manager.activeChar[this.dataCollection].list[skDef.name] &&
					!document.forms[CM.formname].elements[inputName]) {
				var row = new this.uiClass(this.UI, this.Manager, skDef.name, this.dataCollection, this.elements.skillSetTable, this, "w");		
				this.subUIs[skDef.name] = row;
				this.subUIs[skDef.name].updateDisplay();
			}			
			this.clearWriteInForm();
		}
	}
	
	/*
	validateSkillDef returns a skillDef object if successful or false if unsuccessful.
	*/
	CM.skillCollectionUI.prototype.validateWriteInSkillDef = function() {
		if (CM.debug) CM.log("[CALL] CM.skillCollectionUI.prototype.validateSkillDef = function ()");
		var shortcut = this.elements.writeIn;
		var success = true;
		var errMsg = "";
		
		var skillName = shortcut.skillName.value = trim(shortcut.skillName.value);
		if (skillName == "" && skillName.length < 30) {
			success = false;
			errMsg += "Skill name must be between 1 and 30 characters.\n";
		}

		var cost = parseInt(shortcut.cost.value);
		if (cost < 1 || cost > 9 || isNaN(cost) ) {
			success = false;
			cost = 1;
			errMsg += "Cost must be between 1 and 9\n";
		}
		shortcut.cost.value = cost;

		shortcut.attributes.value = shortcut.attributes.value.toUpperCase();
		if (trim(shortcut.attributes.value) != "") {
			attribs = shortcut.attributes.value.split(",");
		} else { attribs = [] }
		if (attribs.length > 0) {
			for (var i = 0; i < attribs.length; i++) {
				attribs[i] = trim(attribs[i]);
				if (!kantiaDefs.attributes[attribs[i]]) {
					success = false;
					errMsg += "Attribute " + attribs[i] + " does not exist.\n";
				}
			}
			if (attribs.length > 4) {
				success = false;
				errMsg += "A maximum of 4 attributes can be defined for a skill.\n";
			}
		}
		if (success) {
			return new CM.skillDef( {"name": skillName, "cost": cost,
									"att1": attribs[0], "att2": attribs[1], "att3": attribs[2], "att4": attribs[3], 
									"mixtype": shortcut.mixType.value, "group": "write in"} );
		}
		else {
			alert(errMsg);
			return false;
		}
		
	}
	
	CM.skillCollectionUI.prototype.clearWriteInForm = function() {
		if (this.elements.writeIn) {
			var shortcut = this.elements.writeIn;
			shortcut.skillName.value = "";
			shortcut.cost.value = "";
			shortcut.attributes.value = "";
			shortcut.mixType.selectedIndex = 0;
		}
	}