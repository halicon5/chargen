CM.attributeSetSVC = function(aAttributeSetDAT, aCharSVC) {
	this.d = aAttributeSetDAT;
	this.parChar = aCharSVC;
	
    this.STR = new CM.attributeSVC(this.d.STR);
    this.SIZ = new CM.attributeSVC(this.d.SIZ);
    this.AGL = new CM.attributeSVC(this.d.AGL);
    this.REF = new CM.attributeSVC(this.d.REF);
    this.CON = new CM.attributeSVC(this.d.CON);
    this.FORT = new CM.attributeSVC(this.d.FORT);
    this.REA = new CM.attributeSVC(this.d.REA);
    this.WILL = new CM.attributeSVC(this.d.WILL);
    this.SPIR = new CM.attributeSVC(this.d.SPIR);
    this.PER = new CM.attributeSVC(this.d.PER);

	this.CMCLASSNAME = "CM.attributeSetSVC";
}

	CM.attributeSetSVC.prototype.destroy = CM.destroy;
	
	CM.attributeSetSVC.prototype.update = function() {
		if (CM.debug) CM.log("CALL CM.attributeSetSVC.prototype.update = function()");

        this.STR.update();
        this.SIZ.update();
        this.AGL.update();
        this.REF.update();
        this.CON.update();
        this.FORT.update();
        this.REA.update();
        this.WILL.update();
        this.SPIR.update();
        this.PER.update();
	}