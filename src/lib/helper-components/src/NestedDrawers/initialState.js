import shortid from 'shortid';

const createDrawer = () => {
	return {
		id: shortid.generate(),
		isOpen: false,
	}
}

export const createInitialState = (rootLength, subLength) => ({
	rootDrawers: Array(rootLength).fill(0).map(createDrawer),
	subDrawers: Array(subLength).fill(0).map(createDrawer),
	activeRootId: '',
})
