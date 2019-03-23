import {
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE,
  TOGGLE_FILTER_FULL_PARTIAL_ADMIN
} from '../actions/admin';


/*
    bubbleData: {
      labels: '',
      datasets: [
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 10, y: 20, r: 15 },
            ],
            backgroundColor: this.getColor(0),
            borderColor: this.getColor(0),
            pointBorderColor: this.getColor(0),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 55, y: 70, r: 30 },
            ],
            backgroundColor: this.getColor(1),
            borderColor: this.getColor(1),
            pointBorderColor: this.getColor(1),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 30, y: 50, r: 60 },
            ],
            backgroundColor: this.getColor(2),
            borderColor: this.getColor(2),
            pointBorderColor: this.getColor(2),
          },
        },
        {
          ...defaultConfig,
          ...{
            data: [
              { x: 20, y: 80, r: 40 },
            ],
            backgroundColor: this.getColor(3),
            borderColor: this.getColor(3),
            pointBorderColor: this.getColor(3),
          },
        },
      ],
    },

*/

const defaultConfig = {
  label: '',
  fill: true,
  lineTension: 0.1,
  backgroundColor: 'rgba(0, 0, 0 ,0)',
  borderColor: 'rgba(0, 0, 0 ,0)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(0, 0, 0 ,0)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(0, 0, 0 ,0)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: [],
};

function getColor(index) {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      color += letters[((i * index) + 5) % 16];
    } else if (i < 4) {
      color += letters[((i * index) + 7) % 16];
    } else {
      color += letters[((i * index) + 9) % 16];
    }
  }
  return color;
}



function getRadiusUnit(ideasSummary) {
  // define biggestBubble as 1/6 of width
  const viewPortWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const biggestBubble = viewPortWidth / 16;

  let maxSize = 1;
  for (const bubbleIdeaIndex in ideasSummary.items) {
    const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
    maxSize = Math.max(maxSize, bubbleIdea.votes + 1);
  }

  return biggestBubble / maxSize;
}



function prepareGraph(ideasSummary, radiusUnit) {
  console.log('prepareGraph');
  console.log(ideasSummary);
  /* Build bubbleData from ideasSummary

    x-axis : implementation Months
    y-axis : profit range
    size : votes range
    color : first tag

    */

  const bubbleDataNew = {
    labels: '',
    datasets: [

    ],
  };


  for (const bubbleIdeaIndex in ideasSummary.items) {
    const bubbleIdea = ideasSummary.items[bubbleIdeaIndex];
    console.log('bubbleIdea');
    console.log(bubbleIdea);
    bubbleDataNew.datasets.push({
      ...defaultConfig,
      ...{
        data: [
          { x: bubbleIdea.expectedTtm, y: bubbleIdea.expectedProfitInCents, r: (bubbleIdea.votes + 1) * radiusUnit },
        ],
        backgroundColor: getColor(0),
        borderColor: getColor(0),
        pointBorderColor: getColor(0),
        label: bubbleIdea.id,
      },
    });
  }

  console.log(bubbleDataNew);


  return bubbleDataNew;
}


export function admin(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasSummary: {
    dimensionNames: ['ttm', 'profit', 'votes', 'tag'],
    items: [],
  },
  bubbleData: {
    labels: '',
    datasets: [

    ],
  },
  ideasErrorMessage: undefined,
  partialFullSwitch: true,
  submittedAtMsMin: null,
  submittedAtMsMax: null,
  tags: [],
  votesMin: 0,
  votesMax: 999999,
  profitMin: 0,
  profitMax: 999999,
  implementationTimeMin: 0,
  implementationTimeMax: 999999,
}, action) {
  console.log('admin reducer');
  console.log(action.type);
  switch (action.type) {
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS:
      const bubbleDataNew = prepareGraph(action.ideasSummary, getRadiusUnit(action.ideasSummary));
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasSummary: action.ideasSummary,
        ideasErrorMessage: undefined,
        bubbleData: bubbleDataNew,
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasErrorMessage: action.message,
        ideasSummary: {
          dimensionNames: ['ttm', 'profit', 'votes', 'tag'],
          items: [],
        },
      });
    case TOGGLE_FILTER_FULL_PARTIAL_ADMIN: {
      return Object.assign({}, state, {
        partialFullSwitch: !state.partialFullSwitch,
      });
    }
    default:
      return state;
  }
}

