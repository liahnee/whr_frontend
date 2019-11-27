export default function manageCharts(
    state = {
        CC: {},
        allCharts: [],
        openRecord:false
    }, action) {
        switch (action.type) {
            case 'SELECT_CC_TO_VIEW': 
                return {...state,
                    CC: action.payload
                }
            case 'ADD_CHARTS':
                return {...state,
                    allCharts: [...state.allCharts, action.payload]
                };
            case 'CLEAR_CHARTS': 
                return {...state,
                    allCharts: []
                }
            // case 'OPEN_CHART_RECORD':
            //     return {...state,
            //         openRecord: true
            //     };
            // case 'CLOSE_CHART_RECORD':
            //     return {...state,
            //         openRecord: false
            //     };
                
            default:
                return state;
    }
}