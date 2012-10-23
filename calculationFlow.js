/* 
this object basically gives a functional map that is used by CM.charManagerSVC.refreshData(objRef)"

each type of call will have an array of reference objects that are called in sequence.
the assumption is that there is ALWAYS an active CM.Manager.activeChar object which is a reference to a CharSVC object.
*/
CM.calculationFlow = {};
	var cflow = 0;
	CM.calculationFlow["attribute"] = new Array();
	CM.calculationFlow["attribute"][cflow++] = "calcStats.update";
	CM.calculationFlow["attribute"][cflow++] = "skills.updateByAttribute";
	CM.calculationFlow["attribute"][cflow++] = "skills.updateWriteInSkills";
	CM.calculationFlow["attribute"][cflow++] = "defense.update";

	var cflow = 0;
	CM.calculationFlow["charSkill"] = new Array();
	CM.calculationFlow["charSkill"][cflow++] = "combatStats.update";

	var cflow = 0;
	CM.calculationFlow["equip armor"] = new Array();
	CM.calculationFlow["equip armor"][cflow++] = "defense.update";

	var cflow = 0;
	CM.calculationFlow["defense"] = new Array();
	CM.calculationFlow["defense"][cflow++] = "defense.hitZones.update";