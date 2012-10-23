CM.attributeSetUI = function(aUI, aManager, div, ul) {
	this.Manager = aManager;
	this.UI	= aUI;
	this.dispBox = div;
	this.attribList = ul;
	
	this.elements = {};
	this.subUIs = {};

	this.drawHeader();
	this.defineAttributeSetFields();

	for (var ui in this.subUIs) {
		this[ui + "UI"] = this.subUIs[ui];
	}

}

	CM.attributeSetUI.prototype.updateDisplay = function () {
		for (var ui in this.subUIs) {
			this.subUIs[ui].updateDisplay();
		}
	}

	CM.attributeSetUI.prototype.defineAttributeSetFields = function() {
		if (CM.debug) CM.log ("CM.attributeUI.prototype.defineAttributeSetFields = fucntion()");
		for (var i = 0; i < kantiaDefs.attributeOrder.length; i++) {

			this.subUIs[kantiaDefs.attributeOrder[i]] = new CM.attributeUI(this.UI, this.Manager, kantiaDefs.attributeOrder[i], this.attribList);
		}
	}
	
	CM.attributeSetUI.prototype.drawHeader = function() {
		var li = document.createElement("li");
		li.setAttribute("id", CM.CSSname + "_LIattributesHeader");
		li.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "attributeSetRow");
				
		var div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "COLattribName");
		div.innerHTML = "Attributes";

		this.attribList.appendChild(li);
		li.appendChild(div);
		
		div = document.createElement("div");
		div.setAttribute("class", CM.CSSname + "COLattribRank");
		div.innerHTML = "Rank";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "Tot Rank";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "AV";
		li.appendChild(div);

		div = document.createElement("div");
		div.innerHTML = "adj.";
		li.appendChild(div);
	}