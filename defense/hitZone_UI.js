CM.hitZoneUI = function (aUI, aManager, div, zone, label) {
	this.UI = aUI;
	this.Manager = aManager;
	this.dispBox = div;
	this.zone = zone;
	this.label = label;

	this.elements = {};
	this.subUIs = {};
	
	this.initialize();
}


	CM.hitZoneUI.prototype.initialize = function() {
		this.setSvcAndData();
		this.createRow();
	}
	
	CM.hitZoneUI.prototype.updateDisplay = function() {
		this.setSvcAndData();
		if (this.data) {
			this.elements.targetDR.innerHTML = this.data.targetDR;
			this.elements.noAglDR.innerHTML = this.data.noAglDR;
			this.elements.touchDR.innerHTML = this.data.touchDR;
			this.elements.absorb.innerHTML = this.data.absorbTot;
			
			if (this.data.damTransTot) {
				this.elements.absorb.innerHTML += " (" + this.data.damTransTot + ")";
			}

			this.elements.defStaging.innerHTML = this.data.defStagingTot;
			
			this.elements.incapLimit.innerHTML = this.data.incapLimit;
			this.elements.maimLimit.innerHTML = this.data.maimLimit;
		}
	}

	CM.hitZoneUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.defense) {
			this.data = this.Manager.activeChar.d.defense.hitZones[this.zone];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.defense) {
			this.svc = this.Manager.activeChar.defense.hitZones[this.zone];
		}
		else {
			this.svc = undefined;
		}
	}
	
	CM.hitZoneUI.prototype.createRow = function() {
		var tr = document.createElement("tr");
		this.dispBox.appendChild(tr);
		
		var label = document.createElement("td");
		label.innerHTML = this.label;
		tr.appendChild(label);
		
		var targetDR = document.createElement("td");
		this.elements.targetDR = targetDR;
		tr.appendChild(targetDR);

		var noAglDR = document.createElement("td");
		this.elements.noAglDR = noAglDR;
		tr.appendChild(noAglDR);

		var touchDR = document.createElement("td");
		this.elements.touchDR = touchDR;
		tr.appendChild(touchDR);

		var absorb = document.createElement("td");
		this.elements.absorb = absorb;
		tr.appendChild(absorb);

		var defStaging = document.createElement("td");
		this.elements.defStaging = defStaging;
		tr.appendChild(defStaging);
		
		var incapLimit = document.createElement("td");
		this.elements.incapLimit = incapLimit;
		tr.appendChild(incapLimit);
		
		var maimLimit = document.createElement("td");
		this.elements.maimLimit= maimLimit;
		tr.appendChild(maimLimit);
	}