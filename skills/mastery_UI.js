CM.masteryUI = function(aUI, aManager, name, table, masteryCollectionUI) {
	this.name = name;
	this.CMname = this.name;  // not sure this is being used anymore. no idea why it's here
	this.UI = aUI;
	this.Manager = aManager;
	this.parentTable = table;
	this.UItype = 'elective';
	this.parentUI = masteryCollectionUI;
	this.combatAVs = undefined;
	
	this.collection = "masteries";  
	this.data = undefined;
	this.svc = undefined;

	this.setSvcAndData();

	this.subUIs = {};
	this.elements = {};
	
	this.defineSkillFormElements();
}

	CM.extend ( CM.masteryUI, CM.charSkillUI );
	

	CM.masteryUI.prototype.updateDisplay = function() {
		if (Manager.activeChar && Manager.activeChar.d) {
			
			this.setSvcAndData();
			var skill = this.data;
			
			this.elements.rank.value 	= skill.rank;
			
			var mod = this.data.rank_mod;
			this.elements.totRank.innerHTML = (mod > 0) ?"+" + mod : mod;
			this.elements.totRank.innerHTML += " (" + skill.totRank + ")";
			
			this.elements.cost.innerHTML = "x" + skill.cost;
			
			this.updateLinkedAVlist();
			this.defineCombatAVoptions();
			
			this.elements.active.checked = (this.data.active) ? true : false;
		}
		for (var ui in this.subUIs) {
			if (this.subUIs[ui].updateDisplay) this.subUIs[ui].updateDisplay();
		}
	}

	CM.masteryUI.prototype.setSvcAndData = function() {
		if (this.Manager.activeChar && this.Manager.activeChar.d.masteries.list) {
			this.data = this.Manager.activeChar.d.masteries.list[this.name];
		}
		else {
			this.data = undefined;
		}

		if (this.Manager.activeChar && this.Manager.activeChar.masteries.list) {
			this.svc = this.Manager.activeChar.masteries.list[this.name];
		}
		else {
			this.svc = undefined;
		}
		
		if (this.parentUI.combatAVs) {
			this.combatAVs = this.parentUI.combatAVs;
		}
		else {
			this.combatAVs = undefined;
		}
	}

	CM.masteryUI.prototype.defineSkillFormElements = function() {
		if (CM.debug) CM.log ("CM.charSkillUI.prototype.defineSkillFormElements = fucntion()");
		var row = document.createElement("li");
		row.setAttribute("class", CM.CSSname + "skillSetRow");
		this.elements.row = row;
				
		var rankWrapper = document.createElement("div");
		rankWrapper.setAttribute("class", CM.CSSname + "COLskillRank");
		
		var rank = document.createElement("input");
		rank.setAttribute("id", CM.CSSname + "_TXTskill_" + this.name + "_rank");
		rank.setAttribute("name", CM.formname + "_TXTskill_" + this.name + "_rank");
		rank.setAttribute("class", CM.CSSname + "_TXTskill");
		rank.setAttribute("size", 2);
		rank.setAttribute("maxlength", 2);
		rank.setAttribute("onchange", "this.CMUI.setRankManually(); this.CMUI.updateDisplay();");
		rank.CMUI = this;
		this.elements.rank = rank;
		rankWrapper.appendChild(rank);
		
		var activeDiv = document.createElement("div");
		var chk = createSuperElement("input", ["type", "checkbox"], ["onclick", "this.CMUI.toggleActive()"]);
		chk.CMUI = this;
		activeDiv.appendChild(chk);
		this.elements.active = chk;
		chk.checked = (this.data && this.data.active) ? true : false;
		
		var label = document.createElement("label");
		label.innerHTML = this.name;
		label.setAttribute("class", CM.CSSname + "COLmasteryName");
		label.setAttribute("for", rank.id);
		this.elements.label = label;				


		var mod = document.createElement("div");
//		mod.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_mod");
		this.elements.mod = mod;
		
		var totRank = document.createElement("div");
//		totRank.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_totRank");
		this.elements.totRank = totRank;

		var cost = document.createElement("div");
//		cost.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_cost");
		this.elements.cost = cost;

		var AVcol = document.createElement("div");
		this.elements.AVcol = AVcol;
		this.defineFormBindCombatAV();
		this.elements.AVlist = createSuperElement("table");
		this.elements.AVcol.appendChild(this.elements.AVlist);

		var xpCol = document.createElement("div");
//		xpCol.setAttribute("id", CM.CSSname + "_DIVskill" + this.name + "_xpCost");
		this.subUIs.xp = new CM.rankedXpUI(this.UI, this.Manager, this.collection, this.name, xpCol, this);

		var delbtn = this.getDeleteButton(row, this.parentTable);
		
		row.appendChild(label);
		row.appendChild(activeDiv);
		row.appendChild(rankWrapper);
		rankWrapper.appendChild(rank);
		row.appendChild(totRank);
		row.appendChild(cost);
		row.appendChild(AVcol);
		row.appendChild(xpCol);
		row.appendChild(delbtn);
		this.parentTable.appendChild(row);		
	}

	CM.masteryUI.prototype.toggleActive = function() {
		if (this.svc) {
			this.svc.toggleActive();
			this.updateDisplay();
		}
	}

	CM.masteryUI.prototype.defineFormBindCombatAV = function() {
		var div = document.createElement("div");
		
		this.elements.selectAV = document.createElement("select");
		this.defineCombatAVoptions();

		var btn = createSuperElement("input", ["type", "button"], ["value", "+"], ["onclick", "this.CMUI.bindCombatAV()"]);
		btn.CMUI = this;
		appendChildren(div, this.elements.selectAV, btn);

		this.elements.AVcol.appendChild(div);
	}
	
	CM.masteryUI.prototype.defineCombatAVoptions = function() {
		CM.removeDescendents(this.elements.selectAV);
		var o = undefined;
		if (this.combatAVs) {
			for (var av in this.combatAVs) {
				if (this.combatAVs[av] && kantiaDefs.masteryDefs[this.data.type].actions[this.combatAVs[av].d.act]
						&& kantiaDefs.masteryDefs[this.data.type].scenarios[this.combatAVs[av].d.scenario]) {		
					o = createSuperElement("option", ["value", av], ["innerHTML", av]);
					this.elements.selectAV.appendChild(o);
				}
			}
		}
	}
	
	CM.masteryUI.prototype.bindCombatAV = function() {
		if (this.svc) {
			this.svc.bindCombatAV(this.elements.selectAV.value);
		}
		this.updateDisplay();
	}
	
	CM.masteryUI.prototype.unbindCombatAV = function(av) {
		if (this.svc) {
			this.svc.unbindCombatAV(av);
		}
		this.updateDisplay();
	}
	
	CM.masteryUI.prototype.updateLinkedAVlist = function() {
		CM.removeDescendents(this.elements.AVlist);
		if (this.data) {
			for (var av in this.data.attachedAVs) {
				var row = createSuperElement("tr");
				var td1 = createSuperElement("td", ["innerHTML", av] );
				var td2 = createSuperElement("td");
				var btn = createSuperElement("input", ["type", "button"], ["value", "-"], ["onclick", "this.CMUI.unbindCombatAV(this.CMparam)"]);
				btn.CMUI = this;
				btn.CMparam = av;
				td2.appendChild(btn);
				appendChildren(row, td1, td2);
				this.elements.AVlist.appendChild(row);
			}
		}
	}