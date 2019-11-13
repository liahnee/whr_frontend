export default function manageCharts(state = {
    allCharts: []
}, action) {
    switch (action.type) {
        case 'ADD_CHARTS':
            return {...state,
                allCharts: [...action.payload.charts]
            };

        default:
            return state;
    }
}