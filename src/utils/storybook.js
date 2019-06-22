import { action as a } from '@storybook/addon-actions';

// // prevent the entire stringified function from showing up in the JSX storyboard panel
export const action = (...args) => {
	const fn = a(...args);
	fn.toString = () => '[[ Function ]]';
	return fn;
}