var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};
finesse.container = finesse.container || {};
if (!window.console) window.console = {}; 
if (!window.console.log) window.console.log = function () { }; 

/** @namespace */
// Configuration for the gadget
finesse.gadget.Config = (function () {
	var _prefs = new gadgets.Prefs();

	/** @scope finesse.gadget.Config */
	return {
		authorization: _prefs.getString("authorization"),
		host: _prefs.getString("host"),
		restHost: "localhost"
	};
}());

/** @namespace */
finesse.modules = finesse.modules || {};
finesse.modules.SampleGadget = (function ($) {
     var numDialogs = 0;	     // used to count the calls (dialogs)
	var callvars = new Array();  // the callvars array of callvariables		
    var user, states, dialogs,
    
    /**
     * Populates the fields in the gadget with data
     */
    render = function () {
        var currentState = user.getState();
// html is initially blank
            var html = '';
                  
    },
   
    /**
     *  Handler for additions to the Dialogs collection object.  This will occur when a new
     *  Dialog is created on the Finesse server for this user.
     */
     handleNewDialog = function(dialog) {
        console.log("In handleNewDialog screenpop");
            // increment the number of dialogs
	    numDialogs++;
            
            // get the call variable data from the dialog
	    // dialog.getMediaProperties() returns an array of properties
            callvars = dialog.getMediaProperties();
			
			
			//**********************IMPORTANT************************************************************************
			//create call data on new dialog
			//var randC = $("#caller").val();
			var randC = callvars['callvariable7'];
			popCallHistory(randC);	
    },
     
    /**
     *  Handler for deletions from the Dialogs collection object for this user.  This will occur
     *  when a Dialog is removed from this user's collection (example, end call)
     */
    handleEndDialog = function(dialog) {
    
	   // decrement the number of dialogs
            numDialogs--;
 
			//**********************IMPORTANT************************************************************************
			//Popup wrapup area on handleEndDialog			
			$('#callFinisher').trigger('click');
			
            // dont render the html in the gadget we have a permalink
       //     render();
    },
    
    
   
     
    /**
     * Handler for the onLoad of a User object.  This occurs when the User object is initially read
     * from the Finesse server.  Any once only initialization should be done within this function.
     */
    handleUserLoad = function (userevent) {
        // Get an instance of the dialogs collection and register handlers for dialog additions and
        // removals
        dialogs = user.getDialogs( {
            onCollectionAdd : handleNewDialog,
            onCollectionDelete : handleEndDialog
        });
            // dont render the html in the gadget we have a permalink
        //render();
    },
      
    /**
     *  Handler for all User updates
     */
    handleUserChange = function(userevent) {
      
    };
	    
	/** @scope finesse.modules.SampleGadget */
	return {
	    
	    

	        
	    /**
	     * Performs all initialization for this gadget
	     */
	    init : function () {
			var prefs =  new gadgets.Prefs(),
			id = prefs.getString("id");
			

	        gadgets.window.adjustHeight();
	        
	        // Initiate the ClientServices and load the user object.  ClientServices are
	        // initialized with a reference to the current configuration.
	        finesse.clientservices.ClientServices.init(finesse.gadget.Config);
	        user = new finesse.restservices.User({
				id: id, 
                onLoad : handleUserLoad,
                onChange : handleUserChange
            });
	            
	        states = finesse.restservices.User.States;
			
			// add code to handle tab clicked
			containerServices = finesse.containerservices.ContainerServices.init();
            containerServices.addHandler("tabVisible", function(){
			   console.log("Gadget is now visible");
			 // console.log("Gadget html=" + document.getElementById('cuic').innerHTML);
			 if (document.getElementById('SpinSci'))
			 {
			 console.log("Gadget html already=" + document.getElementById('SpinSci').innerHTML);
			 }
			 else
			 
			 {
			    var html = '';
                // add a div tag to the html
                html += '<div id="SpinSci">';
				html += 'content';
				html += '</div>';
                
                //set the html document's agentout element to the html we want to render
		         document.getElementById('agentout').innerHTML = html;
		
                // automatically adjust the height of the gadget to show the html
		         gadgets.window.adjustHeight();
				}
				   
			   });
            containerServices.makeActiveTabReq();
	    }
    };
}(jQuery));
