/*
    This is a very minor modification of code by Dean Edwards
    License: http://www.opensource.org/licenses/mit-license.php
    
    version 1.0 2008.02.19
    shane singleton

 context confused me so I changed it to objContext.   This appears
    to be a rare need if you need the processing of each object part
    to be dependent upon a particular object like a Square or Circle
    or something.  A null value in objContext is perfectly acceptable
    and is common.

  check to see if it has been defined in other scripts. that may share this code
  If so, don't do anything and move on. */
if (!forEach) {
    var forEach = function(object, block, objContext) {
        if (object) {
            var resolve = Object;
            if (object instanceof Function) {
                resolve = Function;
            } else if ( object.forEach instanceof Function) {
                object.forEach(block, objContext);
                return;
            } else if (typeof object == "string") {
                resolve = String;
            } else if (typeof object.length == "number") {
                resolve = Array;
            }
            resolve.forEach(object, block, objContext);
        }
    }

    if (!Array.forEach) {
        Array.forEach = function (array_obj, block, objContext) {
            for (var i = 0; i < array_obj.length; i++) {
                block.call(objContext, array_obj[i], i, array_obj);
            }
        };
    }

    /* apply the prototype of forEach to every Function/Object object.  This
        enables the user to cycle through nonstandard properties of
        any function or object that have been added after the object's initialization
        and are not part of the general specifications for that object.
    */
    Function.prototype.forEach = function(object, block, objContext) {
        for (var key in object) {
            if (typeof this.prototype[key] == "undefined") {
                block.call(objContext, object[key], key, object);
            }
        }
    };

    String.forEach = function(string, block, objContext) {
        Array.forEach(string.split(""), function(chr, index) {
            block.call(objContext, chr, index, string);
        } );
    }

/*
    function forEachDebug(obj) {
//        if(!forEachDebug.started) {
//            forEachDebug.started=1;
//            document.write ("<b>Debug Sequence</b><pre>");
//        } else {
//            forEachDebug.started++;
//        }

        document.write ("<ul>\n");
        forEach(obj, function(v, k) {
            if (!obj.debugFlag) {
                document.write ("<li>");
                document.write (k + " (" + (typeof v) + "): " + v);
                obj.debugFlag = 1;
                forEachDebug(k);
                document.write ("</li>\n");
            }
        } );
        document.write ("</ul>\n");
        forEachDebug.started--;
//        if (forEachDebug.started === 0) {
//            document.write ("</pre>");
//        }
    }*/
}



