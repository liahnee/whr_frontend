export default function manageCC(
	state = {
		patient: {}, //exists to separate managePatient.state.in_view to just for cc later
		allCC: [{chief_complaint: 'None Selected'}]
	},
	action
) {
	switch (action.type) {
    case 'PATIENT_TO_VIEW_CC':
      return {
        patient: action.payload
      }
		case 'ADD_CC':
			return {
				allCC: action.payload
			};

		default:
			return state;
	}
}
