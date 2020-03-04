
export const reducer = (state, action) => {
	switch (action.type) {
		case 'startDrag':
			return { ...state, draggedId: action.draggedId };
		case 'endDrag':
			return { ...state, draggedId: null };

		case 'selectNode':

			return {
				...state,
				buttonMenuIndex: -1,
				selectedNodeIndex: action.nodeIndex
			};

		case 'updateNodeIndex':

			return { ...state, selectedNodeIndex: action.nodeIndex };

		case 'openButtonMenu':
			let newButtonIndex = -1;

			if (state.buttonMenuIndex !== action.nodeIndex) {
				newButtonIndex = action.nodeIndex;
			}

			return { ...state, buttonMenuIndex: newButtonIndex };

		default:
			throw 'Bad action type ' + action.type
	}
}