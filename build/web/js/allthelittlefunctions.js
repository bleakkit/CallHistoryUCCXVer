var callers = ['8172787306', '4109876634', '2143435633'];    
var addressBind = "";
var thisCallID, thismode;

	// actual addTab function: adds new tab using the input from the form above
	function addTab() {
	  var label = tabTitle.val() || "Tab " + tabCounter,
		id = "tabs-" + tabCounter,
		li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
		tabContentHtml = tabContent.val() || "Tab " + tabCounter + " content.";

	  tabs.find( ".ui-tabs-nav" ).append( li );
	  tabs.append( "<div id='" + id + "'><p>" + tabContentHtml + "</p></div>" );
	  tabs.tabs( "refresh" );
	  tabCounter++;
	}

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

function selectAndScrollToOption(select, option) {
    $select = $(select);

    // Store the currently selected options
    var $selectedOptions = $select.find("option:selected");

    // Select the new option using its selected property and selectedIndex.
    // This seems to make the select scroll to the desired place in all major
    // browsers
    option.selected = true; // Required for old IE
    select.selectedIndex = option.index;

    // Measure the vertical scrolling
    var scrollTop = $select.scrollTop();

    // Re-select the original options
    $selectedOptions.prop("selected", true);

    // Scroll to the correct place
    $select.scrollTop(scrollTop);
}

function bindInputs()
{
    $("#wrapped").find("select").on("change", function(event){
        var outerJSON = {};
        //the form elements have to have name attributes in order to serialize       
        outerJSON['callid'] = thisCallID; //append element's class and id        
        outerJSON['updateto'] = $(this).val(); //append element's class and id  
        outerJSON['update'] = $(this).attr("name"); //append element's class and id  
        $.ajax({
            url: "updatecidxml",
            dataType: "json",
            type: 'POST',
            contentType: "application/json;charset=UTF-8",
            data: outerJSON,
            success: function(){
                var m = 999;
            },
            error: function(xhr,status,error){
                var m = 999;
            }
        });           
    });
    $("#workingNotes").bindWithDelay("keyup", function(event){ 
        alert( $(this).text() );
    }, 100);
}


function StartXML()
{
    var callid = thisCallID;
    var notes = $("#workingNotes").text();
    //var wrapup = $("#wrapped").serializeObject();
    
    //serializes the values on the input(s) or form(s), bundles in the class name and id for handling identification
    var payload = $("#wrapped").serializeArray(), json = {}, outerJSON = {};
    //the form elements have to have name attributes in order to serialize
    for (i in payload) 
    {
            json[payload[i].name] = payload[i].value;
    }
    outerJSON['callid'] = callid; //append element's class and id
    outerJSON['wrapup'] = json;
    //json['referrer_id'] = elem.attr('id'); //append element's class and id    
    
    $.ajax({
        url: "writecidxml",
        dataType: "json",
        type: 'POST',
        //contentType: "application/json"
        data: outerJSON,
        success: function(){
            var m = 999;
            bindInputs();
        },
        error: function(xhr,status,error){
            var m = 999;
        }
    });   
}
function ResumeXML()
{  
    var callid = thisCallID;
    var outerJSON = {};
    outerJSON['callid'] = callid;
    $.ajax({
        url: "readcidxml",
        dataType: "json",
        type: 'POST',
        //contentType: "application/json"
        data: outerJSON,
        success: function(data){
            var m = 999;
            $("#workingNotes").text( data.notes.notes );
            $.each(data.freeze,function(key,value){
                var hi = 999;
                for (var propName in value) {
                    console.log("Iterating through prop with name", propName, " its value is ", value[propName]);
                    switch(propName)
                    {
                        case "callguid":
                            break;
                        default:
                            var getOpt = $("#"+propName+" option").filter(function() {
                            //may want to use $.trim in here
                                return $(this).text() == value[propName]; 
                            });                            
                            getOpt.prop('selected', true);  
                        break;
                    }
               
                }
            });      
            $("#wrapInject").html( $("#wrapped").html() );	            
            $('#callFinisher').trigger('click');
        },
        error: function(xhr,status,error){
            var m = 999;
        }
    });   
}

function Querystring() {
    var q = window.location.search.substr(1), qs = {};
    if (q.length) {
        var keys = q.split("&"), k, kv, key, val, v;
        for (k = keys.length; k--; ) {
            kv = keys[k].split("=");
            key = kv[0];
            val = decodeURIComponent(kv[1]);
            if (qs[key] === undefined) {
                qs[key] = val;
            } else {
                v = qs[key];
                if (v.constructor != Array) {
                    qs[key] = [];
                    qs[key].push(v);
                }
                qs[key].push(val);
            }
        }
    }
    return qs;
}

function scriptc(a,b){
  var __d=document;
  //var __h = __d.getElementsByTagName("head")[0];
  var __h = __d.getElementById("scriptWh");
  var s = __d.createElement("script");
  s.setAttribute("src", a);
  s.id = b;
  __h.appendChild(s);
}	
	
function plopAddy()
{
    var poi = $("#address").val();
    $('#mapcanvas').gmap3({
     map: {
        options: {
          maxZoom: 14 
        }  
     },
     marker:{
        address: poi,
        options: {
         icon: new google.maps.MarkerImage(
           "http://gmap3.net/skin/gmap/magicshow.png",
           new google.maps.Size(32, 37, "px", "px")
         )
        }
     }
    },
    "autofit" );
}

//address portion
	
	
$(document).ready(function(){
	var whatDo = Querystring();
	thisCallID = whatDo.id;        
        thisMode = whatDo.mode;
	wrapp = whatDo.wrap;
	popCallHistory(whatDo.ani);
        $("body").prepend("<div>UCID: "+thisCallID+" modo: "+thisMode+"</div>");
        
        $("#tiroFinale").submit(function(e){
            return false;
        });        
        
	$("#placeancall").on("click",function(){	
		//var randC = callers[Math.floor(Math.random() * callers.length)];
		var randC = $("#caller").val();
		popCallHistory(randC);
	});
	
	$(document).on("click",".expander",function(){
		$(this).parent().children(".hider").toggle("slide","easeInCubic",400);
	});
	
	$(".inline").colorbox({
		inline:true, 
		width:"50%",
		height:"620px",                
		top: "10%",
		onComplete: function(){
                    var textual = $("#workingNotes").val();
                    $("#finalNotes").val( textual );
                    var payload = $("#wrapped").serializeArray();
                    $("#wrapInject").html( $("#wrapped").html() ); 
                    //set all the select values again
                    $.each(payload,function(key,value){

                            var getOpt = $("#tiroFinale #"+value.name+" option").filter(function() {
                            //may want to use $.trim in here
                                return $(this).text() == value.value; 
                            });
                            getOpt.attr('selected', 'true');                          
                              
                    });                                   
		}
	});
	$(".callline").colorbox({
		iframe:true,
		top: "10%",
		innerWidth:1000,
		innerHeight:450
	});	
	//these need to be called after call loads			
	var myParent = window.frameElement;
	var mParent = $(myParent).attr("id");
	$('#'+mParent+'_title', window.parent.document).css('display','none');
	var m = 99;
	$("#tabs").tabs();    
        $("#mapcanvas").gmap3();
});

function spitFormNode( entireWrapSection, target )
{
	var formInjector = '';
	entireWrapSection.find("item").each( function() {
		var fieldItem = '';
		var lengthOfWrap = '';
		var descriptor = '';
		switch( $(this).find("type").text() )
		{
			case 'ss':
			{
				lengthOfWrap = 'outer';
				var optionsPack = '';				
				$(this).find("options").find("opt").each( function() {
					var nondisplayt = $(this).find("vald").text();
					var displayt = $(this).find("fill").text();
					optionsPack += '<option val="'+nondisplayt+'">'+displayt+'</option>';
				});
				var fieldName = $(this).find("varn").text();
				var labl = $(this).find("desc").text();
				fieldItem = '<select class="selectlist" id="'+fieldName+'" name="'+fieldName+'" >'+optionsPack+'</select>';		
				descriptor = '<label>'+labl+'</label>';				
			}
			break;
			case 'sl':
			{
				lengthOfWrap = 'outerlong';
				var optionsPack = '';				
				$(this).find("options").find("opt").each( function() {
					var nondisplayt = $(this).find("vald").text();
					var displayt = $(this).find("fill").text();
					optionsPack += '<option val="'+nondisplayt+'">'+displayt+'</option>';
				});
				var fieldName = $(this).find("varn").text();
				var labl = $(this).find("desc").text();
				fieldItem = '<select class="selectlist" id="'+fieldName+'" name="'+fieldName+'" >'+optionsPack+'</select>';	
				descriptor = '<label>'+labl+'</label>';				
			}
			break;
			case 'el':
			{
				lengthOfWrap = 'outer';
				var fieldName = $(this).find("varn").text();
				var labl = $(this).find("desc").text();
				fieldItem = '<a class="input" id="'+fieldName+'" ></a>';
				descriptor = '<label>'+labl+'</label>';			
			}
			break;			
			case 'ch':
			{
				lengthOfWrap = 'outer';
			}
			break;
			case 'li':
			{
				lengthOfWrap = 'outer';
			}
			break;
			case 'te':
			{
				lengthOfWrap = 'outer';
				var fieldName = $(this).find("varn").text();
				var labl = $(this).find("desc").text();
				fieldItem = '<input class="input" type="text" id="'+fieldName+'" name="'+fieldName+'" />';
				descriptor = '<label>'+labl+'</label>';
			}			
			break;
			case 'tl':
			{
				lengthOfWrap = 'outerlong';
				var fieldName = $(this).find("varn").text();
				var labl = $(this).find("desc").text();
				fieldItem = '<input class="input"  type="text" id="'+fieldName+'" name="'+fieldName+'" />';
				descriptor = '<label>'+labl+'</label>';
			}			
			break;			
		}
		var nodeStructure = '<div class="'+lengthOfWrap+'">'+descriptor+'<div class="nav-wrapper" id="finesse-tab-selector"><div class="nav-tab-selector left"></div><div class="nav-tab-selector right"></div><div class="nav-tab-selector center">'+fieldItem+'</div></div></div>';
		//var nodeStructure = '<li>'+descriptor+fieldItem+'</li>';
		formInjector += nodeStructure;
	});	
	target.html(formInjector);
}

function writeOut( reaDer, wrapDer, myDerta )
{
	var contactType = "Phone";
	var contactTypeImage = "images/"+contactType+"ico.png";
	var timeDer = new Date();
	var prettyDate = timeDer.format("yyyy:mmm:dd - hh:MMTT");
	
	/*
	var info = '<li><a class="expander"><p><img class="CHicon" src="'+contactTypeImage+'" title="'+contactType+'"/>'+$(this).find("dateTime").text()+'<br/>Reason:'+$(this).find("reason").text()+' <br/>Wrapup:'+$(this).find("wrapup").text()+'</p></a>'
	+'<div class="hider"><span>'+$(this).find("notes").text()+'</span></div></li>'; 
	$("#historyofthemoon").append(info);
	*/
	var info = '<div class="callerseg"><div class="segcontent"><div class="ico"><img src="'+contactTypeImage+'" title="'+contactType+'"></div><p class="cdetail">'+prettyDate+'<br/>Reason: '+reaDer+'<br/>Wrapup: '+wrapDer+'</p></div><p class="cdesc">'+myDerta+'</p></div>';
	$("#historyofthemoon").prepend(info);	
	$.colorbox.close();
}

function treeStyle(callType)
{

	$("#kblistarea").jstree({ 
		"xml_data" : {
			"ajax" : {
				"url" : "xml/"+callType+"_kb.xml",
				"data" : function (n) {
					return {
						id : n.attr ? n.attr("id") : 0,
						rand : new Date().getTime()
					};
				}
			},
			"xsl" : "nest"
		},
		"plugins" : [ "themes", "xml_data", "ui" ]
	})
	.bind("select_node.jstree", function (event, data) {
		// `data.rslt.obj` is the jquery extended node that was clicked
		var contenter = data.rslt.obj.attr("id");
		$.ajax({
			url: "xml/"+callType+"_kb_content.xml",
			dataType: "xml",
			success: function(data){
				var pdiddy = $(data).find(contenter).text();
				$("#kbcontentarea").html( pdiddy );
			},
			error: function(a,b){
				alert("Error: Your knowledgebase content is malformed.");
			}
		});		
	});

}

function popCallHistory(call) {
 
	var addUse, cityUse, countryUse;
	
	$.ajax({ 
 
	 url: "xml/"+call+".xml",
	 dataType: "xml",
	 success: function(data) {
 
		$("#historyofthemoon").children().remove(); 		
		//Get History
		//$("#historyofthemoon").append("<li><span>Date</span><span>Reason</span><span>Wrapup</span></li>"); 
		$(data).find("history").find("instance").each( function() {
			
			var contactType = $(this).find("contactMethod").text();
			var contactTypeImage = "images/"+contactType+"ico.png";
			
			/*
			var info = '<li><a class="expander"><p><img class="CHicon" src="'+contactTypeImage+'" title="'+contactType+'"/>'+$(this).find("dateTime").text()+'<br/>Reason:'+$(this).find("reason").text()+' <br/>Wrapup:'+$(this).find("wrapup").text()+'</p></a>'
			+'<div class="hider"><span>'+$(this).find("notes").text()+'</span></div></li>'; 
			$("#historyofthemoon").append(info);
			*/
			var info = '<div class="callerseg"><div class="segcontent"><div class="ico"><img src="'+contactTypeImage+'" title="'+contactType+'"></div><p class="cdetail">'+$(this).find("dateTime").text()+'<br/>Reason: '+$(this).find("reason").text()+'<br/>Wrapup: '+$(this).find("wrapup").text()+'</p></div><p class="cdesc">'+$(this).find("notes").text()+'</p></div>';
			$("#historyofthemoon").append(info);
		});		
		//Attain callType
		var callType = $(data).find("calltype").text();	
		//Clear third tab
		$('#tabs').tabs('destroy').tabs();
		$("#tabs-3").remove();
		$("#tabs33").remove();
		
		//Get KB and wrapup - specific to call type
		$.ajax({ 
			url: "xml/"+callType+".xml",
			dataType: "xml",
			success: function(dataIn) {
				//Get KB
				/*
				var kbcontent = "<img src='images/"+callType+".png'/>";
				$("#kbmain").html("").append(kbcontent).addClass("kblitup");	
				*/
				//Populate FAQ questions in first tab
				treeStyle(callType);
				//Initialize twitter based on string from the calltype xml
				//var twitUser = $(dataIn).find("social").text();
				//$('#fromtwo').miniTwitter({username: twitUser, limit: 6});
				
				//Create new tab in knowledge base - 3rd tab is unique to call type
				//var 3rdtabCont = $(dataIn).find("social").text();
				var t3rdtabCont = $(dataIn).find("optionalcontent").text();
				if(!t3rdtabCont)
				 t3rdtabCont = "<div id='horizontalWidget' style='width:370px;overflow:hidden;text-align:center;font-family:verdana,arial,sans-serif;font-size:8pt;line-height:13x;background-color:#ced7bd;letter-spacing:0;text-transform:none;border-radius: 5px;webkit-border-radius:5px;'><div style='margin:6px 0;'><a href='http://www.zillow.com/mortgage-calculator/' target='_blank' title='Mortgage Calculators on Zillow' style='font-family:Arial;font-size:15px;text-decoration:none;font-weight:bold;color:#426529;cursor: pointer;display: block;text-align: center;text-shadow: 0 1px #fff;'>Mortgage Calc</a></div><div style='width:352px;margin:0 auto;background-color:#f2f5ef;text-align:left; font-size:8pt;border-radius: 5px; border: 1px solid;border-color:#bccdaf;webkit-border-radius: 5px;padding: 0 1px;'><iframe title='Mortgage Calculator' frameborder='0' height='235px' style='float:left;' scrolling='no' width='352px' src='http://www.zillow.com/mortgage/SmallMortgageLoanCalculatorWidget.htm?price=400000&wtype=spc&rid=102001&wsize=small&textcolor=426529&backgroundColor=f2f5ef&advTabColor=708a5c&bgcolor=ced7bd&bgtextcolor=426529&headerTextShadow=fff&widgetOrientationType=horizontalWidget'> Your browser doesn't support frames. Visit <a href='http://www.zillow.com/mortgage-calculator/' target='_blank' style='text-decoration:none; font-size:9pt; font-weight:bold;'>Zillow Mortgage Calculators</a> to see this content. </iframe><div style='clear:both;'></div></div><div style='height:20px;'><span style='display:block;margin:0 auto;font-size:7pt;height:15px;width:178px;color:#426529;padding-top:2px;'></span></div></div>";
				switch( callType )
				{
					case 'mortgage':
					{
						var newTabs = '<li id="tabs33"><a href="#tabs-3">Mortgage Calculator</a></li>';
						$("#tabheaders").append( newTabs );
						var newTabCont = "<div id='tabs-3'>"+t3rdtabCont+"</div>";							
					}
					break;
					case 'retail':
					{
						var newTabs = '<li id="tabs33"><a href="#tabs-3">Related Products</a></li>';
						$("#tabheaders").append( newTabs );
						var newTabCont = "<div id='tabs-3'>"+t3rdtabCont+"</div>";					
					}
					break;
					case 'hospital':
					{
						var newTabs = '<li id="tabs33"><a href="#tabs-3">Emergency Procedures</a></li>';
						$("#tabheaders").append( newTabs );
						var newTabCont = "<div id='tabs-3'>"+t3rdtabCont+"</div>";					
					}
					break;
					default:	
						var newTabs = '<li id="tabs33"><a href="#tabs-3">Local Tool</a></li>';
						$("#tabheaders").append( newTabs );
						var newTabCont = "<div id='tabs-3'>"+t3rdtabCont+"</div>";
					break;
				}				
				$("#tabs").append( newTabCont ).tabs("refresh");	
				
				//******************************************************************************************************************************
				//Generate wrapup section
				var wrappTarg = $("#wrapped");
				wrappTarg.html("");
				$(dataIn).find("wrapups").each( function(index,value) {				
					var anOption = "<option value='"+$(this).find("code").text()+"'>"+$(this).find("display").text()+"</option>";
				});	
				spitFormNode( $(dataIn).find("wrapbundle"), wrappTarg );			
				
				//******************************************************************************************************************************
				//Generate details section
				var detTarg = $("#detailed");
				detTarg.html("");				
				$(dataIn).find("wrapups").each( function(index,value) {	
					var anOption = "<option value='"+$(this).find("code").text()+"'>"+$(this).find("display").text()+"</option>";
				});		
				spitFormNode( $(dataIn).find("detbundle"), detTarg );	

				//******************************************************************************************************************************
				//Get Details				
				$(data).find("details").children().each( function(index,value) {
					var myNodeNerm = value.nodeName;			
					var myNodeDerta = value.firstChild.data;
					if(myNodeNerm == 'email')
						$("#"+myNodeNerm).html(myNodeDerta).attr('href',"mailto:"+myNodeDerta);
					else
						$("#"+myNodeNerm).val(myNodeDerta);
				});	
                                if(thisMode == "r")
                                    StartXML();
                                else
                                   ResumeXML();
                               
			},
			error: function(a,b) { $("#historyofthemoon").children().remove(); 
							 $("#historyofthemoon").append("<li>Your (calltype) file was messed.</li>"); }
		});
		setTimeout( plopAddy,1500 );						
	 },
 error: function(a,b) { $("#historyofthemoon").children().remove(); 
                             $("#historyofthemoon").append("<li>Your file was messed.</li>"); }
     });
}