
/*
	cool.js
	by @andygrn
*/

'use strict';

var cool = {};

/*
	Validate a variable's type against an input string
	A TypeError is thrown if the types don't match
	Valid expected_type strings are: string, number, boolean, object, array, function, regexp, date, undefined
*/
cool.validateVariableType = function( variable, expected_type ){

	var variable_type = typeof variable;

	if( variable_type === 'object' ){
		variable_type = variable instanceof Array ? 'array' :
		variable instanceof RegExp ? 'regexp' :
		variable instanceof Date ? 'date' : 'object';
	}

	if( variable_type !== expected_type ){
		throw new TypeError( 'Variable of type "' + variable_type + '" must be of type "' + expected_type + '"' );
	}

}

/*
	Return a reusable function for easing a changing value between 0 and 1
	The generated function is passed a number between 0 and 1, and returns the eased equivalent (also between 0 and 1)

	Depends upon this.createNumberGate()
*/
cool.createEaser = function( easing_function_name ){

	var all_easing_functions = {
		easeIn: function( p ){
			return Math.sin( p * ( Math.PI / 2 ) );
		},
		easeOut: function( p ){
			return Math.cos( ( p * ( Math.PI / 2 ) ) + Math.PI ) + 1;
		},
		easeInOut: function( p ){
			return ( Math.cos( ( p * Math.PI ) + Math.PI ) + 1 ) / 2;
		}
	};

	var number_gate = this.createNumberGate( 0, 1 );
	var easing_function = all_easing_functions[easing_function_name];

	return function( uneased_percentage ){

		var limited_uneased_percentage = number_gate( uneased_percentage );

		return easing_function( limited_uneased_percentage );

	};

};

/*
	Return a reusable function that limits numbers between two fixed values
	A number below minimum_value will return minimum_value, a number above maximum_value will return maximum_value
*/
cool.createNumberGate = function( minimum_value, maximum_value ){

	return function( number_to_be_limited ){

		if( number_to_be_limited < minimum_value ){
			return minimum_value;
		}
		else if( number_to_be_limited > maximum_value ){
			return maximum_value;
		}

		return number_to_be_limited;

	};

};

/*
	Return a reusable function that draws a string bar segment or dotted line segment of a specified width, using a specified output function (probably console.log)
	Useful for testing numeric sequences, animations, and easing functions
*/
cool.createPlotter = function( graph_type, graph_width, output_function ){

	var all_graph_types = {
		bar: function( bar_width ){
			return new Array( Math.round( bar_width ) ).join( '█' ) + '█';
		},
		line: function( dot_position ){
			return new Array( Math.round( dot_position ) ).join( ' ' ) + '●';
		}
	}

	var graphing_function = all_graph_types[graph_type];

	return function( percentage_of_graph_width ){

		var line_size = percentage_of_graph_width * graph_width;
		var line_string = graphing_function( line_size );

		output_function( line_string );

	};

};

/*
	Return a reusable function that calls a random function from an array each time it is called
	Arguments are preserved and passed into the chosen function
*/
cool.createRandomFunctionCaller = function( list_of_functions ){

	var length = list_of_functions.length;

	return function(){

		var random_index = Math.floor( Math.random() * length );

		list_of_functions[random_index].apply( list_of_functions[random_index], arguments );

	};

};

/*
	Return a function that wraps another function, setting a maximum on its calls
	Breaker can be reset to zero with .reset();
	Arguments are preserved and passed into the wrapped function
*/
cool.createBreakerFunction = function( function_to_break, call_limit ){

	var breaker_wrapper = function(){
		if( breaker_wrapper.call_count < call_limit ){
			breaker_wrapper.call_count += 1;
			function_to_break.apply( function_to_break, arguments );
		}
	};

	breaker_wrapper.reset = function(){
		this.call_count = 0;
	};

	breaker_wrapper.call_count = 0;

	return breaker_wrapper;

};


/*
	Return an array of arrays containing string classes, with indexes parallel to the input array
	Array items are classified with boolean filters
	Useful for styling list items, categorising data, etc.
	Filter functions are passed
		1. the array item
		2. the array index
		3. the array length
	The filter function name becomes the class name
	Some default filters are included, remove them if you don't need them
*/
cool.classifyArray = function( array_to_be_classified ){

	var filter_list = {
		even: function( n, i ){
			return ( i + 1 ) % 2 === 0;
		},
		odd: function( n, i ){
			return i % 2 === 0;
		},
		first: function( n, i ){
			return i === 0;
		},
		last: function( n, i, t ){
			return i === ( t - 1 );
		},
		number: function( n ){
			return typeof n === 'number';
		},
		string: function( n ){
			return typeof n === 'string';
		}
	};

	var list_of_item_class_lists = [];
	var current_item_class_list = [];
	var item_count = array_to_be_classified.length;

	for( var i = 0; i < item_count; i += 1 ){
		for( var filter in filter_list ){
			if( filter_list[filter]( array_to_be_classified[i], i, item_count ) ){
				current_item_class_list.push( filter );
			}
		}
		list_of_item_class_lists.push( current_item_class_list );
		current_item_class_list = [];
	}

	return list_of_item_class_lists;

};

/*
	Call a function when all of the image URLs in an array have been loaded
	Call another function each time an image URL finishes loading
	loading_complete_callback is passed an array of loaded image objects
	loading_progress_callback (optional) is passed the number of images loaded so far
*/
cool.loadImages = function( array_of_image_paths, loading_complete_callback, loading_progress_callback ){

	var loaded_image_count = 0;
	var array_of_image_objects = [];

	var singleImageLoaded = function(){
		loaded_image_count += 1;
		if( loaded_image_count >= array_of_image_paths.length ){
			loading_complete_callback( array_of_image_objects );
		}
		else if( loading_progress_callback ){
			loading_progress_callback( loaded_image_count );
		}
	};

	var temporary_image_object;

	for( var i = 0; i < array_of_image_paths.length; i += 1 ){
		temporary_image_object = new Image();
		temporary_image_object.onload = singleImageLoaded;
		temporary_image_object.src = array_of_image_paths[i];
		array_of_image_objects.push( temporary_image_object );
	}

};

