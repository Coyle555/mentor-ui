import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer.js';
import { createInitialState } from './initialState.js';
import Drawer, { drawerTypes } from '../Drawer';
import { resetDrawers } from './actions';

import './index.less';

export const DrawerDispatch = React.createContext(null);

const NestedDrawers = ({
	render,
	hydrateState,
	rootLength,
	subLength,
	navigationOpen }) => {

	const currentState = hydrateState
		? hydrateState
		: createInitialState(rootLength, subLength)
	const [state, dispatch] = useReducer(reducer, currentState);
	//console.log('State change: ', state);

	const prevNavigationOpen = useRef(navigationOpen)

	useEffect(() => {
		if (prevNavigationOpen.current && !navigationOpen) {
			dispatch(resetDrawers(true));
		}

		prevNavigationOpen.current = navigationOpen;
	}, [navigationOpen])

	return (
		<DrawerDispatch.Provider value={dispatch}>
			{render(state)}
		</DrawerDispatch.Provider>
	)
};

NestedDrawers.propTypes = {
	render: PropTypes.func.isRequired,
	hydrateState: PropTypes.object,
	rootLength: PropTypes.number,
	subLength: PropTypes.number,
	navigationOpen: PropTypes.bool,
}

export default NestedDrawers;
