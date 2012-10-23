CM.combatActionUI = function (aUI, aManager, div, name, parentUI, triggeredUIs, readOnly) {
	this.UI = aUI;
	this.Manager = aManager;
	this.dispBox = div;
	this.name = name;
	this.parentUI = parentUI;
	this.elements = {};

	this.data = undefined;
	this.svc = undefined;
	this.invData = undefined;
	
	this.subUIs = {};

	this.triggeredUIs = (triggeredUIs) ? triggeredUIs : [];	
	this.initialize();
}

	CM.combatActionUI.prototype.updateDisplay = function () {
		this.setSvcAndData();
		var sign;
	
		this.elements.name.innerHTML = this.name;
		if (this.data) {
			this.elements.diff.innerHTML = this.data.diff;
			this.elements.baseAV.innerHTML = this.data.baseAVTot;
			this.printDamageType();

			var actrange = "highlight";
			for (var i = 1; i <= 6; i++) {
				this.elements["AV" + i].innerHTML = this.data["AV" + i + "Tot"];
				if (this.data.actions < i) actrange = "flagged";
				this.elements["AV" + i].setAttribute("class", actrange);
			}

			this.elements.damage.innerHTML = this.data.damage;
			if (this.data.damage_mod != 0) {
				this.elements.damage.innerHTML += " (" + CM.getSign(this.data.damage_mod) + this.data.damage_mod + ")";
			}

			this.elements.offStaging.innerHTML = this.data.offStaging;
			if (this.data.offStaging_mod != 0) {
				this.elements.offStaging.innerHTML += " (" + CM.getSign(this.data.offStaging_mod) + this.data.offStaging_mod + ")";
			}
		}
	}

	CM.combatActionUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.createCombatAVRow();
		this.updateDisplay();
	}


	CM.combatActionUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.combatStats.combatAVs[this.name]) {
			this.data = this.Manager.activeChar.d.combatStats.combatAVs[this.name];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.combatStats.combatAVs[this.name]) {
			this.svc =  this.Manager.activeChar.combatStats.combatAVs[this.name];
		}
		else {
			this.svc = undefined;
		}
	}
	
	CM.combatActionUI.prototype.createCombatAVRow = function() {
		var tr = createSuperElement("tr");
		this.dispBox.appendChild(tr);
		this.elements.row = tr;
		
		var name = createSuperElement("td");
		this.elements.name = name;
		tr.appendChild(name);

		var diff = createSuperElement("td");
		this.elements.diff = diff;
		tr.appendChild(diff);

		var baseAV = createSuperElement("td");
		this.elements.baseAV = baseAV;
		tr.appendChild(baseAV);
		
		var AV1 = createSuperElement("td");
		this.elements.AV1 = AV1;
		tr.appendChild(AV1);
		
		var AV2 = createSuperElement("td");
		this.elements.AV2 = AV2;
		tr.appendChild(AV2);

		var AV3 = createSuperElement("td");
		this.elements.AV3 = AV3;
		tr.appendChild(AV3);

		var AV4 = createSuperElement("td");
		this.elements.AV4 = AV4;
		tr.appendChild(AV4);

		var AV5 = createSuperElement("td");
		this.elements.AV5 = AV5;
		tr.appendChild(AV5);

		var AV6 = createSuperElement("td");
		this.elements.AV6 = AV6;
		tr.appendChild(AV6);

		var damage = createSuperElement("td");
		this.elements.damage = damage;
		tr.appendChild(damage);
		
		var offStaging = createSuperElement("td");
		this.elements.offStaging = offStaging;
		tr.appendChild(offStaging);

		var dam_type = createSuperElement("td");
		this.elements.dam_type = dam_type;
		tr.appendChild(dam_type);

		if (!this.readOnly) {
			this.createRemoveCombatAVButton();
		}
	}
	
	CM.combatActionUI.prototype.createRemoveCombatAVButton = function() {
		var btn = createSuperElement("input", ["type", "button"], ["value", "Remove"], ["onclick", "this.CMUI.removeCombatAV();"]);
		btn.CMUI = this;
		this.elements.removeButton = btn;
		this.elements.row.appendChild(btn);
	}
	
	
	CM.combatActionUI.prototype.removeCombatAV = function() {
		if (this.Manager.activeChar) {
			this.Manager.activeChar.combatStats.removeCombatAV(this.name);
		}
		this.parentUI.drawCombatAVRows();
	}
	
	
	CM.combatActionUI.prototype.removeSelf = function() {
		CM.removeDescendents(this.elements.row);
		this.dispBox.removeChild(this.elements.row);
	}
	
	CM.combatActionUI.prototype.printDamageType = function() {
		if (this.svc && this.svc.weaponData && this.svc.weaponData.dam_type) {
			this.elements.dam_type.innerHTML = this.svc.weaponData.dam_type;
		}
		else {
			this.elements.dam_type.innerHTML = "";
		}
	}