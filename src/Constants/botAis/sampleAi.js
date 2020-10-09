let sampleAi = [
	{
		depth: 1,
		condition: {
			name: 'damageTaken',
			test: {
				evaluationType: '>',
				threshold: '2',
			},
			conditionMet: [
				{
					depth: 2,
					condition: {
						name: 'adjacentTo',
						test: {
							testTargets: 'any',
							evaluationType: '=',
							testReturn: 'D'
						},
					},
					conditionMet : [
						{
							command: {
								name: 'moveCommand',
								direction: 'UU',
								target: null, // src, #
								type: null, //or onto, adjacent, or null if no target
							}
						}
					],
					conditionUnmet : [
						{
							command: {
								name: 'moveCommand',
								direction: 'DD',
								target: null,
								type: null,
							}
						}
					],
				}
			],
			conditionUnmet: [
			]
		}
	},
	{
		depth: 1,
		condition: {
			name: 'durability',
			test: {
				evaluationType: '<',
				threshold: '10',
			},
			conditionMet: [
				{
					command: {
						name: 'repairCommand'
					}
				}
			],
			conditionUnmet: [
				{
					depth: 2,
					condition: {
						name: 'scanResults',
						test: {
							source: 'scan', // could aldo be autoscan
							evaluationType: '=', // could be !=
							testTargets: 'hostile',
						},
						conditionMet: [
							{
								depth: 3,
								condition: {
									name: 'weaponLoaded',
									test: {
										slot: 'arm2',
									},
									conditionMet: [
										{
											command: {
												name: 'rangedAttackCommand',
												// direction: 'RRR',
												// will use either direciton or source/targetNumber but not both
												source: 'scan',
												target: '1',
												weapon: 'arm2'
											},
										}
									],
									conditionUnmet: [
										{
											command: {
												name: 'waitCommand',
											}
										}
									]
								}
							}
						],
						conditionUnmet: [
							{
								command: {
									name: 'scanCommand',
								}
							}
						]
					}
				}
			]
		}
	}
]
export default sampleAi