CM.xpLogSVC = function(aXpLogDAT, aXpLogSVC, aCharSVC) {
	this.d = aXpLogDAT;
	this.parentSVC = aXpLogSVC;
	this.parChar = aCharSVC;
}

	CM.xpLogSVC.prototype.logEntry = function(checks, applied, spent, burned, burnedRanks, oldDeficit, notes) {
		if (CM.debug) CM.log("[CALL] CM.xpLogSVC.prototype.logEntry = function(" + checks + ", " + applied + ", " + spent + ", " + burnedRanks + ", " + notes + ")");

		dt = new Date();
		
		this.d.entries[++this.d.i] = {"checks": checks, "applied": applied, "spent": spent, "burned": burned, "burnedRanks": burnedRanks, "deficit": oldDeficit, "notes": notes, date: dt.toLocaleDateString() + " " + dt.toLocaleTimeString() };
	}