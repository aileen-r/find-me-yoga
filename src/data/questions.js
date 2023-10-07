const actionTypes = Object.freeze({
	expandOptions: 'expandOptions',
	collapseOptions: 'collapseOptions'
});

const durationQuestion = {
	id: 1,
	question: 'How much time do you have?',
	options: [
		{
			action: actionTypes.expandOptions,
			displayText: '< 15 mins',
			options: [
				{
					param: 'maxDuration=7',
					displayText: '7 mins'
				},
				{
					param: 'minDuration=7&maxDuration=11',
					displayText: '11 mins'
				},
				{
					param: 'minDuration=10&maxDuration=15',
					displayText: '15 mins'
				},
				{
					action: actionTypes.collapseOptions,
					displayText: 'more'
				}
			]
		},
		{
			param: 'minDuration=15&maxDuration=20',
			displayText: '20 mins'
		},
		{
			param: 'minDuration=20&maxDuration=25',
			displayText: '25 mins'
		},
		{
			param: 'minDuration=25&maxDuration=30',
			displayText: '30 mins'
		},
		{
      action: actionTypes.expandOptions,
			displayText: 'more',
      options: [
        {
					action: actionTypes.collapseOptions,
					displayText: 'less'
				},
        {
          param: 'minDuration=30&maxDuration=45',
          displayText: '45 mins'
        },
        {
          param: 'minDuration=45&maxDuration=60',
          displayText: '1 hour'
        },
        {
          param: 'minDuration=60&maxDuration=80',
          displayText: '1 hour 20 mins'
        },
				{
          param: 'minDuration=80',
          displayText: 'even more'
        }
      ]
		}
	]
};
const energyQuestion = {
	id: 2,
	question: 'How much energy do you have? (optional)',
	options: [
		{
			param: 'energy=high',
			displayText: 'Lots'
		},
		{
			param: 'energy=medium',
			displayText: 'Some'
		},
		{
			param: 'energy=low',
			displayText: 'Barely any'
		}
	]
};

export default [durationQuestion, energyQuestion];
export {actionTypes}