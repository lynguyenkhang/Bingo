
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
	}

	for(var j = 1; j < blankArr.length; i++){
		var overlapPrevious = (blankArr[j] === (blankArr[j-1] + 1));
		var overlapAfter = (blankArr[j] === (blankArr[j+1] - 1));
		if((overlapPrevious) && (overlapAfter)){
			result = true;
		}
	}
	return result;
}


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
		var blankNum = count(' ', col);

		if((blankNum > 5) || (blankNum < 3)){
			result = makeTable();
		}
	}

	return result;
}


 module.exports.randomTable = function(){
 	var result = makeTable();
 	return result;
 };





