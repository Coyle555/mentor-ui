import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeDecorator } from '@storybook/addons';
import { action as a,  } from '@storybook/addon-actions';

// // prevent the entire stringified function from showing up in the JSX storyboard panel
export const action = (...args) => {
	const fn = a(...args);
	fn.toString = () => '[[ Function ]]';
	return fn;
}


// children, title, defaultProps, propTypes, defaultState 
export const SwitchBoard = ({ children, component, defaultState }) => {
	const [state, setState] = useState({});
	const [loaded, setLoaded] = useState(false);
	const propTypes = useRef([])
	const componentName = useRef(null);

	useEffect(() => {
		
		componentName.current = component.displayName || component.name;
		const PropTypesMap = new Map();

		for (let _type in PropTypes) {
			PropTypesMap.set(PropTypes[_type], _type);
		}		
		// only supporting these proptypes for now
		const supportedTypes = ['bool', 'number', 'string']; 
		const initialState = {};

		for (let propName in component.propTypes) {

			const type = PropTypesMap.get(component.propTypes[propName]);

			if (supportedTypes.includes(type)) {

				propTypes.current.push({
					name: propName,
					type: type
				});

				if (defaultState.hasOwnProperty(propName)) {
					initialState[propName] = component.defaultState[propName];
				} else if (component.defaultProps && component.defaultProps.hasOwnProperty(propName)) {
					initialState[propName] = component.defaultProps[propName];
				}	else if (type === 'string') {
					initialState[propName] = '';
				}	else if (type === 'bool') {
					initialState[propName] = false;
				}	else {
					initialState[propName] = null;
				}
			}
		}
		setState(initialState);
		setLoaded(true);
	},[]);

	if (!loaded) return null;

	return (
		<div>
			<nav style={{padding: 5, backgroundColor: 'lightgrey', margin: 0 }}>
				<h3>{componentName.current}</h3>
			</nav>
			<section style={{ padding: 10, display: 'flex', justifyContent: 'space-around' }}>
				{
					children(state)
				}
			</section>
			<section style={{ display: 'flex', justifyContent: 'space-around' }}>
				<table style={{border: '1px solid black'}}>
					<caption>Experiment with prop combos</caption>
					<tbody>
						{
							propTypes.current.map(({ name, type, defaultValue}) => 
								<tr key={name}>
									<th scope="row" style={{border: '1px solid black'}}>{ name }</th>
									<td style={{border: '1px solid black'}}>
										{
											type === 'bool' ?
												<input 
													type="checkbox"
													value={state[name] ? 'true' : 'false'}
													onChange={(e) => setState({ ...state, [name]: !state[name] })}
												/>
												:
												<input 
													type={type === 'string' ? 'text' : 'number'}
													value={state[name]}
													onChange={evt => setState({ ...state, [name]: evt.target.value })}
												/>
										}
									</td>
								</tr>
							)
						}
					</tbody>
				</table>
			</section>				
		</div>
	)
}

SwitchBoard.defaultProps = {
	defaultState: {}
}