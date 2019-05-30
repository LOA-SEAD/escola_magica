// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class

cr.plugins_.ljson = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	/////////////////////////////////////
	
	var pluginProto = cr.plugins_.ljson.prototype;
		
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		this.nameOfExternalFile= this.properties[0];
		this.keysArray= new Array();
		this.keysContentArray= new Array(); // an array of arrays - key is stored in keysArray
		
		this.counterKeys= 0;
		
		this.returnValue= "";
		this.loadingCompleted= false;
	};
	
	// only called if a layout object
	instanceProto.draw = function(ctx)
	{
	};

	//////////////////////////////////////
	// Conditions
	pluginProto.cnds = {};
	var cnds = pluginProto.cnds;

	cnds.OnLoadingComplete = function ()
	{
		return this.loadingCompleted === true;
	};
	
	//////////////////////////////////////
	// Actions
	pluginProto.acts = {};
	var acts = pluginProto.acts;

	acts.LoadJSON = function ()
	{
		jQuery.ajaxSetup({'beforeSend': function(xhr)
		{ // if not => browser warnings
				if (xhr.overrideMimeType) xhr.overrideMimeType("text/plain");
		}});
		
		jQuery.ajaxSetup( { "async": false } ); // instant loading JSON
		
		// Create a context object with a reference back to this
		var context_obj = { inst: this };
		
		// Make the request
		jQuery.ajax(
		{
			url: this.nameOfExternalFile,
			dataType: 'json',
			context: context_obj,
			success: function(data)
			{
				for (var myJSONkey in data)
				{
					var tempArrayWords= new Array();
					var counterWords= 0;
					
					for(var word in data[myJSONkey]) 
					{
						tempArrayWords[counterWords]= data[myJSONkey][word];
						counterWords++;
					}
					this.inst.keysArray[this.inst.counterKeys]= myJSONkey; // saving the key
					this.inst.keysContentArray[this.inst.counterKeys]= tempArrayWords; // saving the values of the key
					this.inst.counterKeys++;
				};
				this.inst.loadingCompleted= true;				
				this.inst.returnValue= "success";
				this.inst.runtime.trigger(cr.plugins_.ljson.prototype.cnds.OnLoadingComplete, this.inst);
			},
			error: function() 
			{
				this.inst.returnValue= "error";
				this.inst.loadingCompleted= "false";
			}
			
		});
	};	
	
	
	//////////////////////////////////////
	// Expressions
	pluginProto.exps = {};
	var exps = pluginProto.exps;
	
	exps.GetRootKeysSize = function (ret)	
	{
		ret.set_int(this.counterKeys);
		this.returnValue= "rootkeys size: "+this.counterKeys;
	};
	
	exps.GetKeySize = function (ret, keyWordString)	
	{
		for (var i= 0; i< this.keysArray.length; i++)
		{
			if (keyWordString == this.keysArray[i]) // search for the keyword
			{
				ret.set_int(this.keysContentArray[i].length);
				this.returnValue= keyWordString+": "+this.keysContentArray[i].length;
				return;
			}
		}
		// if not found
		ret.set_int(-1);
		this.returnValue= "key doesn't exist";
	};
	
	exps.GetData = function (ret, keyWordString, positionInt)	
	{
		if (positionInt < 0)
		{
			ret.set_string("Not a positive number!");
			this.returnValue= "negative number";
			return;
		}
		
		try
		{
			for (var i= 0; i< this.keysArray.length; i++)
			{
				if ((keyWordString == this.keysArray[i]) && (positionInt < this.keysContentArray[i].length))
				{
					ret.set_string(this.keysContentArray[i][positionInt]);
					this.returnValue= "success";
					return;
				}
			}
			this.returnValue= "nothing";
			ret.set_string("nothing found");
		}
		catch (err)
		{
			ret.set_string(err);
			this.returnValue= err;
		}
		
	};
	
	exps.ReadLoadingReturn = function (ret)	
	{
		ret.set_string(this.returnValue);
	};

}());