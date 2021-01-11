import createZeroSizedContainer from './createZeroSizedContainer';
function animateSparks (wallLocation, indexOfBot, offset, cellSize, numberOfSparks, sparkDuration) {
	let grid;
	let location;
	let locationId;
	if (indexOfBot) {
		locationId = `placer${indexOfBot}`;
	} else {
		locationId = `wall row${wallLocation.row} col${wallLocation.col}`;
	}
	if (wallLocation) {
		grid = document.getElementById('gridPopulator');
		location = createZeroSizedContainer(locationId);
		location.style.position = 'relative';
		location.style.top = `${(cellSize)*(wallLocation.row+1)}px`;
		location.style.left = `${(cellSize)*(wallLocation.col-2)}px`;
		grid.appendChild(location);
	} else {
		location = document.getElementById(locationId);
	}
	const sparksContainer = createZeroSizedContainer('sparksContainer');
	sparksContainer.style.position = 'relative';
	switch (offset) {
		case 'U' : {
			sparksContainer.style.top = `-${0.25*cellSize}px`;
			sparksContainer.style.left = `${0.5*cellSize}px`;
			break;
		}
		case 'L' : {
			sparksContainer.style.top = `-${0.5*cellSize}px`;
			sparksContainer.style.left = `${0.75*cellSize}px`;
			break;
		}
		case 'D' : {
			sparksContainer.style.top = `-${0.75*cellSize}px`;
			sparksContainer.style.left = `${0.5*cellSize}px`;
			
			break;
		}
		case 'R' : {
			sparksContainer.style.top = `-${0.5*cellSize}px`;
			sparksContainer.style.left = `${0.25*cellSize}px`;
			break;
		}
		case 'UL' : {
			sparksContainer.style.top = `-${0.25*cellSize}px`;
			sparksContainer.style.left = `${0.75*cellSize}px`;
			break;
		}
		case 'UR' : {
			sparksContainer.style.top = `-${0.25*cellSize}px`;
			sparksContainer.style.left = `${0.25*cellSize}px`;
			break;
		}
		case 'DL' : {
			sparksContainer.style.top = `-${0.75*cellSize}px`;
			sparksContainer.style.left = `${0.75*cellSize}px`;
			break;
		}
		case 'DR' : {
			sparksContainer.style.top = `-${0.75*cellSize}px`;
			sparksContainer.style.left = `${0.25*cellSize}px`;
			break;
		}
		default : {
			sparksContainer.style.top = `-${0.5*cellSize}px`;
			sparksContainer.style.left = `${0.5*cellSize}px`;
		}
	}

	for (let i = 0; i < numberOfSparks; i++) {
		const spark = generateSpark(cellSize, sparkDuration);
		sparksContainer.appendChild(spark);
	}

	setTimeout(()=>{
		let sparks = document.getElementsByClassName('spark');
		console.log(sparks);
		if (sparks) {
			[...sparks].forEach((spark)=>{
				spark.style.transform= `scale(0) translate(${Math.floor(2*cellSize*(Math.random()-.5))}px, ${Math.floor(2*cellSize*(Math.random()-.5))}px)`;
			})
		}
	},5)

	location.appendChild(sparksContainer);
	
	setTimeout(()=>{
		const location = document.getElementById(locationId);
		const sparksContainer = document.getElementById('sparksContainer');
		const grid = document.getElementById('gridPopulator');
		if (wallLocation && location && sparksContainer) {
			console.log('removing container from grid on wall');
			grid.removeChild(location);
		} else if (location && sparksContainer) {
			console.log('removing sparks container from bot cell');
			location.removeChild(sparksContainer);
		}
	},sparkDuration)
}
export default animateSparks;

function generateColor () {
	const colors = ['purple','blue','green','gold','yellow','orange','red'];
	const randomColorNumber = Math.random();
	const colorIndex = Math.floor(randomColorNumber/(1/colors.length));
	const color = colors[colorIndex];
	return color
}

function generateSpark (cellSize, sparkDuration) {
	console.log('generating a spark');
	const sparkContainer = createZeroSizedContainer();
	const spark = document.createElement('div');
	spark.style.height = `${cellSize/8}px`;
	spark.style.width = `${cellSize/8}px`;
	spark.style.borderRadius = '50%';
	spark.style.background = generateColor();
	spark.style.transform = `scale(1) translate(0px, 0px)`;
	spark.style.transition = `transform ${sparkDuration/1000}s`;
	spark.style.transitionTimingFunction = 'cubic-bezier(.24,.77,.73,.95)';
	spark.className= 'spark';
	sparkContainer.appendChild(spark);
	return sparkContainer
}




	
	