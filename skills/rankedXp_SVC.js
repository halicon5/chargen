CM.rankedXpSVC = function(aRankedXpDAT, aSkillSVC, aCharSVC) {
	this.d = aRankedXpDAT;
	this.parentSVC = aSkillSVC;
	this.parChar = aCharSVC;
	
	this.xpLog = new CM.xpLogSVC(this.d.xpLog, this, this.parChar);
}

	CM.rankedXpSVC.prototype.destroy = CM.destroy;

	CM.rankedXpSVC.prototype.updateByRank = function() {
		if (CM.debug) CM.log("[CALL] CM.rankedXpSVC.prototype.updateByRank = function()");
		
		rank = parseInt(this.parentSVC.d.rank);
		if (!isNaN(rank) && rank >= 0) {
			var xpSet = CM.calc_xp_by_rank(rank);
			for (var k in xpSet) {
				xpSet[k] = xpSet[k] * this.d.cost;
			}

			this.d.base = xpSet.totalXp;
			this.d.tot = xpSet.totalXp;
			this.d.to_next = xpSet.nextTotal;
			
			this.d.applied = 0;
			this.d.checks = 0;
			this.d.burned = 0;
			this.d.spent = 0;
			this.d.burnedRanks = 0;
			this.d.deficit = 0;
		}
	}
	
	
	CM.rankedXpSVC.prototype.updateRankByXp = function(checks, applied, spent, burnedRanks, notes) {
		if (CM.debug) CM.log("[CALL] CM.rankedXpSVC.prototype.updateRankByXp = function(" + checks + ", " + applied + ", " + spent + ", " + burnedRanks + ", " + notes + ")");
	
		checks = (!isNaN(checks)) ?  parseInt(checks, 10) : 0;
		applied = (!isNaN(applied))	?	parseInt(applied, 10) : 0;
		spent = (!isNaN(spent))	?	parseInt(spent, 10) : 0;
		burnedRanks = (!isNaN(burnedRanks)) ? parseInt(burnedRanks, 10) : 0;

		var oldDeficit = this.d.deficit;
		var burnedXp = 0;		
		var xpSet;
		var rank = this.parentSVC.d.rank;
		if (checks || applied || spent || burnedRanks) {
			// we apply burned ranks and xp first.

			if (burnedRanks) {
				for (var r = this.parentSVC.d.rank; r > this.parentSVC.d.rank - burnedRanks; r--) {
					xpSet = CM.calc_xp_by_rank(r);
					burnedXp += xpSet.tierXp;
				}
				burnedXp = burnedXp * this.d.cost;
			}
			
			if (burnedXp >= spent) {
				spent = 0;
			}

			this.d.checks += checks;
			this.d.applied += applied;
			this.d.spent += spent;
			this.d.burned += burnedXp;
			this.d.burnedRanks += burnedRanks;			

			// deficit handling
	
			this.d.deficit += spent;
			if (this.d.deficit > 0) {
				this.d.deficit -= checks + applied;
				if (this.d.deficit < 0) {
					this.d.deficit = 0;
				}
			}
			
			this.d.tot = this.d.base + this.d.checks + this.d.applied - this.d.spent - this.d.burned;
			rank = CM.calc_rank_by_xp(this.d.tot + this.d.deficit, this.d.cost);
			this.parentSVC.setRank(rank);
			xpSet = CM.calc_xp_by_rank(rank);
			this.d.to_next = xpSet.nextTotal * this.d.cost;
			this.xpLog.logEntry(checks, applied, spent, burnedXp, burnedRanks, oldDeficit, notes);
		}		
	}