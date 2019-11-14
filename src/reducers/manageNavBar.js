export default function manageNavBar(state = {
    show: false,
    chart: false
}, action) {
    switch (action.type) {
        case 'TOGGLE':
            return {...state,
                show: !state.show
            }
        case 'ROOM_OPEN':
            return {...state,
                chart: true
            }
        case 'ROOM_EMPTY':
            return {...state,
                chart: false
            }
        default:
            return state;
    }
}