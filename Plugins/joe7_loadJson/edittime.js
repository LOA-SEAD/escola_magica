function GetPluginSettings()
{
	return {
		"name":			"Load JSON",				
		"id":			"ljson",
		"version":		"1.2",			
		"description":	"Loads and parses a JSON-file.",
		"author":		"Joe7",
		"help url":		"http://dev.liebhard.net/",
		"category":		"Data & Storage",				
		"type":			"object",			// not in layout
		"rotatable":	false,
		"flags":		0	
	};
};


////////////////////////////////////////
// Conditions

AddCondition(0,	cf_trigger, "On loading completed", "Data", "On loading JSON completed", "Triggered when the loading completes successfully.", "OnLoadingComplete");

////////////////////////////////////////
// Actions
AddAction(0, 0, "Load JSON", "Data", "Load JSON", "Load a JSON-file.", "LoadJSON");

////////////////////////////////////////
// Expressions
AddStringParam("Keyword", "Enter a keyword for the loading.");
AddNumberParam("Position", "Enter the position of the data.");
AddExpression(0, ef_return_string, "Get JSON-data.", "Data", "GetData", "Get JSON-data.");

AddExpression(1, ef_return_string, "Read the loading return.", "Data", "ReadLoadingReturn", "Read the return value.");

AddExpression(2, ef_return_number, "How many rootkeys are in use.", "Data", "GetRootKeysSize", "How many rootkeys are in use.");

AddStringParam("Key", "Enter a key to count it's values.");
AddExpression(3, ef_return_number, "How many values are in use.", "Data", "GetKeySize", "How many values are in use.");

////////////////////////////////////////
ACESDone();

////////////////////////////////////////

var property_list = [
	new cr.Property(ept_text,		'JSON-file',	'languageStrings.json',	'The name and adress of the external JSON-file.'),
	
	];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}