var fs = require('fs');
var csvfile = fs.readFileSync("friend_list.csv","utf8");

function csvParse(file){
	var arr = file.split("\n");
	var arrKeys = arr[0].split(',');
	var arrObjects = [];

	for(var i = 1; i<arr.length;i++){
		if(arr[i].length>1){
			var arrRow = arr[i].split(',');
			var arrRowObj = {};

			for(var j = 0; j<arrKeys.length; j++){
				arrRowObj[arrKeys[j]] = arrRow[j];
			}

			arrObjects.push(arrRowObj);
		}
	}

	return arrObjects;

}

function replaceKeys(arrObj){
	var message = fs.readFileSync("email_template.html","utf8");

	for (var i = 0; i < arrObj.length; i++) {
		// iterate over the objects in the array
		var customMessage = message;

		for(var key in arrObj[i]){
			// any instance of %%key%% in the message is replaced with its value 
			// console.log(key + " = " + arrObj[i][key]);
			customMessage = customMessage.replace("%%" + key + "%%", arrObj[i][key]);	
		};

		console.log(customMessage);		

	};
}


console.log(replaceKeys(csvParse(csvfile)));
