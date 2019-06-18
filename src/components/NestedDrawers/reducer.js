import {
	ROOT_CLICKED,
	SUB_CLICKED,
	RESET_DRAWERS,
	OPEN_DRAWERS,
	OPEN_SUB_DRAWER,
} from './actions';

export default function nestedDrawersReducer(state, action) {
	switch (action.type) {
		case ROOT_CLICKED:
			return {
				...state,
				rootDrawers: state.rootDrawers.map(drawer => {
					if (drawer.id === action.id)
						return { ...drawer, isOpen: !drawer.isOpen }
					return { ...drawer, isOpen: false }
				}),
				subDrawers: state.subDrawers.map(drawer => {
					return { ...drawer, isOpen: false }
				}),
				activeRootId: action.id,
			}
		case SUB_CLICKED:
			return {
				...state,
				subDrawers: state.subDrawers.map(drawer => {
					if (drawer.id === action.id)
						return { ...drawer, isOpen: !drawer.isOpen }
					return { ...drawer, isOpen: false }
				})
			}
		case RESET_DRAWERS:
			return {
				...state,
				rootDrawers: state.rootDrawers.map(drawer => {
					return { ...drawer, isOpen: false }
				}),
				subDrawers: state.subDrawers.map(drawer => {
					return { ...drawer, isOpen: false }
				}),
				activeRootId: action.keepId ? state.activeRootId : '',
			}
		case OPEN_DRAWERS:
			return {
				...state,
				rootDrawers: state.rootDrawers.map(drawer => {
					if (action.ids.includes(drawer.id)) {
						state.activeRootId = drawer.id;
						return { ...drawer, isOpen: true }
					}
					return { ...drawer, isOpen: false }
				}),
				subDrawers: state.subDrawers.map(drawer => {
					if (action.ids.includes(drawer.id))
						return { ...drawer, isOpen: true }
					return { ...drawer, isOpen: false }
				})
			}
		case OPEN_SUB_DRAWER:
			return {
				...state,
				subDrawers: state.subDrawers.map(drawer => {
					if (action.id === drawer.id && !drawer.isOpen)
						return { ...drawer, isOpen: true }
					return drawer
				})
			}
		default:
			return state
	}
}
