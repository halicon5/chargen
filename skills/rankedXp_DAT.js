CM.rankedXpDAT = function(cost) {
	this.cost = (cost) ? this.cost = cost : 1;
	
	this.applied = 0;
	this.checks = 0;
	this.base = 0;

	this.tot = 0;	
		
	this.to_next = 2 *  this.cost;
	this.xpLog = new CM.xpLogDAT();

	this.burned = 0;	// the amount of xp burned, affects rank calculation
	this.burnedRanks = 0;
	this.spent = 0;		// amount of spent xp
	this.deficit = 0;
}