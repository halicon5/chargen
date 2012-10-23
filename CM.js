var CM = {
	"version": "20100730a",
	"formname": "CMinterface",
	"CSSname": "CM",
	"displayBox": "CMdisplay",
	"Manager": "Manager", // used to target the Manager object in dynamically generated onClick, onChange, and other objects.
	"debug":  true,
	"traceLog": "",
	"logCalls": 0,
	"panelTabsDef": new Array( 		{id: "editChar", label: "Character"},
									{id: "editAttribs", label: "Attributes"},
									{id: "editSkills", label: "Skills"},
									{id: "editMasteries", label: "Masteries"},
									{id: "editMagic", label: "Magic"},
									{id: "editTraitHCs", label: "Traits/HCs"},
									{id: "editWeapons", label: "Weapons"},
									{id: "editArmor", label: "Armor"}
									),
	"storageName": "kantiaCharManager"
}; 


	CM.log = function(msg) {
		this.logCalls++;
		this.traceLog = CM.logCalls.toString() + ": " + msg + "\n" + this.traceLog;
	}
	
	CM.clearLog = function() {
		this.traceLog = "";
	}
	
	CM.eval = function(cmd) {
		this.log(cmd);
		try {
			eval(cmd);
		} 
		catch (exception) {
			this.log(exception);
		}
	}
	

	CM.safe_name = function(str) {
		if (typeof str === "string") {
			return str.replace(/[\/, -\.\'\":]/g, "");
		} else {
			return str;
		}
	}
	
	CM.calc_AV = function(a) {
		if (isNaN(a)) {
			a = 0;
		}
		return 5 * parseInt(a,10);
	}

	// some shared library functions common throughout the entire application
	CM.processModifier = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		return  parseInt(m, 10);	
	}
	
	
	CM.processMultiplier = function(m) {
		if (isNaN(m)) {
			m = 0;
		}
		return parseFloat(m);
	}
	

	/*************
	starting = the current value
	m = multiplier being applied
	0 = no change
	>0 = positive change to value.  No theoretical limit. 1 = 100% (or x2 when it get's calculated out)
	<0 = inverse change to value  -.5 = less 1/2, -.25 = less 1/4 (actually 3/4), limit is -1 which would be -100%
	
	*/
	CM.calculateMultiplier = function(cur, m) {
		cur = CM.processMultiplier(cur);
		m = CM.processMultiplier(m);
		return cur + m;
	}
	
	
	
	// used to calculate weight lift or physical weight
	CM.calc_weight = function (aRank) {
		var weight = 5;
		if (!isNaN(aRank)) {
			for (var i=1; i<=aRank;++i) {
				weight = Math.round((weight + (2.75*i))/10)*10;
			}
		}
		return weight;
	}
	
	
	CM.calc_haul = function(weight) {
		if (isNaN(weight)) {
			weight = 0;
		}
		return Math.floor(weight * 15 / 8);
	}
	
	
	CM.calc_xp_by_rank = function(r) {
		var xpSet = {tierXp: 0, totalXp: 0, nextTier: 2, nextTotal: 2};
		// instead of iterating, reduce the number of calculations required. more code, faster operation or large updates
		var calcxp = function(x) {
			var step = 0;
			var base = 0;
			var diff = 0;
			
			if (x <= 5) {
				step = 2;
				base = 0;
				diff = 0;
			} else if (x > 5 && x <= 10) {
				step = 5;
				base = 10;
				diff = 5;
			} else if (x > 10 && x <= 15) {
				step = 10;
				base = 35;
				diff = 10;
			} else if (x > 15 && x <= 20) {
				step = 15;
				base = 85;
				diff = 15;
			} else if (x > 20 && x <= 25) {
				step = 20;
				base = 160;
				diff = 20;
			} else if (x > 25 && x <= 30) {
				step = 30;
				base = 260;
				diff = 25;
			} else if (x > 30) {
				step = 40;
				base = 410;
				diff = 30;
			}
			return [step, (step * (x - diff) + base)];
		}
			
		var c;
		c = calcxp(r);
		xpSet.tierXp =  c[0];
		xpSet.totalXp = c[1];
		c = calcxp(r+1);
		xpSet.nextTier = c[0];
		xpSet.nextTotal = c[1];
			
		return xpSet;		
	}
	
	CM.calc_rank_by_xp = function(xp, cost) {
		cost = (!isNaN(cost) && parseInt(cost) != 0) ? parseInt(cost, 10) : 1;
		xp = (!isNaN(xp)) ? parseInt(xp, 10) : 0;
		xp = Math.floor(xp / cost);

		rank = 0;
		if (xp >= 410) {
			rank = 30 + Math.floor((xp-410)/40)	
		} 
		else if (xp >= 260) {
			rank = 25 + Math.floor((xp-260)/30)	
		}
		else if (xp >= 160) {
			rank = 20 + Math.floor((xp-160)/20)
		}
		else if (xp >= 85) {
			rank = 15 + Math.floor((xp-85)/15)	
		}
		else if (xp >= 35) {
			rank = 10 + Math.floor((xp-35)/10)	
		}
		else if (xp >= 10) {
			rank = 5 + Math.floor((xp-10)/5)	
		}
		else if (xp >= 0) {
			rank = 0 + Math.floor((xp)/2)	
		}
		else {
			rank = 0;
		}

		return rank;
	}
	
	
	CM.getSign = function(value) {
		return (value > 0) ? "+" : "";
	}
	
	/******************************************************
	User interface type functions	
	*/
	CM.switchTabs = function(tabSetId, panelSetId, tabId, panelId) {
		var ts = document.getElementById(tabSetId);
		var ps = document.getElementById(panelSetId);
		var t = document.getElementById(tabId);
		var p = document.getElementById(panelId);

		CM.log ("CALL: CM.switchTabs (" + tabSetId + ", " + panelSetId + ", " + tabId + ", " + panelId + ")");
		if (ts && ps && t && p) {
			for (var i = 0; i < ps.childNodes.length; i++) {
				ps.childNodes[i].style.display = 'none';
			}			
			p.style.display = 'block';
			
			for (var i = 0; i < ts.childNodes.length; i++) {
				ts.childNodes[i].className = ts.childNodes[i].className.replace( /activeTab/g, '');
				ts.childNodes[i].className = trim(ts.childNodes[i].className);
			}
			t.className = t.className + ' activeTab';
		}
		else {
			CM.log("ERROR:  CM.switchTabs = fucntion(): Either " + tabSetId + " or " + panelSetId + " does not exist.");
		}
	}
	
	
	CM.resetListItemClasses = function(id, classToClear) {
		var list = document.getElementById(id);
		var r = new RegExp("/" + classToClear + "/", "g");

		if (list) {
			for (var i = 0; i < list.childNodes.length; i++) {
				list.childNodes[i].className = list.childNodes[i].className.replace( classToClear, '');
				list.childNodes[i].className = trim(list.childNodes[i].className);
			}
		}
		else {
			CM.log("ERROR: CM.resetListItemClasses = function(" + id + ", " + classToClear + "): " + id + " not found.");
		}
	}

	CM.removeDescendents = function(node) {
		if (node && node.hasChildNodes() ) {
			while ( node.hasChildNodes() ) {
				CM.removeDescendents(node.firstChild);
				node.removeChild(node.firstChild);
			}
		}
	}

	CM.createPopupOverlay = function () {
		if ( !document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			var overlay = document.createElement("div");
			overlay.setAttribute("class", this.CSSname + "popupOverlay");
			overlay.setAttribute("id", this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).appendChild(overlay);
		}
	}

	CM.removePopupOverlay = function () {
		if ( document.getElementById(this.CSSname + "popupOverlay") && document.getElementById(this.displayBox) ) {
			overlay = document.getElementById(this.CSSname + "popupOverlay");
			document.getElementById(this.displayBox).removeChild(overlay);
		}	
	}

	/*
	Service cleanup functions
	*/
	CM.destroy = function() {
		if (CM.debug) CM.log("[DESTROY]" + this.CMCLASSNAME + " " + this.CMOBJNAME);
		this.destroyFlag = 1;
		for (var svc in this) {
			if (this[svc].destroy && typeof this[svc].destroy == "function" && !this[svc].destroyFlag) {
				this[svc].destroy();
				delete this[svc];
			}
		}	
	}



	/*
	Configuration functions
	*/
	CM.createListByGroup = function(objectSet, assignIndex, groupIndex, groupKey, subGroupIndex, subGroupKey) {
		var a = new Array();
		var i = 0;
		if (subGroupIndex && subGroupKey) {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey 
					&& objectSet[obj][subGroupIndex] && objectSet[obj][subGroupIndex] == subGroupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}
		else {
			for (var obj in objectSet) {
				if (objectSet[obj][groupIndex] && objectSet[obj][assignIndex] && objectSet[obj][groupIndex] == groupKey) {
					a[i++] = objectSet[obj][assignIndex];
				}
			}
		}	
		
		a.sort();
		return a;
	}
	
	CM.createBitHash = function(a) {
		var hash = {};
		if (a && a.constructor === Array) {
			for (var i = 0; i < a.length; i++) {
				hash[a[i]] = 1;
			}
		}
		return hash;
	}

	CM.createAttributeSkillList = function(indexList, source, target) {
		for (var i = 0; i < indexList.length; i++) {
			target[indexList[i]] = {};
			for (var sk in source) {
				for (var j = 1; j <= 4; j++) {
					if (source[sk]["att" + j]) {
						if (source[sk]["att" + j] == indexList[i]) {
							target[indexList[i]][sk] = true;
						}
					}
					else {
						break;
					}
				}
			}
		}	
	}

	CM.extend = function(child, parent) {
		var f = function() {};
		f.prototype = parent.prototype
		child.prototype = new f();
	}

	CM.shallowMerge = function(p, c) {
		if (typeof c === "object") {
			for (var i in p) {
				if (typeof p[i] !== "object") {
					c[i] = p[i];
				}
			}
		}
	}

	CM.deepCopy = function(p, c) {
		var c = c || {};
		for (var i in p) {
			if (p[i] === null) {
				c[i] = p[i];
			}
			else if (typeof p[i] === 'object') {
				c[i] = (p[i].constructor === Array) ? [] : {}; // array or object
				CM.deepCopy(p[i], c[i]);
			} else {
				c[i] = p[i];
			}
		}
		return c;
	}
	
	
function addSlashes(str) {
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
}
function stripSlashes(str) {
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
}	
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}

function appendChildren() {
	if (arguments[0] && arguments[0].appendChild) {
		var n = undefined;
		for (i = 1; i < arguments.length; i++) {
			if (arguments[i] === "\n") {
				n = document.createElement("br");
				arguments[0].appendChild(n);
				n = undefined;
			}
			else if (typeof arguments[i] == "string" || typeof arguments[i] == "number") {
				n = document.createTextNode(arguments[i]);
				arguments[0].appendChild(n);
				n = undefined;
			} else {
				arguments[0].appendChild(arguments[i]);
			}
		}
	}
}

function createSuperElement () {
	if (typeof arguments[0] === "string") {
		var el = document.createElement(arguments[0]);
		for (var i = 1; i < arguments.length; i++) {
			if (arguments[i].constructor == Array && arguments[i].length > 1) {
				if (arguments[i][0] == "innerHTML") {
					el.innerHTML = arguments[i][1];
				}
				else {
					el.setAttribute(arguments[i][0], arguments[i][1]);				
				}
			}
		}
		return el;
	}
}
