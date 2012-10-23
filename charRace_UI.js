CM.charRaceUI = function(aUI, aManager, div) {
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;

	this.subUIs = {};
	this.elements = {};
	
	this.defineSelectBox();
	this.defineOptionList();

	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}

}


	CM.charRaceUI.prototype.updateDisplay = function() {
	
	}
	
	
	CM.charRaceUI.prototype.defineSelectBox = function() {
		var lab = document.createElement("label");
		lab.setAttribute("for", CM.CSSname + "_SELrace");
		lab.innerHTML = 'Race: ';
		
		var sel = document.createElement("select");
		sel.setAttribute("id", CM.CSSname + "_SELrace");
		sel.setAttribute("name", CM.formname + "_SELrace");
		sel.setAttribute("onchange", "CM.Manager.activeChar.setRace(this.value);");
	
		this.elements.raceSelect = sel;
		
		this.dispBox.appendChild(lab);
		this.dispBox.appendChild(sel);
	}
	
	
	CM.charRaceUI.prototype.defineOptionList = function() {
		var opt = undefined;
		for (var i = 0; i < kantiaDefs.raceOrder.length; i++) {
			var val = kantiaDefs.raceOrder[i].name;
			opt = document.createElement("option");
			opt.setAttribute("value", val);
			opt.setAttribute("label", val);
			opt.text = val;
			this.elements.raceSelect.appendChild(opt);
		}
	}