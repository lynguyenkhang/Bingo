
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



module.exports.randomTable =  function(){
	var result = [];
	for(var row = 1; row < 10; row++){
		result.push(randomArr());
	};
	checkOverlappedTable(result);

	return result;
}
