export const ROOT_CLICKED = 'ROOT_CLICKED';
export const SUB_CLICKED = 'SUB_CLICKED';
export const RESET_DRAWERS = 'RESET_DRAWERS';
export const OPEN_DRAWERS = 'OPEN_DRAWERS';
export const OPEN_SUB_DRAWER = 'OPEN_SUB_DRAWER';

export const actionTypes = {
	ROOT_CLICKED,
	SUB_CLICKED
}

export const toggleDrawer = (type, id) => ({
	type,
	id,
});

export const resetDrawers = (keepId) => ({
	type: RESET_DRAWERS,
	keepId,
});

export const openDrawers = (arrayOfIds) => ({
	type: OPEN_DRAWERS,
	ids: arrayOfIds,
})

export const openSubDrawer = (id) => ({
	type: OPEN_SUB_DRAWER,
	id,
})
