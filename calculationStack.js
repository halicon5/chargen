CM.calculationStack = function(channel, param, trigger) {
	CM.log("[NEW] CM.calculationStack = function(" + channel + ", " + param + ", " + trigger + ")");
	this.rootChannel = channel;
	this.rootParam = param;
	this.rootTrigger = trigger;
	
	this.stackCalls = 1;
	
	this.calls = {};
	
	this.token = channel + "?" + param + "#" + this.stackCalls;
}

	CM.calculationStack.prototype.addNewCall = function(channel, param) {
		CM.log("[CALL] CM.calculationStack.prototype.addNewCall = function(" + channel + ", " + param + ") total calls for this stack: " + this.token + " " + this.stackCalls);
		var tok = this.createToken(channel, param);
		this.calls[channel + "?" + param] = this.stackCalls;
		this.stackCalls++;
		return tok;
	}
	
	CM.calculationStack.prototype.createToken = function(channel, param) {
		return channel + "?" + param + "#" + this.stackCalls;
	}
	
	CM.calculationStack.prototype.checkAgainstStackCalls = function(channel, param) {
		return (this.calls[channel + "?" + param]) ? true : false;
	}