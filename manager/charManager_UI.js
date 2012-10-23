CM.charManagerUI = function(aCharManagerSVC, dispBox) {
	this.Manager = aCharManagerSVC;
	this.dispBox = document.getElementById(dispBox);

	this.elements = {}; // holds references to other UI objects.
	this.subUIs = {};
		
	this.form = this.initializeForm();
	this.initializeInterface();
	this.defineManagerFunctionMenu();

	this.subUIs.charGroupMenu = new CM.charGroupUI(this, this.Manager);
	
	this.elements.editorTabs = {};
	this.elements.editorPanels = {};
	this.defineTabsAndPanels("Editor", CM.panelTabsDef, CM.CSSname + "_TDcontent");

	this.subUIs.attributesPanel = new CM.panelAttributesUI(this, this.Manager, this.elements.editorPanels["editAttribs"]);
	this.subUIs.characterPanel = new CM.panelCharacterUI(this, this.Manager, this.elements.editorPanels["editChar"]);
	this.subUIs.skillPanel = new CM.panelSkillsUI(this, this.Manager, this.elements.editorPanels["editSkills"]);
	this.subUIs.masteryPanel = new CM.panelMasteriesUI(this, this.Manager, this.elements.editorPanels["editMasteries"]);
	this.subUIs.magicPanel = new CM.panelMagicUI(this, this.Manager, this.elements.editorPanels["editMagic"]);
	this.subUIs.armorPanel = new CM.panelArmorUI(this, this.Manager, this.elements.editorPanels["editArmor"]);
	this.subUIs.weaponsPanel = new CM.panelWeaponsUI(this, this.Manager, this.elements.editorPanels["editWeapons"]);
	this.subUIs.traitHCsPanel = new CM.panelTraitHCsUI(this, this.Manager, this.elements.editorPanels["editTraitHCs"]);
	
	this.panelUIs = {};
	this.panelUIs.attributesPanel = this.subUIs.attributesPanel;
	this.panelUIs.characterPanel = this.subUIs.characterPanel;
	this.panelUIs.skillPanel = this.subUIs.skillPanel;
	this.panelUIs.masteryPanel = this.subUIs.masteryPanel;
	this.panelUIs.magicPanel = this.subUIs.magicPanel;
	this.panelUIs.armorPanel = this.subUIs.armorPanel;
	this.panelUIs.weaponsPanel = this.subUIs.weaponsPanel;
	this.panelUIs.traitHCsPanel = this.subUIs.traitHCsPanel;
	
	this.activePanel = this.subUIs.attributesPanel;
	this.activePopup = undefined;
	
	// not sure if this is useful
	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}
}

	CM.charManagerUI.prototype.updateDisplay = function() {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.updateDisplay = function()");
		if (this.Manager.activeChar) {
			for (var ui in this.panelUIs) {
				this.subUIs[ui].updateDisplay();
			}
		} 
		else {
			if (CM.debug) CM.log("[ERROR] CM.charManagerUI.prototype.updateDisplay = function() - No active character found.");
		}
	}

	/* the entire point of most of this is to programatically define the interface so this code can be dropped into almost any webpage */
	CM.charManagerUI.prototype.initializeForm = function () {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.initializeForm = function()");
		
		var f = document.getElementById(CM.formname);
		if ( !f ) {
			f = document.createElement("form");
			f.setAttribute("id", CM.formname);
			f.setAttribute("name", CM.formname);
			f.setAttribute("onsubmit", "return false;");
			f.setAttribute("method", "post");
			this.dispBox.appendChild(f);
		} 
		else {
			if (CM.debug) CM.log("[WARNING] CM.charManagerUI.prototype.initializeForm = function(): form " + CM.formname + " already exists.");	
		}
		
		return f;
	}


	CM.charManagerUI.prototype.initializeInterface = function() {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.initializeInterface = function()");
		if (!this.initialized) {
			this.defineFormShape();
			this.initialized = 1;
		}
		else {
			if (CM.debug) CM.log("[WARNING]: CM.charManagerUI.prototype.initializeInterface = function():  Interface alrady exists");
		}
	}



	CM.charManagerUI.prototype.defineFormShape = function() {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.defineFormShape = function()");
	
		// yeah, I'm using a table to hold non-tabular data. Big whoop, wanna' fight 'bout it?
		var table = document.createElement("table");
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		var col2 = document.createElement("td");

		this.elements.menuCol = col1;
		this.elements.contentCol = col2;

		table.setAttribute("id", CM.CSSname + "_TABLEskeleton");
		col1.setAttribute("valign", "top");
		col2.setAttribute("valign", "top");
		col1.setAttribute("id", CM.CSSname + "_TDsideMenus");
		col2.setAttribute("id", CM.CSSname + "_TDcontent");

		row.appendChild(col1);
		row.appendChild(col2);
		table.appendChild(row);
		this.form.appendChild(table);
	}

	CM.charManagerUI.prototype.defineManagerFunctionMenu = function() {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.defineManagerFunctionMenu = function()");

		var div;
		div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "leftMenu");

		var btnSave;
		btnSave = document.createElement("input");
		btnSave.setAttribute("type", "button");
		btnSave.setAttribute("value", "Save Manager Data");
		btnSave.setAttribute("onclick", "CM.Manager.saveManagerData()");

		var btnLoad;
		btnLoad = document.createElement("input");
		btnLoad.setAttribute("type", "button");
		btnLoad.setAttribute("value", "Load Manager Data");
		btnLoad.setAttribute("onclick", "CM.Manager.loadManagerData()");

		div.appendChild(btnSave);
		div.appendChild(btnLoad);
		this.elements.menuCol.appendChild(div);
	}



	CM.charManagerUI.prototype.defineTabsAndPanels = function(groupName, panelTabsArray, containerId) {
		if (CM.debug) CM.log("[CALL] CM.charManagerUI.prototype.defineFormShape = function()");
		this.defineTabSet (groupName, panelTabsArray, containerId);
		this.definePanelSet (groupName, panelTabsArray, containerId);
	}



	CM.charManagerUI.prototype.defineTabSet = function(groupName, ptArray, containerId) {
		if(CM.debug) CM.log("[CALL]: CM.charManagerUI.prototype.defineTabs = function()");		
		var ul = document.createElement("ul");
		ul.setAttribute("id", CM.CSSname + groupName + "TabSet");
		ul.setAttribute("class", CM.CSSname + "TabSet");
		for (var i = 0; i < ptArray.length ; i++) {
			this.defineTab(ptArray[i].id, ptArray[i].label, ul, groupName);
		}
		ul.childNodes[0].className = ul.childNodes[0].className + ' activeTab'; 


		var container = document.getElementById(containerId);
		if (container) {
			container.appendChild(ul);
			if(CM.debug) CM.log("[FINISH]: CM.charManagerUI.prototype.defineTabSet = function()");		
		}
		else {
			if(CM.debug) CM.log("[ERROR]: CM.charManagerUI.prototype.defineTabSet = function(): " + containerId + " does not exist.");		
		}
	}


	CM.charManagerUI.prototype.defineTab = function(tabId, label, tabSet, groupName) {
		if(CM.debug) CM.log("[CALL]: CM.charManagerINT.prototype.defineTab = function(" + tabId + ")");		
		var li = document.createElement("li");
		li.setAttribute("id", CM.CSSname + tabId + "Tab");
		li.setAttribute("class", CM.CSSname + "NavTab");
		
		var a = document.createElement("a");
		a.setAttribute("id", CM.CSSname + tabId + "TabLink");
		a.setAttribute("onclick", "CM.switchTabs('" + tabSet.id + "', '" 
													+ CM.CSSname + groupName + "PanelSet', '" 
													+ li.id + "', '" + CM.CSSname + tabId +"Panel' ); this.CMUI.updateDisplay();");
		a.innerHTML = label;
		li.appendChild(a);

		if (tabSet) {
			tabSet.appendChild(li);
		}
		return li;
	}


	CM.charManagerUI.prototype.definePanelSet = function (groupName, ptArray, containerId) {
		if(CM.debug) CM.log("[CALL]: CM.charManagerUI.prototype.defineTabs = function()");		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + groupName + "PanelSet");
		div.setAttribute("class", CM.CSSname + "PanelSet");
		
		for (var i = 0; i < ptArray.length ; i++) {
			this.elements.editorPanels[ ptArray[i].id ] = this.definePanel(ptArray[i].id + "Panel", ptArray[i].label, div);
			if (i == 0) div.firstChild.style.display = 'block';
		}

		var container = document.getElementById(containerId);
		if (container) {
			container.appendChild(div);
			if(CM.debug) CM.log("[FINISH]: CM.charManagerUI.prototype.definePanelSet = function()");		
		}
		else {
			if(CM.debug) CM.log("[ERROR]: CM.charManagerUI.prototype.definePanelSet = function(): " + containerId + " does not exist.");		
		}
	}


	CM.charManagerUI.prototype.definePanel= function(panelId, label, panelSet) {
		if(CM.debug) CM.log("CALL: CM.charManagerUI.prototype.definePanel = function(" + panelId + ")");		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + panelId);
		div.setAttribute("class", CM.CSSname + "panel");
		div.style.display = 'none';
		
		var h4 = document.createElement("h4");
		h4.innerHTML =  label;		
		div.appendChild(h4);
		if (panelSet) {
			panelSet.appendChild(div);
		}
		return div;
	}