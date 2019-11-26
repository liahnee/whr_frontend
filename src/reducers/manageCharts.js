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
            case 'OPEN':
                return {...state,
                    openRecord: true
                };
            case 'CLOSE':
                return {...state,
                    openRecord: false
                };
                
            default:
                return state;
    }
}