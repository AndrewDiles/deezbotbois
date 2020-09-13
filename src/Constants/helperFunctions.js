
export const techTreeRequirements = (index) => {
	// This function takes in the index value of a given tech cell and outputs the
	// tech cell's index that must have been purchased in order to be unlocked
	if (index === 0 || index === 3) return null
	else if (index === 1 || index === 2) return null
	else if (index === 4 || index === 5) return 1
	else if (index === 6 || index === 7) return 2
	else return index - 4;
}

export const inverseTechTreeRequirements = (index) => {
	// This function takes in the index value of a given tech cell and outputs the
	// tech cell's indeces that must be set to false (unpurchased)
	if (index === 0 || index === 3) return null
	else if (index >= 16 && index <= 19) return [index]
	else if (index >= 12 && index <= 15) return [index, index+4]
	else if (index >= 8 && index <= 11) return [index, index+4, index+8]
	else if (index >= 4 && index <= 7) return [index, index+4, index+8, index+12]
	else if (index === 1) return [index, index+3, index+7, index+11, index+15, index+4, index+8, index+12, index+16]
	else if (index === 2) return [index, index+5, index+9, index+13, index+17, index+4, index+8, index+12, index+16]
}