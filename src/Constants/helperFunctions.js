// TODO: !IMPORTANT! Once everything is working, remove all validity tests to improve performance

export const techTreeRequirements = (index) => {
	// This function takes in the index value of a given tech cell and outputs the
	// tech cell's index that must have been purchased in order to be unlocked
	if (index === 0 || index === 3) return null
	else if (index === 1 || index === 2) return null
	else if (index === 4 || index === 5) return [1]
	else if (index === 6 || index === 7) return [2]
	else if (index === 21) return [16, 17]
	else if (index === 22) return [18, 19]
	else return [index - 4];
}

export const inverseTechTreeRequirements = (index) => {
	// This function takes in the index value of a given tech cell and outputs the
	// tech cell's indeces that must be set to false (unpurchased)
	if (index === 0 || index === 3 || index === 20 || index === 23) return null
	else if (index >= 21 && index <= 22) return [index]
	else if (index >= 18 && index <= 19) return [index, 22]
	else if (index >= 16 && index <= 17) return [index, 21]
	else if (index >= 14 && index <= 15) return [index, index+4, 22]
	else if (index >= 12 && index <= 13) return [index, index+4, 21]
	else if (index >= 10 && index <= 11) return [index, index+4, index+8, 22]
	else if (index >= 8 && index <= 9) return [index, index+4, index+8, 21]
	else if (index >= 6 && index <= 7) return [index, index+4, index+8, index+12, 22]
	else if (index >= 4 && index <= 5) return [index, index+4, index+8, index+12, 21]
	else if (index === 1) return [index, index+3, index+7, index+11, index+15, index+4, index+8, index+12, index+16, 21]
	else if (index === 2) return [index, index+5, index+9, index+13, index+17, index+4, index+8, index+12, index+16, 22]
}

export function incrementerArrayGenerator (numberOfEntries) {
	let newArray = [];
	// below was range before barriers were included
	// for(let index = 1; index <= numberOfEntries; index ++) {
	for(let index = 0; index <= numberOfEntries+1; index ++) {
		newArray.push(index);
	}
	return newArray;
}

// function below verifies that a given input is an Integer
export function verifyIsInteger (supposedNumber) {
	if (supposedNumber === null || supposedNumber === undefined) {
		console.log("Input not defined")
		return false
	}
	else if (!Number.isInteger(supposedNumber) ) {
		console.log("Inputted value is not an integer")
		return false
	}
	else return true
}
// The calling of this function is for testing purposes and should be removed upon deployment
export function testValidityOfLocationInput (location) {
	if (location === undefined || location === null) {
		console.log('location not entered')
		return false
	}
	if (typeof(location) !== 'object') {
		console.log('location is not an object')
		return false
	}
	if (!verifyIsInteger(location.col)) {
		console.log("location's col not an integer")
		return false
	}
	if (!verifyIsInteger(location.row)) {
		console.log("location's row not an integer")
		return false
	}

	// if (location.col === null || location.col === undefined) {
	// 	console.log("location's col not entered")
	// 	return false
	// }
	// else if (!Number.isInteger(location.col)) {
	// 	console.log("location's col not an integer")
	// 	return false
	// }
	// if (location.row === null || location.row === undefined) {
	// 	console.log("location's row not entered")
	// 	return false
	// }
	// else if (!Number.isInteger(location.row)) {
	// 	console.log("location's row not an integer")
	// 	return false
	// }
	return true
}
// function tests if two locations are the same
export function testSameCell (location1, location2) {
	if (!testValidityOfLocationInput(location1) || !testValidityOfLocationInput(location2)) return
	if (location1.row !== location2.row || location1.col !== location2.col) return false
	return true
}
// function verifies that a row/col combination is in bounds
export function verifyCellIsInBounds (cellLocation, maxRows, maxCols) {
	if (!testValidityOfLocationInput(cellLocation)) return
	if (!verifyIsInteger(maxRows) || !verifyIsInteger(maxCols)) return
	if (cellLocation.col > maxCols || cellLocation.row > maxRows ||
		cellLocation.col === 0 || cellLocation.row === 0) return false
	else return true
}
export function verifyCellIsOnCorner (cellLocation, maxRows, maxCols) {
	if (!testValidityOfLocationInput(cellLocation)) return;
	if (testSameCell(cellLocation, {col: 1, row: 1}) ||
	testSameCell(cellLocation, {col: maxCols+1, row: 1}) ||
	testSameCell(cellLocation, {col: 1, row: maxRows+1}) ||
	testSameCell(cellLocation, {col: maxCols+1, row: maxRows+1})
	) {
		return true
	} else {
		return false
	}
}
// function below determines distance (cell count) from a cell
export function straightDistanceBetweenCells (startLocation, finishLocation) {
	if (!testValidityOfLocationInput(startLocation) || !testValidityOfLocationInput(finishLocation)) return
	if (startLocation.col === finishLocation.col || startLocation.row === finishLocation.row) {
	return ( Math.abs(startLocation.col-finishLocation.col) + Math.abs(startLocation.row-finishLocation.row) )
	}
	else {
		return ( Math.abs(startLocation.col-finishLocation.col) + Math.abs(startLocation.row-finishLocation.row) -1 )
	}
}
// function below creates an array that contains the movements requires to move beside the finish location
export function pathToAdjacentCell (startLocation, finishLocation) {
	if (!testValidityOfLocationInput(startLocation) || !testValidityOfLocationInput(finishLocation)) return
	if (startLocation.col === finishLocation.col && startLocation.row === finishLocation.row) {
		console.log(' two tested locations are already on the same cell')
		return []
	}
	let path = [];
	function straightLineMovement (moveDirection, location) {
		for (let moves = 1; moves < straightDistanceBetweenCells(location,finishLocation); moves ++) {
			path.push(moveDirection)
		}
	}
	if (startLocation.col === finishLocation.col) {
		if (startLocation.row > finishLocation.row) {
			straightLineMovement('U', startLocation);
		}
		else {
			straightLineMovement('D', startLocation);
		}
		return path
	}
	else if (startLocation.row === finishLocation.row) {
		if (startLocation.col > finishLocation.col) {
			straightLineMovement('L', startLocation);
		}
		else {
			straightLineMovement('R', startLocation);
		}
		return path
	}
	let i = startLocation.col;
	let j = startLocation.row;
	// Case: finish location is DR of start location
	if (i > finishLocation.col && j > finishLocation.row) {
		while ((i-1 !== finishLocation.col && j-1 !== finishLocation.row) && !(i === finishLocation.col || j === finishLocation.row)) {
			i--;
			j--;
			path.push('UL');
		}
		// console.log(i, j, finishLocation.col, finishLocation.row)
		if (i === finishLocation.col || i-1 === finishLocation.col) {
			straightLineMovement('U', {col:i, row:j});
		}
		else straightLineMovement('L', {col:i, row:j});
	}
	// Case: finish location is DL of start location
	else if (i > finishLocation.col && j < finishLocation.row) {
		while ((i-1 !== finishLocation.col && j+1 !== finishLocation.row) && !(i === finishLocation.col || j === finishLocation.row)) {
			i--;
			j++;
			path.push('DL');
		}
		if (i === finishLocation.col || i-1 === finishLocation.col) {
			straightLineMovement('D', {col:i, row:j});
		}
		else straightLineMovement('L', {col:i, row:j});
	}
	// Case: finish location is UL of start location
	else if (i < finishLocation.col && j < finishLocation.row) {
		while ((i+1 !== finishLocation.col && j+1 !== finishLocation.row) && !(i === finishLocation.col || j === finishLocation.row)) {
			i++;
			j++;
			path.push('DR');
		}
		if (i === finishLocation.col || i+1 === finishLocation.col) {
			straightLineMovement('D', {col:i, row:j});
		}
		else straightLineMovement('R', {col:i, row:j});
	}
	// Case: finish location is UR of start location
	else if (i < finishLocation.col && j > finishLocation.row) {
		while ((i+1 !== finishLocation.col && j-1 !== finishLocation.row) && !(i === finishLocation.col || j === finishLocation.row)) {
			i++;
			j--;
			path.push('UR');
		}
		if (i === finishLocation.col || i+1 === finishLocation.col) {
			straightLineMovement('U', {col:i, row:j});
		}
		else straightLineMovement('R', {col:i, row:j});
	}
	else {
		console.log('pathToCell function encountered an unexpected condition')
		return
	}
	return path
}
// utility function to test if a move was diagonal
function diagonalMovementTest (move) {
	if (move === 'UR' || move === 'UL' || move === 'DR' || move === 'DL') return true
	return false
}
// utility function to determine number of moves along a path
export function movesAlongPath (path) {
	if (path === undefined || path === null) return
	if (path.length < 2) {
		return path.length
	}
	else {
		let secondDiagonal = false;
		let moveCounter = 0;
		path.forEach((move)=>{
			if (diagonalMovementTest(move)) {
				secondDiagonal ? moveCounter += 2 : moveCounter ++;
				secondDiagonal = !secondDiagonal;
			}
			else {
				moveCounter ++;
			}
		})
		return moveCounter
	}
}
// function calcualtes number of moves required to travel to a cell
export function distanceToAdjacentToCell (startLocation, finishLocation) {
	return movesAlongPath(pathToAdjacentCell(startLocation, finishLocation))
}
// function below creates an array that contains the movements requires to move beside the finish location
export function pathToCell (startLocation, finishLocation) {
	if (!testValidityOfLocationInput(startLocation) || !testValidityOfLocationInput(finishLocation)) return
	if (startLocation.col === finishLocation.col && startLocation.row === finishLocation.row) {
		console.log(' two tested locations are already on the same cell')
		return []
	}
	let path = [];
	function straightLineMovement (moveDirection, location) {
		for (let moves = 1; moves <= straightDistanceBetweenCells(location,finishLocation); moves ++) {
			path.push(moveDirection)
		}
	}
	if (startLocation.col === finishLocation.col) {
		if (startLocation.row > finishLocation.row) {
			straightLineMovement('U', startLocation);
		}
		else {
			straightLineMovement('D', startLocation);
		}
		return path
	}
	else if (startLocation.row === finishLocation.row) {
		if (startLocation.col > finishLocation.col) {
			straightLineMovement('L', startLocation);
		}
		else {
			straightLineMovement('R', startLocation);
		}
		return path
	}
	let i = startLocation.col;
	let j = startLocation.row;
	// Case: finish location is DR of start location
	if (i > finishLocation.col && j > finishLocation.row) {
		while (!(i === finishLocation.col || j === finishLocation.row)) {
			i--;
			j--;
			path.push('UL');
		}
		if (i === finishLocation.col) {
			straightLineMovement('U', {col:i, row:j});
		}
		else straightLineMovement('L', {col:i, row:j});
	}
	// Case: finish location is DL of start location
	else if (i > finishLocation.col && j < finishLocation.row) {
		while (!(i === finishLocation.col || j === finishLocation.row)) {
			i--;
			j++;
			path.push('DL');
		}
		if (i === finishLocation.col) {
			straightLineMovement('D', {col:i, row:j});
		}
		else straightLineMovement('L', {col:i, row:j});
	}
	// Case: finish location is UL of start location
	else if (i < finishLocation.col && j < finishLocation.row) {
		while (!(i === finishLocation.col || j === finishLocation.row)) {
			i++;
			j++;
			path.push('DR');
		}
		if (i === finishLocation.col) {
			straightLineMovement('D', {col:i, row:j});
		}
		else straightLineMovement('R', {col:i, row:j});
	}
	// Case: finish location is UR of start location
	else if (i < finishLocation.col && j > finishLocation.row) {
		while (!(i === finishLocation.col || j === finishLocation.row)) {
			i++;
			j--;
			path.push('UR');
		}
		if (i === finishLocation.col) {
			straightLineMovement('U', {col:i, row:j});
		}
		else straightLineMovement('R', {col:i, row:j});
	}
	else {
		console.log('pathToCell function encountered an unexpected condition')
		return
	}
	return path
}
// function calcualtes number of moves required to travel to adjacent cell
export function distanceToCell (startLocation, finishLocation) {
	return movesAlongPath(pathToCell(startLocation, finishLocation))
}
// function returns the next location to move to given a start location and a move direction
export function nextStepGenerator (startLocation, move) {
	if (!testValidityOfLocationInput(startLocation)) return
	let nextStep = null;
	switch(move) {
		case 'R' : {
			nextStep = {col: startLocation.col+1, row: startLocation.row}
			break;
		}
		case 'L' : {
			nextStep = {col: startLocation.col-1, row: startLocation.row}
			break;
		}
		case 'U' : {
			nextStep = {col: startLocation.col, row: startLocation.row-1}
			break;
		}
		case 'D' : {
			nextStep = {col: startLocation.col, row: startLocation.row+1}
			break;
		}
		case 'UR' : {
			nextStep = {col: startLocation.col+1, row: startLocation.row-1}
			break;
		}
		case 'UL' : {
			nextStep = {col: startLocation.col-1, row: startLocation.row-1}
			break;
		}
		case 'DL' : {
			nextStep = {col: startLocation.col-1, row: startLocation.row+1}
			break;
		}
		case 'DR' : {
			nextStep = {col: startLocation.col+1, row: startLocation.row+1}
			break;
		}
		default:{
			console.log('no move detected')
		}
	}
	return nextStep
}
// The calling of this function is for testing purposes and should be removed upon deployment
export function testValidityOfObjectsArrayInput (objectsArray) {
	if (objectsArray === undefined || objectsArray === null) {
		console.log('objectsArray not entered')
		return false
	}
	if (typeof(objectsArray) !== 'object') {
		console.log('objectsArray is not an object')
		return false
	}
	let caseTest = true;
	objectsArray.forEach((object)=>{
		if (caseTest) {
			if (!object.location) {
				console.log(`object ${object} has no location`)
				caseTest = false;
			}
			else {
				caseTest= testValidityOfLocationInput(object.location)
			}
		}
	})
	return caseTest
}
// // previous inferior (both slower and did not make sure bot doesn't impact itself) collisionVerification
// export function collisionVerification (cellLocation, objectsArray, maxRows, maxCols) {
// 	if (!testValidityOfLocationInput(cellLocation) || !testValidityOfObjectsArrayInput(objectsArray)) return
// 	let collision = false;
// 	objectsArray.forEach((object)=>{
// 		if (!collision) {
// 			// console.log('testing collision potential between', cellLocation, ' and ', object.location)
// 			if (object.location.col === cellLocation.col && object.location.row === cellLocation.row) {
// 				collision = true;
// 				console.log(`Impending impact with ${object}`);
// 				return collision
// 			}
// 		}
// 	})
// 	if (cellLocation.row === 0 || cellLocation.col === 0 || cellLocation.row === maxRows+1 || cellLocation.col === maxCols+1) collision = true
// 	return collision
// }


// function tests if a collision occurs given a location to move to and all the objects
export function collisionVerification (cellLocation, objectsArray, maxRows, maxCols, indexOfMovingBot) {
	if (!testValidityOfLocationInput(cellLocation) || !testValidityOfObjectsArrayInput(objectsArray)) return
	for (let i = 0; i < objectsArray.length; i++) {
		if(i !== indexOfMovingBot) {
			if (testSameCell(cellLocation, objectsArray[i].location)) {
				return objectsArray[i]
			}
		}
	}
	if (cellLocation.row === 0 || cellLocation.col === 0 || cellLocation.row === maxRows+1 || cellLocation.col === maxCols+1) return {type: 'wall', location: cellLocation};
	return false
}

// function below takes in a string and returns the number contained inside it as a number without 'px'
export function convertPxStringToNum (string) {
	if (typeof(string) !== 'string' || !string.includes('px')) {
		console.log(`string ${string} is not a string or does not include px`);
		return
	}
	let pxlessString = string.replace("px", "");
	let result;
	pxlessString === '' ? result = 0 : result = parseFloat(pxlessString);
	if (result !== 0 && !result) {
		console.log(`conversion to number of ${string} does not produce a number`);
		return
	}
	return result
}
// function below takesin a number and returns a string with 'px' added to the end
export function convertNumToPxstring (number) {
	if (typeof(number) !== 'number') {
		console.log(`number ${number} is not a number`);
		return;
	}
	return `${number}px`
}
// function takes in an array of moves and the cell size and outputs the translation needed to move an element
export function translationGenerator (movementArray, cellSize, xDisplacement, yDisplacement) {
	if (typeof(movementArray) !== 'object' || movementArray.length <1 || typeof(cellSize) !== 'number') {
		return;
	}
	
	movementArray.forEach((move)=>{
		switch(move) {
			case 'R' : {
				xDisplacement +=cellSize;
				break;
			}
			case 'L' : {
				xDisplacement -=cellSize;
				break;
			}
			case 'U' : {
				yDisplacement -=cellSize;
				break;
			}
			case 'D' : {
				yDisplacement +=cellSize;
				break;
			}
			case 'UR' : {
				xDisplacement +=cellSize;
				yDisplacement -=cellSize;
				break;
			}
			case 'DR' : {
				xDisplacement +=cellSize;
				yDisplacement +=cellSize;
				break;
			}
			case 'DL' : {
				xDisplacement -=cellSize;
				yDisplacement +=cellSize;
				break;
			}
			case 'UL' : {
				xDisplacement -=cellSize;
				yDisplacement -=cellSize;
				break;
			}
			default: {}
		}
	})
	// let result = `translate3d(${convertNumToPxstring(xDisplacement)},${convertNumToPxstring(yDisplacement)},0px)`;
	let result = { transform: `translate(${convertNumToPxstring(xDisplacement)},${convertNumToPxstring(yDisplacement)})`, xDisplacement: xDisplacement, yDisplacement: yDisplacement};
	return result
}
// function generates an array of all possible locations
function generateAllLocation (maxRows, maxCols) {
	let allPossibleLocations = [];
	// belwo two lines were before walls were included in range
	// for (let row = 1; row <= maxRows; row ++) {
	// 	for (let col = 1; col <= maxCols; col++) {
	for (let row = 0; row <= maxRows+1; row ++) {
		for (let col = 0; col <= maxCols+1; col++) {
			let location = {row:row, col:col}
			allPossibleLocations.push(location);
		}
	}
	return allPossibleLocations
}
// function generates an array with results of a scan
export function generateScanResults (indexOfScanner, ScanDistance, maxRows, maxCols, objectsToBePlaced) {
	if (!testValidityOfObjectsArrayInput(objectsToBePlaced)) return
	if (!verifyIsInteger(ScanDistance) || !verifyIsInteger(maxRows) || !verifyIsInteger(maxCols) || !verifyIsInteger(indexOfScanner)) return
	let cellLocation = objectsToBePlaced[indexOfScanner].location;
	if (!testValidityOfLocationInput(cellLocation)) return
	let allPossibleLocations = generateAllLocation(maxRows, maxCols)
	let scanResults = [];
	for (let i = 0; i<= ScanDistance; i++) {
		scanResults.push([]);
	}
	allPossibleLocations.forEach((testLocation)=>{
		let dist = distanceToCell(cellLocation, testLocation);
		if (dist <= ScanDistance) {
			if (dist === 0) {
				let singleResult = cellLocation;
				singleResult.cellIs = 'friendly';
				scanResults[dist].push(singleResult)
			}
			else if (dist > 0) {
				let singleResult = testLocation;
				if (testLocation.row === 0 || testLocation.row === maxRows+1 || testLocation.col === 0 || testLocation.col === maxCols+1) {
					console.log('is wall');
					singleResult.cellIs = 'wall';
				}
				else {
					objectsToBePlaced.forEach((object)=>{
						// console.log({object})
						if (object.location.row === testLocation.row && object.location.col === testLocation.col) {
							console.log('object detected:',{object})
							if (object.team === objectsToBePlaced[indexOfScanner].team) {
								// console.log('is friendly');
								singleResult.cellIs = 'friendly';
							}
							else {
								// console.log('is hostile');
								singleResult.cellIs = 'hostile';
								console.log({singleResult})
							}
						}
					})
				}
				scanResults[dist].push(singleResult)
			}
		}
	})
	return scanResults
}
// function verifies contents of scanResults
function verifyScanResults (scanResults) {
	if (scanResults === undefined || scanResults === null) {
		console.log('scanResults not entered')
		return false
	}
	if (typeof(scanResults) !== 'object') {
		console.log('scanResults is not an object')
		return false
	}
	scanResults.forEach((distanceArray)=>{
		if (typeof(distanceArray) !== 'object') {
			console.log('distanceArray is not an object')
			return false
		}
		else {
			let noError = true;
			if (noError) {
				distanceArray.forEach((supposedLocation)=>{
					noError = testValidityOfLocationInput(supposedLocation);
				})
			}
			else {
				console.log('some element inside scanResults array does not contain a location')
				return false
			}
		}
	})
	return true
}
// function illuminates scanned cells based on executionSpeed
export function illuminateScannedCells (scanResults,executionSpeed, setCellColors) {
	// if (!verifyIsInteger(executionSpeed)) return
	if (typeof executionSpeed !== 'number') {console.log(`executionSpeed: ${executionSpeed} is not a number`);return}
	// executionSpeed can also be 0.5, which is not an integer
	if (!verifyScanResults(scanResults)) return
	if (executionSpeed > 0.1) {
		function generateLocationColor (objectToFill, location, colorIntensity) {
			if (colorIntensity <= 0) return
			if (location.cellIs === 'hostile') {
				objectToFill[`row${location.row}col${location.col}`] = `rgba(255,0,0,${0.15*colorIntensity})`;
			}
			else if (location.cellIs === 'friendly') {
				objectToFill[`row${location.row}col${location.col}`] = `rgba(0,0,255,${0.1*colorIntensity})`;
			}
			else if (location.cellIs === 'wall') {
				objectToFill[`row${location.row}col${location.col}`] = `rgba(0,0,0,${0.2*colorIntensity})`;
			}
			else {
				objectToFill[`row${location.row}col${location.col}`] = `rgba(0,255,0,${0.1*colorIntensity})`;
			}
		}

		function cellColorSetter (magnitude5Index, timeMultiplier) {
			let cellColorsObject = {}
			for (let i = magnitude5Index; i>=0; i--) {
				if (i < 6) {
					if (scanResults[i]) {
						scanResults[i].forEach((location)=>{
							let magnitude = 5-magnitude5Index+i;
							generateLocationColor(cellColorsObject, location, magnitude)
						})
					}
				}
			}
			// console.log({cellColorsObject})
			setTimeout(()=>{
				setCellColors(cellColorsObject)
			},executionSpeed*timeMultiplier)
		}
		for (let n = 0; n < 9; n++) {
			cellColorSetter(n, ((n+1)*100));
		}

		// cellColorSetter(0, 100);
		// cellColorSetter(1, 200);
		// cellColorSetter(2, 300);
		// cellColorSetter(3, 400);
		// cellColorSetter(4, 500);
		// cellColorSetter(5, 600);
		// cellColorSetter(6, 700);
		// cellColorSetter(7, 800);
		// cellColorSetter(8, 900);
	

		// Below ~150 lines were replaced by above function and loop

		// let cellColorsObject0 = {};
		// scanResults[0].forEach((location)=>{
		// 	generateLocationColor(cellColorsObject0, location, 5)
		// })
		// setCellColors(cellColorsObject0)

		// let cellColorsObject1 = {};
		// scanResults[0].forEach((location)=>{
		// 	generateLocationColor(cellColorsObject1, location, 4)
		// })
		// if (scanResults[1]) {
		// 	scanResults[1].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject1, location, 5)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject1)
		// },executionSpeed*100)

		// let cellColorsObject2 = {};
		// scanResults[0].forEach((location)=>{
		// 	generateLocationColor(cellColorsObject2, location, 3)
		// })
		// if (scanResults[1]) {
		// 	scanResults[1].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject2, location, 4)
		// 	})
		// }
		// if (scanResults[2]) {
		// 	scanResults[2].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject2, location, 5)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject2)
		// },executionSpeed*200)

		// let cellColorsObject3 = {};
		// scanResults[0].forEach((location)=>{
		// 	generateLocationColor(cellColorsObject3, location, 2)
		// })
		// if (scanResults[1]) {
		// 	scanResults[1].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject3, location, 3)
		// 	})
		// }
		// if (scanResults[2]) {
		// 	scanResults[2].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject3, location, 4)
		// 	})
		// }
		// if (scanResults[3]) {
		// 	scanResults[3].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject3, location, 5)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject3)
		// },executionSpeed*300)

		// let cellColorsObject4 = {};
		// scanResults[0].forEach((location)=>{
		// 	generateLocationColor(cellColorsObject4, location, 1)
		// })
		// if (scanResults[1]) {
		// 	scanResults[1].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject4, location, 2)
		// 	})
		// }
		// if (scanResults[2]) {
		// 	scanResults[2].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject4, location, 3)
		// 	})
		// }
		// if (scanResults[3]) {
		// 	scanResults[3].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject4, location, 4)
		// 	})
		// }
		// if (scanResults[4]) {
		// 	scanResults[4].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject4, location, 5)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject4)
		// },executionSpeed*400)

		// let cellColorsObject5 = {};
		// if (scanResults[1]) {
		// 	scanResults[1].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject5, location, 1)
		// 	})
		// }
		// if (scanResults[2]) {
		// 	scanResults[2].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject5, location, 2)
		// 	})
		// }
		// if (scanResults[3]) {
		// 	scanResults[3].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject5, location, 3)
		// 	})
		// }
		// if (scanResults[4]) {
		// 	scanResults[4].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject5, location, 4)
		// 	})
		// }
		// if (scanResults[5]) {
		// 	scanResults[5].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject5, location, 5)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject5)
		// },executionSpeed*500)
		
		// let cellColorsObject6 = {};
		// if (scanResults[2]) {
		// 	scanResults[2].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject6, location, 1)
		// 	})
		// }
		// if (scanResults[3]) {
		// 	scanResults[3].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject6, location, 2)
		// 	})
		// }
		// if (scanResults[4]) {
		// 	scanResults[4].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject6, location, 3)
		// 	})
		// }
		// if (scanResults[5]) {
		// 	scanResults[5].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject6, location, 4)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject6)
		// },executionSpeed*600)

		// let cellColorsObject7 = {};
		// if (scanResults[3]) {
		// 	scanResults[3].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject7, location, 1)
		// 	})
		// }
		// if (scanResults[4]) {
		// 	scanResults[4].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject7, location, 2)
		// 	})
		// }
		// if (scanResults[5]) {
		// 	scanResults[5].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject7, location, 3)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject7)
		// },executionSpeed*700)

		// let cellColorsObject8 = {};
		// if (scanResults[4]) {
		// 	scanResults[4].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject8, location, 1)
		// 	})
		// }
		// if (scanResults[5]) {
		// 	scanResults[5].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject8, location, 2)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject8)
		// },executionSpeed*800)

		// let cellColorsObject9 = {};
		// if (scanResults[5]) {
		// 	scanResults[5].forEach((location)=>{
		// 		generateLocationColor(cellColorsObject9, location, 1)
		// 	})
		// }
		// setTimeout(()=>{
		// 	setCellColors(cellColorsObject9)
		// },executionSpeed*900)

		return
	}
}
// function filters out the scanning bot and empty entries from scan Results.  Contains distances and is ordered from closest to furthest
export function filterScanResults (scanResults) {
	if (!verifyScanResults(scanResults)) return
	let nonEmptyCells = [];
	for (let i = 1; i < scanResults.length; i++) {
		if (scanResults[i]) {
			scanResults[i].forEach((result)=>{
				if (result.cellIs) {
					result.distance = i;
					nonEmptyCells.push(result)
				}
			})
		}
	}
	return nonEmptyCells
}
// function filters out friendly, wall and empty entries from scan Results.  Contains distances and is ordered from closest to furthest
export function filterHostileScanResults (scanResults) {
	if (!verifyScanResults(scanResults)) return
	let nonEmptyCells = [];
	for (let i = 1; i < scanResults.length; i++) {
		if (scanResults[i]) {
			scanResults[i].forEach((result)=>{
				if (result.cellIs === 'hostile') {
					result.distance = i;
					nonEmptyCells.push(result)
				}
			})
		}
	}
	return nonEmptyCells
}

// function determines if a path between two objects has other objects in the way
export function isPathAdjacentToObstructed (startLocation, endLocation, objectsToRender, levelInfo) {
	const path = pathToAdjacentCell(startLocation, endLocation);
	if (path.length === 0) return false;
	let currentLandingSpot = {...startLocation};
	let pathObstructed = false;
	let nextStep;
	path.forEach((move)=>{
		if (!pathObstructed) {
			nextStep = nextStepGenerator(currentLandingSpot, move);
			pathObstructed = collisionVerification(nextStep, objectsToRender, levelInfo.height, levelInfo.width)
			if (!pathObstructed) {
				currentLandingSpot = nextStep;
			}
		}
	})
	return pathObstructed
}

// function returns the object if one exists on the given cellLocation, or null if one does not exist
export function findObjectOnCell (cellLocation, allObjectsOnGrid) {
	for (let i = 0; i < allObjectsOnGrid.length; i++) {
		if (testSameCell(cellLocation, allObjectsOnGrid[i].location)) {
			return allObjectsOnGrid[i]
		}
	}
	return null
}

// function sifts through scanResults and returns the bot info of a hostile or friendly, given it's index
// NOTE: DECIDED TO CHANGE THE SCAN STRUCTURE AND SEPARATE HOSTILES FROM FRIENDS AT SCAN
// THEREFOR, THIS FUNCTION IS OBSOLETE
// export function findFriendOrFoe (scanResults, alliedTeamNumber, friendOrFoe, targetIndex) {
// 	let foundIndex = 1;
// 	let result = null;

// 	for (let i = 0; i < scanResults.length; i++) {
// 		if (scanResults[i].team === alliedTeamNumber) {
// 			// case found an friend
// 			if (friendOrFoe === 'friend') {
// 				// s case, we found the type we wanted to
// 				if (foundIndex === targetIndex) {
// 					// ss case we found the droid we are looking for
// 					result = scanResults[i];
// 					break;
// 				} else {
// 					// ss case this is the wrong friend
// 					foundIndex ++;
// 				}
// 			}
// 		} else {
// 			// case found a hostile
// 			if (friendOrFoe === 'hostile') {
// 				// s case, we found the type we wanted to
// 				if (foundIndex === targetIndex) {
// 					// ss case we found the droid we are looking for
// 					result = scanResults[i];
// 					break;
// 				} else {
// 					// ss case this is the wrong friend
// 					foundIndex ++;
// 				}
// 			}
// 		}
// 	}
// 	return result
// }

function addArmaments (botInfo) {
	if (botInfo.equipment.arm1) {
		botInfo.arm1Angle = 0;
		botInfo.arm1LoadTime = 0;
	}
	if (botInfo.equipment.arm2) {
		botInfo.arm2Angle = 0;
		botInfo.arm2LoadTime = 0;
	}
	if (botInfo.equipment.arm3) {
		botInfo.arm3Angle = 0;
		botInfo.arm3LoadTime = 0;
	}
}

export function initializeBot (botInfo, teamNumber, location, type, index) {
	let botToAdd = JSON.parse(JSON.stringify(botInfo));
	botToAdd.type = type;
	botToAdd.index = index;
	botToAdd.team = teamNumber;
	botToAdd.location = {...location};
	botToAdd.stance = null;
	addArmaments(botToAdd);
	botToAdd.switches = {1:false,2:false,3:false,4:false,5:false};
	botToAdd.scanDisplayResults = [];
	botToAdd.scanHostileResults = [];
	botToAdd.scanFriendResults = [];
	botToAdd.scanWallResults = [];
	botToAdd.scanCornerResults = [];
	botToAdd.aimResults = [];
	botToAdd.consecutiveAims = 0;
	botToAdd.damageTakenPreviousTick = 0;
	botToAdd.damageTakenCurrentTick = 0;
	botToAdd.previousCommand = null;
	botToAdd.attributes.CurrentBurn = 0;
	botToAdd.attributes.CurrentDurability = botInfo.attributes.Durability;
	botToAdd.attributes.CurrentCapacitor = botInfo.attributes.Capacitor;
	botToAdd.attributes.CurrentArmor = botInfo.attributes.Armor;
	botToAdd.switchFiveTrueAtBeginningOfTick = false;
	return botToAdd
}

// function verifies that two given commands are the same
export function areSameCommand (command1, command2) {
	if (!command1.name || !command1.instructions) {
		console.log('error, command1 is not a command in same test', command1);
		return false
	} else if (!command2.name || !command2.instructions) {
		console.log('error, command2 is not a command in same test', command2);
		return false
	}
	if (command1.name !== command2.name) {
		return false
	} else {
		const command1InstructionKeys = Object.keys(command1.instructions);
		const command2InstructionKeys = Object.keys(command2.instructions);
		let difference = false;
		for (let i = 0; i < command1InstructionKeys.length; i++) {
			if (difference) break;
			if (command1.instructions[command1InstructionKeys[i]] !== command2.instructions[command1InstructionKeys[i]]) difference = true;
			// console.log(command1InstructionKeys[i]);
			// console.log(command2.instructions[command1InstructionKeys[i]]);
		}
		if (!difference) {
			for (let i = 0; i < command2InstructionKeys.length; i++) {
				if (difference) break;
				if (command2.instructions[command2InstructionKeys[i]] !== command1.instructions[command2InstructionKeys[i]]) difference = true;
				// console.log(command2InstructionKeys[i]);
				// console.log(command2.instructions[command1InstructionKeys[i]]);
			}
		}
		return !difference
	}
}
// Following functions are specific to aim detections and animation
export function generateAimDot (cellSize) {
	const aimDot = document.createElement("div"); 
	aimDot.style.background = 'radial-gradient(red, rgba(255,0,0,0.2))';
	aimDot.style.height = `${cellSize/10}px`;
	aimDot.style.width = `${cellSize/10}px`;
	aimDot.style.margin = `${cellSize/20}px`;
	aimDot.style.position = 'relative';
	aimDot.style.zIndex = '5';
	aimDot.style.borderRadius = '50%';
	return aimDot
}
export function generateTargetCircle (cellSize) {
	const targetCircle = document.createElement('div');
	targetCircle.style.height = `${1.4*cellSize}px`;
	targetCircle.style.width = `${1.4*cellSize}px`;
	targetCircle.style.border = `solid red ${Math.ceil(cellSize/16)}px`;
	targetCircle.style.position = 'relative';
	targetCircle.style.top = `-${1.2*cellSize}px`;
	targetCircle.style.left = `-${.2*cellSize}px`;
	targetCircle.style.borderRadius = '50%';
	return targetCircle
}
export function generateAimX (cellSize) {
	const aimX = document.createElement("div");
	
	aimX.style.height = `${cellSize/10}px`;
	aimX.style.width = `${cellSize/10}px`;
	aimX.style.margin = `${cellSize/20}px`;
	aimX.style.position = 'relative';
	aimX.style.left = `${cellSize/20}px`;
	aimX.style.top = `-${cellSize/40}px`;
	aimX.style.zIndex = '5';
	// aimX.className = 'centeredFlex';
	// aimX.style.borderRadius = '50%';
	const zeroContainer1 = document.createElement("div");
	zeroContainer1.style.height = '0px';
	zeroContainer1.style.width = '0px';
	aimX.appendChild(zeroContainer1);

	const xBar1 = document.createElement("div");
	xBar1.style.height = `${cellSize/7}px`;
	xBar1.style.width = `${cellSize/35}px`;
	xBar1.style.background = 'red';
	xBar1.style.transform = 'rotate(45deg)';
	zeroContainer1.appendChild(xBar1);

	const zeroContainer2 = document.createElement("div");
	zeroContainer2.style.height = '0px';
	zeroContainer2.style.width = '0px';
	aimX.appendChild(zeroContainer2);

	const xBar2 = document.createElement("div");
	xBar2.style.height = `${cellSize/7}px`;
	xBar2.style.width = `${cellSize/35}px`;
	xBar2.style.background = 'red';
	xBar2.style.transform = 'rotate(-45deg)';
	zeroContainer2.appendChild(xBar2);
	return aimX
}
export function generateAimBar (cellSize, barWidth, angle) {
	const aimBar = document.createElement("div");
	aimBar.style.height = `${cellSize/5}px`;
	// may have to set width to something small to avoid displacement of other objects?
	// not the case - plus it doesn't extend outside the top and left grid barriers due to overflow: none
	// aimBar.style.width = `${((battleInfo.levelInfo.height + battleInfo.levelInfo.width)/1.5)*cellSize}px`;
	aimBar.style.width = `${barWidth}px`;
	aimBar.style.position = 'relative';
	aimBar.style.top = `-${6*cellSize/10}px`;
	aimBar.style.left = `${(9*cellSize/20)}px`;
	aimBar.style.zIndex = '5';
	aimBar.style.display = 'flex';
	aimBar.style.flexDirection = 'row';
	aimBar.style.transformOrigin = `${(cellSize/10)}px`;
	aimBar.style.transform = `rotate(${angle}deg)`;
	return aimBar
}
export function findLocationOfDot(x, y, cellSize){
	return {row:Math.ceil(y/cellSize), col:Math.ceil(x/cellSize)}
}