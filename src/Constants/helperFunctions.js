
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
	for(let index = 1; index <= numberOfEntries; index ++) {
		newArray.push(index);
	}
	return newArray;
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
	if (location.col === null || location.col === undefined) {
		console.log("location's col not entered")
		return false
	}
	else if (!Number.isInteger(location.col)) {
		console.log("location's col not an integer")
		return false
	}
	if (location.row === null || location.row === undefined) {
		console.log("location's row not entered")
		return false
	}
	else if (!Number.isInteger(location.row)) {
		console.log("location's row not an integer")
		return false
	}
	return true
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
function movesAlongPath (path) {
	if (path === undefined || path === null) return
	if (path.length < 2 || !diagonalMovementTest(path[1])) {
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