CM.charGroupUI = function(aUI, aManager) {
	this.UI = aUI;
	this.Manager = aManager;
	
	this.elements = {};
	this.elements.groupsDiv = this.defineMenuDiv("charGroupOpts", "Groups");
	this.elements.groupsList = this.defineMenuList("charGroupOpts", this.elements.groupsDiv);

	this.defineTextInput("newCharGroup", "Create New Group", this.elements.groupsDiv, "CM.Manager.createNewCharGroup");
	
	this.elements.charsDiv = this.defineMenuDiv("charOpts", "Characters");
	this.elements.charsList = this.defineMenuList("charOpts", this.elements.charsDiv);

	this.defineTextInput("newChar", "Create New Character", this.elements.charsDiv, "CM.Manager.addNewCharToActiveGroup");

	
}

	CM.charGroupUI.prototype.defineMenuDiv = function(name, label) {
		if (CM.debug) CM.log("[CALL] CM.charGroupUI.prototype.defineMenuDiv = function(" + name + ", " + label + ")");
		var container = document.getElementById(CM.CSSname + "_TDsideMenus");
		var div; 
		var head;
		var ul;
		
		div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIV" + name + "Menu");
		div.setAttribute("class", CM.CSSname + "leftMenu");

		head = document.createElement("h4");
		head.innerHTML = label;

		container.appendChild(div);
		div.appendChild(head);
	
		return div;
	}
	
	
	CM.charGroupUI.prototype.defineMenuList = function(name, parDiv) {
		if (CM.debug) CM.log("[CALL] CM.charGroupUI.prototype.defineMenuList = function(" + name + ", parDiv)");
		var ul;
		
		ul = document.createElement("ul");
		ul.setAttribute("id", CM.CSSname + "_UL" + name + "Menu");
		ul.setAttribute("class", CM.CSSname + "leftMenu");

		parDiv.appendChild(ul);	
		return ul;
	}
	
	
	CM.charGroupUI.prototype.defineCharGroupMenu = function() {
		// create the form to create new groups
		CM.log("CALL: CM.charManagerINT.prototype.defineCharGroupMenu = function()");		
		var cgMenu = document.getElementById(CM.CSSname + "_DIVgroupMenu");
		
		if (cgMenu) {
			var div = document.createElement("div");
			div.setAttribute("id", CM.CSSname + "NewGroupRow");
		
			var inp = document.createElement("input");
			inp.setAttribute("id", CM.formname + "_NewCharGroupName");
			inp.setAttribute("name", CM.formname + "_NewCharGroupName");

			var btn = document.createElement("input");
			btn.setAttribute("type", "button");
			btn.setAttribute("value", "Create New Group");
			btn.setAttribute("onclick", "CM.Manager.createNewCharGroup(document.forms['" + CM.formname + "'].elements['" + CM.formname + "_NewCharGroupName'].value); document.getElementById('" + inp.id + "').value = '';");

			cgMenu.appendChild(div);
			div.appendChild(inp);
			div.appendChild(btn);
		} 
		else {
			CM.log("ERROR: CM.charManagerINT.prototype.defineCharGroupMenu = function() " + CM.CSSname + "_DIVgroupMenu does not exist");		
		}
	}


	CM.charGroupUI.prototype.defineTextInput = function(name, label, container, func) {
		if (CM.debug) CM.log("[CALL] CM.charGroupUI.prototype.defineTextInput = function(" + name + ", " + label + ", container)");
		
		var div = document.createElement("div");
		div.setAttribute("id", CM.CSSname + "_DIV" + name + "Row");
		
		var inp = document.createElement("input");
		inp.setAttribute("id", CM.formname + "_TXT" + name);
		inp.setAttribute("name", CM.formname + "_TXT" + name);
		inp.setAttribute("size", 30);

		var btn = document.createElement("input");
		btn.setAttribute("type", "button");
		btn.setAttribute("value", label);
		btn.setAttribute("onclick", func + "(document.forms['" + CM.formname + "'].elements['" + inp.name + "'].value); document.getElementById('" + inp.id + "').value = '';");
		
		container.appendChild(div);
		div.appendChild(inp);	
		div.appendChild(btn);
		return inp;
	}




	CM.charGroupUI.prototype.updateMenuDisplay = function(grp, aList, aListOpts, activeItem, func) {
		if (CM.debug) CM.log("CALL: CM.charGroupUI.prototype.updateMenuDisplay = function()");
		var radioId = "";
		var radioName = "";
		var liId = "";
		
		var li = undefined;
		var radio = undefined;
		CM.resetListItemClasses(aList.id, "activeSelection");
		for (var opt in aListOpts) {
			if (aListOpts[opt].name) {
				radioId = CM.formname + "_RADIO" + grp + "_" + CM.safe_name(aListOpts[opt].name);
				radioName = CM.formname + "_RADIO" + grp;
				liId = CM.CSSname + "_LI" + grp + "_" + CM.safe_name(aListOpts[opt].name);
				
				li = document.getElementById(liId);
				radio = document.getElementById(radioId);
				
				if ( radio ) {
					if ( li ) {
						if (aListOpts[opt].name == activeItem.name) {
							li.className += " activeSelection";
							radio.checked = true;
						}
					}
				}
				else {
					this.createMenuOption(grp, aListOpts[opt], aList, func);
					li = document.getElementById(liId);
					radio = document.getElementById(radioId);
					if (aListOpts[opt].name == activeItem.name) {
						li.className += " activeSelection";
						radio.checked = true;
					}
				}
			}
		}
	}
	
	
	CM.charGroupUI.prototype.createMenuOption = function(grp, opt, aList, func) {
		if (CM.debug) CM.log("CALL: CM.charGroupUI.prototype.createMenuOption = function(" + grp + ", " + opt.name + ", " + aList.id + ", " + func +")");
		var radioId = CM.formname + "_RADIO" + grp + "_" + CM.safe_name(opt.name);
		var radioName = CM.formname + "_RADIO" + grp;

		var liId = CM.CSSname + "_LI" + grp + "_" + CM.safe_name(opt.name);

		var radio = document.createElement("input");
		radio.setAttribute("type", "radio");
		radio.setAttribute("id", radioId);
		radio.setAttribute("name", radioName);
		radio.setAttribute("value", opt.name);
		radio.setAttribute("onChange", "CM.Manager." + func + "(\"" + opt.name + "\");");
		var li = document.createElement("li");
		li.setAttribute("id", liId);
		li.setAttribute("class", "LI" + grp);
		li.appendChild(radio);

		var label = document.createElement("label");
		label.setAttribute("for", radioId);
		label.innerHTML = opt.name;

		li.appendChild(label);
		
		aList.appendChild(li);
	}
	
	CM.charGroupUI.prototype.clearCharList = function(ul) {
		if (ul) {
			while (ul.hasChildNodes()) {
				while(ul.lastChild.hasChildNodes()) {
					ul.lastChild.removeChild(ul.lastChild.lastChild);
				}
				ul.removeChild(ul.lastChild);
			}
		}
	}
