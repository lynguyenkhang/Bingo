
function randomBlank(){
	var num1 = Math.floor(Math.random() * 9);
	var num2 = Math.floor(Math.random() * 9);
	var num3 = Math.floor(Math.random() * 9);
	var num4 = Math.floor(Math.random() * 9);
	var result = [num1, num2, num3, num4];

	while(checkOverlappedArr(result)){
		num1 = Math.floor(Math.random() * 9);
		num2 = Math.floor(Math.random() * 9);
		num3 = Math.floor(Math.random() * 9);
		num4 = Math.floor(Math.random() * 9);
		result = [num1, num2, num3, num4];
	}

	result = result.sort();
	// for( var i = 1; i < result.length; i++){

	// 	// check 3 continous blank
	// 	var overlapPrevious = (result[i] === (result[i-1] + 1));
	// 	var overlapAfter = (result[i] === (result[i+1] - 1));
	// 	var checkContinous = overlapAfter && overlapPrevious;



	// }
	var distanceBlank = ((result[1] > (result[0] + 4)) || (result[2] > (result[1] + 4)) || (result[3] > (result[2] + 4)));

	var consBlank = (((result[0] + 1) === result[1]) && ((result[1] + 1) === result[2]) && ((result[2] + 1) === result[3]));
	var firstBlankPostion = (result[0] > 2);

		if((consBlank) || (firstBlankPostion) ||(distanceBlank)){
			result = randomBlank();
		}

	// if( ((result[1]-result[0]) === 1) && ((result[2] - result[1]) === 1) && ((result[3] - result[2]) === 1) ){
	// 	result = randomBlank();
	// }




	return result;
}

function createRandomNum(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomArr() {
	var result = [];
	for(var i = 1; i < 10; i++){

		if(i === 9){
			var max = i*10;
		} else {
			var max = i*10 - 1;
		}

		switch(i){
			case 1:
				var min = 1; break;
			case 9:
				var min = 80; break;
			default:
				var min = max - 9;
		}

		// if(i === 1 ){
		// 	var min = 1;
		// } else {
		// 	var min = max - 9;
		// }

		result.push(createRandomNum(min, max));
	};

	var blank = randomBlank();
	for(var i of blank){
		result.splice(i, 1, ' ');
	}

	return result;
}


function checkOverlappedArr(arr){
	var result = false;
	for( var i = 0; i < arr.length; i++){
		for( var j = i + 1; j < arr.length; j++){
			if(arr[i] === arr[j]){
				result = true;
				return result;
			}
		}
	}
	return result;
}

function checkOverlappedRow(arr1, arr2){
	var result = false;
	for(var i = 0; i < 9; i++){
		if(typeof(arr1[i] === 'number') && (typeof(arr2[i]) === 'number')){
			if(arr1[i] === arr2[i]){
				result = true;
				return result;
			}
		}
	}
	return result;
}

function changeOverlappedRow(arr1, arr2){
	while(checkOverlappedRow(arr1, arr2)){
		arr2 = randomArr();
	}
}


function checkOverlappedTable(table){
	for(var i = 0; i < table.length; i++){

		for(var j = i + 1; j < table.length; j++){
			while(checkOverlappedRow(table[i], table[j])){
				table[j] = randomArr();
				// dùng đệ quy
				checkOverlappedTable(table);
			}

		}
	}
}

function count(element, arr){
	var result = 0;
	for (var ele of arr){
		if(ele === element){
			result += 1;
		}
	}
	return result;
}

// function checkBlankInTable(table){
// 	for(var i = 0; i < table.length; i++){
// 		var blankNum = count(' ', table[i]);
// 		if((blankNum < 3) && (blankNum > 5)){
// 			checkOverlappedTable(table);
// 		}
// 	}
// }



function checkConsecutiveBlanks(arr){
	var blankArr = [];
	var result = false;
	for(var i = 0; i < arr.length; i++){
		if(arr[i] === " "){
			blankArr.push(i);
		}
		// var j = arr.indexOf(" ",i);
		// blankArr.push(j);
		// i = j + 1;
	}

	for(var j = 1; j < blankArr.length; j++){
		var overlapPrevious = (blankArr[j] === (blankArr[j-1] + 1));
		var overlapAfter = (blankArr[j] === (blankArr[j+1] - 1));
		if((overlapPrevious) && (overlapAfter)){
			result = true;
			break;
		}
	}
	return result;
}

var loop = 0;

function makeTable(){
	var result = [];
	for(var row = 1; row < 10; row++){
		result.push(randomArr());
	};
	checkOverlappedTable(result);

	// check Blank in table
	for (var i = 0; i < result.length; i++){

		var col = [];
		for(var row of result){
			col.push(row[i]);
		}
		var consBlank = checkConsecutiveBlanks(col);
		// console.log(consBlank);
		loop+= 1;
		var blankNum = count(' ', col);

		if((blankNum > 5) || (blankNum < 3) || (consBlank)){
			result = makeTable();
		}
	}

	return result;
}

// function nullBlank(){
// 	for( var i = 1; i < 91; i++){
// 		var element = document.getElementById(i);
// 		if(element.innerText === " "){
// 			element.setAttribute("class", " switched nullBlank")
// 		}
// 	}
// }



 module.exports.randomTable = function(){
 	var result = makeTable();
 	// nullBlank();
 	console.log(loop);
 	loop = 0;
 	return result;
 };





