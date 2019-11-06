export default function manageNavBar(state = {
    show: false
}, action) {
    switch (action.type) {
        case 'TOGGLE':
            return { 
                show: !state.show
            }
        default:
            return state;
    }
}