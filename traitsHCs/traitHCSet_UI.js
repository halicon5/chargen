CM.traitHCSetUI = function(aUI, aManager, div, traitOrHC) {
	if (CM.debug) CM.log("[NEW] CM.traitHCSetUI = function ():");
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.type = traitOrHC;

	this.data = undefined;
	this.svc = undefined;


	this.subUIs = {};
	this.elements = {};
	
	this.initialize();
}

	CM.traitHCSetUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.createAddForm();
	}
	
	CM.traitHCSetUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
	}
	
	CM.traitHCSetUI.prototype.setSvcAndData = function() {
		// set the data shortcut for the whole object.
		if (this.Manager.activeChar && this.Manager.activeChar.d.traitsHCs) {
			this.data = this.Manager.activeChar.d.traitsHCs;
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.traitsHCs) {
			this.svc = this.Manager.activeChar.traitsHCs;
		}
		else {
			this.svc = undefined;
		}
	}
	
	CM.traitHCSetUI.prototype.createAddForm = function() {
		var div = createSuperElement("div", ["class", "CMeditorGroup"]);
		var h3 = createSuperElement("h3", ["innerHTML", "Add " + this.type]);
		div.appendChild(h3);
		this.dispBox.appendChild(div);

		var sel = createSuperElement("select");
		this.elements.itemSelect = sel;
		div.appendChild(sel);
		this.createTraitHCoptions(sel);
		
		var writeinDiv = createSuperElement("div", ["innerHTML", "Write-in name: "]);
		this.elements.identInput = createSuperElement("input", ["size", 30], ["maxlength", 40]);
		writeinDiv.appendChild(this.elements.identInput);
		div.appendChild(writeinDiv);

		var detailsDiv = createSuperElement("div", ["innerHTML", "Details: "], ["style", "vertical-align: text-top"]);
		this.elements.detailsInput = createSuperElement("textarea", ["rows", 3], ["cols", 30]);
		detailsDiv.appendChild(this.elements.detailsInput);
		div.appendChild(detailsDiv);
		
		var btn = createSuperElement("input", ["type", "button"], ["value", "Add to character"], ["onclick", "this.CMUI.addTraitHC()"] );
		this.elements.addButton = btn;
		btn.CMUI = this;
		div.appendChild(btn);
	}
	
	CM.traitHCSetUI.prototype.createTraitHCoptions = function (sel) {
		var t = undefined;
		var type;
		var name;
		if (this.type.toUpperCase() == "TRAITS") {
			t = kantiaDefs.traitGroups;
			type = "TRAIT";
		}
		else if (this.type.toUpperCase() == "HCS") {
			t = kantiaDefs.HCgroups;
			type = "HC";
		}
		
		if (t) {
			var og;
			var o;
			for (var grp in t) {
				og = document.createElement("optgroup");
				og.setAttribute("label", grp);
				sel.appendChild(og);
				for (var i = 0; i < t[grp].length; i++) {
					o = document.createElement("option");
					o.setAttribute("class", CM.CSSname + "monospace");
					o.innerHTML = t[grp][i];
					
					name = t[grp][i];
					if (kantiaDefs.traitHCs[name]) {
						sc = kantiaDefs.traitHCs[name];
						if (type == "TRAIT") {
							if (sc.flaw) {
								o.innerHTML += "   (FLAW: " + sc.flaw + ")";
							}
							if (sc.merit) {
								o.innerHTML += "   (MERIT: " + sc.merit + ")";
							}
						} 
						else if (type == "HC") {
							if (sc.xpCost) {
								o.innerHTML += "   (XP: " + sc.xpCost + ")";
							}
						}
						if (sc.mult) {
							o.innerHTML += " (Mult) ";
						}
						if (sc.reqIdent) {
							o.innerHTML += " (Write-in) ";
						}
					}
				
					o.setAttribute("value",  t[grp][i]);
					og.appendChild(o);				
				}
			}
		}
	}
	
	CM.traitHCSetUI.prototype.addTraitHC = function() {
		if ( this.validateInput() && this.svc ) {
			this.svc.addTraitHC(this.elements.itemSelect.value, this.type, this.elements.identInput.value, this.elements.detailsInput.value);
		}
	}
	
	CM.traitHCSetUI.prototype.validateInput = function() {
		if (!this.data) {
			alert("No active character selected!");
			return false;
		}
		var errMsg = "";
		/*
		 check if multiples are allowed
		 check if identity is required
		 check if details are required
		*/
		var itemName = this.elements.itemSelect.value;
		var def = kantiaDefs.traitHCs[itemName];
		if (def) {

			if (  	(!def.mult && this.data.list[itemName] ) ||	(def.mult && this.data.list[itemName + ": " + trim(this.elements.identInput.value)] ) )  {
				errMsg += "NOT ADDED: Trait or HC already exists for this character.";
			}

			if (def.reqIdent && trim(this.elements.identInput.value) == "") {
				errMsg += "NOT ADDED: Trait or HC requires a write-in identity.";
			}
			
			if (!def.reqIdent) {
				this.elements.identInput.value = "";
			}
			
			if (def.reqDetails && trim(this.elements.detailsInput.value) == "") {
				errMsg += "NOT ADDED: Trait or HC requires details.";
			}
		}
		else {
			errMsg += "NOT ADDED: Trait or HC definition not found";
		}
		
		if (errMsg) {
			alert(errMsg);
			return false;
		}
		else {
			return true;
		}
	}