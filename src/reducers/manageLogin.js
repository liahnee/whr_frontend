export default function manageLogin(state = {
    loggedin: false
}, action) {
    switch (action.type) {
        case 'LOGIN':
            return { 
                loggedin: true,
                username: action.payload.user.username,
                name: action.payload.user.name,
                id: action.payload.user.id
            }
        case 'LOGOUT':
            return {
                loggedin: false
            }
        default:
            return state;
    }
}