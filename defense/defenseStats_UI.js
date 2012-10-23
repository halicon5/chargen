CM.defenseStatsUI = function (aUI, aManager, div) {
	this.UI = aUI;
	this.Manager = aManager;
	this.dispBox = div;

	this.elements = {};
	this.elements.summary = {};
	this.elements.hitZones = {};
	this.subUIs = {};
	
	this.initialize();
}


	CM.defenseStatsUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.createSummaryTable();
		this.createZoneTable();
		this.createZoneRows();
	}
	
	CM.defenseStatsUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		if (this.data) {
			this.updateSummaryDRs();
		}
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}

	CM.defenseStatsUI.prototype.updateSummaryDRs = function() {
		var sc = this.elements.summary;
		sc["baseDR"].innerHTML = this.data.baseTot + " DR";
		sc["normalDR"].innerHTML = this.data.DRnormal + " DR";
		sc["touchDR"].innerHTML = this.data.DRtouch + " DR";
		sc["noAglDR"].innerHTML = this.data.DRnoAgl + " DR";
		sc["sizeTot"].innerHTML = (this.data.natSizeTot > 0) ? "+" + this.data.natSizeTot + " DR": this.data.natSizeTot + " DR";
		sc["aglFinal"].innerHTML = (this.data.aglFinal > 0) ? "+" + this.data.aglFinal + " DR": this.data.aglFinal + " DR";
		sc["armorDef"].innerHTML = (this.data.armorDefTot > 0) ? "+" + this.data.armorDefTot + " DR": this.data.armorDefTot + " DR";
		sc["shieldDef"].innerHTML = (this.data.shieldDefTot > 0) ? "+" + this.data.shieldDefTot + " DR": this.data.shieldDefTot + " DR";
		sc["natDeflect"].innerHTML = ( this.data.natDeflectTot > 0) ? "+" +this.data.natDeflectTot + " DR": this.data.natDeflectTot + " DR";
		sc["natAbsorb"].innerHTML = this.data.natAbsorbTot;
		sc["natDamTrans"].innerHTML = this.data.natDamTransTot;
		sc["natDefStaging"].innerHTML = this.data.natDefStagingTot;
	}

	CM.defenseStatsUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.defense) {
			this.data = this.Manager.activeChar.d.defense;
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.defense) {
			this.svc = this.Manager.activeChar.defense;
		}
		else {
			this.svc = undefined;
		}
		
		if (this.Manager.activeChar && this.Manager.activeChar.d.armor) {
			this.armorSvc = this.Manager.activeChar.d.armor;
		}
		else {
			this.armorSvc = undefined;
		}
	}
	
	
	CM.defenseStatsUI.prototype.createSummaryTable = function() {
		var wrapper = document.createElement("div");
		this.dispBox.appendChild(wrapper);
		wrapper.setAttribute("class", CM.CSSname + "editorGroup " + CM.CSSname + "inlineBlock");

		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "DefenseSummary");
		this.elements.summary.table = table;
		
		wrapper.appendChild(table);
	
		this.createSummaryRow("baseDR", "Base DR");
		this.createSummaryRow("normalDR", "Normal DR");
		this.createSummaryRow("touchDR", "Touch DR");
		this.createSummaryRow("noAglDR", "No AGL DR");
		this.createSummaryRow("", "Breakdown");
		this.createSummaryRow("sizeTot", "Size");
		this.createSummaryRow("aglFinal", "Agility");
		this.createSummaryRow("natDeflect", "Natural Deflect");
		this.createSummaryRow("armorDef", "Armor Deflect");
		this.createSummaryRow("shieldDef", "Shield Deflect");
		this.createSummaryRow("natAbsorb", "Nat. Absorb");
		this.createSummaryRow("natDamTrans", "Nat. Dam Trans");
		this.createSummaryRow("natDefStaging", "Nat. Staging");
	
	}
	
	CM.defenseStatsUI.prototype.createSummaryRow = function(type, labelTxt) {
		var row = document.createElement("tr");
		var table = this.elements.summary.table;
		table.appendChild(row);
		
		var label = document.createElement("td");
		row.appendChild (label);
		label.innerHTML = labelTxt;

		var DR = document.createElement("td");
		this.elements.summary[type] = DR;
		row.appendChild (DR);
	}
	
	
	CM.defenseStatsUI.prototype.createZoneTable = function() {
		var wrapper = document.createElement("div");
		this.dispBox.appendChild(wrapper);
		wrapper.setAttribute("class", CM.CSSname + "editorGroup " + CM.CSSname + "inlineBlock");

		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "HitZones");
		this.elements.hitZones.table = table;
		
		wrapper.appendChild(table);
		
		this.dispBox.appendChild(wrapper);

		var head = document.createElement("tr");
		head.setAttribute("class", CM.CSSname + "header");
		table.appendChild(head);
		
		var td = document.createElement("td");
		td.innerHTML = "Zone";
		head.appendChild(td);
	
		td = document.createElement("td");
		td.innerHTML = "Target DR";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "No AGL";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Touch";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Absorb";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Staging";
		head.appendChild(td);
		
		td = document.createElement("td");
		td.innerHTML = "Incap.";
		head.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Maim";
		head.appendChild(td);
	}
	
	CM.defenseStatsUI.prototype.createZoneRows =function() {
		for (var i = 0; i < kantiaDefs.hitZones.length; i++) {
			var name= kantiaDefs.hitZones[i].name;
			this.subUIs[ name ] = new CM.hitZoneUI(this.UI, this.Manager, this.elements.hitZones.table, name, kantiaDefs.hitZones[i].label + " (+" +  kantiaDefs.hitZones[i].penalty + ")");
		}
	}