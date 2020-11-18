const levelInfo = [
	{
		levelNumber: 0,
		levelName: 'FALL OVER',
		width: 13,
		height: 13,
		friendly: [
		],
		hostile : [
			{
				name: 'dumbOne',
				location: {col: 10, row:10},
			}
		],
		userBots : [
			{
				location: {col:3, row:3}
			}
		],
		ach1 : {
			type: 'SPEED DEMON',
			threshold: 12,
			reward: {
				equipment : {
					acc: 'wd40'
				}
			}
		},
		ach2 : {
			type: 'OVERKILL',
			threshold: 50,
			reward: {
				color: {
					secondary: 'tan'
				}
			}
		},
		ach3 : {
			type: 'BUSHIDO',
			reward: {
				color: {
					trim: 'teal'
				}
			}
		}
	},
	{
		levelNumber: 1,
		levelName: 'COMRADE?',
		width: 11,
		height: 11,
		friendly: [
			{
				name: 'deadWeight',
				location: {col: 9, row:9},
			}
		],
		hostile : [
			{
				name: 'dumbOne',
				location: {col: 10, row:10},
			}
		],
		userBots : [
			{
				location: {col:3, row:3}
			}
		],
		ach1 : {
			type: 'BEST FRIENDS',
			reward: {
				color: {
					rollers: 'pink'
				}
			}
		},
		ach2 : {
			type: 'LAST STAND',
			reward: {
				color: {
					primary: 'brown'
				}
			}
		},
		ach3 : {
			type: 'GUTS',
			reward: {
				equipment : {
					acc: 'plateCoat'
				}
			}
		}
	},
	{
		levelNumber: 999,
		levelName: 'NOT YET MADE',
		width: 5,
		height: 5,
		friendly: [
		],
		hostile : [
		],
		userBots : [
			{
				location: {col:1, row:1}
			}
		],
		ach1 : {
			type: 'HOTSHOT',
			reward: {
			}
		},
		ach2 : {
			type: 'GOLDEN STANDARD',
			reward: {
			}
		},
		ach3 : {
			type: 'POWER HOG',
			threshold: 100,
			reward: {
			}
		}
	}
]
export default levelInfo;