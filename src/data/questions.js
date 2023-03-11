const durationQuestion = {
  id: 1,
  question: 'How much time do you have?',
  options: [
    {
    param: "maxDuration=15",
    displayText: '< 15 mins'
   },{
    param: "minDuration=15&maxDuration=20",
    displayText: '20 mins'
   },
   {
    param: "minDuration=20&maxDuration=25",
    displayText: '25 mins'
   },
   {
    param: "minDuration=25&maxDuration=30",
    displayText: '30 mins'
   },
   {
    param: "minDuration=30",
    displayText: 'more'
   }
  ]
};
const energyQuestion = {
  id: 2,
  question: 'How much energy do you have?',
  options: [
    {
      param: "energy=high",
      displayText: "Lots"
    },
    {
      param: "energy=medium",
      displayText: "Some"
    },
    {
      param: "energy=low",
      displayText: "Barely any"
    }
  ]
};

export default [durationQuestion, energyQuestion];