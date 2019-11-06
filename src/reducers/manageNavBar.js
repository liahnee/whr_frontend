export default function manageNavBar(state = {
    show: false
}, action) {
    switch (action.type) {
        case 'TOGGLE':
            console.log(state.show)
            return { 
                show: !state.show
            }
        default:
            return state;
    }
}