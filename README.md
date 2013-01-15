
# cool.js
Functions that make you say "cool."

## validateVariableType()
Validate a variable's type against an input string
```javascript
var variable = 'hello';
cool.validateVariableType( variable, 'string' );
cool.validateVariableType( variable, 'array' ); // TypeError!
```

## createEaser()
Return a reusable function for easing a changing value between 0 and 1
```javascript
var easeIn = cool.createEaser( 'easeIn' );
document.onscroll( function(){
	element.style.top = ( easeIn( document.body.scrollTop / 500 ) * 500 ).toString() + 'px';
} );
```

## createNumberGate()
Return a reusable function that limits numbers between two fixed values
```javascript
var limitNumber = cool.createNumberGate( 0, 10 );
limitNumber( 4 ); // 4
limitNumber( 12 ); // 10
limitNumber( -5 ); // 0
```

## createPlotter()
Return a reusable function that draws a string bar segment or dotted line segment of a specified width, using a specified output function (probably console.log)  
Useful for testing numeric sequences, animations, and easing functions
```javascript
var plot = cool.createPlotter( 'line', 10, function( graph_line ){
	console.log( graph_line );
} );
for( var i = 0; i <= 10; i += 1 ){
	plot( i );
}
// ●
//  ●
//   ●
//    ●
//     ●
//      ●
//       ●
//        ●
//         ●
//          ●
//           ●
```

## createRandomFunctionCaller()
Return a reusable function that calls a random function from an array each time it is called  
Arguments are preserved and passed into the chosen function
```javascript
var randomFunction = cool.createRandomFunctionCaller( [
	function( arguments ){
		// do something
	},
	function( arguments ){
		// do something else
	}
] );
randomFunction( 'hello' );
```

## classifyArray()
Return an array of arrays containing string classes, with indexes parallel to the input array  
Array items are classified with boolean filters
```javascript
var array = ['blah','blah',2,435,'blah'];
var classes = cool.classifyArray( array );
// [
// 	['odd','first','string'],
// 	['even','string'],
// 	['odd','number'],
// 	['even','number'],
// 	['odd','last','string']
// ]
```

## loadImages()
Call a function when all of the image URLs in an array have been loaded  
Call another function each time an image URL finishes loading
```javascript
var image_array = ['image1.jpg','image2.gif','image3.png'];
cool.loadImages( images_array, function( loaded_images ){
	// do something with loaded images...
}, function( loaded_count ){
	progress_bar.style.width = ( ( loaded_count / image_array.length ) * 100 ).toString() + '%';
} );
```