/**
 *
 * Copyrights
 *
 *
 * Portions created or assigned to Cisco Systems, Inc. are
 * Copyright (c) 2012 Cisco Systems, Inc. or its affiliated entities.  All Rights Reserved.
 */
/**
 * This javascript library is made available to Cisco partners and customers as
 * a convenience to help minimize the cost of Cisco Finesse customizations.
 * This library can be used in Cisco Finesse deployments.  Cisco does not
 * permit the use of this library in customer deployments that do not include
 * Cisco Finesse.  Support for the javascript library is provided on a
 * "best effort" basis via CDN.  Like any custom deployment, it is the
 * responsibility of the partner and/or customer to ensure that the
 * customization works correctly and this includes ensuring that the Cisco
 * Finesse JavaScript is properly integrated into 3rd party applications.
 * Cisco reserves the right to make changes to the javascript code and
 * corresponding API as part of the normal Cisco Finesse release cycle.  The
 * implication of this is that new versions of the javascript might be
 * incompatible with applications built on older Finesse integrations.  That
 * said, it is Cisco's intention to ensure javascript compatibility across
 * versions as much as possible and Cisco will make every effort to clearly
 * document any differences in the javascript across versions in the event
 * that a backwards compatibility impacting change is made.
 */
/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();
/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 *
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
(function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

  Math.uuid = function (len, radix) {
    var chars = CHARS, uuid = [], i;
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };

  // A more performant, but slightly bulkier, RFC4122v4 solution.  We boost performance
  // by minimizing calls to random()
  Math.uuidFast = function() {
    var chars = CHARS, uuid = new Array(36), rnd=0, r;
    for (var i = 0; i < 36; i++) {
      if (i==8 || i==13 ||  i==18 || i==23) {
        uuid[i] = '-';
      } else if (i==14) {
        uuid[i] = '4';
      } else {
        if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
        r = rnd & 0xf;
        rnd = rnd >> 4;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
    return uuid.join('');
  };

  // A more compact, but less performant, RFC4122v4 solution:
  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };
})();
/**
 * @fileOverview A collection of conversion utilities.
 * Last modified 07-06-2011, Cisco Systems
 *
 * @name Utilities.Converter
 */

/** @namespace */
var finesse = finesse || {};

/**
 * @class
 * Contains a collection of utility functions.
 */
finesse.Converter = (function () {
    /** @scope finesse.clientservices.Utilities */
    return {
        /*  This work is licensed under Creative Commons GNU LGPL License.

            License: http://creativecommons.org/licenses/LGPL/2.1/
           Version: 0.9
            Author:  Stefan Goessner/2006
            Web:     http://goessner.net/ 
        */
        xml2json: function (xml, tab) {
            var X = {
                toObj: function (xml) {
                    var o = {};
                    if (xml.nodeType === 1) {
                        // element node ..
                        if (xml.attributes.length)
                        // element with attributes  ..
                        for (var i = 0; i < xml.attributes.length; i++)
                        o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                        if (xml.firstChild) {
                            // element has child nodes ..
                            var textChild = 0,
                            cdataChild = 0,
                            hasElementChild = false;
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 1) hasElementChild = true;
                                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++;
                                // non-whitespace text
                                else if (n.nodeType == 4) cdataChild++;
                                // cdata section node
                            }
                            if (hasElementChild) {
                                if (textChild < 2 && cdataChild < 2) {
                                    // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                                        if (n.nodeType == 3)
                                        // text node
                                        o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4)
                                        // cdata node
                                        o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName]) {
                                            // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                            o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                            o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        }
                                        else
                                        // first occurence of element..
                                        o[n.nodeName] = X.toObj(n);
                                    }
                                }
                                else {
                                    // mixed content
                                    if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                    else
                                    o["#text"] = X.escape(X.innerXml(xml));
                                }
                            }
                            else if (textChild) {
                                // pure text
                                if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                                else
                                o["#text"] = X.escape(X.innerXml(xml));
                            }
                            else if (cdataChild) {
                                // cdata
                                if (cdataChild > 1)
                                o = X.escape(X.innerXml(xml));
                                else
                                for (var n = xml.firstChild; n; n = n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    }
                    else if (xml.nodeType == 9) {
                        // document.node
                        o = X.toObj(xml.documentElement);
                    }
                    else
                        throw ("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson: function(o, name, ind) {
                    var json = name ? ("\"" + name + "\"") : "";
                    if (o instanceof Array) {
                        for (var i = 0, n = o.length; i < n; i++)
                        o[i] = X.toJson(o[i], "", ind + "\t");
                        json += (name ? ":[": "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                    }
                    else if (o == null)
                    json += (name && ":") + "null";
                    else if (typeof(o) == "object") {
                        var arr = [];
                        for (var m in o)
                        arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                        json += (name ? ":{": "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                    }
                    else if (typeof(o) == "string")
                    json += (name && ":") + "\"" + o.toString() + "\"";
                    else
                    json += (name && ":") + o.toString();
                    return json;
                },
                innerXml: function(node) {
                    var s = "";
                    if ("innerHTML" in node)
                    s = node.innerHTML;
                    else {
                        var asXml = function(n) {
                            var s = "";
                            if (n.nodeType == 1) {
                                s += "<" + n.nodeName;
                                for (var i = 0; i < n.attributes.length; i++)
                                s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                                if (n.firstChild) {
                                    s += ">";
                                    for (var c = n.firstChild; c; c = c.nextSibling)
                                    s += asXml(c);
                                    s += "</" + n.nodeName + ">";
                                }
                                else
                                s += "/>";
                            }
                            else if (n.nodeType == 3)
                            s += n.nodeValue;
                            else if (n.nodeType == 4)
                            s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c = node.firstChild; c; c = c.nextSibling)
                        s += asXml(c);
                    }
                    return s;
                },
                escape: function(txt) {
                    return txt.replace(/[\\]/g, "\\\\")
                    .replace(/[\"]/g, '\\"')
                    .replace(/[\n]/g, '\\n')
                    .replace(/[\r]/g, '\\r');
                },
                removeWhite: function(e) {
                    e.normalize();
                    for (var n = e.firstChild; n;) {
                        if (n.nodeType == 3) {
                            // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
                                // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            }
                            else
                            n = n.nextSibling;
                        }
                        else if (n.nodeType == 1) {
                            // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        }
                        else
                        // any other node
                        n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9)
            // document node
            xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
            return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        },
        
        /*  This work is licensed under Creative Commons GNU LGPL License.

            License: http://creativecommons.org/licenses/LGPL/2.1/
           Version: 0.9
            Author:  Stefan Goessner/2006
            Web:     http://goessner.net/ 
        */
        json2xml: function(o, tab) {
            var toXml = function(v, name, ind) {
                var xml = "";
                if (v instanceof Array) {
                    for (var i = 0, n = v.length; i < n; i++)
                    xml += ind + toXml(v[i], name, ind + "\t") + "\n";
                }
                else if (typeof(v) == "object") {
                    var hasChild = false;
                    xml += ind + "<" + name;
                    for (var m in v) {
                        if (m.charAt(0) == "@")
                        xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
                        else
                        hasChild = true;
                    }
                    xml += hasChild ? ">": "/>";
                    if (hasChild) {
                        for (var m in v) {
                            if (m == "#text")
                            xml += v[m];
                            else if (m == "#cdata")
                            xml += "<![CDATA[" + v[m] + "]]>";
                            else if (m.charAt(0) != "@")
                            xml += toXml(v[m], m, ind + "\t");
                        }
                        xml += (xml.charAt(xml.length - 1) == "\n" ? ind: "") + "</" + name + ">";
                    }
                }
                else {
                    xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
                }
                return xml;
            },
            xml = "";
            for (var m in o)
            xml += toXml(o[m], m, "");
            return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
        }
    };
})();/**
 * @fileOverview JavaScript base object that all finesse objects should inherit
 * from because it encapsulates and provides the common functionality.
 *
 * Note: This javascript class requires the "inhert.js" to be included
 * (which simplifies the class inheritance).
 *
 *
 * @name finesse.BaseClass
 * @requires finesse.utilities.Logger
 */

/** @namespace */
var finesse = finesse || {};


function callLater(context, fn) {

    return function () {
        if (typeof fn === 'function') {
            fn.apply(context, arguments);
        }
    };
}

/**
 * @fileOverview JavaScript base object that all finesse objects should inherit
 * from because it encapsulates and provides the common functionality.
 *
 * Note: This javascript class requires the "jabberwerx.js" to be included
 * (which simplifies the class inheritance).
 *
 * @name finesse.BaseClass
 */
finesse.FinesseBase = Class.extend({
    init: function () {
    }
});
/**
 * @fileOverview A collection of utility functions.
 *
 * @name Utilities
 * @requires finesse.Converter
 */

/** @namespace */
var finesse = finesse || {};
finesse.utilities = finesse.utilities  || {};

/**
 * @class
 * Contains a collection of utility functions.
 */
finesse.utilities.Utilities = (function () {

    /** @scope finesse.utilities.Utilities */
    return {

        /**
         * Retrieves the specified item from window.localStorage
         * @param {String} key
         *     The key of the item to retrieve
         * @returns {String}
         *     The string with the value of the retrieved item; returns
         *     what the browser would return if not found (typically null or undefined)
         *     Returns false if window.localStorage feature is not even found.
         */
        getDOMStoreItem: function (key) {
            var store = window.localStorage;
            if (store) {
                return store.getItem(key);
            }
        },

        /**
         * Sets an item into window.localStorage
         * @param {String} key
         *     The key for the item to set
         * @param {String} value
         *     The value to set
         * @returns {boolean}
         *     True if successful, false if window.localStorage is
         *     not even found.
         */
        setDOMStoreItem: function (key, value) {
            var store = window.localStorage;
            if (store) {
                store.setItem(key, value);
                return true;
            }
            return false;
        },

        /**
         * Removes a particular item from window.localStorage
         * @param {String} key
         *     The key of the item to remove
         * @returns {boolean}
         *     True if successful, false if not
         *     Returns false if window.localStorage feature is not even found.
         */
        removeDOMStoreItem: function (key) {
            var store = window.localStorage;
            if (store) {
                store.removeItem(key);
                return true;
            }
            return false;
        },

        /**
         * Dumps all the contents of window.localStorage
         * @returns {boolean}
         *     True if successful, false if not.
         *     Returns false if window.localStorage feature is not even found.
         */
        clearDOMStore: function () {
            var store = window.localStorage;
            if (store) {
                store.clear();
                return true;
            }
            return false;
        },

        /**
         * Creates a message listener for window.postMessage messages.
         * @param {Function} callback
         *     The callback that will be invoked with the message. The callback
         *     is responsible for any security checks.
         * @param {String} [origin]
         *     The origin to check against for security. Allows all messages
         *     if no origin is provided.
         * @returns {Function}
         *     The callback function used to register with the message listener.
         *     This is different than the one provided as a parameter because
         *     the function is overloaded with origin checks.
         * @throws {Error} If the callback provided is not a function.
         */
        receiveMessage: function (callback, origin) {
            if (typeof callback !== "function") {
                throw new Error("Callback is not a function.");
            }

            //Create a function closure to perform origin check.
            var cb = function (e) {
				// If an origin check is requested (provided), we'll only invoke the callback if it passes
                if (typeof origin !== "string" || (typeof origin === "string" && typeof e.origin === "string" && e.origin.toLowerCase() === origin.toLowerCase())) {
	                callback(e);
                }
            };

            if (window.addEventListener) { //Firefox, Opera, Chrome, Safari
                window.addEventListener("message", cb, false);
            } else { //Internet Explorer
                window.attachEvent("onmessage", cb);
            }

            //Return callback used to register with listener so that invoker
            //could use it to remove.
            return cb;
        },

        /**
         * Sends a message to a target frame using window.postMessage.
         * @param {Function} message
         *     Message to be sent to target frame.
         * @param {Object} [target="parent"]
         *     An object reference to the target frame. Default us the parent.
         * @param {String} [targetOrigin="*"]
         *     The URL of the frame this frame is sending the message to.
         */
        sendMessage: function (message, target, targetOrigin) {
            //Default to any target URL if none is specified.
            targetOrigin = targetOrigin || "*";

            //Default to parent target if none is specified.
            target = target || parent;

            //Ensure postMessage is supported by browser before invoking.
            if (window.postMessage) {
                target.postMessage(message, targetOrigin);
            }
        },

        /**
         * Returns the passed in handler if it is a function
         * @param {Function} handler
         *     The handler to validate
         * @returns {Function}
         *     The provided handler if it is valid
         * @throws Error
         *     If the handler provided is invalid
         */
        validateHandler: function (handler) {
            if (handler === undefined || typeof handler === "function") {
                return handler;
            } else {
                throw new Error("handler must be a function");
            }
        },

        /**
         * Tries to get extract the AWS error code from a
         * finesse.clientservices.ClientServices parsed error response object.
         * @param {Object} rsp
         *     The handler to validate
         * @returns {String}
         *     The error code, HTTP status code, or undefined
         */
        getErrCode: function (rsp) {
            try { // Best effort to get the error code
                return rsp.object.ApiErrors.ApiError.ErrorType;
            } catch (e) { // Second best effort to get the HTTP Status code
                if (rsp && rsp.status) {
                    return "HTTP " + rsp.status;
                }
            } // Otherwise, don't return anything (undefined)
        },

        /**
         * Tries to get extract the AWS error data from a
         * finesse.clientservices.ClientServices parsed error response object.
         * @param {Object} rsp
         *     The handler to validate
         * @returns {String}
         *     The error data, HTTP status code, or undefined
         */
        getErrData: function (rsp) {
            try { // Best effort to get the error data
                return rsp.object.ApiErrors.ApiError.ErrorData;
            } catch (e) { // Second best effort to get the HTTP Status code
                if (rsp && rsp.status) {
                    return "HTTP " + rsp.status;
                }
            } // Otherwise, don't return anything (undefined)
        },
        
        /**
         * Tries to get extract the AWS overrideable boolean from a
         * finesse.clientservices.ClientServices parsed error response object.
         * @param {Object} rsp
         *     The handler to validate
         * @returns {String}
         *     The overrideable boolean, HTTP status code, or undefined
         */
        getErrOverrideable: function (rsp) {
            try { // Best effort to get the override boolean
                return rsp.object.ApiErrors.ApiError.Overrideable;
            } catch (e) { // Second best effort to get the HTTP Status code
                if (rsp && rsp.status) {
                    return "HTTP " + rsp.status;
                }
            } // Otherwise, don't return anything (undefined)
        },

        /**
         * Trims leading and trailing whitespace
         * @param {String} str
         *     The string to trim
         * @returns {String}
         *     The trimmed string
         */
        trim: function (str) {
            return str.replace(/^\s*/, "").replace(/\s*$/, "");
        },

        /**
         * Utility method for getting the current time
         * @returns {String}
         *     The current time in milliseconds
         */
        currentTimeMillis : function () {
            return (new Date()).getTime();
        },

        /**
         * Generates an RFC1422v4-compliant UUID using pesudorandom numbers.
         * @returns {String}
         *     An RFC1422v4-compliant UUID using pesudorandom numbers.
         **/
        generateUUID: function () {
            return Math.uuidCompact();
        },

        xml2json: finesse.Converter.xml2json,

        json2xml: finesse.Converter.json2xml,

        /**
         * Utility method to convert XML string into javascript object.
         */
        xml2JsObj : function (event) {
            return gadgets.json.parse(finesse.Converter.xml2json(jQuery.parseXML(event), ""));
        },

        /**
         * <p>Encodes the given string into base64.</p>
         *
         * <p><b>NOTE:</b> {input} is assumed to be UTF-8; only the first
         * 8 bits of each {input} element are significant.</p>
         *
         * @param {String} input
         *     The string to convert to base64.
         * @returns {String}
         *     The converted string.
         */
        b64Encode: function (input) {
            var output = "", idx, data,
                table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            for (idx = 0; idx < input.length; idx += 3) {
                data =  input.charCodeAt(idx) << 16 |
                            input.charCodeAt(idx + 1) << 8 |
                            input.charCodeAt(idx + 2);

                //assume the first 12 bits are valid
                output +=   table.charAt((data >>> 18) & 0x003f) +
                            table.charAt((data >>> 12) & 0x003f);
                output +=   ((idx + 1) < input.length) ?
                            table.charAt((data >>> 6) & 0x003f) :
                            "=";
                output +=   ((idx + 2) < input.length) ?
                            table.charAt(data & 0x003f) :
                            "=";
            }

            return output;
        },

        /**
         * <p>Decodes the given base64 string.</p>
         *
         * <p><b>NOTE:</b> output is assumed to be UTF-8; only the first
         * 8 bits of each output element are significant.</p>
         *
         * @param {String} input
         *     The base64 encoded string
         * @returns {String}
         *     Decoded string
         */
        b64Decode: function (input) {
            var output = "", idx, h, data,
                table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

            for (idx = 0; idx < input.length; idx += 4) {
                h = [
                    table.indexOf(input.charAt(idx)),
                    table.indexOf(input.charAt(idx + 1)),
                    table.indexOf(input.charAt(idx + 2)),
                    table.indexOf(input.charAt(idx + 3))
                ];

                data = (h[0] << 18) | (h[1] << 12) | (h[2] << 6) | h[3];
                if (input.charAt(idx + 2) === '=') {
                    data = String.fromCharCode(
                        (data >>> 16) & 0x00ff
                    );
                } else if (input.charAt(idx + 3) === '=') {
                    data = String.fromCharCode(
                        (data >>> 16) & 0x00ff,
                        (data >>> 8) & 0x00ff
                    );
                } else {
                    data = String.fromCharCode(
                        (data >>> 16) & 0x00ff,
                        (data >>> 8) & 0x00ff,
                        data & 0x00ff
                    );
                }
                output += data;
            }

            return output;
        },

        /**
         * Extracts the username and the password from the Base64 encoded string.
         * @params {String}
         *     A base64 encoded string containing credentials that (when decoded)
         *     are colon delimited.
         * @returns {Object}
         *     An object with the following structure:
         *     {id:string, password:string}
         */
        getCredentials: function (authorization) {
            var credObj = {},
                credStr = this.b64Decode(authorization),
                colonIndx = credStr.indexOf(":");

            //Check to ensure that string is colon delimited.
            if (colonIndx === -1) {
                throw new Error("String is not colon delimited.");
            }

            //Extract ID and password.
            credObj.id = credStr.substring(0, colonIndx);
            credObj.password = credStr.substring(colonIndx + 1);
            return credObj;
        },

        /**
         * Takes a string and removes any spaces within the string.
         * @param {String} string
         *     The string to remove spaces from
         * @returns {String}
         *     The string without spaces
         */
        removeSpaces: function (string) {
            return string.split(' ').join('');
        },

        /**
         * Escapes spaces as encoded "&nbsp;" characters so they can
         * be safely rendered by jQuery.text(string) in all browsers.
         *
         * (Although IE behaves as expected, Firefox collapses spaces if this function is not used.)
         *
         * @param text
         *    The string whose spaces should be escaped
         *
         * @returns
         *    The string with spaces escaped
         */
        escapeSpaces: function (string) {
            return string.replace(/\s/g, '\u00a0');
        },

        /**
         * Adds a span styled to line break at word edges around the string passed in.
         * @param str String to be wrapped in word-breaking style.
         * @private
         */
        addWordWrapping : function (str) {
            return '<span style="word-wrap: break-word;">' + str + '</span>';
        },

        /**
         * Takes an Object and determines whether it is an Array or not
         * @param {Object} obj
         *     The Object in question
         * @returns {boolean}
         *     true the object is an Array or false it is not an Array
         */
        isArray: function (obj) {
            return obj.constructor.toString().indexOf("Array") !== -1;
        },

        /**
         * Takes a data object and returns an array extracted
         * @param {Object} data
         *     JSON payload
         *
         * @returns {array}
         *     extracted array
         */
        getArray: function (data) {
            if (this.isArray(data)) {
                //Return if already an array.
                return data;
            } else {
                //Create an array, iterate through object, and push to array. This
                //should only occur with one object, and therefore one obj in array.
                var arr = [];
                arr.push(data);
                return arr;
            }
        },

        /**
         * Extracts the ID for an entity given the Finesse REST URI. The ID is
         * assumed to be the last element in the URI (after the last "/").
         * @param {String} uri
         *     The Finesse REST URI to extract the ID from.
         * @returns {String}
         *     The ID extracted from the REST URI.
         */
        getId: function (uri) {
            if (!uri) {
                return "";
            }
            var strLoc = uri.lastIndexOf("/");
            return uri.slice(strLoc + 1);
        },

        /**
         * Compares two objects
         */
        getEquals: function (objA, objB) {
            var key;

            for (key in objA) {
                if (objA.hasOwnProperty(key)) {
                    if (!objA[key]) {
                        objA[key] = "";
                    }

                    if (typeof objB[key] === 'undefined') {
                        return false;
                    }
                    if (typeof objB[key] === 'object') {
                        if (!objB[key].equals(objA[key])) {
                            return false;
                        }
                    }
                    if (objB[key] !== objA[key]) {
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * Translates between special characters and HTML entities
         *
         * @param text
         *     The text to translate
         *
         * @param shouldEscape
         *    If true, encode special characters as HTML entities; if
         *    false, decode HTML entities back to special characters
         *
         * @private
         */
        translateHTMLEntities: function (text, shouldEscape) {

            var searchIndex, replaceIndex, searchRegex, translationMap;

            translationMap = [
                ["&", "&amp;"],
                ["<", "&lt;"],
                [">", "&gt;"]
            ];

            if (shouldEscape) {
                searchIndex = 0;
                replaceIndex = 1;
            } else {
                searchIndex = 1;
                replaceIndex = 0;
            }

            jQuery.each(translationMap, function (i, mappingPair) {
                searchRegex = new RegExp(mappingPair[searchIndex], 'gi');
                text = text.replace(searchRegex, mappingPair[replaceIndex]);
            });

            return text;
        },

        /**
         * Utility method to pad the number with a leading 0 for single digits
         * @parm (Number) num
         *     the number to pad
         */
        pad : function (num) {
            if (num < 10) {
                return "0" + num;
            }

            return String(num);
        },

        /**
         * Utility method to render a timestamp value (in seconds) into HH:MM:SS format
         * @parm (Number) time
         *     the timestamp in ms to render
         */
        getDisplayTime : function (time) {
            var hour, min, sec, timeStr = "00:00:00";

            if (time && time !== "-1") {
                // calculate hours, minutes, and seconds
                hour = finesse.utilities.Utilities.pad(Math.floor(time / 3600));
                min = finesse.utilities.Utilities.pad(Math.floor((time % 3600) / 60));
                sec = finesse.utilities.Utilities.pad(Math.floor((time % 3600) % 60));
                // construct HH:MM:SS time string
                timeStr = hour + ":" + min + ":" + sec;
            }

            return timeStr;
        },     
        
        /**
         * Utility method to render a timestamp string (of format
         * YYYY-MM-DDTHH:MM:SSZ) into a duration of HH:MM:SS format
         * 
         * @param (String)
         *            timestamp the timestamp to render
         * @param (Date)
         *            now optional argument to provide the time from which to
         *            calculate the duration instead of using the current time
         */
        convertTsToDuration : function (timestamp, now) {
            return finesse.utilities.Utilities.convertTsToDurationWithFormat(timestamp,false,now); 
        },
        
        /**
         * Utility method to render a timestamp string (of format
         * YYYY-MM-DDTHH:MM:SSZ) into a duration of HH:MM:SS format
         * 
         * @param (String)
         *            timestamp the timestamp to render
         * @param (Date)
         *            now optional argument to provide the time from which to
         *            calculate the duration instead of using the current time
         * @param (boolean)
         *            If True, if duration is null or negative, return -1 so that the duration can be formated
         *            as needed in the Gadget. 
         */
        convertTsToDurationWithFormat : function (timestamp, forFormat,now) {
            var startTimeInMs, nowInMs, durationInSec = "-1";
            
            // Calculate duration
            if (timestamp && typeof timestamp === "string") {
                // first check it '--' for a msg in grid
                if (timestamp === '--' || timestamp ==="" || timestamp === "-1") {
                    return "-1";
                }
                // else try convert string into a time
                startTimeInMs = Date.parse(timestamp);
                if (!isNaN(startTimeInMs)) {
                    if (!now || !(now instanceof Date)) {
                        nowInMs = new Date().getTime();
                    } else {
                        nowInMs = now.getTime();
                    }
                    durationInSec = Math.floor((nowInMs - startTimeInMs) / 1000);
                    
                    if (durationInSec < 0) {
                        if (forFormat) {
                            return "-1";
                        } else {
                            return finesse.utilities.Utilities.getDisplayTime("-1");
                        }
                    }
                }
            }else {
                if(forFormat){
                    return "-1";
                }
            }
            return finesse.utilities.Utilities.getDisplayTime(durationInSec);
         },
        /**
         * Adds a new cookie to the page with a default domain.
         * @param {String} key
         *      the key to assign a value to
         * @param {String} value
         *      the value to assign to the key
         * @param {Number} days
         *      number of days (from current) until the cookie should expire
         */
        addCookie : function (key, value, days) {
            var date, expires = "",
                cookie = key + "=" + escape(value);
            if (typeof days === "number") {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
                cookie += "; expires=" + date.toGMTString();
            }
            document.cookie = cookie + "; path=/";
        },

        /**
         * Get the value of a cookie given a key.
         * @param {String} key
         *      a key to lookup
         * @returns {String}
         *      the value mapped to a key, null if key doesn't exist
         */
        getCookie : function (key) {
            var i, pairs, pair;
            if (document.cookie) {
                pairs = document.cookie.split(";");
                for (i = 0; i < pairs.length; i += 1) {
                    pair = this.trim(pairs[i]).split("=");
                    if (pair[0] === key) {
                        return pair[1];
                    }
                }
            }
            return null;
        },

        /**
         * Deletes the cookie mapped to specified key.
         * @param {String} key
         *      the key to delete
         */
        deleteCookie : function (key) {
            this.addCookie(key, "", -1);
        },

        /**
         * Case insensitive sort for use with arrays or Dojox stores
         * @param {String} a
         *      first value
         * @param {String} b
         *      second value
         */
        caseInsensitiveSort: function (a, b) {
            var ret = 0, emptyString = "";
            a = a + emptyString;
            b = b + emptyString;
            a = a.toLowerCase();
            b = b.toLowerCase();
            if (a > b) {
                ret = 1;
            }
            if (a < b) { 
                ret = -1;
            }
            return ret;
        },

        /**
        * Calls the specified function to render the dojo wijit for a gadget  when the gadget first becomes visible.
        *
        * The displayWjitFunc function will be called once and only once when the div for our wijit 
        * becomes visible for the first time.  This is necessary because some dojo wijits such as the grid
        * throw exceptions and do not render properly if they are created in a display:none div.
        * If our gadget is visisble the function will be called immediately.
        * If our gadget is not yet visisble, then it sets a timer and waits for it to become visible.
        * NOTE:  The timer may seem inefficent, originally I tried connecting to the tab onclick handler, but
        * there is a problem with dojo.connnect to an iframe's parent node in Internet Explorer. 
        * In Firefox the click handler works OK, but it happens before the node is actually visisble, so you
        * end up waiting for the node to become visisble anyway.
        * @displayWjitFunc:  A function to be called once our gadget has become visisble for th first time.
        */  
        onGadgetFirstVisible: function (displayWjitFunc) {
            var i, q, frameId, gadgetNbr, gadgetTitleId, panelId, panelNode, link, iterval, once = false, active = false, tabId = "#finesse-tab-selector";
            try {
                frameId = dojo.attr(window.frameElement, "id"); // Figure out what gadget number we are by looking at our frameset
                gadgetNbr = frameId.match(/\d+$/)[0];  // Strip the number off the end of the frame Id, that's our gadget number
                gadgetTitleId = "#finesse_gadget_" + gadgetNbr + "_title";  // Create a a gadget title id from the number
                
                // Loop through all of the tab panels to find one that has our gadget id
                dojo.query('.tab-panel', window.parent.document).some(function (node, index, arr) {
                    q = dojo.query(gadgetTitleId, node);  // Look in this panel for our gadget id
                    if (q.length > 0) {  // You found it
                        panelNode = node;
                        panelId = dojo.attr(panelNode, "id");  // Get panel id  e.g. panel_Workgroups
                        active = dojo.hasClass(panelNode, "active");
                        tabId = "#tab_" + panelId.slice(6);  // Turn it into a tab id e.g.tab_Workgroups
                        return;
                    }
                });
                // If panel is already active - execute the function - we're done
                if (active) {
                    console.log(frameId + " is visible display it");
                    setTimeout(displayWjitFunc);
                } 
                // If its not visible - wait for the active class to show up.
                else {
                    console.log(frameId  + " (" + tabId + ") is NOT active wait for it");
                    iterval = setInterval(dojo.hitch(this, function () {
                        if (dojo.hasClass(panelNode, "active")) {
                            console.log(frameId  + " (" + tabId + ") is visible display it");
                            clearInterval(iterval);
                            setTimeout(displayWjitFunc);
                        } 
                    }), 250);
                }
            } catch (err) {
                console.log("Could not figure out what tab " + frameId + " is in: " + err);
            }
        },

        /**
         * Downloads the specified url using a hidden iframe. In order to cause the browser to download rather than render
         * in the hidden iframe, the server code must append the header "Content-Disposition" with a value of 
         * "attachment; filename=\"<WhateverFileNameYouWant>\"".
         */
        downloadFile : function (url) {
            var iframe = document.getElementById("download_iframe");

            if (!iframe)
            {
                iframe = document.createElement("iframe");
                $(document.body).append(iframe);
                $(iframe).css("display", "none");
            }

            iframe.src = url;
        },

        /**
         * bitMask has functions for testing whether bit flags specified by integers are set in the supplied value
         */
        bitMask: {
            isSet: function (value, int) {
                return (value & int) === int;
            },
            /**
             * Returns true if all flags in the intArray are set on the specified value
             */
            all: function (value, intArray) {
                var i = intArray.length;
                if (typeof(i) === "undefined")
                {
                    intArray = [intArray];
                    i = 1;
                }
                while ((i = i - 1) !== -1)
                {
                    if (!finesse.utilities.Utilities.bitMask.isSet(value, intArray[i]))
                    {
                        return false;
                    }
                }
                return true;
            },
            /**
             * Returns true if any flags in the intArray are set on the specified value
             */
            any: function (value, intArray) {
                var i = intArray.length;
                if (typeof(i) === "undefined")
                {
                    intArray = [intArray];
                    i = 1;
                }
                while ((i = i - 1) !== -1)
                {
                    if (finesse.utilities.Utilities.bitMask.isSet(value, intArray[i]))
                    {
                        return true;
                    }
                }
                return false;
            }
        },

        renderDojoGridOffScreen: function (grid) {
            var offscreenDiv = $("<div style='position: absolute; left: -5001px; width: 5000px;'></div>")[0];
            $(document.body).append(offscreenDiv);
            grid.placeAt(offscreenDiv);
            grid.startup();
            document.body.removeChild(offscreenDiv);
            return grid;
        },

        initializeSearchInput: function(searchInput, changeCallback, callbackDelay, callbackScope, placeholderText) {
            var timerId = null,
                theControl = typeof(searchInput) === "string" ? $("#" + searchInput) : $(searchInput),
                theInputControl = theControl.find("input"),
                theClearButton = theControl.find("a"),
                inputControlWidthWithClear = 204,
                inputControlWidthNoClear = 230,
                sPreviousInput = theInputControl.val(),
                toggleClearButton = function(){
                    if (theInputControl.val() === "") {
                        theClearButton.hide();
                        theControl.removeClass("input-append");
                        theInputControl.width(inputControlWidthNoClear);
                    } else {
                        theInputControl.width(inputControlWidthWithClear);
                        theClearButton.show();
                        theControl.addClass("input-append");
                    }
                };

            // set placeholder text
            theInputControl.attr('placeholder', placeholderText);

            theInputControl.unbind('keyup').bind('keyup', function() {
                if (sPreviousInput !== theInputControl.val()) {
                    window.clearTimeout(timerId);
                    sPreviousInput = theInputControl.val();
                    timerId = window.setTimeout(function() {
                        changeCallback.call((callbackScope || window), theInputControl.val());
                        theInputControl[0].focus();
                    }, callbackDelay);
                }

                toggleClearButton();
            });

            theClearButton.bind('click', function() {
                theInputControl.val('');
                changeCallback.call((callbackScope || window), '');

                toggleClearButton();
                theInputControl[0].focus(); // jquery and dojo on the same page break jquery's focus() method
            });

            theInputControl.val("");
            toggleClearButton();
        }

    };

}());
/**
 * @fileOverview Provides standard way resolve message keys with substitution
 *
 * @name finesse.utilities.I18n
 * @requires finesse.container.I18n or gadgets.Prefs
 */

/** @namespace */
var finesse = finesse || {};
finesse.utilities = finesse.utilities || {};

finesse.utilities.I18n = (function () {

    /**
     * Shortcut to finesse.container.I18n.getMsg or gadgets.Prefs.getMsg
     * @private
     */
    var _getMsg;

    return {
        /**
         * Provides a message resolver for this utility singleton.
	     * @param {Function} getMsg
	     *     A function that returns a string given a message key.
	     *     If the key is not found, this function must return 
	     *     something that tests false (i.e. undefined or "").
         */
        setGetter : function (getMsg) {
            _getMsg = getMsg;
        },

        /**
         * Resolves the given message key, also performing substitution.
         * This generic utility will use a custom function to resolve the key
         * provided by finesse.utilities.I18n.setGetter. Otherwise, it will 
         * discover either finesse.container.I18n.getMsg or gadgets.Prefs.getMsg
         * upon the first invocation and store that reference for efficiency.
         * 
         * Since this will construct a new gadgets.Prefs object, it is recommended
         * for gadgets to explicitly provide the setter to prevent duplicate
         * gadgets.Prefs objects. This does not apply if your gadget does not need
         * access to gadgets.Prefs other than getMsg. 
         * 
		 * @param {String} key
		 *     The key to lookup
		 * @param {String} arguments
		 *     Arguments for substitution
		 * @returns {String/Function}
		 *     The resolved string if successful, otherwise a function that returns
		 *     a '???' string that can also be casted into a string.
         */
        getString : function (key) {
			var prefs, i, retStr, noMsg, getFailed = "";
			if (!_getMsg) {
				if (finesse.container && finesse.container.I18n) {
					_getMsg = finesse.container.I18n.getMsg;
				} else if (gadgets) {
					prefs = new gadgets.Prefs();
					_getMsg = prefs.getMsg;
				}
			}
			
			try {
				retStr = _getMsg(key);
			} catch (e) {
				getFailed = "finesse.utilities.I18n.getString(): invalid _getMsg";
			}
			
			if (retStr) { // Lookup was successful, perform substituion (if any)
				for (i = 1; i < arguments.length; i += 1) {
					retStr = retStr.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
				}
				return retStr;
			}
			// We want a function because jQuery.html() and jQuery.text() is smart enough to invoke it.
			noMsg = function () {
				return "???" + key + "???" + getFailed;
			};
			// We overload the toString() of this "function" to allow JavaScript to cast it into a string
			// For example, var myMsg = "something " + finesse.utilities.I18n.getMsg("unresolvable.key");
			noMsg.toString = function () {
				return "???" + key + "???" + getFailed;
			};
			return noMsg;

        }
    };
}());/**
 * Logging.js: provides simple logging for clients to use and overrides synchronous native methods: alert(), confirm(), and prompt().
 * 
 * On Firefox, it will hook into console for logging.  On IE, it will log to the status bar. 
 */

var finesse = finesse || {};
finesse.utilities = finesse.utilities || {};

finesse.utilities.Logger = finesse.utilities.Logger || (function () {
    
    var
    
    debugOn,
    
    padTwoDigits = function (num) {        
        return (num < 10) ? '0' + num : num;  
    },
    
    /**
     * Checks to see if we have a console - this allows us to support Firefox or IE.
     * @returns {Boolean} True for Firefox, False for IE
     */
    hasConsole = function () {
        var retval = false;
        try
        {
            if (window.console !== undefined) 
            {
                retval = true;
            }
        } 
        catch (err)
        {
            retval = false;
        }
          
        return retval;
    },
    
    /**
     * Gets a timestamp.
     * @returns {String} is a timestamp in the following format: HH:MM:SS
     */
    getTimeStamp = function () {
        var date = new Date(), timeStr;
        timeStr = padTwoDigits(date.getHours()) + ":" + padTwoDigits(date.getMinutes()) + ":" + padTwoDigits(date.getSeconds());

        return timeStr;
    };
    
    return {
        /**
         * Enable debug mode. Debug mode may impact performance on the UI.
         *
         * @param {Boolean} enable
         *      True to enable debug logging.
         */
        setDebug : function (enable) {
            debugOn = enable;
        },
        
        /**
         * Logs a string as DEBUG.
         * 
         * @param str is the string to log. 
         */
        log : function (str) {
            var timeStr = getTimeStamp();
            
            if (debugOn) {
                if (hasConsole())
                {
                    console.log(timeStr + ": " + "DEBUG" + " - " + str);
                }
            }
        },
        
        /**
         * Logs a string as INFO.
         * 
         * @param str is the string to log. 
         */
        info : function (str) {
            var timeStr = getTimeStamp();
            
            if (hasConsole())
            {
                console.info(timeStr + ": " + "INFO" + " - " + str);
            }
        },
        
        /**
         * Logs a string as WARN.
         * 
         * @param str is the string to log. 
         */
        warn : function (str) {
            var timeStr = getTimeStamp();
            
            if (hasConsole())
            {
                console.warn(timeStr + ": " + "WARN" + " - " + str);
            }
        },
        /**
         * Logs a string as ERROR.
         * 
         * @param str is the string to log. 
         */
        error : function (str) {
            var timeStr = getTimeStamp();
            
            if (hasConsole())
            {
                console.error(timeStr + ": " + "ERROR" + " - " + str);
            }
        }
    };
}());
/**
 * @fileOverview Allows gadgets to call the log function to publish client logging messages over the hub.
 *
 * @name finesse.cslogger.ClientLogger
 * @requires OpenAjax
 */

var finesse = finesse || {};
finesse.cslogger = finesse.cslogger || {};

/**
 * @class
 * Allows gadgets to call the log function to publish client logging messages over the hub.
 */
finesse.cslogger.ClientLogger = (function () {
    var _hub, _logTopic, _originId,

    /**
     * Pads a single digit number for display purposes (e.g. '4' shows as '04')
     * @param num is the number to pad to 2 digits
     * @returns a two digit padded string
     */
    padTwoDigits = function (num)
    {
        return (num < 10) ? '0' + num : num;
    },

     /**
      * Gets a timestamp.
      * @returns {String} is a timestamp in the following format: HH:MM:SS
      */
    getTimestamp = function ()
    {
        var date = new Date(), timeStr;
        timeStr = padTwoDigits(date.getHours()) + ":" + padTwoDigits(date.getMinutes()) + ":" + padTwoDigits(date.getSeconds());

        return timeStr;
    },

    /**
     * Checks to see if we have a console.
     * @returns Whether the console object exists.
     */
    hasConsole = function () {
        try {
            if (window.console !== undefined) {
                return true;
            }
        } catch (err) {
          // ignore and return false
        }

        return false;
    },

    /**
    * Logs a message to a hidden textarea element on the page
    *
    * @param str is the string to log.
    * @param logType is the optional type which is prefixed (default is "LOG")
    * @private
    */
    writeToLogOutput = function (msg) {
        var logOutput = document.getElementById("finesseLogOutput");

        if (logOutput === null)
        {
            logOutput = document.createElement("textarea");
            logOutput.id = "finesseLogOutput";
            logOutput.style.display = "none";
            document.body.appendChild(logOutput);
        }

        if (logOutput.value === "")
        {
            logOutput.value = msg;
        }
        else
        {
            logOutput.value = logOutput.value + "\n" + msg;
        }
    },

    logToConsole = function (str)
    {
        var msg, timeStr = getTimestamp();
        msg = timeStr + ": " + str;

        // Log to console
        if (hasConsole()) {
            console.log(msg);
        }

        //Uncomment to print logs to hidden textarea.
        //writeToLogOutput(msg);

        return msg;
    };

    return {

        /**
         * Publishes a Log Message over the hub.
         *
         * @param {String} message
         *     The string to log.
         */
        log : function (message) {
            if(_hub) {
                _hub.publish(_logTopic, logToConsole(_originId + message));
            }
        },

        /**
         * Initiates the client logger with a hub and a gadgetId
         * @param {Object} hub
         *      the hub to communicate with
         * @param {Object} gadgetId
         *      a unique string to identify which gadget is doing the logging
         */
        init: function (hub, gadgetId) {
            _hub = hub;
            _logTopic = "finesse.clientLogging." + gadgetId;
            _originId = gadgetId + " : ";
        }
    };
}());
/**
 * @fileOverview Allows each gadget to communicate with the server to send logs.
 * @name finesse.cslogger.FinesseLogger
 */

var finesse = finesse || {};
finesse.cslogger = finesse.cslogger || {};

/**
 * @class
 * Allows each product to initialize its method of storage
 */
finesse.cslogger.FinesseLogger = finesse.cslogger.FinesseLogger || (function () {

    var

    /**
     * Array use to collect ongoing logs in memory
     * @private
     */
    _logArray = [],

    /**
     * The final data string sent to the server, =_logArray.join
     * @private
     */
    _logStr = "",

    /**
     * Keep track of size of log
     * @private
     */
    _logSize = 0,

    /**
     * Flag to keep track show/hide of send log link
     */
    _sendLogShown = false,

    /**
     * Collect logs when onCollect called
     * @private
     */
    _collectMethod = function(data) {
      //Size of log should not exceed 1.5MB
      var info, maxLength = 1572864;
      
      //add size buffer equal to the size of info to be added when publish
	  info = navigator.userAgent + "&#10;";
	  info = escape(info);

        //If log was empty previously, fade in buttons
        if (!_sendLogShown) {
            //call the fadeInSendLog() in Footer
            finesse.modules.Footer.sendLogAppear();
            _sendLogShown = true;
            _logSize = info.length;
        }
		
		
		//escape all data to get accurate size (shindig will escape when it builds request)
		//escape 6 special chars for XML: &<>"'\n
		data = data.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/\n/g, "&#10;");
		data = escape(data+"\n");

        if (data.length < maxLength){
			//make room for new data if log is exceeding max length
            while (_logSize + data.length > maxLength) {
                _logSize -= (_logArray.shift()).length;
            }
        }

        //Else push the log into memory, increment the log size
        _logArray.push(data);

        //inc the size accordingly
        _logSize+=data.length;

    };

    return {

        /**
         * Initiate FinesseLogger.
         *
         * @param {String} id
         *  id of the agent
         * @param {Object} userObj
         *  the parent object, used for constructing the restRequest URL
         */

        init: function () {
            finesse.clientservices.ClientServices.subscribe("finesse.clientLogging.*", _collectMethod);
        },

        /**
        * Publish logs to server and clear the memory
        */
        publish: function(userObj, options, callBack) {
            // Avoid null references.
            options = options || {};
            callBack = callBack || {};

            if (callBack.sending === "function") {
                callBack.sending();
            }

            //logs the basic version and machine info and escaped new line
            _logStr = navigator.userAgent + "&#10;";
            
            //join the logs to correct string format
            _logStr += unescape(_logArray.join(""));

            //turning log string to JSON obj
            var logObj = {
                    ClientLog: {
                    logData : _logStr //_logStr
                }
            },
            //
            tmpOnAdd = (options.onAdd && typeof options.onAdd === "function")? options.onAdd : function(){};
            options.onAdd = function(){
                tmpOnAdd();
                _logArray.length = 0; _logSize =0;
                _sendLogShown = false;
                };
            //adding onLoad to the callbacks, this is the subscribe success case for the first time user subscribe to the client log node
            options.onLoad = function (clientLogObj) {
                clientLogObj.sendLogs(logObj,{
                        error: callBack.error
                    });
                };

            userObj.getClientLog(options);
        }
    };

}());
/**
 * @fileOverview Initiated by the Master to create a shared BOSH connection.
 *
 * @name MasterTunnel
 * @requires Utilities
 */

/** @namespace */
var finesse = finesse || {};
finesse.clientservices = finesse.clientservices  || {};

/**
 * @class
 * Establishes a shared event connection by creating a communication tunnel
 * with the notification server and consume events which could be published.
 * Public functions are exposed to register to the connection status information
 * and events.
 * @constructor
 * @param {String} host
 *     The host name/ip of the Finesse server.
 * @throws {Error} If required constructor parameter is missing.
 */
finesse.clientservices.MasterTunnel = function (host, scheme) {
    if (typeof host !== "string" || host.length === 0) {
        throw new Error("Required host parameter missing.");
    }

    var

    /**
     * Flag to indicate whether the tunnel frame is loaded.
     * @private
     */
    _isTunnelLoaded = false,

    /**
     * Short reference to the Finesse utility.
     * @private
     */
    _util = finesse.utilities.Utilities,

    /**
     * The URL with host and port to the Finesse server.
     * @private
     */
    _tunnelOrigin,

    /**
     * Location of the tunnel HTML URL.
     * @private
     */
    _tunnelURL,
    
    /**
     * The port on which to connect to the Finesse server to load the eventing resources.
     * @private
     */
    _tunnelOriginPort,
    
    /**
     * Flag to indicate whether we have processed the tunnel config yet.
     * @private
     */
    _isTunnelConfigInit = false,

    /**
     * The tunnel frame window object.
     * @private
     */
    _tunnelFrame,

    /**
     * The handler registered with the object to be invoked when an event is
     * delivered by the notification server.
     * @private
     */
    _eventHandler,
    
    /**
     * The handler registered with the object to be invoked when presence is
     * delivered by the notification server.
     * @private
     */
    _presenceHandler,

    /**
     * The handler registered with the object to be invoked when the BOSH
     * connection has changed states. The object will contain the "status"
     * property and a "resourceID" property only if "status" is "connected".
     * @private
     */
    _connInfoHandler,

    /**
     * The last connection status published by the JabberWerx library.
     * @private
     */
    _statusCache,

    /**
     * The last event sent by notification server.
     * @private
     */
    _eventCache,

    /**
     * The ID of the user logged into notification server.
     * @private
     */
    _id,

    /**
     * The domain of the XMPP server, representing the portion of the JID
     * following '@': userid@domain.com
     * @private
     */
	_xmppDomain,

    /**
     * The password of the user logged into notification server.
     * @private
     */
    _password,

    /**
     * The jid of the pubsub service on the XMPP server
     * @private
     */
    _pubsubDomain,

    /**
     * The resource ID identifying the client device.
     * @private
     */
    _resourceID,

    /**
     * The different types of messages that could be sent to the parent frame.
     * The types here should be understood by the parent frame and used to
     * identify how the message is formatted.
     * @private
     */
    _TYPES = {
        EVENT: 0,
        ID: 1,
        PASSWORD: 2,
        RESOURCEID: 3,
        STATUS: 4,
		XMPPDOMAIN: 5,
		PUBSUBDOMAIN: 6,
		SUBSCRIBE: 7,
		UNSUBSCRIBE: 8,
		PRESENCE: 9,
		CONNECT_REQ: 10
    },

	_handlers = {
		subscribe: {},
		unsubscribe: {}
	},
	

    /**
     * Create a connection info object.
     * @returns {Object}
     *     A connection info object containing a "status" and "resourceID".
     * @private
     */
    _createConnInfoObj = function () {
        return {
            status: _statusCache,
            resourceID: _resourceID
        };
    },

    /**
     * Utility function which sends a message to the dynamic tunnel frame
     * event frame formatted as follows: "type|message".
     * @param {Number} type
     *     The category type of the message.
     * @param {String} message
     *     The message to be sent to the tunnel frame.
     * @private
     */
    _sendMessage = function (type, message) {
        message = type + "|" + message;
        _util.sendMessage(message, _tunnelFrame, _tunnelOrigin);
    },

    /**
     * Utility to process the response of a subscribe request from
     * the tunnel frame, then invoking the stored callback handler
     * with the respective data (error, when applicable)
     * @param {String} data
     *     The response in the format of "node[|error]"
     * @private
     */
	_processSubscribeResponse = function (data) {
		var dataArray = data.split("|"),
		node = dataArray[0],
		err;
		
		//Error is optionally the second item in the array
		if (dataArray.length) {
			err = dataArray[1];
		}
		
		// These response handlers are short lived and should be removed and cleaned up immediately after invocation.
		if (_handlers.subscribe[node]) {
			_handlers.subscribe[node](err);
			delete _handlers.subscribe[node];
		}
	},

    /**
     * Utility to process the response of an unsubscribe request from
     * the tunnel frame, then invoking the stored callback handler
     * with the respective data (error, when applicable)
     * @param {String} data
     *     The response in the format of "node[|error]"
     * @private
     */
	_processUnsubscribeResponse = function (data) {
		var dataArray = data.split("|"),
		node = dataArray[0],
		err;
		
		//Error is optionally the second item in the array
		if (dataArray.length) {
			err = dataArray[1];
		}
		
		// These response handlers are short lived and should be removed and cleaned up immediately after invocation.
		if (_handlers.unsubscribe[node]) {
			_handlers.unsubscribe[node](err);
			delete _handlers.unsubscribe[node];
		}
	},

    /**
     * Handler for messages delivered by window.postMessage. Listens for events
     * published by the notification server, connection status published by
     * the JabberWerx library, and the resource ID created when the BOSH
     * connection has been established.
     * @param {Object} e
     *     The message object as provided by the window.postMessage feature.
     * @private
     */
    _messageHandler = function (e) {
        var

        //Extract the message type and message data. The expected format is
        //"type|data" where type is a number represented by the TYPES object.
        delimPos = e.data.indexOf("|"),
        type = Number(e.data.substr(0, delimPos)),
        data =  e.data.substr(delimPos + 1);
        
        //Accepts messages and invoke the correct registered handlers.
        switch (type) {
        case _TYPES.EVENT:
            _eventCache = data;
            if (typeof _eventHandler === "function") {
                _eventHandler(data);
            }
            break;
        case _TYPES.STATUS:
            _statusCache = data;

            //A "loaded" status means that the frame is ready to accept
            //credentials for establishing a BOSH connection.
            if (data === "loaded") {
                _isTunnelLoaded = true;
                _sendMessage(_TYPES.ID, _id);
                _sendMessage(_TYPES.XMPPDOMAIN, _xmppDomain);
                _sendMessage(_TYPES.PASSWORD, _password);
                _sendMessage(_TYPES.PUBSUBDOMAIN, _pubsubDomain);
            } else if (typeof _connInfoHandler === "function") {
                _connInfoHandler(_createConnInfoObj());
            }
            break;
        case _TYPES.RESOURCEID:
            _resourceID = data;
            break;
        case _TYPES.SUBSCRIBE:
            _processSubscribeResponse(data);
            break;
        case _TYPES.UNSUBSCRIBE:
            _processUnsubscribeResponse(data);
            break;
        case _TYPES.PRESENCE:
            if (typeof _presenceHandler === "function") {
                _presenceHandler(data);
            }
            break;
        default:
            break;
        }
    },

    /**
     * Initialize the tunnel config so that the url can be http or https with the appropriate port
     * @private
     */
    _initTunnelConfig = function () {
        if (_isTunnelConfigInit === true) {
            return;
        }
        
        //Initialize tunnel origin
        //Determine tunnel origin based on host and scheme
        _tunnelOriginPort = (scheme && scheme.indexOf("https") !== -1) ? "7443" : "7071";
        if (scheme) {
            _tunnelOrigin = scheme + "://" + host + ":" + _tunnelOriginPort;
        } else {
            _tunnelOrigin = "http://" + host + ":" + _tunnelOriginPort;
        }
        _tunnelURL = _tunnelOrigin + "/tunnel/";
        
        _isTunnelConfigInit = true;
    },

    /**
     * Create the tunnel iframe which establishes the shared BOSH connection.
     * Messages are sent across frames using window.postMessage.
     * @private
     */
    _createTunnel = function () {
        var tunnelID = "tunnel-frame",
        iframe = document.createElement("iframe");         
        iframe.style.display = "none";
        iframe.setAttribute("id", tunnelID);
        iframe.setAttribute("name", tunnelID);
        iframe.setAttribute("src", _tunnelURL);
        document.body.appendChild(iframe);
        _tunnelFrame = window.frames[tunnelID];
    };

    /**
     * Sends a message via postmessage to the EventTunnel to attempt to connect to the XMPP server
     * @private
     */
    this.makeConnectReq = function (id, password, xmppDomain) {
        var data = {}, dataXml;
        data.connInfo = {
            id: id,
            password: password,
            xmppDomain: xmppDomain
        };
        
        dataXml = _util.json2xml(data);
        _sendMessage(_TYPES.CONNECT_REQ, dataXml);
    };
    
    /**
     * Returns the host of the Finesse server.
     * @returns {String}
     *     The host specified during the creation of the object.
     */
    this.getHost = function () {
        return host;
    };

    /**
     * The resource ID of the user who is logged into the notification server.
     * @returns {String}
     *     The resource ID generated by the notification server.
     */
    this.getResourceID = function () {
        return _resourceID;
    };

    /**
     * Indicates whether the tunnel frame is loaded.
     * @returns {Boolean}
     *     True if the tunnel frame is loaded, false otherwise.
     */
    this.isTunnelLoaded = function () {
        return _isTunnelLoaded;
    };

    /**
     * The location of the tunnel HTML URL.
     * @returns {String}
     *     The location of the tunnel HTML URL.
     */
    this.getTunnelURL = function () {
        return _tunnelURL;
    };

    /**
     * Tunnels a subscribe request to the eventing iframe.
     * @param {String} node
     *     The node to subscribe to
     * @param {Function} handler
     *     Handler to invoke upon success or failure
     */
	this.subscribe = function (node, handler) {
		if (handler && typeof handler !== "function") {
            throw new Error("Parameter is not a function.");
        }
		_handlers.subscribe[node] = handler;
		_sendMessage(_TYPES.SUBSCRIBE, node);
	};

    /**
     * Tunnels an unsubscribe request to the eventing iframe.
     * @param {String} node
     *     The node to unsubscribe from
     * @param {Function} handler
     *     Handler to invoke upon success or failure
     */
	this.unsubscribe = function (node, handler) {
		if (handler && typeof handler !== "function") {
            throw new Error("Parameter is not a function.");
        }
		_handlers.unsubscribe[node] = handler;
		_sendMessage(_TYPES.UNSUBSCRIBE, node);
	};

    /**
     * Registers a handler to be invoked when an event is delivered. Only one
     * is registered at a time. If there has already been an event that was
     * delivered, the handler will be invoked immediately.
     * @param {Function} handler
     *     Invoked when an event is delivered through the event connection.
     */
    this.registerEventHandler = function (handler) {
        if (typeof handler !== "function") {
            throw new Error("Parameter is not a function.");
        }
        _eventHandler = handler;
        if (_eventCache) {
            handler(_eventCache);
        }
    };

    /**
     * Unregisters the event handler completely.
     */
    this.unregisterEventHandler = function () {
        _eventHandler = undefined;
    };
    
    /**
     * Registers a handler to be invoked when a presence event is delivered. Only one
     * is registered at a time. 
     * @param {Function} handler
     *     Invoked when a presence event is delivered through the event connection.
     */
    this.registerPresenceHandler = function (handler) {
        if (typeof handler !== "function") {
            throw new Error("Parameter is not a function.");
        }
        _presenceHandler = handler;
    };
    
    /**
     * Unregisters the presence event handler completely.
     */
    this.unregisterPresenceHandler = function () {
        _presenceHandler = undefined;
    };

    /**
     * Registers a handler to be invoked when a connection status changes. The
     * object passed will contain a "status" property, and a "resourceID"
     * property, which will contain the most current resource ID assigned to
     * the client. If there has already been an event that was delivered, the
     * handler will be invoked immediately.
     * @param {Function} handler
     *     Invoked when a connection status changes.
     */
    this.registerConnectionInfoHandler = function (handler) {
        if (typeof handler !== "function") {
            throw new Error("Parameter is not a function.");
        }
        _connInfoHandler = handler;
        if (_statusCache) {
            handler(_createConnInfoObj());
        }
    };

    /**
     * Unregisters the connection information handler.
     */
    this.unregisterConnectionInfoHandler = function () {
        _connInfoHandler = undefined;
    };

    /**
     * Start listening for events and create a event tunnel for the shared BOSH
     * connection.
     * @param {String} id
     *     The ID of the user for the notification server.
     * @param {String} password
     *     The password of the user for the notification server.
     * @param {String} xmppDomain
     *     The XMPP domain of the notification server
     * @param {String} pubsubDomain
     *     The location (JID) of the XEP-0060 PubSub service
     */
    this.init = function (id, password, xmppDomain, pubsubDomain) {
        
        if (typeof id !== "string" || typeof password !== "string" || typeof xmppDomain !== "string" || typeof pubsubDomain !== "string") {
            throw new Error("Invalid or missing required parameters.");
        }

        _initTunnelConfig();
        
        _id = id;
        _password = password;
        _xmppDomain = xmppDomain;
        _pubsubDomain = pubsubDomain;

        //Attach a listener for messages sent from tunnel frame.
        _util.receiveMessage(_messageHandler, _tunnelOrigin);

        //Create the tunnel iframe which will establish the shared connection.
        _createTunnel();
    };

    //BEGIN TEST CODE//
    /**
     * Test code added to expose private functions that are used by unit test
     * framework. This section of code is removed during the build process
     * before packaging production code. The [begin|end]TestSection are used
     * by the build to identify the section to strip.
     * @ignore
     */
    this.beginTestSection = 0;

    /**
     * @ignore
     */
    this.getTestObject = function () {
        //Load mock dependencies.
        var _mock = new MockControl();
        _util = _mock.createMock(finesse.utilities.Utilities);

        return {
            //Expose mock dependencies
            mock: _mock,
            util: _util,

            //Expose internal private functions
            types: _TYPES,
            createConnInfoObj: _createConnInfoObj,
            sendMessage: _sendMessage,
            messageHandler: _messageHandler,
            createTunnel: _createTunnel,
			handlers: _handlers,
			initTunnelConfig : _initTunnelConfig
        };
    };

    /**
     * @ignore
     */
    this.endTestSection = 0;
    //END TEST CODE//
};/**
 * @fileOverview Registers with the MasterTunnel to receive events, which it
 *     could publish to the OpenAjax gadget pubsub infrastructure.
 *
 * @name MasterPublisher
 * @requires OpenAjax, finesse.clientservices.MasterTunnel, finesse.clientservices.Topics
 */

/** @namespace */
var finesse = finesse || {};
finesse.clientservices = finesse.clientservices  || {};

/**
 * @class
 * Register with the MasterTunnel to receive events. Events are published to
 * the appropriate topics.
 * @constructor
 * @param {finesse.clientservices.MasterTunnel} tunnel
 *     An object instance of the {@link finesse.clientservices.MasterTunnel} class.
 * @throws {Error} If required constructor parameter is missing.
 */
finesse.clientservices.MasterPublisher = function (tunnel) {
    if (!(tunnel instanceof finesse.clientservices.MasterTunnel)) {
        throw new Error("Required tunnel object missing or invalid.");
    }

    var

    /**
     * Reference to the gadget pubsub Hub instance.
     * @private
     */
    _hub = gadgets.Hub,

    /**
     * Reference to the Topics class.
     * @private
     */
    _topics = finesse.clientservices.Topics,
    
    /**
     * Reference to conversion utilities class.
     * @private
     */
    _utils = finesse.utilities.Utilities,
    
    /**
     * References to ClientServices logger methods
     * @private
     */
    _logger = {
		log: finesse.clientservices.ClientServices.log
	},
    
    /**
     * Store the passed in tunnel.
     * @private
     */
	_tunnel = tunnel,

    /**
     * Caches the connection info event so that it could be published if there
     * is a request for it.
     * @private
     */
    _connInfoCache,

    /**
     * The types of possible request types supported when listening to the
     * requests channel. Each request type could result in different operations.
     */
    _REQTYPES = {
        CONNECTIONINFO: "ConnectionInfoReq",
		SUBSCRIBE: "SubscribeNodeReq",
		UNSUBSCRIBE: "UnsubscribeNodeReq",
		CONNECT: "ConnectionReq"
    },

    /**
     * Will store list of nodes that have OF subscriptions created
     *     _nodesList[node][subscribing].reqIds[subid]
     *     _nodesList[node][active].reqIds[subid]
     *     _nodesList[node][unsubscribing].reqIds[subid]
     *     _nodesList[node][holding].reqIds[subid]
     */
    _nodesList = {},
    
    /**
     * The states that a subscription can be in
     */
    _CHANNELSTATES = {
        UNINITIALIZED: "Uninitialized",
        PENDING: "Pending",
        OPERATIONAL: "Operational"
    },

    /**
     * Publishes events to the appropriate topic. The topic name is determined
     * by fetching the source value from the event.
     * @param {String} event
     *     The full event payload.
     * @throws {Error} If the payload object is malformed.
     * @private
     */
    _eventHandler = function (event) {
        var topic, eventObj, publishEvent, restTopic,
		delimPos = event.indexOf("<"),
		node,
		eventXml = event;

        try {
			//Extract and strip the node path from the message
			if (delimPos > 0) {
				//We need to decode the URI encoded node path
				//TODO: make sure this is kosher with OpenAjax topic naming
				node = decodeURI(event.substr(0, delimPos));
				eventXml = event.substr(delimPos);
				//Converting the node path to openAjaxhub topic
				topic = _topics.getTopic(node);
			} else {
				_logger.log("MasterPublisher._eventHandler() - [ERROR] node is not given in postMessage: " + eventXml);
				throw new Error("node is not given in postMessage: " + eventXml);
			}

			eventObj = _utils.xml2JsObj(eventXml);
			
        } catch (err) {
			_logger.log("MasterPublisher._eventHandler() - [ERROR] Malformed event payload: " + err);
            throw new Error("Malformed event payload : " + err);
        }
        
        _logger.log("MasterPublisher._eventHandler() - Received event on node '" + node + "': " + eventXml);
        
        publishEvent = {content : event, object : eventObj };

        //Publish event to proper event topic.
        if (topic && eventObj) {
            _hub.publish(topic, publishEvent);
        }
    },
    
    /**
     * Handler for when presence events are sent through the MasterTunnel.
     * @returns {Object}
     *     A presence xml event.
     * @private
     */
    _presenceHandler = function (event) {
        var eventObj = _utils.xml2JsObj(event), publishEvent;
        
        publishEvent = {content : event, object : eventObj};
        
        if (eventObj) {
            _hub.publish(_topics.PRESENCE, publishEvent);
        }
    },

    /**
     * Clone the connection info object from cache.
     * @returns {Object}
     *     A connection info object containing a "status" and "resourceID".
     * @private
     */
    _cloneConnInfoObj = function () {
        if (_connInfoCache) {
            return {
                status: _connInfoCache.status,
                resourceID: _connInfoCache.resourceID
            };
        } else {
            return null;
        }
    },

    /**
     * Publishes the connection info to the connection info topic.
     * @param {Object} connInfo
     *     The connection info object containing the status and resource ID.
     * @private
     */
    _connInfoHandler = function (connInfo) {
        _connInfoCache = connInfo;
		_logger.log("MasterPublisher._connInfoHandler() - Connection status: " + connInfo.status);
        _hub.publish(_topics.EVENTS_CONNECTION_INFO, _cloneConnInfoObj());
    },

	
    /**
     * Utility method to bookkeep node subscription requests and determine
     * whehter it is necessary to tunnel the request to JabberWerx.
     * @param {String} node
     *     The node of interest
     * @param {String} reqId
     *     A unique string identifying the request/subscription
     * @private
     */
	_subscribeNode = function (node, subid) {
		// NODE DOES NOT YET EXIST
		if (!_nodesList[node]) {
			_nodesList[node] = {
				"subscribing": {
					"reqIds": {},
					"length": 0
				},
				"active": {
					"reqIds": {},
					"length": 0
				},
				"unsubscribing": {
					"reqIds": {},
					"length": 0
				},
				"holding": {
					"reqIds": {},
					"length": 0
				}
			};
		}
		if (_nodesList[node].active.length === 0) {
			if (_nodesList[node].unsubscribing.length === 0) {
				if (_nodesList[node].subscribing.length === 0) {
					_nodesList[node].subscribing.reqIds[subid] = true;
					_nodesList[node].subscribing.length += 1;

					_logger.log("MasterPublisher._subscribeNode() - Attempting to subscribe to node '" + node + "'");
					_tunnel.subscribe(node, function (err) {
						var errObj, curSubid;
						if (err) {
							errObj = {
								subscribe: {
									content: err
								}
							};

				            try {
				                errObj.subscribe.object = gadgets.json.parse((_utils.xml2json(jQuery.parseXML(err), "")));
				            } catch (e) {
				                errObj.error = {
				                    errorType: "parseError",
				                    errorMessage: "Could not serialize XML: " + e
				                };
				            }
							_logger.log("MasterPublisher._subscribeNode() - Error subscribing to node '" + node + "': " + err);
						} else {
							_logger.log("MasterPublisher._subscribeNode() - Subscribed to node '" + node + "'");
						}

						for (curSubid in _nodesList[node].subscribing.reqIds) {
							if (_nodesList[node].subscribing.reqIds.hasOwnProperty(curSubid)) {
								_hub.publish(_topics.RESPONSES + "." + curSubid, errObj);
								if (!err) {
									_nodesList[node].active.reqIds[curSubid] = true;
									_nodesList[node].active.length += 1;
								}
								delete _nodesList[node].subscribing.reqIds[curSubid];
								_nodesList[node].subscribing.length -= 1;
							}
						}
					});
					
				} else { //other ids are subscribing
					_nodesList[node].subscribing.reqIds[subid] = true;
					_nodesList[node].subscribing.length += 1;
				}						
			} else { //An unsubscribe request is pending, hold onto these subscribes until it is done
				_nodesList[node].holding.reqIds[subid] = true;
				_nodesList[node].holding.length += 1;
			}
		} else { // The node has active subscriptions; add this subid and return successful response
			_nodesList[node].active.reqIds[subid] = true;
			_nodesList[node].active.length += 1;
			_hub.publish(_topics.RESPONSES + "." + subid, undefined); 
		}
	},

    /**
     * Utility method to bookkeep node unsubscribe requests and determine
     * whehter it is necessary to tunnel the request to JabberWerx.
     * @param {String} node
     *     The node to unsubscribe from
     * @param {String} reqId
     *     A unique string identifying the subscription to remove
     * @private
     */
	_unsubscribeNode = function (node, subid) {
		if (!_nodesList[node]) { //node DNE, publish success response
			_hub.publish(_topics.RESPONSES + "." + subid, undefined); 
		} else {
			if (_nodesList[node].active.length > 1) {
				delete _nodesList[node].active.reqIds[subid];
				_hub.publish(_topics.RESPONSES + "." + subid, undefined); 
				_nodesList[node].active.length -= 1;
			} else if (_nodesList[node].active.length === 1) { // transition subid from active category to unsubscribing category
				_nodesList[node].unsubscribing.reqIds[subid] = true;
				_nodesList[node].unsubscribing.length += 1;
				delete _nodesList[node].active.reqIds[subid];
				_nodesList[node].active.length -= 1;

				_logger.log("MasterPublisher._unsubscribeNode() - Attempting to unsubscribe from node '" + node + "'");
				_tunnel.unsubscribe(node, function (err) {
					var errObj, curSubid;
					if (err) {
						errObj = {
							subscribe: {
								content: err
							}
						};

			            try {
			                errObj.subscribe.object = gadgets.json.parse((_utils.xml2json(jQuery.parseXML(err), "")));
			            } catch (e) {
			                errObj.error = {
			                    errorType: "parseError",
			                    errorMessage: "Could not serialize XML: " + e
			                };
			            }
						_logger.log("MasterPublisher._unsubscribeNode() - Error unsubscribing from node '" + node + "': " + err);
					} else {
						_logger.log("MasterPublisher._unsubscribeNode() - Unsubscribed from node '" + node + "'");
					}

					for (curSubid in _nodesList[node].unsubscribing.reqIds) {
						if (_nodesList[node].unsubscribing.reqIds.hasOwnProperty(curSubid)) {
							// publish to all subids whether unsubscribe failed or succeeded
							_hub.publish(_topics.RESPONSES + "." + curSubid, errObj); 
							if (!err) {
								delete _nodesList[node].unsubscribing.reqIds[curSubid];
								_nodesList[node].unsubscribing.length -= 1;
							} else { // Just remove the subid from unsubscribing; the next subscribe request will operate with node already created
								delete _nodesList[node].unsubscribing.reqIds[curSubid];
								_nodesList[node].unsubscribing.length -= 1;
							}	
						}
					}
					
					if (!err && _nodesList[node].holding.length > 0) { // if any subscribe requests came in while unsubscribing from OF, now transition from holding to subscribing
						for (curSubid in _nodesList[node].holding.reqIds) {
							if (_nodesList[node].holding.reqIds.hasOwnProperty(curSubid)) {
								delete _nodesList[node].holding.reqIds[curSubid];
								_nodesList[node].holding.length -= 1;
								_subscribeNode(node, curSubid);								
							}
						}
					}
				});
			} else { // length <= 0?
				_hub.publish(_topics.RESPONSES + "." + subid, undefined);
			}
		}
	},
	
	/**
     * Handles client requests to establish a BOSH connection.
     * @param {String} id
     *     id of the xmpp user
     * @param {String} password
     *     password of the xmpp user
     * @param {String} xmppDomain
     *     xmppDomain of the xmpp user account
     * @private
     */
	_connect = function (id, password, xmppDomain) {
	    _tunnel.makeConnectReq(id, password, xmppDomain);
	},

    /**
     * Handles client requests made to the request topic. The type of the
     * request is described in the "type" property within the data payload. Each
     * type can result in a different operation.
     * @param {String} topic
     *     The topic which data was published to.
     * @param {Object} data
     *     The data containing requests information published by clients.
     * @param {String} data.type
     *     The type of the request. Supported: "ConnectionInfoReq"
     * @param {Object} data.data
     *     May contain data relevant for the particular requests.
     * @param {String} [data.invokeID]
     *     The ID used to identify the request with the response. The invoke ID
     *     will be included in the data in the publish to the topic. It is the
     *     responsibility of the client to correlate the published data to the
     *     request made by using the invoke ID.
     * @private
     */
    _clientRequestHandler = function (topic, data) {
        var dataCopy;

        //Ensure a valid data object with "type" and "data" properties.
        if (typeof data === "object" &&
                typeof data.type === "string" &&
                typeof data.data === "object") {
			switch (data.type) {
			case _REQTYPES.CONNECTIONINFO:
				//It is possible that Slave clients come up before the Master
                //client. If that is the case, the Slaves will need to make a
                //request for the Master to send the latest connection info to the
                //connectionInfo topic.
                dataCopy = _cloneConnInfoObj();
                if (dataCopy) {
                    if (data.invokeID !== undefined) {
                        dataCopy.invokeID = data.invokeID;
                    }
                    _hub.publish(_topics.EVENTS_CONNECTION_INFO, dataCopy);
                }
                break;
			case _REQTYPES.SUBSCRIBE:
				if (typeof data.data.node === "string") {
					_subscribeNode(data.data.node, data.invokeID);
				}
				break;
			case _REQTYPES.UNSUBSCRIBE:
				if (typeof data.data.node === "string") {
					_unsubscribeNode(data.data.node, data.invokeID);
				}
				break;
			case _REQTYPES.CONNECT:
			    if (typeof data.data.id === "string" && typeof data.data.password === "string" && typeof data.data.xmppDomain === "string") {
			        _connect(data.data.id, data.data.password, data.data.xmppDomain);
			    }
			    break;
			default:
				break;
			}
        }
    };

    (function () {
        //Register to receive events and connection status from tunnel.
        _tunnel.registerEventHandler(_eventHandler);
        _tunnel.registerPresenceHandler(_presenceHandler);
        _tunnel.registerConnectionInfoHandler(_connInfoHandler);

        //Listen to a request channel to respond to any requests made by other
        //clients because the Master may have access to useful information.
        _hub.subscribe(_topics.REQUESTS, _clientRequestHandler);
    }());

    //BEGIN TEST CODE//
    /**
     * Test code added to expose private functions that are used by unit test
     * framework. This section of code is removed during the build process
     * before packaging production code. The [begin|end]TestSection are used
     * by the build to identify the section to strip.
     * @ignore
     */
    this.beginTestSection = 0;

    /**
     * @ignore
     */
    this.getTestObject = function () {
        //Load mock dependencies.
        var _mock = new MockControl();
        _hub = _mock.createMock(gadgets.Hub);
        _tunnel = _mock.createMock();

        return {
            //Expose mock dependencies
            mock: _mock,
            hub: _hub,
			tunnel: _tunnel,
			setTunnel: function (tunnel) {
				_tunnel = tunnel;
			},
			getTunnel: function () {
			    return _tunnel;
			},

            //Expose internal private functions
            reqtypes: _REQTYPES,
            eventHandler: _eventHandler,
            presenceHandler: _presenceHandler,
			
			subscribeNode: _subscribeNode,
			unsubscribeNode: _unsubscribeNode,
			
			getNodeList: function () {
				return _nodesList;
			},
			setNodeList: function (nodelist) {
				_nodesList = nodelist;
			},
			
            cloneConnInfoObj: _cloneConnInfoObj,
            connInfoHandler: _connInfoHandler,
            clientRequestHandler: _clientRequestHandler

        };
    };


    /**
     * @ignore
     */
    this.endTestSection = 0;
    //END TEST CODE//
};/**
 * @fileOverview Contains a list of topics used for client side pubsub.
 *
 * @name Topics
 */

/** @namespace */
var finesse = finesse || {};
finesse.clientservices = finesse.clientservices  || {};

/**
 * @class
 * Contains a list of topics with some utility functions.
 */
finesse.clientservices.Topics = (function () {

    /**
     * The namespace prepended to all Finesse topics.
     */
    this.namespace = "finesse.info";

    /**
     * @private
     * Gets the full topic name with the Finesse namespace prepended.
     * @param {String} topic
     *     The topic category.
     * @returns {String}
     *     The full topic name with prepended namespace.
     */
    var _getNSTopic = function (topic) {
        return this.namespace + "." + topic;
    };



    /** @scope finesse.clientservices.Topics */
    return {
        /** Client side request channel. */
        REQUESTS: _getNSTopic("requests"),

		/** Client side response channel. */
        RESPONSES: _getNSTopic("responses"),
		
        /** Connection status. */
        EVENTS_CONNECTION_INFO: _getNSTopic("connection"),
        
        /** Presence channel */
        PRESENCE: _getNSTopic("presence"),

        /**
         * Convert a Finesse REST URI to a OpenAjax compatible topic name.
         */
        getTopic: function (restUri) {
            //The topic should not start with '/' else it will get replaced with
            //'.' which is invalid.
            //Thus, remove '/' if it is at the beginning of the string
            if (restUri.indexOf('/') === 0) {
                restUri = restUri.substr(1);
            }

            //Replace every instance of "/" with ".". This is done to follow the
            //OpenAjaxHub topic name convention.
            return restUri.replace(/\//g, ".");
        }
    };
}());
/**
 * @fileOverview Exposes a set of API wrappers that will hide the dirty work of
 *     constructing Finesse API requests and consuming Finesse events.
 *
 * @name finesse.clientservices.ClientServices
 * @requires Class
 * @requires OpenAjax, jQuery 1.5, finesse.utilities.Utilities
 */

var finesse = finesse || {};
finesse.version = '$version$';
finesse.clientservices = finesse.clientservices  || {};
/**
 * @class
 * Allow clients to make Finesse API requests and consume Finesse events by
 * calling a set of exposed functions. The Services layer will do the dirty
 * work of establishing a shared BOSH connection (for designated Master
 * modules), consuming events for client subscriptions, and constructing API
 * requests.
 */
finesse.clientservices.ClientServices = (function () {

    var

    /**
     * Shortcut reference to the master tunnel
     * @private
     */
    _tunnel,

    /**
     * Shortcut reference to the finesse.utilities.Utilities singleton
     * This will be set by init()
     * @private
     */
    _util,

    /**
     * Shortcut reference to the gadgets.io object.
     * This will be set by init()
     * @private
     */
    _io,

    /**
     * Shortcut reference to the gadget pubsub Hub instance.
     * This will be set by init()
     * @private
     */
    _hub,

    /**
     * Logger object set externally by setLogger, defaults to nothing.
     * @private
     */
	_logger = {},

    /**
     * Shortcut reference to the Topics class.
     * This will be set by init()
     * @private
     */
    _topics,

    /**
     * Config object needed to initialize this library
     * This must be set by init()
     * @private
     */
    _config,

    /**
     * @private
     * Whether or not this ClientService instance is a Master.
     */
    _isMaster = false,

    /**
     * @private
     * Whether the Client Services have been initiated yet.
     */
    _inited = false,

    /**
     * Stores the list of subscription IDs for all subscriptions so that it
     * could be retrieve for unsubscriptions.
     * @private
     */
    _subscriptionID = {},

    /**
     * The possible states of the JabberWerx BOSH connection.
     * @private
     */
    _STATUS = {
        CONNECTING: "connecting",
        CONNECTED: "connected",
        DISCONNECTED: "disconnected",
        DISCONNECTING: "disconnecting",
        RECONNECTING: "reconnecting",
        UNLOADING: "unloading"
    },

    /**
     * Handler function to be invoked when BOSH connection is connecting.
     * @private
     */
    _onConnectingHandler,

    /**
     * Handler function to be invoked when BOSH connection is connected
     * @private
     */
    _onConnectHandler,

    /**
     * Handler function to be invoked when BOSH connection is disconnecting.
     * @private
     */
    _onDisconnectingHandler,

    /**
     * Handler function to be invoked when the BOSH is disconnected.
     * @private
     */
    _onDisconnectHandler,

    /**
     * Handler function to be invoked when the BOSH is reconnecting.
     * @private
     */
    _onReconnectingHandler,
    
    /**
     * Handler function to be invoked when the BOSH is unloading.
     * @private
     */
    _onUnloadingHandler,

    /**
     * Contains a cache of the latest connection info containing the current
     * state of the BOSH connection and the resource ID.
     * @private
     */
    _connInfo,

    /**
     * @private
     * Centralized logger.log method for external logger
     * @param {String} msg
     *     Message to log
     */
	_log = function (msg) {
		// If the external logger throws up, it stops here.
		try {
			if (_logger.log) {
				_logger.log("[ClientServices] " + msg);
			}
		} catch (e) { }
	},

    /**
     * Handler to process connection info publishes.
     * @param {Object} data
     *     The connection info data object.
     * @param {String} data.status
     *     The BOSH connection status.
     * @param {String} data.resourceID
     *     The resource ID for the connection.
     * @private
     */
    _connInfoHandler =  function (data) {

        //Invoke registered handler depending on status received. Due to the
        //request topic where clients can make request for the Master to publish
        //the connection info, there is a chance that duplicate connection info
        //events may be sent, so ensure that there has been a state change
        //before invoking the handlers.
        if (_connInfo === undefined || _connInfo.status !== data.status) {
            _connInfo = data;
            switch (data.status) {
            case _STATUS.CONNECTING:
                if (_onConnectingHandler) {
                    _onConnectingHandler();
                }
                break;
            case _STATUS.CONNECTED:
                if (_onConnectHandler) {
                    _onConnectHandler();
                }
                break;
            case _STATUS.DISCONNECTED:
                if (_onDisconnectHandler) {
                    _onDisconnectHandler();
                }
                break;
            case _STATUS.DISCONNECTING:
                if (_onDisconnectingHandler) {
                    _onDisconnectingHandler();
                }
                break;
            case _STATUS.RECONNECTING:
                if (_onReconnectingHandler) {
                    _onReconnectingHandler();
                }
                break;
            case _STATUS.UNLOADING:
                if (_onUnloadingHandler) {
                    _onUnloadingHandler();
                }
                break;
            }
        }
    },

    /**
     * Ensure that ClientServices have been inited.
     * @private
     */
    _isInited = function () {
        if (!_inited) {
            throw new Error("ClientServices needs to be inited.");
        }
    },

    /**
     * Have the client become the Master by initiating a tunnel to a shared
     * event BOSH connection. The Master is responsible for publishing all
     * events to the pubsub infrastructure.
     * @private
     */
    _becomeMaster = function () {
        _tunnel = new finesse.clientservices.MasterTunnel(_config.host, _config.scheme);
        publisher = new finesse.clientservices.MasterPublisher(_tunnel);
        _tunnel.init(_config.id, _config.password, _config.xmppDomain, _config.pubsubDomain);
        _isMaster = true;
    },

    /**
     * Make a request to the request channel to have the Master publish the
     * connection info object.
     * @private
     */
    _makeConnectionInfoReq = function () {
        var data = {
            type: "ConnectionInfoReq",
            data: {},
            invokeID: (new Date()).getTime()
        };
        _hub.publish(_topics.REQUESTS, data);
    },

    /**
     * Utility method to register a handler which is associated with a
     * particular connection status.
     * @param {String} status
     *     The connection status string.
     * @param {Function} handler
     *     The handler to associate with a particular connection status.
     * @throws {Error}
     *     If the handler provided is not a function.
     * @private
     */
    _registerHandler = function (status, handler) {
        if (typeof handler === "function") {
            if (_connInfo && _connInfo.status === status) {
                handler();
            }
            switch (status) {
            case _STATUS.CONNECTING:
                _onConnectingHandler = handler;
                break;
            case _STATUS.CONNECTED:
                _onConnectHandler = handler;
                break;
            case _STATUS.DISCONNECTED:
                _onDisconnectHandler = handler;
                break;
            case _STATUS.DISCONNECTING:
                _onDisconnectingHandler = handler;
                break;
            case _STATUS.RECONNECTING:
                _onReconnectingHandler = handler;
                break;
            case _STATUS.UNLOADING:
                _onUnloadingHandler = handler;
                break;
            }

        } else {
            throw new Error("Callback is not a function");
        }
    };

    return {

        /**
         * The location of the tunnel HTML URL.
         * @returns {String}
         *     The location of the tunnel HTML URL.
         */
        getTunnelURL: function () {
            return _tunnel.getTunnelURL();            
        },
        
        /**
         * @private
         * Indicates whether the tunnel frame is loaded.
         * @returns {Boolean}
         *     True if the tunnel frame is loaded, false otherwise.
         */
        isTunnelLoaded: function () {
            return _tunnel.isTunnelLoaded();            
        },
        
        /**
         * @private
         * Indicates whether the ClientServices instance is a Master.
         * @returns {Boolean}
         *     True if this instance of ClientServices is a Master, false otherwise.
         */
        isMaster: function () {
            return _isMaster;
        },

        /**
         * @private
         * Get the resource ID. An ID is only available if the BOSH connection has
         * been able to connect successfully.
         * @returns {String}
         *     The resource ID string. Null if the BOSH connection was never
         *     successfully created and/or the resource ID has not been associated.
         */
        getResourceID: function () {
            if (_connInfo !== undefined) {
                return _connInfo.resourceID;
            }
            return null;
        },
		
		/*
		getHub: function () {
			return _hub;
		},
	*/
        /**
         * @private
         * Add a callback to be invoked when the BOSH connection is attempting
         * to connect. If the connection is already trying to connect, the
         * callback will be invoked immediately.
         * @param {Function} handler
         *      An empty param function to be invoked on connecting. Only one
         *      handler can be registered at a time. Handlers already registered
         *      will be overwritten.
         */
        registerOnConnectingHandler: function (handler) {
            _registerHandler(_STATUS.CONNECTING, handler);
        },

        /**
         * @private
         * Removes the on connecting callback that was registered.
         */
        unregisterOnConnectingHandler: function () {
            _onConnectingHandler = undefined;
        },

        /**
         * @private
         * Add a callback to be invoked when the BOSH connection has been
         * established. If the connection has already been established, the
         * callback will be invoked immediately.
         * @param {Function} handler
         *      An empty param function to be invoked on connect. Only one handler
         *      can be registered at a time. Handlers already registered will be
         *      overwritten.
         */
        registerOnConnectHandler: function (handler) {
            _registerHandler(_STATUS.CONNECTED, handler);
        },

        /**
         * @private
         * Removes the on connect callback that was registered.
         */
        unregisterOnConnectHandler: function () {
            _onConnectHandler = undefined;
        },

        /**
         * @private
         * Add a callback to be invoked when the BOSH connection goes down. If
         * the connection is already down, invoke the callback immediately.
         * @param {Function} handler
         *      An empty param function to be invoked on disconnected. Only one
         *      handler can be registered at a time. Handlers already registered
         *      will be overwritten.
         */
        registerOnDisconnectHandler: function (handler) {
            _registerHandler(_STATUS.DISCONNECTED, handler);
        },

        /**
         * @private
         * Removes the on disconnect callback that was registered.
         */
        unregisterOnDisconnectHandler: function () {
            _onDisconnectHandler = undefined;
        },

        /**
         * @private
         * Add a callback to be invoked when the BOSH is currently disconnecting. If
         * the connection is already disconnecting, invoke the callback immediately.
         * @param {Function} handler
         *      An empty param function to be invoked on disconnected. Only one
         *      handler can be registered at a time. Handlers already registered
         *      will be overwritten.
         */
        registerOnDisconnectingHandler: function (handler) {
            _registerHandler(_STATUS.DISCONNECTING, handler);
        },

        /**
         * @private
         * Removes the on disconnecting callback that was registered.
         */
        unregisterOnDisconnectingHandler: function () {
            _onDisconnectingHandler = undefined;
        },

        /**
         * @private
         * Add a callback to be invoked when the BOSH connection is attempting
         * to connect. If the connection is already trying to connect, the
         * callback will be invoked immediately.
         * @param {Function} handler
         *      An empty param function to be invoked on connecting. Only one
         *      handler can be registered at a time. Handlers already registered
         *      will be overwritten.
         */
        registerOnReconnectingHandler: function (handler) {
            _registerHandler(_STATUS.RECONNECTING, handler);
        },

        /**
         * @private
         * Removes the on reconnecting callback that was registered.
         */
        unregisterOnReconnectingHandler: function () {
            _onReconnectingHandler = undefined;
        },
        
        /**
         * @private
         * Add a callback to be invoked when the BOSH connection is unloading
         * 
         * @param {Function} handler
         *      An empty param function to be invoked on connecting. Only one
         *      handler can be registered at a time. Handlers already registered
         *      will be overwritten.
         */
        registerOnUnloadingHandler: function (handler) {
            _registerHandler(_STATUS.UNLOADING, handler);
        },
        
        /**
         * @private
         * Removes the on unloading callback that was registered.
         */
        unregisterOnUnloadingHandler: function () {
            _onUnloadingHandler = undefined;
        },

	    /**
         * @private
	     * Proxy method for gadgets.io.makeRequest. The will be identical to gadgets.io.makeRequest
         * ClientServices will mixin the BASIC Auth string, locale, and host, since the
         * configuration is encapsulated in here anyways.
         * This removes the dependency
	     * @param {String} url
	     *     The relative url to make the request to (the host from the passed in config will be
         *     appended). It is expected that any encoding to the URL is already done.
	     * @param {Function} handler
	     *     Callback handler for makeRequest to invoke when the response returns.
         *     Completely passed through to gadgets.io.makeRequest
	     * @param {Object} params
	     *     The params object that gadgets.io.makeRequest expects. Authorization and locale
	     *     headers are mixed in.
         */
		makeRequest: function (url, handler, params) {
			// ClientServices needs to be initialized with a config for restHost, auth, and locale
			_isInited();
			
			// Allow mixin of auth and locale headers
			params = params || {};
			params[gadgets.io.RequestParameters.HEADERS] = params[gadgets.io.RequestParameters.HEADERS] || {};
			
			// Add Basic auth to request header
	        params[gadgets.io.RequestParameters.HEADERS].Authorization = "Basic " + _config.authorization;
	        //Locale
            params[gadgets.io.RequestParameters.HEADERS].locale = _config.locale;

	     //   gadgets.io.makeRequest(encodeURI("http://" + _config.localhostFQDN) + url, handler, params);
	          gadgets.io.makeRequest(encodeURI("http://" + _config.restHost) + url, handler, params);
		},

        /**
         * @private
         * Utility function to make a subscription to a particular topic. Only one
         * callback function is registered to a particular topic at any time.
         * @param {String} topic
         *     The full topic name. The topic name should follow the OpenAjax
         *     convention using dot notation (ex: finesse.api.User.1000).
         * @param {Function} callback
         *     The function that should be invoked with the data when an event
         *     is delivered to the specific topic.
         * @returns {Boolean}
         *     True if the subscription was made successfully and the callback was
         *     been registered. False if the subscription already exist, the
         *     callback was not overwritten.
         */
        subscribe: function (topic, callback) {
            _isInited();

            //Ensure that the same subscription isn't made twice.
            if (!_subscriptionID[topic]) {
                //Store the subscription ID using the topic name as the key.
                _subscriptionID[topic] = _hub.subscribe(topic,
                    //Invoke the callback just with the data object.
                    function (topic, data) {
                        callback(data);
                    });
                return true;
            }
            return false;
        },

        /**
         * @private
         * Unsubscribe from a particular topic.
         * @param {String} topic
         *     The full topic name.
         */
        unsubscribe: function (topic) {
            _isInited();

            //Unsubscribe from the topic using the subscription ID recorded when
            //the subscription was made, then delete the ID from data structure.
            _hub.unsubscribe(_subscriptionID[topic]);
            delete _subscriptionID[topic];
        },

	    /**
         * @private
	     * Make a request to the request channel to have the Master subscribe
	     * to a node.
         * @param {String} node
         *     The node to subscribe to.
	     */
	    subscribeNode: function (node, handler) {
			if (handler && typeof handler !== "function") {
				throw new Error("ClientServices.subscribeNode: handler is not a function");
			}
			
			// Construct the request to send to MasterPublisher through the OpenAjax Hub
	        var data = {
	            type: "SubscribeNodeReq",
	            data: {node: node},
	            invokeID: _util.generateUUID()
	        },
			responseTopic = _topics.RESPONSES + "." + data.invokeID,
			_this = this;

			// We need to first subscribe to the response channel
			this.subscribe(responseTopic, function (rsp) {
				// Since this channel is only used for this singular request,
				// we are not interested anymore.
				// This is also critical to not leaking memory by having OpenAjax
				// store a bunch of orphaned callback handlers that enclose on
				// our entire ClientServices singleton
				_this.unsubscribe(responseTopic);
				if (handler) {
					handler(data.invokeID, rsp);
				}
	        });
			// Then publish the request on the request channel
	        _hub.publish(_topics.REQUESTS, data);
	    },

	    /**
         * @private
	     * Make a request to the request channel to have the Master unsubscribe
	     * from a node.
         * @param {String} node
         *     The node to unsubscribe from.
	     */
	    unsubscribeNode: function (node, subid, handler) {
			if (handler && typeof handler !== "function") {
				throw new Error("ClientServices.unsubscribeNode: handler is not a function");
			}
			
			// Construct the request to send to MasterPublisher through the OpenAjax Hub
	        var data = {
	            type: "UnsubscribeNodeReq",
	            data: {
					node: node,
					subid: subid
				},
	            invokeID: _util.generateUUID()
	        },
			responseTopic = _topics.RESPONSES + "." + data.invokeID,
			_this = this;

			// We need to first subscribe to the response channel
			this.subscribe(responseTopic, function (rsp) {
				// Since this channel is only used for this singular request,
				// we are not interested anymore.
				// This is also critical to not leaking memory by having OpenAjax
				// store a bunch of orphaned callback handlers that enclose on
				// our entire ClientServices singleton
				_this.unsubscribe(responseTopic);
				if (handler) {
					handler(rsp);
				}
	        });
			// Then publish the request on the request channel
	        _hub.publish(_topics.REQUESTS, data);
	    },
	    
	    /**
         * @private
         * Make a request to the request channel to have the Master connect to the XMPP server via BOSH
         */
	    makeConnectionReq : function () {
	        var data = {
	            type: "ConnectionReq",
	            data: {
	                id: _config.id,
	                password: _config.password,
	                xmppDomain: _config.xmppDomain
	            },
	            invokeID: (new Date()).getTime()
	        };
	        _hub.publish(_topics.REQUESTS, data);
	    },
	
        /**
         * Set's the global logger for this Client Services instance.
         * @param {Object} logger
         *     Logger object with the following attributes defined:<ul>
         *         <li><b>log:</b> function (msg) to simply log a message
         *     </ul>
         */
		setLogger: function (logger) {
			// We want to check the logger coming in so we don't have to check every time it is called.
			if (logger && typeof logger === "object" && typeof logger.log === "function") {
				_logger = logger;
			} else {
				// We are resetting it to an empty object so that _logger.log in .log is falsy.
				_logger = {};
			}
		},
		
	    /**
         * @private
         * Centralized logger.log method for external logger
         * @param {String} msg
         *     Message to log
         */
		log: _log,

        /**
         * Initiates the Client Services with the specified config parameters.
         * Enabling the Client Services as Master will trigger the establishment
         * of a BOSH event connection.
         * @param {Object} config
         *     Configuration object containing properties used for making REST requests:<ul>
         *         <li><b>host:</b> The Finesse server IP/host as reachable from the browser
         *         <li><b>restHost:</b> The Finesse API IP/host as reachable from the gadget container
         *         <li><b>id:</b> The ID of the user. This is an optional param as long as the
         *         appropriate authorization string is provided, otherwise it is
         *         required.</li>
         *         <li><b>password:</b> The password belonging to the user. This is an optional param as
         *         long as the appropriate authorization string is provided,
         *         otherwise it is required.</li>
         *         <li><b>authorization:</b> The base64 encoded "id:password" authentication string. This
         *         param is provided to allow the ability to hide the password
         *         param. If provided, the id and the password extracted from this
         *         string will be used over the config.id and config.password.</li>
         *     </ul>
         * @throws {Error} If required constructor parameter is missing.
         */
        init: function (config) {
            if (!_inited) {
                //Validate the properties within the config object if one is provided.
                if (!(typeof config === "object" &&
                     typeof config.host === "string" && config.host.length > 0 && config.restHost && 
                     (typeof config.authorization === "string" ||
                             (typeof config.id === "string" &&
                                     typeof config.password === "string")))) {
                    throw new Error("Config object contains invalid properties.");
                }

                // Initialize configuration
                _config = config;

                // Set shortcuts
                _util = finesse.utilities.Utilities;
                _hub = gadgets.Hub;
                _io = gadgets.io;
                _topics = finesse.clientservices.Topics;

                //If the authorization string is provided, then use that to
                //extract the ID and the password. Otherwise use the ID and
                //password from the respective ID and password params.
                if (_config.authorization) {
                    var creds = _util.getCredentials(_config.authorization);
                    _config.id = creds.id;
                    _config.password = creds.password;
                }
                else {
                    _config.authorization = _util.b64Encode(
                            _config.id + ":" + _config.password);
                }

                _inited = true;

                if (_hub) {
                    //Subscribe to receive connection information. Since it is possible that
                    //the client comes up after the Master comes up, the client will need
                    //to make a request to have the Master send the latest connection info.
                    //It would be possible that all clients get connection info again.
                    this.subscribe(_topics.EVENTS_CONNECTION_INFO, _connInfoHandler);
                    _makeConnectionInfoReq();
                }
            }

            //Return the CS object for object chaining.
            return this;
        },

	    /**
         * @private
	     * Initializes the BOSH component of this ClientServices instance. This establishes
         * the BOSH connection and will trigger the registered handlers as the connection
         * status changes respectively:<ul>
         *     <li>registerOnConnectingHandler</li>
         *     <li>registerOnConnectHandler</li>
         *     <li>registerOnDisconnectHandler</li>
         *     <li>registerOnDisconnectingHandler</li>
         *     <li>registerOnReconnectingHandler</li>
         *     <li>registerOnUnloadingHandler</li>
         * <ul>
         *
	     * @param {Object} config
	     *     An object containing the following (optional) handlers for the request:<ul>
	     *         <li><b>xmppDomain:</b> {String} The domain of the XMPP server. Available from the SystemInfo object.
         *         This is used to construct the JID: user@domain.com</li>
	     *         <li><b>pubsubDomain:</b> {String} The pub sub domain where the pub sub service is running.
         *         Available from the SystemInfo object.
         *         This is used for creating or removing subscriptions.</li>
         *     </ul>
         */
		initBosh: function (config) {
            //Validate the properties within the config object if one is provided.
            if (!(typeof config === "object" && typeof config.xmppDomain === "string" && typeof config.pubsubDomain === "string")) {
                throw new Error("Config object contains invalid properties.");
            }
			
			// Mixin the required information for establishing the BOSH connection
			_config.xmppDomain = config.xmppDomain;
			_config.pubsubDomain = config.pubsubDomain;
			
			//Initiate Master launch sequence
			_becomeMaster(); 
		},

        //BEGIN TEST CODE//
        /**
         * Test code added to expose private functions that are used by unit test
         * framework. This section of code is removed during the build process
         * before packaging production code. The [begin|end]TestSection are used
         * by the build to identify the section to strip.
         * @ignore
         */
        beginTestSection : 0,

        /**
         * @ignore
         */
        getTestObject: function () {
            //Load mock dependencies.
            var _mock = new MockControl();
            _hub = _mock.createMock(gadgets.Hub);
            _io = _mock.createMock(gadgets.io);

            return {
                //Expose mock dependencies
                mock: _mock,
                hub: _hub,
                io: _io,

                //Expose internal private functions
                subscriptionID: _subscriptionID,
                connInfoHandler: _connInfoHandler,

                reset: function () {
                    _inited = false;
                    _onConnectingHandler = undefined;
                    _onConnectHandler = undefined;
                    _onDisconnectingHandler = undefined;
                    _onDisconnectHandler = undefined;
                    _onReconnectingHandler = undefined;
                    _connInfo = undefined;
                },
                setUtil: function () {
                    _util = finesse.utilities.Utilities;
                },
                setConfig: function (config) {
                    _config = config;
                }
            };
        },

        /**
         * @ignore
         */
        endTestSection: 0
        //END TEST CODE//
    };
}());
/**
 * The following comment prevents JSLint errors concerning undefined global variables.
 * It tells JSLint that these identifiers are defined elsewhere.
 */
/*jslint bitwise:true, browser:true, nomen:true, regexp:true, sloppy:true, white:true */

/** The following comment is to prevent jslint errors about 
 * using variables before they are defined.
 */
/*global $, jQuery, Handlebars, dojox, dojo, console, finesse */


/** @namespace */
var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/**
 * @fileOverview JavaScript class to implement common notification
 *               functionality.
 * 
 * @name finesse.restservices.Notifier
 * @requires Class
 * @requires finesse.FinesseBase
 */
finesse.restservices.Notifier = finesse.FinesseBase.extend({

	/**
	 * Initializes the notifier object.
	 */
	init : function () {
		this._super();
		this._listenerCallback = [];
	},

	/**
	 * Add a listener.
	 * 
	 * @param callback_function
	 * @param scope
	 *            is the callback function to add
	 */
	addListener : function (callback_function, scope) {
		this._listenerCallback.push({ "callback": this._isAFunction(callback_function), "scope": (scope || window) });
	},

	/**
	 * Remove a listener.
	 * 
	 * @param callback_function
	 *            is the callback function to remove
	 * @return {Boolean} true if removed
	 */
	removeListener : function (callback_function) {

		var result = false, len = this._listenerCallback.length, i, cb;
		for (i = 0; i < len; i += 1) {
			cb = this._listenerCallback[i].callback;
			if (cb === callback_function) {
				this._listenerCallback[i] = undefined;
				this._listenerCallback.splice(i, 1);
				result = true;
			}
		}
		return result;
	},

	/**
	 * Notify all listeners.
	 * 
	 * @param obj
	 *            is the object that has changed
	 */
	notifyListeners : function (obj) {
		var len = this._listenerCallback.length, i, callbackFunction, scope;

		for (i = 0; i < len; i += 1) {
			// Be sure that one bad callback does not prevent other listeners
			// from receiving.
			try {
				callbackFunction = this._listenerCallback[i].callback;
				scope = this._listenerCallback[i].scope;
				if (typeof callbackFunction === 'function') {
					callbackFunction.call(scope, obj);
				}
			} catch (err) {
				finesse.clientservices.ClientServices.log("Exception caught: " + err);
			}
		}
	},

	/**
	 * Gets a copy of the listeners.
	 * @return changeListenerCopy (array of callbacks)
	 */
	getListeners : function () {
		var changeListenerCopy = [], len = this._listenerCallback.length, i;

		for (i = 0; i < len; i += 1) {
			changeListenerCopy.push(this._listenerCallback[i].callback);
		}

		return changeListenerCopy;
	},
	
	/**
     * Verifies that the handler is function.
     * @param handler to verify
     * @return the handler 
     * @throws Error if not a function
     */
    _isAFunction : function (handler) {
        if (handler === undefined || typeof handler === "function") {
            return handler;
        } else {
            throw new Error("handler must be a function");
        }
    }

});
/**
 * @fileOverview JavaScript base object that all REST objects should inherit
 * from because it encapsulates and provides the common functionality that
 * all REST objects need.
 *
 * @name finesse.restservices.RestBase
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 */

/** @namespace */
var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/**
 * @class
 * JavaScript representation of a REST object. Also exposes methods to operate
 * on the object against the server.
 *
 * @constructor
 * @param {String} id
 *     The ID that uniquely identifies the REST object.
 * @param {Object} callbacks
 *     An object containing callbacks for instantiation and runtime
 *     Callback to invoke upon successful instantiation, passes in REST object.
 * @param {Function} callbacks.onLoad(this)
 *     Callback to invoke upon loading the data for the first time.
 * @param {Function} callbacks.onChange(this)
 *     Callback to invoke upon successful update object (PUT)
 * @param {Function} callbacks.onAdd(this)
 *     Callback to invoke upon successful update to add object (POST)
 * @param {Function} callbacks.onDelete(this)
 *     Callback to invoke upon successful update to delete object (DELETE)
 * @param {Function} callbacks.onError(rsp)
 *     Callback to invoke on update error (refresh or event)
 *     as passed by finesse.restservices.RestBase.restRequest()
 *     {
 *         status: {Number} The HTTP status code returned
 *         content: {String} Raw string of response
 *         object: {Object} Parsed object of response
 *         error: {Object} Wrapped exception that was caught
 *         error.errorType: {String} Type of error that was caught
 *         error.errorMessage: {String} Message associated with error
 *     }
 * @param {RestBase} [restObj]
 *     A RestBase parent object which this object has an association with.
 */
finesse.restservices.RestBase = finesse.FinesseBase.extend({

    /**
     * Used by _processUpdate() and restRequest().
     * Maps requestIds to object-wrapped callbacks passed to restRequest(),
     * so that one of the callbacks can be fired when a corresponding event is
     * received inside _processUpdate().
     */
    _pendingCallbacks: {},
    
    /**
     * Gets the REST class for the current object.  This object throws an
     * exception because subtype must implement.
     * @throws {Error} because subtype must implement
     */
    getRestClass: function () {
        throw new Error("getRestClass(): Not implemented in subtype.");
    },

    /**
     * Gets the REST type for the current object.  This object throws an
     * exception because subtype must implement.
     * @throws {Error} because subtype must implement.
     */
    getRestType: function () {
        throw new Error("getRestType(): Not implemented in subtype.");
    },

    /**
     * Gets the node path for the current object.  This object throws an
     * exception because subtype must implement.
     * @throws {Error} because subtype must implement.
     */
    getXMPPNodePath: function () {
		throw new Error("getXMPPNodePath(): Not implemented in subtype.");
    },
    
    /**
     * Boolean function that specifies whether the REST object supports
     * requests. True by default. Subclasses should override if false.
     */
    supportsRequests: true,

    /**
     * Boolean function that specifies whether the REST object supports
     * subscriptions. True by default. Subclasses should override if false.
     */
    supportsSubscriptions: true,
    
    /**
     * Boolean function that specifies whether the REST object should retain
     * a copy of the REST response. False by default. Subclasses should override if true.
     */
    keepRestResponse: false,

    /**
     * Boolean function that specifies whether the REST object explicitly
     * subscribes. False by default. Subclasses should override if true.
     */
    explicitSubscription: false,

    /**
     * Boolean function that specifies whether subscribing should be
     * automatically done at construction. Defaults to true.
     * This be overridden at object construction, not by implementing subclasses
     */
	autoSubscribe: true,

    /**
     * Initializes the object.
     * @param {String} id
     *     The ID that uniquely identifies the REST object.
     * @param {Object} callbacks
     *     Callbacks for the object (onLoad, onChange,& onError)
     * @param {RestBase} restObj
     *     The REST parent of this REST object.
     */
    init: function (options, callbacks, restObj) {
        /**
          * Initialize the base class
          */
		var _this = this;

        this._super();

		if (typeof options === "object") {
			this._id = options.id;
			this._restObj = options.parentObj;
			this.autoSubscribe = (options.autoSubscribe === false) ? false : true;
			callbacks = {
				onLoad: options.onLoad,
				onChange: options.onChange,
				onAdd: options.onAdd,
				onDelete: options.onDelete,
				onError: options.onError
			};
		} else {
			this._id = options;
			this._restObj = restObj;
		}
		
		// Common stuff
		
        this._data = {};
        
        //Contains the full rest response to be processed by upper layers if needed
        this._restResponse = undefined;

        this._lastUpdate = {};

        this._util = finesse.utilities.Utilities;

        //Should be correctly initialized in either a window OR gadget context
        this._config = finesse.container.Config;

        // Setup all the notifiers - change, load and error.
        this._changeNotifier = new finesse.restservices.Notifier();
        this._loadNotifier = new finesse.restservices.Notifier();
        this._addNotifier = new finesse.restservices.Notifier();
        this._deleteNotifier = new finesse.restservices.Notifier();
        this._errorNotifier = new finesse.restservices.Notifier();

        this._loaded = false;

        this._logger = {
			log: finesse.clientservices.ClientServices.log,
			error: finesse.clientservices.ClientServices.log
		};

        // Protect against null dereferencing of options allowing its
        // (nonexistant) keys to be read as undefined
        callbacks = callbacks || {};

        this.addHandler('load', callbacks.onLoad);
        this.addHandler('change', callbacks.onChange);
        this.addHandler('add', callbacks.onAdd);
        this.addHandler('delete', callbacks.onDelete);
        this.addHandler('error', callbacks.onError);

        // Attempt to get the RestType then synchronize
        try {
            this.getRestType();

            // Only subscribe if this REST object supports subscriptions
			// and autoSubscribe was not requested to be disabled as a construction option
            if (this.supportsSubscriptions && this.autoSubscribe) {
                this.subscribe({
					success: function () {
						//TODO: figure out how to use Function.call() or Function.apply() here...
						//this is exactly the same as the below else case other than the scope of "this"
						if (typeof options === "object" && options.data) {
							if (!_this._processObject(_this._normalize(options.data))) {
								// notify of error if we fail to construct
								_this._errorNotifier.notifyListeners(_this);
							}
						} else {
				            // Only subscribe if this REST object supports requests
				            if (_this.supportsRequests) {
				                _this._synchronize();
				            }
						}
					},
					error: function (err) {
						_this._errorNotifier.notifyListeners(err);
					}
				});
            } else {
				if (typeof options === "object" && options.data) {
					if (!this._processObject(this._normalize(options.data))) {
						// notify of error if we fail to construct
						this._errorNotifier.notifyListeners(this);
					}
				} else {
		            // Only subscribe if this REST object supports requests
		            if (this.supportsRequests) {
		                this._synchronize();
		            }
				}
			}

        } catch (err) {
            this._logger.error('id=' + this._id + ': ' + err);
        }
    },

    /**
     * Determines if the object has a particular property.
     * @param obj is the object to examine
     * @param property is the property to check for
     * @returns {Boolean}
     */
    hasProperty: function (obj, prop) {
        return (obj !== null) && (obj.hasOwnProperty(prop));
    },

    /**
     * Gets a property from the object.
     * @param obj is the object to examine
     * @param property is the property to get
     * @returns {Property Value} or {Null} if not found
     */
    getProperty: function (obj, property) {
        var result = null;

        if (this.hasProperty(obj, property) === false) {
            result = null;
        } else {
            result = obj[property];
        }
        return result;
    },

    /**
     * Utility to extracts the ID from the specified REST URI. This is with the
     * assumption that the ID is always the last element in the URI after the
     * "/" delimiter.
     * @param {String} restUri
     *     The REST uri (i.e. /finesse/api/User/1000).
     */
    _extractId: function (restObj) {
        var obj, restUri = "", strLoc;
        for (obj in restObj) {
            if (restObj.hasOwnProperty(obj)) {
                restUri = restObj[obj].uri;
                break;
            }
        }
        return finesse.utilities.Utilities.getId(restUri);
    },

    /**
     * Gets the data for this object.
     * @returns Object which are contained in data
     */
    getData: function () {
        return this._data;
    },
    
    /**
     * Gets the complete REST response to the request made
     * @returns Object which are contained in data
     */
    getRestResponse: function () {
        return this._restResponse;
    },

    /**
     * The REST URL in which this object can be referenced.
     * @return {String}
     *     The REST URI for this object.
     */
    getRestUrl: function () {
        var
        restObj = this._restObj,
        restUrl = "";

        //Prepend the base REST object if one was provided.
        if (restObj instanceof finesse.restservices.RestBase) {
            restUrl += restObj.getRestUrl();
        }
        //Otherwise prepend with the default webapp name.
        else {
            restUrl += "/finesse/api";
        }

        //Append the REST type.
        restUrl += "/" + this.getRestType();

        //Append ID if it is not undefined, null, or empty.
        if (this._id) {
            restUrl += "/" + this._id;
        }
        return restUrl;
    },

    /**
     * Getter for the id of this RestBase
     * @returns {String}
     *     The id of this RestBase
     */
    getId: function () {
        return this._id;
    },

    /**
     * Synchronize this object with the server using REST GET request.
     */
    _synchronize: function () {
        // Fetch this REST object
        if (typeof this._id === "string") {
            var _this = this, isLoaded = this._loaded;

            this._doGET(
                {
                    success: function (rsp) {
                        if (!_this._processResponse(rsp)) {
                            _this._errorNotifier.notifyListeners(_this);
                        } else {
                            // If this object was already "loaded" prior to
                            // the _doGET request, then call the
                            // changeNotifier
                            if (isLoaded) {
                                _this._changeNotifier.notifyListeners(_this);
                            }
                        }
                    },
                    error: function (rsp) {
                        _this._errorNotifier.notifyListeners(rsp);
                    }
                }
            );

        } else {
            throw new Error("Can't construct a <" + this.getRestType() + "> due to invalid id type.");
        }
    },

    /**
     * Adds an handler to this object.
     * If notifierType is 'load' and the object has already loaded, the callback is invoked immediately
     * @param {String} notifierType
     *     The type of notifier to add to ('load', 'change', 'add', 'delete', 'error')
     * @param {Function} callback
     *     The function callback to invoke.
     */
    addHandler: function (notifierType, callback, scope) {
        var notifier = null;
        try {
            finesse.utilities.Utilities.validateHandler(callback);

            notifier = this._getNotifierReference(notifierType);

            notifier.addListener(callback, scope);
            
            // If load handler is added and object has
            // already been loaded, invoke callback
            // immediately
            if (notifierType === 'load' && this._loaded) {
                callback.call((scope || window), this);
            }
        } catch (err) {
            this._logger.error('id=' + this._id + ': ' + err);
        }
    },

    /**
     * Removes a handler from this object.
     * @param {String} notifierType
     *     The type of notifier to remove ('load', 'change', 'add', 'delete', 'error')
     * @param {Function} callback
     *     The function to remove.
     */
    removeHandler: function (notifierType, callback) {
        var notifier = null;
        try {
            finesse.utilities.Utilities.validateHandler(callback);

            notifier = this._getNotifierReference(notifierType);

            notifier.removeListener(callback);
        } catch (err) {
            this._logger.error('id=' + this._id + ': ' + err);
        }
    },

    /**
     * Utility method gating any operations that require complete instantiation
     * @throws Error
     *     If this object was not fully instantiated yet
     * @returns {finesse.restservices.RestBase}
     *     This RestBase object to allow cascading
     */
    isLoaded: function () {
        if (!this._loaded) {
            throw new Error("Cannot operate on object that is not fully instantiated, use onLoad/onLoadError handlers");
        }
        return this; // Allow cascading
    },


    /**
     * Force an update on this object. Since an asynchronous GET is performed,
     * it is necessary to have an onChange handler registered in order to be
     * notified when the response of this returns.
     * @returns {finesse.restservices.RestBase}
     *     This RestBase object to allow cascading
     */
    refresh: function () {
        //Disallow GETs if object doesn't support it.
        if (!this.supportsRequests) {
            throw new Error("Object doesn't support request operations.");
        }

        this.isLoaded();

        this._synchronize();

        return this; // Allow cascading
    },

    /**
     * Utility method to validate against the known schema of this RestBase
     * @param {Object} obj
     *     The object to validate
     * @returns {Boolean}
     *     True if the object fits the schema of this object. This usually
     *     means all required keys or nested objects are present.
     *     False otherwise.
     */
    _validate: function (obj) {
        return (typeof obj === "object" && this.hasProperty(obj, this.getRestType()));
    },

    /**
     * Utility method to fetch this RestBase from the server
     * @param {Object} handlers
     *     An object containing callbacks to handle the asynchronous get
     * @param {Function} handlers.success(rsp)
     *     A callback function to be invoked for a successful request with
     *     the response as passed by finesse.restservices.RestBase.restRequest()
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *     }
     * @param {Function} handlers.error(rsp)
     *     A callback function to be invoked for an unsuccessful request with
     *     the error response as passed by finesse.restservices.RestBase.restRequest()
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
     * @returns {finesse.restservices.RestBase}
     *     This RestBase object to allow cascading
     * @private
     */
    _doGET: function (handlers) {
        this.restRequest(this.getRestUrl(), handlers);
        return this; // Allow cascading
    },

    /**
     * Common update event handler used by the pubsub callback closure.
     * Processes the update event then notifies listeners.
     * @param {Object} scope
     *     An object containing callbacks to handle the asynchronous get
     * @param {Object} update
     *     An object containing callbacks to handle the asynchronous get
     */
	_updateEventHandler: function (scope, update) {
		if (scope._processUpdate(update)) {
			switch (update.object.Update.event) {
			case "POST":
				scope._addNotifier.notifyListeners(scope);
				break;
			case "PUT":
				scope._changeNotifier.notifyListeners(scope);
				break;
			case "DELETE":
				scope._deleteNotifier.notifyListeners(scope);
				break;
			}
		}	
	},

    /**
     * Utility method to create a callback to be given to OpenAjax to invoke when a message
     * is published on the topic of our REST URL (also XEP-0060 node).
     * This needs to be its own defined method so that subclasses can have their own implementation.
     * @returns {Function} callback(update)
     *     The callback to be invoked when an update event is received. This callback will
     *     process the update and notify listeners.
     */
	_createPubsubCallback: function () {
		var _this = this;
		return function (update) {
			_this._updateEventHandler(_this, update);
		};
	},

    /**
     * Subscribe to pubsub infra using the REST URL as the topic name.
     * @param {Object} callbacks
     *     An object containing callbacks to handle the asynchronous response
     * @param {Function} callbacks.success()
     *     A callback function to be invoked upon a successful subscribe.
     *     This function does not get any parameters.
     * @param {Function} callbacks.error(err)
     *     A callback function to be invoked upon an unsuccessful subscribe.
     *     This function gets a parsed error object in the following format
     *     err.subscribe: {
     *         content: {String} Raw XML of error
     *         object: {Object} Parsed object of error
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
     */
    subscribe: function (callbacks) {
        // Only need to do a subscription to client pubsub. No need to trigger
        // a subscription on the Finesse server due to implicit subscribe (at
        // least for now).
        var _this = this,
        topic = finesse.clientservices.Topics.getTopic(this.getRestUrl());

		callbacks = callbacks || {};

        finesse.clientservices.ClientServices.subscribe(topic, this._createPubsubCallback());
		
        // Request a node subscription only if this object requires explicit subscriptions
		if (this.explicitSubscription === true) {
			finesse.clientservices.ClientServices.subscribeNode(this.getXMPPNodePath(), function (subid, err) {
				_this._subid = subid;
				if (err) {
					if (typeof callbacks.error === "function") {
						callbacks.error(err);
					}
				} else if (typeof callbacks.success === "function") {
					callbacks.success();
				}
			});
		} else {
			this._subid = "OpenAjaxOnly";
			if (typeof callbacks.success === "function") {
				callbacks.success();
			}
		}

        return this;
    },

    /**
     * Unsubscribe to pubsub infra using the REST URL as the topic name.
     * @param {Object} callbacks
     *     An object containing callbacks to handle the asynchronous response
     * @param {Function} callbacks.success()
     *     A callback function to be invoked upon a successful unsubscribe.
     *     This function does not get any parameters.
     * @param {Function} callbacks.error(err)
     *     A callback function to be invoked upon an unsuccessful unsubscribe.
     *     This function gets a parsed error object in the following format
     *     err.unsubscribe: {
     *         content: {String} Raw XML of error
     *         object: {Object} Parsed object of error
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
     * @private
     */
    unsubscribe: function (callbacks) {
        // Only need to do a subscription to client pubsub. No need to trigger
        // a subscription on the Finesse server due to implicit subscribe (at
        // least for now).
        var _this = this,
        topic = finesse.clientservices.Topics.getTopic(this.getRestUrl());

		callbacks = callbacks || {};

		if (this._subid) {
	        finesse.clientservices.ClientServices.unsubscribe(topic);
	        // Request a node unsubscribe only if this object requires explicit subscriptions
			if (this.explicitSubscription === true) {
				finesse.clientservices.ClientServices.unsubscribeNode(this.getXMPPNodePath(), this._subid, function (err) {
					_this._subid = undefined;
					if (err) {
						if (typeof callbacks.error === "function") {
							callbacks.error(err);
						}
					} else if (typeof callbacks.success === "function") {
						callbacks.success();
					}
				});
			} else {
				this._subid = undefined;
				if (typeof callbacks.success === "function") {
					callbacks.success();
				}
			}
		} else {
			if (typeof callbacks.success === "function") {
				callbacks.success();
			}
		}

        return this;
    },

    /**
     * Validate and store the object into the internal data store.
     * @param {Object} object
     *     The JavaScript object that should match of schema of this REST object.
     * @returns {Boolean}
     *     True if the object was validated and stored successfully.
     * @private
     */
    _processObject: function (object) {
        if (this._validate(object)) {
            this._data = this.getProperty(object, this.getRestType()); // Should clone the object here?

            // If loaded for the first time, call the load notifiers.
            if (!this._loaded) {
                this._loaded = true;
                this._loadNotifier.notifyListeners(this);
            }

            return true;
        }
        return false;
    },

    /**
     * Normalize the object to mitigate the differences between the backend
     * and what this REST object should hold. For example, the backend sends
     * send an event with the root property name being lower case. In order to
     * match the GET, the property should be normalized to an upper case.
     * @param {Object} object
     *     The object which should be normalized.
     * @returns {Object}
     *     Return the normalized object.
     * @private
     */
    _normalize: function (object) {
        var
        restType = this.getRestType(),
        // Get the REST object name with first character being lower case.
        objRestType = restType.charAt(0).toLowerCase() + restType.slice(1);

        // Normalize payload to match REST object. The payload for an update
        // use a lower case object name as oppose to upper case. Only normalize
        // if necessary.
        if (!this.hasProperty(object, restType) && this.hasProperty(object, objRestType)) {
            //Since the object is going to be modified, clone the object so that
            //it doesn't affect others (due to OpenAjax publishing to other
            //subscriber.
            object = jQuery.extend(true, {}, object);

            object[restType] = object[objRestType];
            delete(object[objRestType]);
        }
        return object;
    },

    /**
     * Utility method to process the response of a successful get
     * @param {Object} rsp
     *     The response of a successful get
     * @returns {Boolean}
     *     True if the update was successfully processed (the response object
     *     passed the schema validation) and updated the internal data cache,
     *     false otherwise.
     * @private
     */
    _processResponse: function (rsp) {
        try {
            if (this.keepRestResponse) {
                this._restResponse = rsp.content;
            }
            return this._processObject(rsp.object);
        }
        catch (err) {
            this._logger.error(this.getRestType() + ': ' + err);
        }
        return false;
    },

    /**
     * Utility method to process the update notification.
     * @param {Object} update
     *     The payload of an update notification.
     * @returns {Boolean}
     *     True if the update was successfully processed (the update object
     *     passed the schema validation) and updated the internal data cache,
     *     false otherwise.
     * @private
     */
    _processUpdate: function (update) {
        try {
            var updateObj, requestId, fakeResponse, receivedError;

            // The backend will send the data object with a lower case. To be
            // consistent with what should be represented in this object, the
            // object name should be upper case. This will normalize the object.
            updateObj = this._normalize(update.object.Update.data);

            // Store the last event.
            this._lastUpdate = update.object;

            requestId = this._lastUpdate.Update ? this._lastUpdate.Update.requestId : undefined;

            if (requestId && this._pendingCallbacks[requestId]) {

                /**
                 * The passed success/error callbacks are expecting to be passed an AJAX response, so construct
                 * a simulated/"fake" AJAX response object from the information in the received event.
                 * The constructed object should conform to the contract for response objects specified
                 * in _createAjaxHandler().
                 **/
                fakeResponse = {};

                //The contract says that rsp.content should contain the raw text of the response so we simulate that here.
                //For some reason json2xml has trouble with the native update object, so we serialize a clone of it by
                //doing a parse(stringify(update)).
                fakeResponse.content = this._util.json2xml(gadgets.json.parse(gadgets.json.stringify(update)));

                fakeResponse.object = {};

                if (updateObj.apiErrors && updateObj.apiErrors.apiError) { //Error case

                    //TODO: The lowercase -> uppercase ApiErrors translation method below is undesirable, can it be improved?
                    receivedError = updateObj.apiErrors.apiError;
                    fakeResponse.object.ApiErrors = {};
                    fakeResponse.object.ApiErrors.ApiError = {};
                    fakeResponse.object.ApiErrors.ApiError.ErrorData = receivedError.errorData || undefined;
                    fakeResponse.object.ApiErrors.ApiError.ErrorMessage = receivedError.errorMessage || undefined;
                    fakeResponse.object.ApiErrors.ApiError.ErrorType = receivedError.errorType || undefined;

                    /**
                     * Since this is the error case, supply the error callback with a '400 BAD REQUEST' status code. We don't know what the real
                     * status code should be since the event we're constructing fakeResponse from doesn't include a status code.
                     * This is just to conform to the contract for the error callback in _createAjaxHandler().
                     **/
                    fakeResponse.status = 400;

                } else { //Success case

                    fakeResponse.object = this._lastUpdate;

                    /**
                     * Since this is the success case, supply the success callback with a '200 OK' status code. We don't know what the real
                     * status code should be since the event we're constructing fakeResponse from doesn't include a status code.
                     * This is just to conform to the contract for the success callback in _createAjaxHandler().
                     **/
                    fakeResponse.status = 200;
                }

                try {

                    if (fakeResponse.object.ApiErrors && this._pendingCallbacks[requestId].error) {
                        this._pendingCallbacks[requestId].error(fakeResponse);
                    } 
					// HTTP 202 is handled as a success, besides, we cannot infer that a non-error is a success.
					/*else if (this._pendingCallbacks[requestId].success) {
                        this._pendingCallbacks[requestId].success(fakeResponse);
                    }*/

                } catch (callbackErr) {

                    this._logger.error(this.getRestType() + ": Caught error while firing callback: " + callbackErr);

                }

                //Clean up _pendingCallbacks now that we fired a callback corresponding to the received requestId.
                delete this._pendingCallbacks[requestId];

            } else {
                this._logger.log(this.getRestType() + ": Received the following event with an invalid or unknown requestId:");
                this._logger.log(gadgets.json.stringify(update));
            }

            return this._processObject(updateObj);
        }
        catch (err) {
            this._logger.error(this.getRestType() + ': ' + err);
        }
        return false;
    },

    /**
     * Utility method to create ajax response handler closures around the
     * provided callbacks. Callbacks should be passed through from .ajax().
     * makeRequest is responsible for garbage collecting these closures.
     * @param {Object} options
     *     An object containing success and error callbacks.
     * @param {Function} options.success(rsp)
     *     A callback function to be invoked for a successful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *     }
     * @param {Function} options.error(rsp)
     *     A callback function to be invoked for an unsuccessful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
     * @private
     */
    _createAjaxHandler: function (options) {
        //We should not need to check this again since it has already been done in .restRequest()
        //options = options || {};

        //Get a reference to the parent User object
        var _this = this;

        return function (rsp) {

            var requestId, error = false, rspObj;

            if (options.success || options.error) {
                rspObj = {
                    status: rsp.rc,
                    content: rsp.text
                };

				_this._logger.log(_this.getRestType() + ": requestId='" + options.uuid + "', Returned with status=" + rspObj.status + ", content='" + rspObj.content + "'");

                //Some responses may not have a body.
                if (rsp.text.length > 0) {
                    try {
                        rspObj.object = gadgets.json.parse((_this._util.xml2json(jQuery.parseXML(rsp.text), "")));
                    } catch (e) {
                        error = true;
                        rspObj.error = {
                            errorType: "parseError",
                            errorMessage: "Could not serialize XML: " + e
                        };
                    }
                } else {
                    rspObj.object = {};
                }

                if (!error && rspObj.status >= 200 && rspObj.status < 300) {
                    if (options.success) {
                        options.success(rspObj);
                    }
                } else {
                    if (options.error) {
                        options.error(rspObj);
                    }
                }

                /*
                 * If a synchronous error happened after a non-GET request (usually a validation error), we
                 * need to clean up the request's entry in _pendingCallbacks since no corresponding event
                 * will arrive later. The corresponding requestId should be present in the response headers.
                 *
                 * It appears Shindig changes the header keys to lower case, hence 'requestid' instead of
                 * 'requestId' below.
                 **/
                if (rspObj.status !== 202 && rsp.headers && rsp.headers.requestid) {
                    requestId = rsp.headers.requestid[0];
                    if (_this._pendingCallbacks[requestId]) {
                        delete _this._pendingCallbacks[requestId];
                    }
                }
            }
        };
    },

    /**
     * Utility method to make an asynchronous request
     * @param {String} url
     *     The unencoded URL to which the request is sent (will be encoded)
     * @param {Object} options
     *     An object containing additional options for the request.
     * @param {Object} options.content
     *     An object to send in the content body of the request. Will be
     *     serialized into XML before sending.
     * @param {String} options.method
     *     The type of request. Defaults to "GET" when none is specified.
     * @param {Function} options.success(rsp)
     *     A callback function to be invoked for a successful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *     }
     * @param {Function} options.error(rsp)
     *     A callback function to be invoked for an unsuccessful request.
     *     {
     *         status: {Number} The HTTP status code returned
     *         content: {String} Raw string of response
     *         object: {Object} Parsed object of response
     *         error: {Object} Wrapped exception that was caught
     *         error.errorType: {String} Type of error that was caught
     *         error.errorMessage: {String} Message associated with error
     *     }
    */
    restRequest: function (url, options) {

        var params, encodedUrl;

        params = {};

        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        options = options || {};
        options.success = this._util.validateHandler(options.success);
        options.error = this._util.validateHandler(options.error);

        // Request Headers
        params[gadgets.io.RequestParameters.HEADERS] = {};

        // HTTP method is a passthrough to gadgets.io.makeRequest, makeRequest defaults to GET
        params[gadgets.io.RequestParameters.METHOD] = options.method;

        //true if this should be a GET request, false otherwise
        if (!options.method || options.method === "GET") {
            //Disable caching for GETs
            if (url.indexOf("?") > -1) {
                url += "&";
            } else {
                url += "?";
            }
            url += "nocache=" + this._util.currentTimeMillis();
        } else {
            /**
             * If not GET, generate a requestID and add it to the headers, then wrap
             * callbacks into an object and store it in _pendingCallbacks.
             * If we receive a synchronous error response instead of a 202 as expected,
         * the AJAX handler will clean up _pendingCallbacks.
             **/
            /*
             * TODO: Clean up _pendingCallbacks if an entry persists after a certain amount of time has passed.
             * In the block below, can store the current time (new Date().getTime()) alongside the
             * callbacks in the new _pendingCallbacks entry. Then iterate through a copty of _pendingCallbacks,
             * deleting all entries inside _pendingCallbacks that are older than a certain threshold (2 minutes for example.)
             * This solves a potential memory leak issue if we never receive an event for a given stored requestId;
             * we don't want to store unfired callbacks forever.
             */
            options.uuid = this._util.generateUUID();
            params[gadgets.io.RequestParameters.HEADERS].requestId = options.uuid;
            //By default, Shindig strips nearly all of the response headers, but this parameter tells Shindig
            //to send the headers through unmodified; we need to be able to read the 'requestId' header if we
            //get a synchronous error as a result of a non-GET request. (See the bottom of _createAjaxHandler().)
            params[gadgets.io.RequestParameters.GET_FULL_HEADERS] = "true";
            this._pendingCallbacks[options.uuid] = {};
            this._pendingCallbacks[options.uuid].success = options.success;
            this._pendingCallbacks[options.uuid].error = options.error;
        }

        //debugger;
        // NAT: IGNORE this until you hit save after changing assignments, then
        // pause here and set window.errorOnRequest to true, step past the next line,
        // and then set it to false. True value will throw an error when saving assignments.
		encodedUrl = encodeURI(url) + (window.errorOnRestRequest ? "ERROR" : "");

		this._logger.log(this.getRestType() + ": requestId='" + options.uuid + "', Making REST request: method=" + (options.method || "GET") + ", url='" + encodedUrl + "'");

        // Content Body
        if (typeof options.content === "object") {
            // Content Type
            params[gadgets.io.RequestParameters.HEADERS]["Content-Type"] = "application/xml";
            // Content
            params[gadgets.io.RequestParameters.POST_DATA] = this._util.json2xml(options.content);
			
			if (!this.doNotLog) {
				this._logger.log(this.getRestType() + ": requestId='" + options.uuid + "', POST_DATA='" + params[gadgets.io.RequestParameters.POST_DATA] + "'");
			}
        }

        finesse.clientservices.ClientServices.makeRequest(encodedUrl, this._createAjaxHandler(options), params);
    },

    /**
     * Retrieves a reference to a particular notifierType.
     * @param notifierType is a string which indicates the notifier to retrieve
     * ('load', 'change', 'add', 'delete', 'error')
     * @return {Notifier}
     */
    _getNotifierReference: function (notifierType) {
        var notifierReference = null;
        if (notifierType === 'load') {
            notifierReference = this._loadNotifier;
        } else if (notifierType === 'change') {
            notifierReference = this._changeNotifier;
        } else if (notifierType === 'add') {
            notifierReference = this._addNotifier;
        } else if (notifierType === 'delete') {
            notifierReference = this._deleteNotifier;
        } else if (notifierType === 'error') {
            notifierReference = this._errorNotifier;
        } else {
            throw new Error("_getNotifierReference(): Trying to get unknown notifier(notifierType=" + notifierType + ")");
        }

        return notifierReference;
    }
});
/**
 * @fileOverview JavaScript base object that all REST collection objects should
 * inherit from because it encapsulates and provides the common functionality
 * that all REST objects need.
 *
 * @name finesse.restservices.RestCollectionBase
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/**
 * @class
 * JavaScript representation of a REST collection object.
 *
 * @constructor
 * @param {Function} callbacks.onCollectionAdd(this)
 *     Callback to invoke upon successful item addition to the collection.
 * @param {Function} callbacks.onCollectionDelete(this)
 *     Callback to invoke upon successful item deletion from the collection.
 * @borrows finesse.restservices.RestBase as finesse.restservices.RestCollectionBase
 */
finesse.restservices.RestCollectionBase = finesse.restservices.RestBase.extend({

    /**
     * Boolean function that specifies whether the collection handles subscribing
     * and propagation of events for the individual REST object items the
     * collection holds. False by default. Subclasses should override if true.
     */
    supportsRestItemSubscriptions: false,

    /**
     * Gets the constructor the individual items that make of the collection.
     * For example, a Dialogs collection object will hold a list of Dialog items.
     * @throws Error because subtype must implement.
     */
    getRestItemClass: function () {
        throw new Error("getRestItemClass(): Not implemented in subtype.");
    },

    /**
     * Gets the REST type of the individual items that make of the collection.
     * For example, a Dialogs collection object will hold a list of Dialog items.
     * @throws Error because subtype must implement.
     */
    getRestItemType: function () {
        throw new Error("getRestItemType(): Not implemented in subtype.");
    },

    /**
     * The base REST URL in which items this object contains can be referenced.
     * @return {String}
     *     The REST URI for items this object contains.
     */
    getRestItemBaseUrl: function () {
        var
        restUrl = "/finesse/api";

        //Append the REST type.
        restUrl += "/" + this.getRestItemType();

        return restUrl;
    },

    /**
	 * The _addHandlerCb and _deleteHandlerCb require that data be passed in the
	 * format of an array of {(Object Type): object} objects. For example, a
	 * queues object would return [{Queue: queue1}, {Queue: queue2}, ...].
	 */
    extractCollectionData: function () {
        var restObjs = this._data[this.getRestItemType()],
        obj,
        result = [],
        _this = this;
        
        // check if there are multiple objects to pass
        if ($.isArray(restObjs)) {
            // if so, create an object for each and add to result array
            $.each(restObjs, function (id, object) {
                obj = {};
                obj[_this.getRestItemType()] = object;
                result.push(obj);
            });
        } else {
            // else just push the one object
            result.push(this._data);
        }
        
        return result;
    },

    /**
     * For Finesse, collections are handled uniquely on a POST and
     * doesn't necessary follow REST conventions. A POST on a collection
     * doesn't mean that the collection has been created, it means that an
     * item has been added to the collection. This function will generate
     * a closure which will handle this logic appropriately.
     * @param {Object} scope
     *     The scope of where the callback should be invoked.
     * @private
     */
    _addHandlerCb: function (scope) {
        return function (restItem) {
            var data = restItem.extractCollectionData(),
            
            /*
             * Creates a new object from the given data
             */
            _objectCreator = function (object) {
                var objectId = scope._extractId(object),
                newRestObj = scope._collection[objectId];
    
                //Prevent duplicate entries into collection.
                if (!newRestObj) {
                    //Create a new REST object using the subtype defined by the
                    //overridden method.
                    newRestObj = new (scope.getRestItemClass())({
                        id: objectId,
                        data: object,
                        onLoad: function (newObj) {
                            //Normalize and add  REST object to collection datastore.
                            scope._collection[objectId] = newObj;
                            scope._collectionAddNotifier.notifyListeners(newObj);
                            scope.length += 1;
                        }
                    });
                }
                else {
                    //If entry already exist in collection, process the new event,
                    //and notify all change listeners since an existing object has
                    //change. This could happen in the case when the Finesse server
                    //cycles, and sends a snapshot of the user's calls.
                    newRestObj._processObject(object);
                    newRestObj._changeNotifier.notifyListeners(newRestObj);
                }
            };

            $.each(data, function (id, object) {
                _objectCreator(object);
            });
        };
    },

    /**
     * For Finesse, collections are handled uniquely on a DELETE and
     * doesn't necessary follow REST conventions. A DELETE on a collection
     * doesn't mean that the collection has been deleted, it means that an
     * item has been deleted from the collection. This function will generate
     * a closure which will handle this logic appropriately.
     * @param {Object} scope
     *     The scope of where the callback should be invoked.
     * @private
     */
    _deleteHandlerCb: function (scope) {
        return function (restItem) {
            var data = restItem.extractCollectionData(),

            /*
             * Deletes and object and notifies its handlers
             */
            _objectDeleter = function (object) {
                var objectId = scope._extractId(object);
                object = scope._collection[objectId];
                if (object) {
                    //Notify listeners and delete from internal datastore.
                    scope._collectionDeleteNotifier.notifyListeners(object);
                    delete scope._collection[objectId];
                    scope.length -= 1;
                }
            };

            $.each(data, function (id, obj) {
                _objectDeleter(obj);
            });
        };
    },

    /**
     * Utility method to process the update notification for Rest Items
     * that are children of the collection whose events are published to
     * the collection's node.
     * @param {Object} update
     *     The payload of an update notification.
     * @returns {Boolean}
     *     True if the update was successfully processed (the update object
     *     passed the schema validation) and updated the internal data cache,
     *     false otherwise.
     * @private
     */
    _processRestItemUpdate: function (update) {
        var object, objectId, updateObj = update.object.Update;

        //Extract the ID from the source if the Update was an error.
        if (updateObj.data.apiErrors) {
            objectId = finesse.utilities.Utilities.getId(updateObj.source);
        }
        //Otherwise extract from the data object itself.
        else {
            objectId = this._extractId(updateObj.data);
        }

        object = this._collection[objectId];
        if (object) {
            if (object._processUpdate(update)) {
                switch (updateObj.event) {
                case "POST":
                    object._addNotifier.notifyListeners(object);
                    break;
                case "PUT":
                    object._changeNotifier.notifyListeners(object);
                    break;
                case "DELETE":
                    object._deleteNotifier.notifyListeners(object);
                    break;
                }
            }
        }
    },

    /**
     * SUBCLASS IMPLEMENTATION (override):
     * For collections, this callback has the additional responsibility of passing events
     * of collection item updates to the item objects themselves. The collection needs to
     * do this because item updates are published to the collection's node.
     * @returns {Function}
     *     The callback to be invoked when an update event is received
     */
    _createPubsubCallback: function () {
        var _this = this;
        return function (update) {
            //If the source of the update is our REST URL, this means the collection itself is modified
            if (update.object.Update.source === _this.getRestUrl()) {
                _this._updateEventHandler(_this, update);
            } else {
                //Otherwise, it is safe to assume that if we got an event on our topic, it must be a
                //rest item update of one of our children that was published on our node (OpenAjax topic)
                _this._processRestItemUpdate(update);
            }
        };
    },

    /**
     * Initializes the object.
     * @param {Object} callbacks
     *     Object of callbacks (onLoad, onChange, onError, onAdd, onDelete)
     * @param {RestBase} [restObj]
     *     A RestBase object which this object has an association with.
     */
    init: function (options) {

        options = options || {};
        options.id = "";

        //Make internal datastore collection to hold a list of objects.
        this._collection = {};
        this.length = 0;

        //Collections will have additional callbacks that will be invoked when
        //an item has been added/deleted.
        this._collectionAddNotifier = new finesse.restservices.Notifier();
        this._collectionDeleteNotifier = new finesse.restservices.Notifier();

        //Initialize the base class.
        this._super(options);

        this.addHandler('collectionAdd', options.onCollectionAdd);
        this.addHandler('collectionDelete', options.onCollectionDelete);

        //For Finesse, collections are handled uniquely on a POST/DELETE and
        //doesn't necessary follow REST conventions. A POST on a collection
        //doesn't mean that the collection has been created, it means that an
        //item has been added to the collection. A DELETE means that an item has
        //been removed from the collection. Due to this, we are attaching
        //special callbacks to the add/delete that will handle this logic.
        this.addHandler("add", this._addHandlerCb(this));
        this.addHandler("delete", this._deleteHandlerCb(this));
    },

    /**
     * Returns the collection.
     * @returns {Object}
     *     The collection as an object
     */
    getCollection: function () {
        //TODO: is this safe? or should we instead return protected functions such as .each(function)?
        return this._collection;
    },

    /**
     * Utility method to build the internal collection data structure (object) based on provided data
     * @param {Object} data
     *     The data to build the internal collection from
     * @private
     */
    _buildCollection: function (data) {
        var i, object, objectId, dataArray;
        if (data && this.getProperty(data, this.getRestItemType()) !== null) {
            dataArray = finesse.utilities.Utilities.getArray(this.getProperty(data, this.getRestItemType()));
            for (i = 0; i < dataArray.length; i += 1) {

                object = {};
                object[this.getRestItemType()] = dataArray[i];
                objectId = this._extractId(object);
                this._collection[objectId] = new (this.getRestItemClass())({
                    id: objectId,
                    data: object
                });
                this.length += 1;
            }
        }
    },

    /**
     * Validate and store the object into the internal data store.
     * SUBCLASS IMPLEMENTATION (override):
     * Performs collection specific logic to _buildCollection internally based on provided data
     * @param {Object} object
     *     The JavaScript object that should match of schema of this REST object.
     * @returns {Boolean}
     *     True if the object was validated and stored successfully.
     * @private
     */
    _processObject: function (object) {
        if (this._validate(object)) {
            this._data = this.getProperty(object, this.getRestType()); // Should clone the object here?

            // If loaded for the first time, call the load notifiers.
            if (!this._loaded) {
                this._buildCollection(this._data);
                this._loaded = true;
                this._loadNotifier.notifyListeners(this);
            }

            return true;
        }
        return false;
    },

    /**
     * Retrieves a reference to a particular notifierType.
     * @param {String} notifierType
     *      Specifies the notifier to retrieve (load, change, error, add, delete)
     * @return {Notifier} The notifier object.
     */
    _getNotifierReference: function (notifierType) {
        var notifierReference;

        try {
            //Use the base method to get references for load/change/error.
            notifierReference = this._super(notifierType);
        } catch (err) {
            //Check for add/delete
            if (notifierType === "collectionAdd") {
                notifierReference = this._collectionAddNotifier;
            } else if (notifierType === "collectionDelete") {
                notifierReference = this._collectionDeleteNotifier;
            } else {
                //Rethrow exception from base class.
                throw err;
            }
        }
        return notifierReference;
    }
});
/**
 * @fileOverview JavaScript representation of the Finesse User object
 *
 * @name finesse.restservices.User
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.User = finesse.restservices.RestBase.extend(/** @lends finesse.restservices.User.prototype */{

    _dialogs : null,
    _clientLogObj : null,
    _wrapUpReasons : null,
    _phoneBooks : null,
    _mediaPropertiesLayout : null,
    _queues : null,
    /**
     * @class
     * JavaScript representation of a User object. Also exposes methods to operate
     * on the object against the server.
     *
     * @param {Object} options
     *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.User
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the User object.
     */
    getRestClass: function () {
        return finesse.restservices.User;
    },

    /**
    * @private
     * Gets the REST type for the current object - this is a "User".
     */
    getRestType: function () {
        return "User";
    },
    /**
     * overloading this to return URI
     */
    getXMPPNodePath: function () {
        return this.getRestUrl();
    },
    /**
    * @private
     * Returns whether this object supports subscriptions
     */
    supportsSubscriptions: function () {
        return true;
    },

    /**
     * Getter for the firstName of this User
     * @returns {String}
     *     The firstName for this User
     */
    getFirstName: function () {
        this.isLoaded();
        return this.getData().firstName;
    },

    /**
     * Getter for the lastName of this User
     * @returns {String}
     *     The lastName for this User
     */
    getLastName: function () {
        this.isLoaded();
        return this.getData().lastName;
    },

    /**
     * Getter for the extension of this User
     * @returns {String}
     *     The extension, if any, of this User
     */
    getExtension: function () {
        this.isLoaded();
        return this.getData().extension;
    },

    /**
     * Is user an agent?
     * @returns {boolean} if user has role of agent
     */
    hasAgentRole: function () {
        this.isLoaded();
        return this.hasRole("Agent");
    },

    /**
     * Is user a supervisor?
     * @returns {boolean} if user has role of supervisor
     */
    hasSupervisorRole: function () {
        this.isLoaded();
        return this.hasRole("Supervisor");
    },

    /**
     * Checks to see if user has "theRole"
     * @returns {boolean}
     */
    hasRole: function (theRole) {
        this.isLoaded();
        var result = false, i, roles, len;

        roles = this.getData().roles.role;
        len = roles.length;
        if (typeof roles === 'string') {
            if (roles === theRole) {
                result = true;
            }
        } else {
            for (i = 0; i < len ; i = i + 1) {
                if (roles[i] === theRole) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    },

    /**
     * Getter for the state of this User
     * @returns {String}
     *     The current (or last fetched) state of this User
     */
    getState: function () {
        this.isLoaded();
        return this.getData().state;
    },
    
    /**
     * Getter for the state change time of this User
     * @returns {String}
     *     The state change time of this User
     */
    getStateChangeTime: function () {
        this.isLoaded();
        return this.getData().stateChangeTime;
    },

    /**
     * Checks to see if the user is considered a mobile agent by checking for
     * the existance of the mobileAgent node.
     * @returns {Boolean}
     *      True if this agent is a mobile agent.
     */
    isMobileAgent: function () {
        this.isLoaded();
        var ma = this.getData().mobileAgent;
        return ma !== null && typeof ma === "object";
    },

    /**
     * Getter for the mobile agent work mode.
     * @returns {String}
     *      If available, return the mobile agent work mode, otherwise null
     */
    getMobileAgentMode: function () {
        this.isLoaded();
        if (this.isMobileAgent()) {
            return this.getData().mobileAgent.mode;
        }
        return null;
    },

    /**
     * Getter for the mobile agent dial number.
     * @returns {String}
     *      If available, return the mobile agent dial number, otherwise null.
     */
    getMobileAgentDialNumber: function () {
        this.isLoaded();
        if (this.isMobileAgent()) {
            return this.getData().mobileAgent.dialNumber;
        }
        return null;
    },

    /**
     * Getter for a Dialogs collection object that is associated with User.
     * @returns {Dialogs}
     *     A Dialogs collection object.
     */
    getDialogs: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (this._dialogs === null) {
            this._dialogs = new finesse.restservices.Dialogs(options);
        }

        return this._dialogs;
    },
    
    /**
     * Getter for a ClientLog object that is associated with User.
     * @returns {ClientLog}
     *     A ClientLog collection object.
     */
    getClientLog: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();
       
        if (this._clientLogObj === null) {
            this._clientLogObj = new finesse.restservices.ClientLog(options);
        }
        else {
            if(options.onLoad && typeof options.onLoad === "function") {
            options.onLoad(this._clientLogObj);
            }
        }
        return this._clientLogObj;
    },
   
    
    /**
     * Getter for a WrapUpReasons collection object that is associated with User.
     * @param handlers
     * @returns {WrapUpReasons}
     *     A WrapUpReasons collection object.
     */
    getWrapUpReasons: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (this._wrapUpReasons === null) {
            this._wrapUpReasons = new finesse.restservices.WrapUpReasons(options);
        }

        return this._wrapUpReasons;
    },

    /**
     * Getter for a PhoneBooks collection object that is associated with User.
     * @param handlers
     * @returns {PhoneBooks}
     *     A PhoneBooks collection object.
     */
    getPhoneBooks: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (this._phoneBooks === null) {
            this._phoneBooks = new finesse.restservices.PhoneBooks(options);
        }

        return this._phoneBooks;
    },

    /**
     * Getter for a MediaPropertiesLayout object that is associated with User.
     * @returns {finesse.restservices.MediaPropertiesLayout}
     *     The MediaPropertiesLayout object associated with this user
     */
    getMediaPropertiesLayout: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        options.id = this._id;

        this.isLoaded();
        if (this._mediaPropertiesLayout === null) {
            this._mediaPropertiesLayout = new finesse.restservices.MediaPropertiesLayout(options);
        }
        return this._mediaPropertiesLayout;
    },

    /**
     * Getter for the supervised Teams this User (Supervisor) supervises, if any
     * @returns {Array}
     *     An array of teams supervised by this User (Supervisor)
     */
    getSupervisedTeams: function () {
        this.isLoaded();

        try {
            return finesse.utilities.Utilities.getArray(this.getData().teams.Team);
        } catch (e) {
            return [];
        }

    },

    /**
     * Perform an agent login for this user, associating him with the
     * specified extension.
     * @param {Object} params
     *     An object containing properties for agent login.
     * @param {String} params.extension
     *     The extension to associate with this user
     * @param {Object} [params.mobileAgent]
     *     A mobile agent object containing the mode and dial number properties.
     * @param {Object} params.handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.User}
     *     This User object to allow cascading
     * @private
     */
    _login: function (params) {
        var handlers, contentBody = {},
        restType = this.getRestType();
        
        // Protect against null derefernecing.
        params = params || {};

        contentBody[restType] = {
            "state": finesse.restservices.User.States.LOGIN,
            "extension": params.extension
        };

        // Create mobile agent node if available.
        if (typeof params.mobileAgent === "object") {
            contentBody[restType].mobileAgent = {
                "mode": params.mobileAgent.mode,
                "dialNumber": params.mobileAgent.dialNumber
            };
        }

        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        handlers = params.handlers || {};

        this.restRequest(this.getRestUrl(), {
            method: 'PUT',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });

        return this; // Allow cascading
    },

    /**
     * Perform an agent login for this user, associating him with the
     * specified extension.
     * @param {String} extension
     *     The extension to associate with this user
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.User}
     *     This User object to allow cascading
     */
    login: function (extension, handlers) {
        this.isLoaded();
        var params = {
            "extension": extension,
            "handlers": handlers
        };
        return this._login(params);
    },

    /**
     * Perform an agent login for this user, associating him with the
     * specified extension.
     * @param {String} extension
     *     The extension to associate with this user
     * @param {String} mode
     *     The mobile agent work mode as defined in finesse.restservices.User.WorkMode.
     * @param {String} extension
     *     The external dial number desired to be used by the mobile agent.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.User}
     *     This User object to allow cascading
     */
    loginMobileAgent: function (extension, mode, dialNumber, handlers) {
        this.isLoaded();
        var params = {
            "extension": extension,
            "mobileAgent": {
                "mode": mode,
                "dialNumber": dialNumber
            },
            "handlers": handlers
        };
        return this._login(params);
    },

    /**
     * Perform an agent logout for this user.
     * @param {String} reasonCode
     *     The reason this user is logging out.  Pass null for no reason.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.User}
     *     This User object to allow cascading
     */
    logout: function (reasonCode, handlers) {
        return this.setState("LOGOUT", reasonCode, handlers);
    },

    /**
     * Set the state of the user.
     * @param {String} newState
     *     The state you are setting
     * @param {ReasonCode} reasonCode
     *     The reason this user is logging out.  Pass null for no reason.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.User}
     *     This User object to allow cascading
     */
    setState: function (newState, reasonCode, handlers) {
        this.isLoaded();

        var options, contentBody = {};

        if (!reasonCode) {
            contentBody[this.getRestType()] = {
                "state": newState
            };
        } else {
            contentBody[this.getRestType()] = {
                "state": newState,
                "reasonCodeId": reasonCode.id
            };
        }

        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        handlers = handlers || {};

        options = {
            method: 'PUT',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        };

        // After removing the selective 202 handling, we should be able to just use restRequest
        this.restRequest(this.getRestUrl(), options);

        return this; // Allow cascading
    },

    /**
     * Make call to a particular phone number.
     *
     * @param {String} The number to call
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    makeCall: function (number, handlers) {
        this.isLoaded();

        this.getDialogs().createNewCallDialog(number, this.getExtension(), handlers);

        return this; // Allow cascading
    },

    /**
     * Make a silent monitor call to a particular agent's phone number.
     *
     * @param number to call
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    makeSMCall: function (number, handlers) {
        this.isLoaded();

        var actionType = "SILENT_MONITOR";

        this.getDialogs().createNewSuperviseCallDialog(number, this.getExtension(), actionType, handlers);

        return this; // Allow cascading
    },
    

    /**
     * Make a silent monitor call to a particular agent's phone number.
     *
     * @param number to call
     * @param {String} dialogUri
     *     The associated uri of SUPERVISOR_MONITOR call
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    makeBargeCall:function (number,dialogURI, handlers) {
        this.isLoaded();
        var actionType = "BARGE_CALL";
        this.getDialogs().createNewBargeCall( this.getExtension(), number, actionType, dialogURI,handlers);

        return this; // Allow cascading
    },
    
    /**
     * Returns true if the user's current state will result in a pending state change. A pending state
     * change is a request to change state that does not result in an immediate state change. For
     * example if an agent attempts to change to the NOT_READY state while in the TALKING state, the
     * agent will not change state until the call ends.
     *
     * The current set of states that result in pending state changes is as follows:
     *     TALKING
     *     HOLD
     *     RESERVED_OUTBOUND_PREVIEW
     */
    isPendingStateChange: function () {
        var state = this.getState();
        return state && ((state === finesse.restservices.User.States.TALKING) || (state === finesse.restservices.User.States.HOLD) || (state === finesse.restservices.User.States.RESERVED_OUTBOUND_PREVIEW));
    },

    /**
     * Parses a uriString to retrieve the id portion
     * @param {String} uriString
     * @return {String} id
     */
    _parseIdFromUriString : function (uriString) {
        return finesse.utilities.Utilities.getId(uriString);
    },

    /**
     * Gets the user's Not Ready reason code.
     * @return undefined if not set or indeterminate
     */
    getNotReadyReasonCodeId : function () {
        this.isLoaded();

        var reasoncodeIdResult, finesseServerReasonCodeId;
        finesseServerReasonCodeId = this.getData().reasonCodeId;

        //FinesseServer will give "-l" => we will set to undefined (for convenience)
        if (finesseServerReasonCodeId !== "-1") {
            reasoncodeIdResult = finesseServerReasonCodeId;
        }

        return reasoncodeIdResult;
    },

    /**
     * Performs a GET against the Finesse server looking up the reasonCodeId specified.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @param {String} reasonCodeId is the id for the reason code to lookup
     */
    getReasonCodeById : function (handlers, reasonCodeId)
    {
        var self = this, contentBody, reasonCode, url;
        contentBody = {};

        url = this.getRestUrl() + "/ReasonCode/" + reasonCodeId;
        this.restRequest(url, {
            method: 'GET',
            success: function (rsp) {
                reasonCode = {
                    uri: rsp.object.ReasonCode.uri,
                    label: rsp.object.ReasonCode.label,
                    id: self._parseIdFromUriString(rsp.object.ReasonCode.uri)
                };
                handlers.success(reasonCode);
            },
            error: function (rsp) {
                handlers.error(rsp);
            },
            content: contentBody
        });
    },

    /**
     * Performs a GET against Finesse server retrieving all the specified type of reason codes.
     * @param {String} type (LOGOUT or NOT_READY)
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    _getReasonCodesByType : function (type, handlers)
    {
        var self = this, contentBody = {}, url, reasonCodes, i, reasonCodeArray;

        url = this.getRestUrl() + "/ReasonCodes?category=" + type;
        this.restRequest(url, {
            method: 'GET',
            success: function (rsp) {
                reasonCodes = [];

                reasonCodeArray = rsp.object.ReasonCodes.ReasonCode;
                if (reasonCodeArray === undefined) {
                    reasonCodes = undefined;
                } else if (reasonCodeArray[0] !== undefined) {
                    for (i = 0; i < reasonCodeArray.length; i = i + 1) {
                        reasonCodes[i] = {
                            label: rsp.object.ReasonCodes.ReasonCode[i].label,
                            id: self._parseIdFromUriString(rsp.object.ReasonCodes.ReasonCode[i].uri)
                        };
                    }
                } else {
                    reasonCodes[0] = {
                        label: rsp.object.ReasonCodes.ReasonCode.label,
                        id: self._parseIdFromUriString(rsp.object.ReasonCodes.ReasonCode.uri)
                    };
                }
                handlers.success(reasonCodes);
            },
            error: function (rsp) {
                handlers.error(rsp);
            },
            content: contentBody
        });
    },

    /**
     * Performs a GET against Finesse server retrieving all the Signout reason codes.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    getSignoutReasonCodes : function (handlers)
    {
        this._getReasonCodesByType("LOGOUT", handlers);
    },

    /**
     * Performs a GET against Finesse server retrieving all the Not Ready reason codes.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    getNotReadyReasonCodes : function (handlers)
    {
        this._getReasonCodesByType("NOT_READY", handlers);
    }

});

/**
 * State constants
 */
finesse.restservices.User.States = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    NOT_READY: "NOT_READY",
    READY: "READY",
    RESERVED: "RESERVED",
    RESERVED_OUTBOUND: "RESERVED_OUTBOUND",
    RESERVED_OUTBOUND_PREVIEW: "RESERVED_OUTBOUND_PREVIEW",
    TALKING: "TALKING",
    HOLD: "HOLD",
    WORK: "WORK",
    WORK_READY: "WORK_READY"
};

/**
 * Mobile agent/supervisor work modes.
 */
finesse.restservices.User.WorkMode = {
    CALL_BY_CALL: "CALL_BY_CALL",
    NAILED_CONNECTION: "NAILED_CONNECTION"
};
/**
 * @fileOverview JavaScript representation of the Finesse Users collection
 * object which contains a list of Users objects.
 *
 * @name finesse.restservices.Users
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 * @requires finesse.restservices.RestCollectionBase
 * @requires finesse.restservices.User
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.Users = finesse.restservices.RestCollectionBase.extend(/** @lends finesse.restservices.Users.prototype */{

    /**
     * @class
     * JavaScript representation of the Finesse Users collection
     * object which contains a list of Users objects.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.Users
     **/
	init: function (options) {
		this._super(options);
	},

	/**
     * @private
	 * Gets the REST class for the current object - this is the Users class.
	 */
	getRestClass: function () {
	    return finesse.restservices.Users;
	},

	/**
     * @private
	 * Gets the REST class for the objects that make up the collection. - this
	 * is the User class.
	 */
	getRestItemClass: function () {
		return finesse.restservices.User;
	},

	/**
     * @private
	 * Gets the REST type for the current object - this is a "Users".
	 */
	getRestType: function () {
	    return "Users";
	},

	/**
     * @private
	 * Gets the REST type for the objects that make up the collection - this is "User".
	 */
	getRestItemType: function () {
	    return "User";
	},

	/**
     * @private
     * Gets the node path for the current object - this is the team Users node
     * @returns {String} The node path
     */
    getXMPPNodePath: function () {
		return this.getRestUrl();
    },

	/**
     * @private
     * Override default to indicates that the collection doesn't support making
	 * requests.
	 */
	supportsRequests: false,
	
    /**
     * @private
     * Override default to indicate that we need to subscribe explicitly
     */
    explicitSubscription: true
    
});/**
 * @fileOverview JavaScript representation of the Finesse Dialog object.
 *
 * @name finesse.restservices.Dialog
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.Dialog = finesse.restservices.RestBase.extend(/** @lends finesse.restservices.Dialog.prototype */{

    /**
     * @class
     * JavaScript representation of a Dialog object. Also exposes methods to operate
     * on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.Dialog
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the Dialog class.
     * @returns {Object} The Dialog class.
     */
    getRestClass: function () {
        return finesse.restservices.Dialog;
    },
    
    //constant for agent device
    _agentDeviceType: "AGENT_DEVICE",
    
    /**
     * @private
     * Gets the REST type for the current object - this is a "Dialog".
     * @returns {String} The Dialog string.
     */
    getRestType: function () {
        return "Dialog";
    },

    /**
     * @private
     * Override default to indicate that this object doesn't support making
     * requests.
     */
    supportsRequests: false,

    /**
     * @private
     * Override default to indicate that this object doesn't support subscriptions.
     */
    supportsSubscriptions: false,

    /**
     * Getter for the DNIS.
     * @returns {String} The DNIS.
     */
    getDNIS: function () {
        this.isLoaded();
        return this.getData().DNIS;
    },

    /**
     * Getter for the from address.
     * @returns {String} The from address.
     */
    getFromAddress: function () {
        this.isLoaded();
        return this.getData().fromAddress;
    },

    /**
     * Getter for the to address.
     * @returns {String} The to address.
     */
    getToAddress: function () {
        this.isLoaded();
        return this.getData().toAddress;
    },
    /**
     * Getter for the media type.
     * @returns {String} The media type.
     */
    getMediaType: function () {
        this.isLoaded();
        return this.getData().mediaType;
    },
/**
     * Getter for the uri.
     * @returns {String} The uri.
     */
    getDialogUri: function () {
        this.isLoaded();
        return this.getData().uri;
    },

    /**
     * Getter for the callType.
     * @returns {String} The callType.
     */
    getCallType: function () {
        this.isLoaded();
        return this.getData().mediaProperties.callType;
    },

    /**
     * Getter for the Dialog state.
     * @returns {String} The Dialog state.
     */
    getState: function () {
        this.isLoaded();
        return this.getData().state;
    },

    /**
     * Retrieves a list of participants within the Dialog object.
     * @returns {Object} List of
     */
    getParticipants: function () {
        this.isLoaded();
        var participants = this.getData().participants.Participant;
        //Due to the nature of the XML->JSO converter library, a single
        //element in the XML array will be considered to an object instead of
        //a real array. This will handle those cases to ensure that an array is
        //always returned.

        return finesse.utilities.Utilities.getArray(participants);
    },

    /**
     * Determines the droppable participants.  A droppable participant is a participant that is an agent extension.   
     * (It is not a CTI Route Point, IVR Port, or the caller)
     * 
     * @param filterExtension used to remove a single extension from the list
     * @returns participants which is an array of all participants which can be dropped
     */
    getDroppableParticipants: function (filterExtension) {
      this.isLoaded();
      var droppableParticipants = [], participants, index, idx, filterExtensionToRemove = "", callStateOk, part;

      participants = this.getParticipants();

      if (filterExtension)
      {
        filterExtensionToRemove = filterExtension;
      }

      //Loop through all the participants to remove non-agents & remove filterExtension
      //We could have removed filterExtension using splice, but we have to iterate through
      //the list anyway.
      for(idx=0;idx<participants.length;idx=idx+1)
      {
        part = participants[idx];

        //Skip the filterExtension
        if (part.mediaAddress !== filterExtensionToRemove)
        {
            callStateOk = this._isParticipantStateDroppable(part);

            //Remove non-agents & make sure callstate 
            if (callStateOk === true && part.mediaAddressType === this._agentDeviceType)
            {
              droppableParticipants.push(part);
            }
        }
    }

    return finesse.utilities.Utilities.getArray(droppableParticipants);
    },

    _isParticipantStateDroppable : function (part)
    {
      var isParticipantStateDroppable = false;
      if (part.state === finesse.restservices.Dialog.States.ACTIVE || part.state === finesse.restservices.Dialog.States.ACCEPTED || part.state === finesse.restservices.Dialog.States.HELD)
      {
        isParticipantStateDroppable = true;
      }
      
      return isParticipantStateDroppable;
    },
    
    /**
     * Is the participant droppable
     *
     * @param participantExt
     * @returns boolean
     */
    isParticipantDroppable : function (participantExt) {
      var droppableParticipants = null, isDroppable = false, idx, part, callStateOk;
      
      droppableParticipants = this.getDroppableParticipants();
      
      if (droppableParticipants) 
      {
        for(idx=0;idx<droppableParticipants.length;idx=idx+1)
        {
          part = droppableParticipants[idx];
         
          if (part.mediaAddress === participantExt)
          {
            callStateOk = this._isParticipantStateDroppable(part);

            //Remove non-agents & make sure callstate 
            if (callStateOk === true && part.mediaAddressType === this._agentDeviceType)
            {
              isDroppable = true;
              break;
            }
          }
        }
      }
      
      return isDroppable;
	},
	
    /**
     * Retrieves a list of media properties a.k.a. call variables from the dialog object
     * @returns {Object} Map of call variables; names mapped to values
     */
    getMediaProperties: function () {

        var mpData, resultMap = {};

        this.isLoaded();

        mpData = this.getData().mediaProperties;

        if (mpData) {

            if (this.getState() !== finesse.restservices.Dialog.States.INITIATING) {

                if (mpData.callvariables && mpData.callvariables.CallVariable) {
                    jQuery.each(mpData.callvariables.CallVariable, function (i, callVariable) {
                        resultMap[callVariable.name] = callVariable.value;
                    });
                }

            }

            if (mpData.wrapUpReason) {
                resultMap.wrapUpReason = mpData.wrapUpReason;
            }

        }

        return resultMap;
    },

    /**
     * @private
     * Invoke a request to the server given a content body and handlers.
     *
     * @param {Object} contentBody
     *     A JS object containing the body of the action request.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    _makeRequest: function (contentBody, handlers) {
        // Protect against null dereferencing of options allowing its
        // (nonexistant) keys to be read as undefined
        handlers = handlers || {};

        this.restRequest(this.getRestUrl(), {
            method: 'PUT',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });
    },

    /**
     * Invoke a consult call out to a destination.
     *
     * @param {String} mediaAddress
     *     The media address of the user performing the consult call.
     * @param {String} toAddress
     *     The destination address of the consult call.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    makeConsultCall: function (mediaAddress, toAddress, handlers) {
        this.isLoaded();
        var contentBody = {};
        contentBody[this.getRestType()] = {
            "targetMediaAddress": mediaAddress,
            "toAddress": toAddress,
            "requestedAction": finesse.restservices.Dialog.Actions.CONSULT_CALL
        };
        this._makeRequest(contentBody, handlers);
        return this; // Allow cascading
    },
    
    /**
     * Invoke a single step transfer request.
     *
     * @param {String} mediaAddress
     *     The media address of the user performing the single step transfer.
     * @param {String} toAddress
     *     The destination address of the single step transfer.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *         <li><b>status:</b> {Number} The HTTP status code returned</li>
     *         <li><b>content:</b> {String} Raw string of response</li>
     *         <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *         <li><b>status:</b> {Number} The HTTP status code returned</li>
     *         <li><b>content:</b> {String} Raw string of response</li>
     *         <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *         <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *         <li><b>errorType:</b> {String} Type of error that was caught</li>
     *         <li><b>errorMessage:</b> {String} Message associated with error</li>
     *         </ul></li>
     *         </ul>
     */
    initiateDirectTransfer: function (mediaAddress, toAddress, handlers) {
        this.isLoaded();
        var contentBody = {};
        contentBody[this.getRestType()] = {
            "targetMediaAddress": mediaAddress,
            "toAddress": toAddress,
            "requestedAction": finesse.restservices.Dialog.Actions.TRANSFER_SST
        };
        this._makeRequest(contentBody, handlers);
        return this; // Allow cascading
    },

    /**
     * Update this dialog's wrap-up reason.
     *
     * @param {String} wrapUpReason
     *     The new wrap-up reason for this dialog
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    updateWrapUpReason: function (wrapUpReason, options)
    {
        this.isLoaded();
        var mediaProperties =
        {
            "wrapUpReason": wrapUpReason
        };

        options = options || {};
        options.content = {};
        options.content[this.getRestType()] =
        {
            "mediaProperties": mediaProperties,
            "requestedAction": finesse.restservices.Dialog.Actions.UPDATE_CALL_DATA
        };
        options.method = "PUT";
        this.restRequest(this.getRestUrl(), options);

        return this;
    },

    /**
     * Invoke a request to server based on the action given.
     * @param {String} mediaAddress
     *     The media address of the user performing the consult call.
     * @param {String} action
     *     The action string indicating the action to invoke on dialog.
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @private
     */
    requestAction: function (mediaAddress, action, handlers) {
        this.isLoaded();
        var contentBody = {};
        contentBody[this.getRestType()] = {
            "targetMediaAddress": mediaAddress,
            "requestedAction": action
        };
        this._makeRequest(contentBody, handlers);
        return this; // Allow cascading
    },
    
    /**
     * Wrapper around "requestAction" to request PARTICIPANT_DROP action.
     *
     * @param targetMediaAddress is the address to drop
     * @param handlers to be invoked on success/error
     * @private 
     */
    dropParticipant: function (targetMediaAddress, handlers) {
		this.requestAction(targetMediaAddress, finesse.restservices.Dialog.Actions.PARTICIPANT_DROP, handlers);
    },
    
    /**
     * Invoke a request to server based on the action given.
     * @param {String} mediaAddress
     * @param {String} action
     *     The action string indicating the action to invoke on dialog.
     * @param {Object} [handlers]
     *     A set of handlers invoked when async response comes back.
     * @param {Function} [handlers.success]
     *     The success handler when request is successful.
     * @param {Function} [hanlders.error]
     *     The error handler when request has errors.
     * @private
     */
    sendDTMFRequest: function (mediaAddress, handlers, digit) {
        this.isLoaded();
        var contentBody = {};
        contentBody[this.getRestType()] = {
            "targetMediaAddress": mediaAddress,
            "requestedAction": "SEND_DTMF",
            "actionParams": {
				"ActionParam": {
					"name": "dtmfString",
					"value": digit
				}
			}
        };
        this._makeRequest(contentBody, handlers);
        return this; // Allow cascading
    }
});

/**
 * Possible dialog state constants.
 */
finesse.restservices.Dialog.States = {
    ALERTING: "ALERTING",
    INITIATING: "INITIATING",
    ACTIVE: "ACTIVE",
    DROPPED: "DROPPED",
    HELD: "HELD",
    INITIATED: "INITIATED",
    FAILED: "FAILED",
    INACTIVE: "INACTIVE",
    WRAP_UP: "WRAP_UP",
    ACCEPTED: "ACCEPTED"
};

/**
 * Possible dialog state reasons code constants.
 */
finesse.restservices.Dialog.ReasonStates = {
    BUSY: "BUSY",
    BAD_DESTINATION: "BAD_DESTINATION",
    OTHER: "OTHER",
    DEVICE_RESOURCE_NOT_AVAILABLE : "DEVICE_RESOURCE_NOT_AVAILABLE"
};

/**
 * Possible participant actions constants.
 */
finesse.restservices.Dialog.Actions = {
    DROP: "DROP",
    ANSWER: "ANSWER",
    HOLD: "HOLD",
    BARGE_CALL: "BARGE_CALL",
    PARTICIPANT_DROP: "PARTICIPANT_DROP",
    MAKE_CALL: "MAKE_CALL",
    RETRIEVE: "RETRIEVE",
    CONSULT_CALL: "CONSULT_CALL",
    TRANSFER: "TRANSFER",
    TRANSFER_SST: "TRANSFER_SST",
    CONFERENCE: "CONFERENCE",
    UPDATE_CALL_DATA: "UPDATE_CALL_DATA",
    DTMF : "SEND_DTMF",
    ACCEPT: "ACCEPT",
    REJECT: "REJECT",
    CLOSE : "CLOSE"
};
/**
 * @fileOverview JavaScript representation of the Finesse Dialogs collection
 * object which contains a list of Dialog objects.
 *
 * @name finesse.restservices.Dialogs
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 * @requires finesse.restservices.Dialog
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.Dialogs = finesse.restservices.RestCollectionBase.extend(/** @lends finesse.restservices.Dialogs.prototype */{

    /**
     * @class
     * JavaScript representation of a Dialogs collection object. Also exposes
     * methods to operate on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.Dialogs
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the Dialogs class.
     */
    getRestClass: function () {
        return finesse.restservices.Dialogs;
    },

    /**
     * @private
     * Gets the REST class for the objects that make up the collection. - this
     * is the Dialog class.
     */
    getRestItemClass: function () {
        return finesse.restservices.Dialog;
    },

    /**
     * @private
     * Gets the REST type for the current object - this is a "Dialogs".
     */
    getRestType: function () {
        return "Dialogs";
    },

    /**
     * @private
     * Gets the REST type for the objects that make up the collection - this is "Dialogs".
     */
    getRestItemType: function () {
        return "Dialog";
    },

    /**
     * @private
     * Override default to indicates that the collection doesn't support making
     * requests.
     */
    supportsRequests: true,

    /**
     * @private
     * Override default to indicates that the collection subscribes to its objects.
     */
    supportsRestItemSubscriptions: true,

    /**
     * Create a new Dialog in this colleciton
     *
     * @param {String} toAddress
     *     The to address of the new Dialog
     * @param {String} fromAddress
     *     The from address of the new Dialog
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    createNewCallDialog: function (toAddress, fromAddress, handlers)
    {
        var contentBody = {};
        contentBody[this.getRestItemType()] = {
            "requestedAction": "MAKE_CALL",
            "toAddress": toAddress,
            "fromAddress": fromAddress
        };

        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        handlers = handlers || {};

        this.restRequest(this.getRestUrl(), {
            method: 'POST',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });
        return this; // Allow cascading
    },

    /**
     * Create a new Dialog in this colleciton as a result of a requested action
     *
     * @param {String} toAddress
     *     The to address of the new Dialog
     * @param {String} fromAddress
     *     The from address of the new Dialog
     * @param {String} actionType
     *     The associated action to request for creating this new dialog
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    createNewSuperviseCallDialog: function (toAddress, fromAddress, actionType, handlers)
    {
        var contentBody = {};
        this._isLoaded = true;

        contentBody[this.getRestItemType()] = {
            "requestedAction": actionType,
            "toAddress": toAddress,
            "fromAddress": fromAddress
        };

        // Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        handlers = handlers || {};

        this.restRequest(this.getRestUrl(), {
            method: 'POST',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });
        return this; // Allow cascading
    },
    
    /**
     * Create a new Dialog in this collection as a result of a requested action
     * @param {String} fromAddress
     *     The from address of the new Dialog
     * @param {String} toAddress
     *     The to address of the new Dialog
     * @param {String} actionType
     *     The associated action to request for creating this new dialog
     * @param {String} dialogUri
     *     The associated uri of SUPERVISOR_MONITOR call
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     */
    createNewBargeCall: function (fromAddress, toAddress,actionType,dialogURI, handlers) {
        this.isLoaded();
     
        var contentBody = {};
        contentBody[this.getRestItemType()] = {
            "fromAddress": fromAddress,
            "toAddress": toAddress,
            "requestedAction": actionType,
            "associatedDialogUri": dialogURI
            
        };
        // (nonexistant) keys to be read as undefined
        handlers = handlers || {};	
        this.restRequest(this.getRestUrl(), {
            method: 'POST',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });
        return this; // Allow cascading
    }

});
/**
 * The following comment prevents JSLint errors concerning undefined global variables.
 * It tells JSLint that these identifiers are defined elsewhere.
 */
/*jslint bitwise:true, browser:true, nomen:true, regexp:true, sloppy:true, white:true */

/** The following comment is to prevent jslint errors about 
 * using variables before they are defined.
 */
/*global $, jQuery, Handlebars, dojox, dojo, console, finesse */

/**
 * @fileOverview JavaScript representation of the Finesse Team REST object.
 *
 * @name finesse.restservices.Team
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 * @requires finesse.restservices.RestCollectionBase
 * @requires finesse.restservices.User
 * @requires finesse.restservices.Users
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.Team = finesse.restservices.RestBase.extend(/** @lends finesse.restservices.Team.prototype */{

    _teamLayoutConfig: null,

    /**
     * @class
     * JavaScript representation of a Team object. Also exposes methods to operate
     * on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.Team
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the Team class.
     * @returns {Object} The Team constructor.
     */
    getRestClass: function () {
        return finesse.restservices.Team;
    },

    /**
     * @private
     * Gets the REST type for the current object - this is a "Team".
     * @returns {String} The Team string.
     */
    getRestType: function () {
        return "Team";
    },

    /**
     * @private
     * Override default to indicate that this object doesn't support making
     * requests.
     */
    supportsSubscriptions: false,

    /**
     * Getter for the team id.
     * @returns {String} The team id.
     */
    getId: function () {
        this.isLoaded();
        return this.getData().id;
    },

    /**
     * Getter for the team name.
     * @returns {String} The team name
     */
    getName: function () {
        this.isLoaded();
        return this.getData().name;
    },

    /**
     * Getter for the team uri.
     * @returns {String} The team uri
     */
    getUri: function () {
        this.isLoaded();
        return this.getData().uri;        
    },

    /**
     * Constructs and returns a collection of users
     * @param {options} constructor options
     * @returns {finesse.restservices.Users} Users collection of User objects
     */
	getUsers: function (options) {
		this.isLoaded();
		options = options || {};

		options.parentObj = this;
		// We are using getData() instead of getData.Users because the superclass (RestCollectionBase)
		// for Users needs the "Users" key to validate the provided payload matches the class type.
		options.data = this.getData();

		return new finesse.restservices.Users(options);
	},

    /**
     * Getter for a teamNotReadyReasonCodes collection object that is associated with Team.
     * @param callbacks
     * @returns {teamNotReadyReasonCodes}
     *     A teamNotReadyReasonCodes collection object.
     */
    getTeamNotReadyReasonCodes: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (!this._teamNotReadyReasonCodes) {
            this._teamNotReadyReasonCodes = new finesse.restservices.TeamNotReadyReasonCodes(options);
        }

        return this._teamNotReadyReasonCodes;
    },

    /**
     * Getter for a teamWrapUpReasons collection object that is associated with Team.
     * @param callbacks
     * @returns {teamWrapUpReasons}
     *     A teamWrapUpReasons collection object.
     */
    getTeamWrapUpReasons: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (!this._teamWrapUpReasons) {
            this._teamWrapUpReasons = new finesse.restservices.TeamWrapUpReasons(options);
        }

        return this._teamWrapUpReasons;
    },

    /**
     * Getter for a teamSignOutReasonCodes collection object that is associated with Team.
     * @param callbacks
     * @returns {teamSignOutReasonCodes}
     *     A teamSignOutReasonCodes collection object.
     */

    getTeamSignOutReasonCodes: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (!this._teamSignOutReasonCodes) {
            this._teamSignOutReasonCodes = new finesse.restservices.TeamSignOutReasonCodes(options);
        }

        return this._teamSignOutReasonCodes;
    },

    /**
     * Getter for a teamPhoneBooks collection object that is associated with Team.
     * @param callbacks
     * @returns {teamPhoneBooks}
     *     A teamPhoneBooks collection object.
     */
    getTeamPhoneBooks: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        if (!this._phonebooks) {
            this._phonebooks = new finesse.restservices.TeamPhoneBooks(options);
        }

        return this._phonebooks;
    },

    /**
     * Getter for a teamLayoutConfig object that is associated with Team.
     * @param callbacks
     * @returns {teamLayoutConfig}
     */
    getTeamLayoutConfig: function (callbacks) {
        var options = callbacks || {};
        options.parentObj = this;
        this.isLoaded();

        console.log("In getTeamLayoutConfig");
        if (this._teamLayoutConfig === null) {
            this._teamLayoutConfig = new finesse.restservices.TeamLayoutConfig(options);
        }

        return this._teamLayoutConfig;
    }

});
/**
 * @fileOverview JavaScript representation of the Finesse WrapUpReason object.
 *
 * @name finesse.restservices.WrapUpReason
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.WrapUpReason = finesse.restservices.RestBase.extend(/** @lends finesse.restservices.WrapUpReason.prototype */{

    /**
     * @class
     * JavaScript representation of a WrapUpReason object. Also exposes
     * methods to operate on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.WrapUpReason
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the WrapUpReason class.
     * @returns {Object} The WrapUpReason class.
     */
    getRestClass: function () {
        return finesse.restservices.WrapUpReason;
    },

    /**
     * @private
     * Gets the REST type for the current object - this is a "WrapUpReason".
     * @returns {String} The WrapUpReason string.
     */
    getRestType: function () {
        return "WrapUpReason";
    },

    /**
     * @private
     * Gets the REST type for the current object - this is a "WrapUpReasons".
     * @returns {String} The WrapUpReasons string.
     */
    getParentRestType: function () {
        return "WrapUpReasons";
    },

    /**
     * @private
     * Override default to indicate that this object doesn't support making
     * requests.
     */
    supportsRequests: false,

    /**
     * @private
     * Override default to indicate that this object doesn't support subscriptions.
     */
    supportsSubscriptions: false,

    /**
     * Getter for the label.
     * @returns {String} The label.
     */
    getLabel: function () {
        this.isLoaded();
        return this.getData().label;
    },

    /**
     * Getter for the forAall flag.
     * @returns {String} The from address.
     */
    getForAll: function () {
        this.isLoaded();
        return this.getData().forAll;
    },

    /**
     * Getter for the Uri value.
     * @returns {String} The Uri.
     */
    getUri: function () {
        this.isLoaded();
        return this.getData().uri;
    }
});

/**
* @fileOverview JavaScript representation of the Finesse WrapUpReasons collection
* object which contains a list of WrapUpReason objects.
 *
 * @name finesse.restservices.WrapUpReasons
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 * @requires finesse.restservices.Dialog
 * @requires finesse.restservices.RestCollectionBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.WrapUpReasons = finesse.restservices.RestCollectionBase.extend(/** @lends finesse.restservices.WrapUpReasons.prototype */{
	
    /**
     * @class
     * JavaScript representation of a WrapUpReasons collection object. Also exposes
     * methods to operate on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.WrapUpReasons
     **/
	init: function (options) {
		this._super(options);			
	},

	/**
     * @private
	 * Gets the REST class for the current object - this is the WrapUpReasons class.
	 */
	getRestClass: function () {
	    return finesse.restservices.WrapUpReasons;
	},

	/**
     * @private
	 * Gets the REST class for the objects that make up the collection. - this
	 * is the WrapUpReason class.
	 */
	getRestItemClass: function () {
		return finesse.restservices.WrapUpReason;
	},

	/**
     * @private
	 * Gets the REST type for the current object - this is a "WrapUpReasons".
	 */
	getRestType: function () {
	    return "WrapUpReasons";
	},
	
	/**
     * @private
	 * Gets the REST type for the objects that make up the collection - this is "WrapUpReason".
	 */
	getRestItemType: function () {
		return "WrapUpReason";
	},

	/**
     * @private
	 * Override default to indicates that the collection supports making
	 * requests.
	 */
	supportsRequests: true,

	/**
     * @private
     * Override default to indicate that this object doesn't support subscriptions.
	 */
	supportsRestItemSubscriptions: false,

    /**
     * Retrieve the Wrap-Up Reason Codes.
     *
     * @returns {finesse.restservices.WrapUpReasons}
     *     This ReadyReasonCodes object to allow cascading.
     */
    get: function () {
        // set loaded to false so it will rebuild the collection after the get
        this._loaded = false;
        // reset collection
        this._collection = {};
        // perform get
        this._synchronize();
        return this;
    }
	
});/**
 * @fileOverview JavaScript representation of the Finesse MediaPropertiesLayout object
 *
 * @name finesse.restservices.MediaPropertiesLayout
 * @requires finesse.clientservices.ClientServices
 * @requires Class
 * @requires finesse.FinesseBase
 * @requires finesse.restservices.RestBase
 */

var finesse = finesse || {};
finesse.restservices = finesse.restservices || {};

/** @private */
finesse.restservices.MediaPropertiesLayout = finesse.restservices.RestBase.extend(/** @lends finesse.restservices.MediaPropertiesLayout.prototype */{

    /**
     * @class
     * JavaScript representation of a MediaPropertiesLayout object. Also exposes
     * methods to operate on the object against the server.
     *
	 * @param {Object} options
	 *     An object with the following properties:<ul>
     *         <li><b>id:</b> The id of the object being constructed</li>
     *         <li><b>onLoad(this): (optional)</b> when the object is successfully loaded from the server</li>
     *         <li><b>onChange(this): (optional)</b> when an update notification of the object is received</li>
     *         <li><b>onAdd(this): (optional)</b> when a notification that the object is created is received</li>
     *         <li><b>onDelete(this): (optional)</b> when a notification that the object is deleted is received</li>
     *         <li><b>onError(rsp): (optional)</b> if loading of the object fails, invoked with the error response object:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul></li>
     *         <li><b>parentObj: (optional)</b> The parent object</li></ul>
     * @constructs finesse.restservices.MediaPropertiesLayout
     **/
    init: function (options) {
        this._super(options);
    },

    /**
     * @private
     * Gets the REST class for the current object - this is the MediaPropertiesLayout object.
     */
    getRestClass: function () {
        return finesse.restservices.MediaPropertiesLayout;
    },

    /**
     * @private
     * Gets the REST type for the current object - this is a "MediaPropertiesLayout".
     */
    getRestType: function () {
        return "MediaPropertiesLayout";
    },

    /**
     * @private
     * Overrides the parent class.  Returns the url for the MediaPropertiesLayout resource
     */
    getRestUrl: function () {
        return ("/finesse/api/User/" + this.getId() + "/" + this.getRestType());
    },

    /**
     * @private
     * Returns whether this object supports subscriptions
     */
    supportsSubscriptions: false,

    /**
     * Retrieve the media properties layout
     * @returns {finesse.restservices.MediaPropertiesLayout}
     *     This MediaPropertiesLayout object to allow cascading
     */
    get: function () {
        this._synchronize();

        return this; //Allow cascading
    },

    /**
     * Gets the data for this object.
     * 
     * Performs safe conversion from raw API data to ensure that the returned layout object
     * always has a header with correct entry fields, and exactly two columns with lists of entries.
     *
     * @returns Object which are contained in data
     */
    getData: function () {

        var layout = this._data, result, _addColumnData;

        result = this.getEmptyData();

	    /**
	     * @private
	     */
        _addColumnData = function (entryData, colIndex) {

            if (!entryData) {
                //If there's no entry data at all, rewrite entryData to be an empty collection of entries
                entryData = {};
            } else if (entryData.mediaProperty) {
                //If entryData contains the keys for a single entry rather than being a collection of entries,
                //rewrite it to be a collection containing a single entry
                entryData = { "": entryData };
            }

            //Add each of the entries in the list to the column
            jQuery.each(entryData, function (i, entryData) {

                //If the entry has no displayName specified, explicitly set it to the empty string
                if (!entryData.displayName) {
                    entryData.displayName = "";
                }

                result.columns[colIndex].push(entryData);

            });

        };

        //The header should only contain a single entry
        if (layout.header && layout.header.entry) {

            //If the entry has no displayName specified, explicitly set it to the empty string
            if (!layout.header.entry.displayName) {
                layout.header.entry.displayName = "";
            }

            result.header = layout.header.entry;

        } else {

            throw "MediaPropertiesLayout.getData() - Header does not contain an entry";

        }

        //If the column object contains an entry object that wasn't part of a list of entries,
        //it must be a single right-hand entry object (left-hand entry object would be part of a list.)
        //Force the entry object to be the 2nd element in an otherwise-empty list.
        if (layout.column && layout.column.entry) {
            layout.column = [
                null,
                { "entry": layout.column.entry }
            ];
        }

        if (layout.column && layout.column.length > 0 && layout.column.length <= 2) {

            //Render left column entries
            if (layout.column[0] && layout.column[0].entry) {
                _addColumnData(layout.column[0].entry, 0);
            }

            //Render right column entries
            if (layout.column[1] && layout.column[1].entry) {
                _addColumnData(layout.column[1].entry, 1);
            }

        }

        return result;

    },

    /**
     * Empty/template version of getData().
     *
     * Used by getData(), and by callers of getData() in error cases.
     */
    getEmptyData: function () {

        return {
            header : {
                displayName: null,
                mediaProperty: null
            },
            columns : [[], []]
        };

    },

    /**
     * Set the layout of this MediaPropertiesLayout.
     * @param {String} layout
     *     The layout you are setting
     * @param {Object} handlers
     *     An object containing the following (optional) handlers for the request:<ul>
     *         <li><b>success(rsp):</b> A callback function for a successful request to be invoked with the following
     *         response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response</li></ul>
     *         <li>A error callback function for an unsuccessful request to be invoked with the
     *         error response object as its only parameter:<ul>
     *             <li><b>status:</b> {Number} The HTTP status code returned</li>
     *             <li><b>content:</b> {String} Raw string of response</li>
     *             <li><b>object:</b> {Object} Parsed object of response (HTTP errors)</li>
     *             <li><b>error:</b> {Object} Wrapped exception that was caught:<ul>
     *                 <li><b>errorType:</b> {String} Type of error that was caught</li>
     *                 <li><b>errorMessage:</b> {String} Message associated with error</li>
     *             </ul></li>
     *         </ul>
     * @returns {finesse.restservices.MediaPropertiesLayout}
     *     This MediaPropertiesLayout object to allow cascading
     */
    setLayout: function (layout, handlers) {

        var contentBody = {};

        contentBody[this.getRestType()] = layout;

        //Protect against null dereferencing of options allowing its (nonexistant) keys to be read as undefined
        handlers = handlers || {};

        this.restRequest(this.getRestUrl(), {
            method: 'PUT',
            success: handlers.success,
            error: handlers.error,
            content: contentBody
        });

        return this; // Allow cascading
    }

});
/**
 * @fileOverview Per containerservices request, publish to the OpenAjax gadget pubsub infrastructure.
 *
 * @name MasterPublisher
 * @requires OpenAjax, finesse.containerservices.Topics
 */

/** @namespace */
var finesse = finesse || {};
finesse.containerservices = finesse.containerservices  || {};

/**
 * @class
 * Register with the MasterTunnel to receive events. Events are published to
 * the appropriate topics.
 * @constructor
 */
finesse.containerservices.MasterPublisher = function () {

    var

    /**
     * Reference to the gadget pubsub Hub instance.
     * @private
     */
    _hub = gadgets.Hub,

    /**
     * Reference to the Topics class.
     * @private
     */
    _topics = finesse.containerservices.Topics,
    
    /**
     * Reference to conversion utilities class.
     * @private
     */
    _utils = finesse.utilities.Utilities,
    

    /**
     * The types of possible request types supported when listening to the
     * requests channel. Each request type could result in different operations.
     */
    _REQTYPES = {
		ACTIVETAB: "ActiveTabReq"
    },

    /**
     * Handles client requests made to the request topic. The type of the
     * request is described in the "type" property within the data payload. Each
     * type can result in a different operation.
     * @param {String} topic
     *     The topic which data was published to.
     * @param {Object} data
     *     The data containing requests information published by clients.
     * @param {String} data.type
     *     The type of the request. Supported: "ActiveTabReq"
     * @param {Object} data.data
     *     May contain data relevant for the particular requests.
     * @param {String} [data.invokeID]
     *     The ID used to identify the request with the response. The invoke ID
     *     will be included in the data in the publish to the topic. It is the
     *     responsibility of the client to correlate the published data to the
     *     request made by using the invoke ID.
     * @private
     */
    _clientRequestHandler = function (topic, data) {
    
        //Ensure a valid data object with "type" and "data" properties.
        if (typeof data === "object" &&
                typeof data.type === "string" &&
                typeof data.data === "object") {
			switch (data.type) {
			case _REQTYPES.ACTIVETAB:
                _hub.publish("finesse.containerservices.activeTab", parent.finesse.container.Tabs.getActiveTab());
                break;
			default:
				break;
			}
        }
    };

    (function () {

        //Listen to a request channel to respond to any requests made by other
        //clients because the Master may have access to useful information.
        _hub.subscribe(_topics.REQUESTS, _clientRequestHandler);
    }());

    //BEGIN TEST CODE//
    /**
     * Test code added to expose private functions that are used by unit test
     * framework. This section of code is removed during the build process
     * before packaging production code. The [begin|end]TestSection are used
     * by the build to identify the section to strip.
     * @ignore
     */
    this.beginTestSection = 0;

    /**
     * @ignore
     */
    this.getTestObject = function () {
        //Load mock dependencies.
        var _mock = new MockControl();
        _hub = _mock.createMock(gadgets.Hub);

        return {
            //Expose mock dependencies
            mock: _mock,
            hub: _hub,
			
            //Expose internal private functions
            reqtypes: _REQTYPES,
            
            clientRequestHandler: _clientRequestHandler

        };
    };


    /**
     * @ignore
     */
    this.endTestSection = 0;
    //END TEST CODE//
};/**
 * @fileOverview Contains a list of topics used for containerservices pubsub.
 *
 * @name Topics
 */

/** @namespace */
var finesse = finesse || {};
finesse.containerservices = finesse.containerservices  || {};

/**
 * @class
 * Contains a list of topics with some utility functions.
 */
finesse.containerservices.Topics = (function () {

    /**
     * The namespace prepended to all Finesse topics.
     */
    this.namespace = "finesse.containerservices";

    /**
     * @private
     * Gets the full topic name with the ContainerServices namespace prepended.
     * @param {String} topic
     *     The topic category.
     * @returns {String}
     *     The full topic name with prepended namespace.
     */
    var _getNSTopic = function (topic) {
        return this.namespace + "." + topic;
    };



    /** @scope finesse.containerservices.Topics */
    return {
        /** request channel. */
        REQUESTS: _getNSTopic("requests"),

        /**
         * Convert a Finesse REST URI to a OpenAjax compatible topic name.
         */
        getTopic: function (restUri) {
            //The topic should not start with '/' else it will get replaced with
            //'.' which is invalid.
            //Thus, remove '/' if it is at the beginning of the string
            if (restUri.indexOf('/') === 0) {
                restUri = restUri.substr(1);
            }

            //Replace every instance of "/" with ".". This is done to follow the
            //OpenAjaxHub topic name convention.
            return restUri.replace(/\//g, ".");
        }
    };
}());
/**
 * @fileOverview Exposes a set of API wrappers that will hide the dirty work of
 *     constructing Finesse API requests and consuming Finesse events.
 *
 * @name finesse.containerservice.ContainerServices
 * @requires Class
 * @requires OpenAjax, jQuery 1.5, finesse.utilities.Utilities
 */
var finesse = finesse || {};
finesse.containerservices = finesse.containerservices  || {};
/**
 * @class
 * Provide container level services for gadget developers, exposing container events by
 * calling a set of exposed functions. Gadgets can utilize the container dialogs and 
 * event handling (add/remove)
 */
finesse.containerservices.ContainerServices = (function () {

    var

    /**
     * Shortcut reference to the finesse.utilities.Utilities singleton
     * This will be set by init()
     * @private
     */
    _util,

    /**
     * Shortcut reference to the gadget pubsub Hub instance.
     * This will be set by init()
     * @private
     */
    _hub,

    /**
     * @private
     * Whether the Client Services have been initiated yet.
     */
    _inited = false,
    
     /**
     * Stores the list of subscription IDs for all subscriptions so that it
     * could be retrieve for unsubscriptions.
     * @private
     */
    _subscriptionID = {},
    
    /**
     * @private
     * Reference to the gadget's parent container
     */
    _parent,
    
    /**
     * @private
     * Reference to the gadget's parent container
     */
    _tabVisibleNotifier,
    
    /**
     * @private
     * Reference to the gadget's prefs object
     */
    _prefs,
    
    /**
     * @private
     * Reference to the tabId that is associated with the gadget
     */
    _myTab,
    
    /**
     * @private
     * Reference to the visibility of current gadget
     */
    _visible,
    
    /**
     * Shortcut reference to the Topics class.
     * This will be set by init()
     * @private
     */
    _topics,

    /**
     * Ensure that ClientServices have been inited.
     * @private
     */
    _isInited = function () {
        if (!_inited) {
            throw new Error("ContainerServices needs to be inited.");
        }
    },
   /**
     * Retrieves a reference to a particular notifierType.
     * @param {String} notifierType
     *      Specifies the notifier to retrieve (tabVisible: when the parent tab becomes visible)
     * @return {Notifier} The notifier object.
     */
    _getNotifierReference = function (notifierType) {
        var notifierReference = null;
        if (notifierType === 'tabVisible') {
            notifierReference = _tabVisibleNotifier;
        }  else {
            throw new Error("_getNotifierReference(): Trying to get unknown notifier(notifierType=" + notifierType + ")");
        }
        return notifierReference;
    },
    /**
         * @private
         * Utility function to make a subscription to a particular topic. Only one
         * callback function is registered to a particular topic at any time.
         * @param {String} topic
         *     The full topic name. The topic name should follow the OpenAjax
         *     convention using dot notation (ex: finesse.api.User.1000).
         * @param {Function} callback
         *     The function that should be invoked with the data when an event
         *     is delivered to the specific topic.
         * @returns {Boolean}
         *     True if the subscription was made successfully and the callback was
         *     been registered. False if the subscription already exist, the
         *     callback was not overwritten.
         */
        _subscribe = function (topic, callback) {
            _isInited();

            //Ensure that the same subscription isn't made twice.
            if (!_subscriptionID[topic]) {
                //Store the subscription ID using the topic name as the key.
                _subscriptionID[topic] = _hub.subscribe(topic,
                    //Invoke the callback just with the data object.
                    function (topic, data) {
                        callback(data);
                    });
                return true;
            }
            return false;
        },

        /**
         * @private
         * Unsubscribe from a particular topic.
         * @param {String} topic
         *     The full topic name.
         */
        _unsubscribe = function (topic) {
            _isInited();

            //Unsubscribe from the topic using the subscription ID recorded when
            //the subscription was made, then delete the ID from data structure.
            _hub.unsubscribe(_subscriptionID[topic]);
            delete _subscriptionID[topic];
        },
        
        _tabTracker = function(tabId) {
            if (tabId === _myTab) {
                if(!_visible) {
                    _visible = true;
                    _tabVisibleNotifier.notifyListeners(this);
                }
            } else {
                _visible = false;
            }
        };

    return {
        /**
         * Shows the jQuery UI Dialog with the specified parameters and the
         * following defaults:
         *     - The only button "Ok" closes the dialog
         *     - Modal
         *     - Not draggable
         *     - Fixed size
         * @param {Object} options
         *     An object containing additional options for the dialog.
         * @param {String/Boolean} options.title
         *     Title to use. undefined defaults to "Cisco Finesse".
         *     false to hide
         * @param {Function} options.close
         *     A function to invoke when the dialog is closed.
         * @param {String} options.message
         *     The message to display in the dialog.
         *     Defaults to "A generic error has occurred."
         * @param {Boolean} options.isBlocking
         *     Flag indicating whether this dialog will block other
         *     dialogs from being shown.
         * @returns {jQuery}
         *     jQuery wrapped object of the dialog DOM element
         */
        showDialog: function(options) {
            if ((_parent.showDialog !== undefined) && (_parent.showDialog !== this.showDialog)) {
                return _parent.showDialog(options);
            }
        },
        
        /**
         * Hides the jQuery UI Dialog
         * @returns {jQuery}
         *     jQuery wrapped object of the dialog DOM element
         */
        hideDialog: function() {
            if ((_parent.hideDialog !== undefined) && (_parent.hideDialog !== this.hideDialog)) {
                return _parent.hideDialog();
            }
        },
        
        /**
     * Adds an handler to this object.
     * @param {String} notifierType
     *     The type of notifier to add to ('tabVisible')
     * @param {Function} callback
     *     The function callback to invoke.
     */
        addHandler: function (notifierType, callback) {
          _isInited();
          var notifier = null;
        try {
            _util.validateHandler(callback);

            notifier = _getNotifierReference(notifierType);

            notifier.addListener(callback);
            
        } catch (err) {
            throw new Error("addHandler(): " + err);
        }
        }, 
        
        /**
     * Removes a handler from this object.
     * @param {String} notifierType
     *     The type of notifier to remove ('tabVisible')
     * @param {Function} callback
     *     The function to remove.
     */
        removeHandler: function(notifierType, callback) {
            var notifier = null;
        try {
            _util.validateHandler(callback);

            notifier = _getNotifierReference(notifierType);

            notifier.removeListener(callback);
        } catch (err) {
            throw new Error("removeHandler(): " + err);
        }
        },
        /**
         * Returns the visibility of current gadget
         * @return {Boolean} 
         *         The visibility of current gadget
         */
        tabVisible: function(){
            return _visible;
        },
        
         /**
         * Make a request to the check the current tab
         */
        makeActiveTabReq : function () {
            if(_hub){
                var data = {
                    type: "ActiveTabReq",
                    data: {},
                    invokeID: (new Date()).getTime()          
                };
                _hub.publish(_topics.REQUESTS, data);
            } else {
                throw new Error("Hub is not defined.");
            }
            
        },

        /**
         * Initiates the Container Services.
         * @return {Object} 
         *         The ContainerServices instance
         */
        init: function () {
            if (!_inited) {
                // Set shortcuts
                _util = finesse.utilities.Utilities;
                _parent = parent.finesse.container.Container;
                _prefs = new gadgets.Prefs();
                _myTab = _prefs.getString("tabId");
                _tabVisibleNotifier = new finesse.restservices.Notifier();
                _inited = true;
                //init the hub only when it's available
                if(gadgets.Hub) {
                    _hub = gadgets.Hub;
                    _subscribe("finesse.containerservices.activeTab", _tabTracker);
                }
                if(finesse.containerservices.Topics) {
                    _topics = finesse.containerservices.Topics;
                }
                if(finesse.containerservices.MasterPublisher){
                   publisher = new finesse.containerservices.MasterPublisher();
                }
            }

            //Return the CS object for object chaining.
            return this;
        },

        

        //BEGIN TEST CODE//
        /**
         * Test code added to expose private functions that are used by unit test
         * framework. This section of code is removed during the build process
         * before packaging production code. The [begin|end]TestSection are used
         * by the build to identify the section to strip.
         * @ignore
         */
        beginTestSection : 0,

        /**
         * @ignore
         */
        getTestObject: function () {
            //Load mock dependencies.
            var _mock = new MockControl();
            _util = _mock.createMock(finesse.utilities.Utilities);
            _hub = _mock.createMock(gadgets.Hub);
            _inited = true;
            _tabVisibleNotifier = new finesse.restservices.Notifier();
            return {
                //Expose mock dependencies
                mock: _mock,
                hub: _hub,
                util: _util,
                tabVisibleNotifier: _tabVisibleNotifier,
                addHandler: this.addHandler, 
                removeHandler: this.removeHandler         
                
            };
        },

        /**
         * @ignore
         */
       endTestSection: 0
        //END TEST CODE//
    };
}());

