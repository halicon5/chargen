CM.xpLogUI = function(aUI, aManager, collection, skill, container, rankedXpUI) {
	this.name = skill;
	this.UI = aUI;
	this.Manager = aManager;
	this.collection = collection;
	this.container = container;
	this.parentUI = rankedXpUI;

	this.elements = {};
	this.subUIs = {};
	
	if (this.Manager.activeChar && this.Manager.activeChar.d[this.collection].list[this.name]) {
		this.data = this.Manager.activeChar.d[this.collection].list[this.name];
	}
	else {
		this.data = undefined;
	}
	
	this.createXpLogDisplay();
}

	
	CM.xpLogUI.prototype.updateDisplay = function() {
		this.clearLogRows();
		this.createLogRows();
	}
	
	CM.xpLogUI.prototype.createXpLogDisplay = function() {
		var box = document.createElement("div");
		box.setAttribute("class", CM.CSSname + "xpLog");
		
		this.container.appendChild(box);
		
		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "xpLog");
		var thead = document.createElement("thead");
		var header = document.createElement("tr");
		var td;
		td = document.createElement("td");
		td.innerHTML = "Checks";
		header.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Applied";
		header.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Spent";
		header.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Burned Xp";
		header.appendChild(td);

		td = document.createElement("td");
		td.innerHTML = "Burned Ranks";
		header.appendChild(td);

		 td = document.createElement("td");
		td.innerHTML = "Date/Time";
		header.appendChild(td);
		
		var tbody = document.createElement("tbody");
		tbody.setAttribute("class", CM.CSSname + "xpLog");
		thead.appendChild(header);
		table.appendChild(thead);
		table.appendChild(tbody);
		
		this.elements.logBody = tbody;
		box.appendChild(table);
		this.createLogRows();
	}
	
	CM.xpLogUI.prototype.createLogRows = function() {
		if (this.data) {
			var ar = [];
			var i = 0;
			var shortcut = this.data.xp.xpLog.entries;
			for (var k in shortcut) {
				ar[i++] = k;
			}
			ar.sort( function(a, b) {return b - a} ); // reverse sort
			var row;
			var td;
			for (var i = 0; i < ar.length; i++) {
				row = document.createElement("tr");
				row.setAttribute("title", shortcut[ar[i]].notes);
				
				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].checks;
				row.appendChild(td);

				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].applied;
				row.appendChild(td);

				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].spent;
				row.appendChild(td);

				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].burned;
				row.appendChild(td);

				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].burnedRanks;
				row.appendChild(td);
				
				td = document.createElement("td");
				td.innerHTML = shortcut[ar[i]].date;
				row.appendChild(td);

				this.elements.logBody.appendChild(row);
			}
		}
	}
	
	CM.xpLogUI.prototype.clearLogRows = function() {
		CM.removeDescendents(this.elements.logBody);
	}
	
	//		this.d.entries[++this.d.i] = {"checks": checks, "applied": applied, "spent": spent, "burned": burned, "burnedRanks": burnedRanks, "deficit": oldDeficit, "notes": notes, date: dt.toLocaleDateString() + " " + dt.toLocaleTimeString() };
	CM.xpLogUI.prototype.cleanUpXpLog = function() {
		for (var k in this.elements) {
			delete this.elements[k];
		}
		for (var k in this.subUIs) {
			delete this.subUIs[k];
		}
	}


	CM.xpLogUI.prototype.removeSelf = function() {
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].removeSelf) this.subUIs[ui].removeSelf();
			delete this.subUIs[ui];
		}
		this.cleanUpXpLog();
	}