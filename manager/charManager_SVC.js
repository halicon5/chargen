CM.charManagerSVC = function(aManDAT, aDispBoxId) {
	this.mandat = aManDAT;
	this.activeGroup = undefined;
	this.activeChar = undefined;
	this.UI = new CM.charManagerUI (this, aDispBoxId);
	
	this.callStack = null;
	
	CM.Manager = this;

	this.CMCLASSNAME = "CM.charManagerSVC";	
};



	CM.charManagerSVC.prototype.refreshData = function (channel, param, trigger) {
		CM.log("[START] CM.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + ", " + trigger + ")");

		if (!this.callStack) {
			this.callStack = new CM.calculationStack(channel, param, trigger);
		}

		if ( this.callStack.checkAgainstStackCalls(channel, param) ) {
			if (CM.debug) CM.log("[ERROR] CM.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Callstack collision. Dude... that sucks. Hope you have insurance.");
			return;
		}

		var tok = this.callStack.addNewCall(channel, param);		

		if (CM.calculationFlow[channel]) {
			for (var i=0; i<CM.calculationFlow[channel].length; i++) {
				var func = this.fetchDataUpdateMethod(CM.calculationFlow[channel][i]);
				var command = "";
				var pathArray = CM.calculationFlow[channel][i].split(".");
				command = pathArray[pathArray.length-1];
				if (func[command]) {
					func[command](param);	
					CM.log ("[EXECUTE] " + CM.calculationFlow[channel][i] );
				}
				else {
					if (CM.debug) CM.log("[ERROR] CM.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Channel does not exist on Active Character. Abort update.");				
				}
			}
		}
		else {
			if (CM.debug) CM.log("[ERROR] CM.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + "): Channel does not exist in CM.calculationFlow. Abort update.");				
		}
		
		if (tok == this.callStack.token) {
			// ok, we know the original call has come home.  Kill the stack!
			this.flushCallStack();
			this.UI.activePanel.updateDisplay();
			if (CM.debug) CM.log("[FINISH] CM.charManagerSVC.prototype.refreshData = function ( " + channel + ", " + param + ")");
		}		
	}


	CM.charManagerSVC.prototype.flushCallStack = function() {
		CM.log("[CALL] CM.charManagerSVC.prototype.flushCallStack = function ()");

		this.callStack = null;
	}


	CM.charManagerSVC.prototype.fetchDataUpdateMethod = function(objectMap) {
		CM.log("[CALL] CM.charManagerSVC.prototype.fetchDataUpdateMethod = function ( " + objectMap + ")");
		var pathArray = objectMap.split(".");
		var func = false;
		
		if (pathArray.length > 0) {
			var i = pathArray.length;
			pathArray.reverse();
			var func = this.getUpdateFunction(this.activeChar, pathArray, i);
			return func;
		}
	}
	
	CM.charManagerSVC.prototype.getUpdateFunction = function(obj, pathArray, index) {
		if (CM.debug) CM.log("[CALL] CM.charManagerSVC.prototype.getUpdateFunction = function ( obj, [" + pathArray + "], " + index + ")");
		index--;
		if (index == 0) {
			return obj;
		}
		else if (obj[pathArray[index]]) {
			var func = obj[pathArray[index]];
			return this.getUpdateFunction(func, pathArray, index);
		}
		else {
			if (CM.debug) CM.log("[ERROR] CM.charManagerSVC.prototype.getUpdateFunction = function ( obj, [" + pathArray + "], " + index + "): Path does not exist on object.");
			return false;
		}
	}
	

	
	
	CM.charManagerSVC.prototype.createNewCharGroup = function(aGroupName) {
		if (CM.debug) CM.log("CALL CM.charManagerSVC.prototype.createNewCharGroup = function(" + aGroupName +")");	
	
		if (!this.mandat.charGroups[aGroupName] && aGroupName != "") {
			this.mandat.charGroups[trim(aGroupName)] = new CM.charGroupDAT(trim(aGroupName));
		} 
		else {
			CM.log ("ERROR (CM.charManagerSVC.prototype.createNewCharGroup): Group already exists.");
		}

		this.setActiveCharGroup(aGroupName);
	}
	
	
	CM.charManagerSVC.prototype.addNewCharToActiveGroup = function(aCharName) {
		if (CM.debug) CM.log("CALL CM.charManagerSVC.prototype.addNewCharToActiveGroup = function(" + aCharName +")");	

		if (this.activeGroup.characters && !this.activeGroup.characters[aCharName]) {
			this.activeGroup.characters[aCharName] = new CM.charDAT(aCharName);
			this.setActiveChar(aCharName);
		} 
		else {
			CM.log("ERROR (CM.charManagerSVC.prototype.addNewCharToGroup): activeGroup does not exist or aCharName already exists.");
		}
		
		this.setActiveChar(aCharName);
	}
	
	
	CM.charManagerSVC.prototype.setActiveCharGroup = function(aGroupName) {
		if (CM.debug) CM.log("CALL CM.charManagerSVC.prototype.setActiveCharGroup = function(" + aGroupName +")");	

		if (this.mandat.charGroups[aGroupName]) {
			this.activeGroup = this.mandat.charGroups[aGroupName];


			this.UI.subUIs.charGroupMenu.clearCharList(this.UI.subUIs.charGroupMenu.elements.charsList);
			this.UI.subUIs.charGroupMenu.updateMenuDisplay("charGroupOpts", this.UI.subUIs.charGroupMenu.elements.groupsList, this.mandat.charGroups, this.activeGroup, "setActiveCharGroup");

			if (this.activeChar && this.activeChar.d) {
				this.UI.subUIs.charGroupMenu.updateMenuDisplay("charOpts", this.UI.subUIs.charGroupMenu.elements.charsList, this.activeGroup.characters, this.activeChar, "setActiveChar");
			}
		} 
		else {
			CM.log("ERROR: (CM.charManagerSVC.prototype.setActiveCharGroup): Group not found.");
		}
	}
	
	
	
	CM.charManagerSVC.prototype.setActiveChar = function(aCharName) {
		if (CM.debug) CM.log("CALL CM.charManagerSVC.prototype.setActiveChar = function(" + aCharName +")");	
		
		if (this.activeChar && this.activeChar.destroy) {
			this.activeChar.destroy();
		}
		
		this.activeChar = undefined;
		if (this.activeGroup && this.activeGroup.characters[aCharName]) {
			this.activeChar = new CM.charSVC(this.activeGroup.characters[aCharName]);
			this.UI.subUIs.charGroupMenu.updateMenuDisplay("charOpts", this.UI.subUIs.charGroupMenu.elements.charsList, this.activeGroup.characters, this.activeChar.d, "setActiveChar");
			this.UI.updateDisplay();
		} 
		else {
			CM.log( "ERROR (CM.charManagerSVC.prototype.setActiveChar): Character not found in group.");
		}
	}
	
	
	
	CM.charManagerSVC.prototype.saveManagerData = function() {
		if (CM.debug) CM.log("[CALL] CM.charMangerSVC.prototype.saveManagerData = function()");
		if(JSON && localStorage) {
			localStorage.setItem(CM.storageName,JSON.stringify(this.mandat));
		} 
		else {
			alert("[ERROR] (CM.charManagerSVC.prototype.saveManagerData): JSON or localStorage is not available.");
		}
	}
	
	CM.charManagerSVC.prototype.loadManagerData = function() {
		if (CM.debug) CM.log("[CALL] CM.charMangerSVC.prototype.loadManagerData = function()");
			
		if(JSON && localStorage) {
			if(localStorage.getItem(CM.storageName)) {
				this.mandat = JSON.parse(localStorage.getItem(CM.storageName));
				if (this.mandat.version && this.mandat.version != CM.version) {
					alert("You are loading data from a different version of the character manager!  That's kind of a \"not good\" thing and means some features are not present or simply will not work!  Really, the best thing you can do is rebuild your characters from scratch.");
				}
				this.refreshMenus();
			}
		} 
		else {
			alert("ERROR (SA.spellAdminSVC.prototype.loadMangerData: JSON or localStorage is not available.");
		}
	}
	
	
	CM.charManagerSVC.prototype.refreshMenus = function () {
		if (this.mandat.charGroups) {
			for (var grp in this.mandat.charGroups) {
				this.setActiveCharGroup(this.mandat.charGroups[grp].name);
				for (var ch in this.mandat.charGroups[grp].characters) {
					this.setActiveChar(this.mandat.charGroups[grp].characters[ch].name);
					break;
				}
				break;
			}
		}
	}