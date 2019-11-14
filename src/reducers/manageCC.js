export default function manageCC(
	state = {
		patient: {}, //exists to separate managePatient.state.in_view to just for cc later
		allCC: []
	},
	action
) {
	switch (action.type) {
		case 'PATIENT_TO_VIEW_CC':
			return {...state,
				patient: action.payload
			};
		case 'ADD_CC':
			return {...state,
				allCC: action.payload
			};

		default:
			return state;
	}
}
