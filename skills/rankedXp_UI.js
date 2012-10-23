CM.rankedXpUI = function(aUI, aManager, collection, skill, container, skillUI) {
	this.name = skill;
	this.UI = aUI;
	this.Manager = aManager;
	this.collection = collection;
	this.container = container;
	this.parentUI = skillUI;
	
	this.subUIs = {};
	this.elements = {};
	this.elements.xpForm = {};
	this.elements.summary = {};
	
	this.createXpButton();
}

	CM.rankedXpUI.prototype.updateDisplay = function() {
		if (Manager.activeChar && Manager.activeChar.d) {
			this.updateDialogueButtonDisplay();
		}
		for (var k in this.subUIs) {
			this.subUIs[k].updateDisplay();
		}
	}

	CM.rankedXpUI.prototype.updateXpSummary = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d[this.collection] && this.Manager.activeChar.d[this.collection].list[this.name]) {

			var dshort = 	this.Manager.activeChar.d[this.collection].list[this.name];
			var sum = this.elements.summary;
			
			sum.name.innerHTML = this.name;
			sum.applied.innerHTML = dshort.xp.applied;
			sum.base.innerHTML = dshort.xp.base;
			sum.burnedRanks.innerHTML = dshort.xp.burnedRanks;
			sum.rank.innerHTML = dshort.rank;
			sum.checks.innerHTML = dshort.xp.checks;
			sum.cost.innerHTML = "x" + dshort.cost;
			sum.deficit.innerHTML = dshort.xp.deficit;
			sum.tot.innerHTML =  dshort.xp.tot;
			sum.burned.innerHTML = dshort.xp.burned;
			sum.to_next.innerHTML = dshort.xp.to_next;
			sum.spent.innerHTML = dshort.xp.spent;
		}	
	}

	CM.rankedXpUI.prototype.createXpButton = function() {
		if (CM.debug) CM.log ("CM.rankedXpUI.prototype.createXpButton = function() " + this.name );
		var btn = document.createElement("input");
				
		btn.setAttribute("type", "button");
		btn.setAttribute("onclick", "this.CMUI.openXpDialogue()");
		btn.CMUI = this;
		
		this.elements.openDialogue = btn;
		this.updateDialogueButtonDisplay();
		this.container.appendChild(btn);
	
	}
	
	
	CM.rankedXpUI.prototype.updateDialogueButtonDisplay = function() {
		var tot = "";
		var toNext = "";
		var xpString = "";

		if (this.Manager.activeChar && this.Manager.activeChar.d[this.collection].list[this.name]) {
			tot = this.Manager.activeChar.d[this.collection].list[this.name].xp.tot;
			toNext = this.Manager.activeChar.d[this.collection].list[this.name].xp.to_next;			
		}
		if (tot !== "" && toNext !== "") xpString = tot + " / " + toNext;

		this.elements.openDialogue.setAttribute("value", xpString);
	
	}
	
	CM.rankedXpUI.prototype.openXpDialogue = function() {
		if (!this.UI.activePopup) {
			this.UI.activePopup = this;
			CM.createPopupOverlay();
			var box = document.createElement("div");
			box.setAttribute("class", CM.CSSname + "xpDialogueBox");
			this.elements.dialogueBox = box;
			
			var close = document.createElement("input");
			close.setAttribute("type", "button");
			close.setAttribute("value", "Close Experience Window");
			close.setAttribute("class", CM.CSSname + "closeButton");
			close.setAttribute("onclick", "this.CMUI.closeXpDialogue()");
			close.CMUI = this;
		
			box.appendChild(close);
	
			this.createSummary();
			this.createXpForm();
			this.createXpLogDisplay();
		}
	}
	
	CM.rankedXpUI.prototype.createSummary = function() {
		var box = this.elements.dialogueBox;
		
		var xpWrap = document.createElement("div");
		xpWrap.setAttribute("class", CM.CSSname + "editorGroup");
		box.appendChild(xpWrap);
		
		var table = document.createElement("table");
		table.setAttribute("class", CM.CSSname + "xpSummaryTable");
		var tr = document.createElement("tr");
		table.appendChild(tr);
		var pair;
		pair = this.createHeaderDataPair("Skill:", "name");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Base XP: ", "base");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Deficit XP: ", "deficit");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);

		tr = document.createElement("tr");		
		table.appendChild(tr);
		pair = this.createHeaderDataPair("Skill Rank: ", "rank");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("XP Checks: ", "checks");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Sacrificed XP: ", "spent");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		
		tr = document.createElement("tr");
		table.appendChild(tr);
		pair = this.createHeaderDataPair("Cost: ", "cost");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Applied XP: ", "applied");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Burned XP: ", "burned");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);

		tr = document.createElement("tr");		
		table.appendChild(tr);
		pair = this.createHeaderDataPair("Next Rank At: ", "to_next");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Total XP: ", "tot");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);
		pair = this.createHeaderDataPair("Burned Ranks: ", "burnedRanks");
		tr.appendChild(pair.head);
		tr.appendChild(pair.data);

		xpWrap.appendChild(table);
		this.updateXpSummary();
	}

	CM.rankedXpUI.prototype.createHeaderDataPair = function(label, key) {
		var pair = {};
		pair.head = document.createElement("td");
		pair.head.setAttribute("class", CM.CSSname + "header " + CM.CSSname + "xpLabel");
		pair.head.innerHTML = label;
		
		pair.data = document.createElement("td");
		pair.data.setAttribute("class", CM.CSSname + "xpData");
		this.elements.summary[key] = pair.data;
		return pair;
	}
	
	CM.rankedXpUI.prototype.createXpForm = function() {
		var box = this.elements.dialogueBox;
		
		
		var xpWrap = document.createElement("div");
		xpWrap.setAttribute("class", CM.CSSname + "editorGroup");
		box.appendChild(xpWrap);
		
		
		var checks = document.createElement("input");
		checks.setAttribute("size", "3");
		checks.setAttribute("maxlength", "3");
		this.elements.xpForm.checks = checks;
		var checksDiv = document.createElement("div");
		checksDiv.appendChild(checks);
		checksDiv.appendChild(document.createTextNode(" Earned skill checks."));

		var applied = document.createElement("input");
		applied.setAttribute("size", "3");
		applied.setAttribute("maxlength", "3");
		this.elements.xpForm.applied = applied;
		var appliedDiv = document.createElement("div");
		appliedDiv.appendChild(applied);
		appliedDiv.appendChild(document.createTextNode(" Experience awards applied."));
		
		var spent = document.createElement("input");
		spent.setAttribute("size", "3");
		spent.setAttribute("maxlength", "3");
		this.elements.xpForm.spent = spent;
		var spentDiv = document.createElement("div");
		spentDiv.appendChild(spent);
		spentDiv.appendChild(document.createTextNode(" Spent experience (i.e. crafting cost)"));
		
		var burnedRanks = document.createElement("input");
		burnedRanks.setAttribute("size", "2");
		burnedRanks.setAttribute("maxlength", "2");
		this.elements.xpForm.burnedRanks = burnedRanks;
		var burnedRanksDiv = document.createElement("div");
		burnedRanksDiv.appendChild(burnedRanks);
		burnedRanksDiv.appendChild(document.createTextNode(" Burned ranks (i.e. crafting sacrifice or other rank loss).  If the amount of Spent xp is less than the amount that would be lost by burning the skill ranks then the spent Xp is ignored."));

		var notes = document.createElement("input");
		notes.setAttribute("size", "40");
		notes.setAttribute("maxlength", "100");
		this.elements.xpForm.notes = notes;
		var notesDiv = document.createElement("div");
		notesDiv.appendChild(document.createTextNode(" Notes:"));
		notesDiv.appendChild(notes);
		var process = document.createElement("input");
		process.setAttribute("type", "button");
		process.setAttribute("value", "Process XP");
		process.CMUI = this;
		process.setAttribute("onclick", "this.CMUI.processXpRequest()");
		notesDiv.appendChild(process);

		xpWrap.appendChild(checksDiv);
		xpWrap.appendChild(appliedDiv);
		xpWrap.appendChild(spentDiv);
		xpWrap.appendChild(burnedRanksDiv);
		xpWrap.appendChild(notesDiv);

		this.UI.dispBox.appendChild(box);
	}

	CM.rankedXpUI.prototype.createXpLogDisplay = function() {
		var box = this.elements.dialogueBox;
		
		var xpWrap = document.createElement("div");
		xpWrap.setAttribute("class", CM.CSSname + "editorGroup");
		box.appendChild(xpWrap);

		this.subUIs.xpLog = new CM.xpLogUI (this.UI, this.Manager, this.collection, this.name, xpWrap, this);
	}
	
	CM.rankedXpUI.prototype.processXpRequest = function() {
		this.validateXpRequest();
		this.Manager.activeChar[this.collection].list[this.name].xp.updateRankByXp(
			this.elements.xpForm.checks.value,
			this.elements.xpForm.applied.value,
			this.elements.xpForm.spent.value,
			this.elements.xpForm.burnedRanks.value,
			this.elements.xpForm.notes.value
		);
		this.clearXpRequestForm();
		this.parentUI.updateDisplay();
		this.updateXpSummary();
	}
	
	CM.rankedXpUI.prototype.clearXpRequestForm = function () {
		for (var k in this.elements.xpForm) {
			this.elements.xpForm[k].value = "";
		}
	}
	
	CM.rankedXpUI.prototype.validateXpRequest = function() {
		for (var k in this.elements.xpForm) {
			if (k != "notes") {
				this.elements.xpForm[k].value = parseInt(this.elements.xpForm[k].value);
				if (isNaN(this.elements.xpForm[k].value) ) {
					this.elements.xpForm[k].value = 0;
				}
			}
		}
	}
	
	CM.rankedXpUI.prototype.closeXpDialogue = function() {
		// clean up this box and try to eliminate any RAM leaks due to DOM references
		CM.removeDescendents(this.elements.dialogueBox);
		this.UI.dispBox.removeChild(this.elements.dialogueBox);
		delete this.elements.dialogueBox;
		for (var e in this.elements.xpForm) {
			delete this.elements.xpForm[e];
		}
		for (var e in this.elements.summary) {
			delete this.elements.summary[e];
		}
		if (this.subUIs.xpLog) {
			this.subUIs.xpLog.cleanUpXpLog();
		}
		delete this.subUIs.xpLog;
		this.UI.activePopup = undefined;
		CM.removePopupOverlay();
	}
	
	CM.rankedXpUI.prototype.removeSelf = function() {
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].removeSelf) this.subUIs[ui].removeSelf();
			delete this.subUIs[ui];
		}
//		if (this.elements.box) CM.removeDescendents(this.elements.row);	
	}