var debugBox = document.getElementById("debug_feedback");
function updateDebugBox() {
	debugBox.innerHTML = CM.traceLog;
}

var ManagerData = new CM.charManagerDAT(CM.version);
var Manager = new CM.charManagerSVC(ManagerData, "CMdisplay");


/*
Manager.createNewCharGroup("Justin Josh and Mikey");
Manager.createNewCharGroup("Campaign NPCs");
Manager.setActiveCharGroup("Campaign NPCs");

Manager.addNewCharToActiveGroup("Redshirt 1");
Manager.addNewCharToActiveGroup("Redshirt 2");
Manager.addNewCharToActiveGroup("Redshirt 3");

Manager.activeChar.attributes.update();
Manager.activeChar.attributes.STR.setRank(13);
Manager.activeChar.attributes.STR.applyModifier(-5);


Manager.activeChar.calcStats.applyHpModifier(6);
Manager.activeChar.calcStats.applyBpModifier(-3);
Manager.activeChar.calcStats.applyWpModifier(7);
Manager.activeChar.calcStats.applyStamModifier(2);
Manager.activeChar.calcStats.applyStamRecoverModifier(-1);
Manager.activeChar.calcStats.applyStamRecoverMultiplier(1);
Manager.activeChar.calcStats.applyStamRecoverMultiplier(-1.75);

Manager.activeChar.calcStats.applyLiftModifier(0);
Manager.activeChar.calcStats.applyLiftModifier(30);
Manager.activeChar.calcStats.applyLiftMultiplier(.25);


Manager.activeChar.calcStats.applyHaulModifier(0);
Manager.activeChar.calcStats.applyHaulModifier(30);
Manager.activeChar.calcStats.applyHaulMultiplier(-.1);


Manager.activeChar.attributes.FORT.applyModifier(6);
Manager.activeChar.calcStats.applyStunPainModifier(-5);

Manager.activeChar.calcStats.setHealingRates();
//*/
if (Manager.activeChar) {
	var myDebug = JSON.stringify(Manager.activeChar.d);
	myDebug = myDebug.replace(/,/g, ",\n");
	debugBox.innerHTML = CM.traceLog + "\n\n" + myDebug;
}
