import { createContext } from 'react';

const defaultContext = [
	false,
	() => {}
];

export default createContext(defaultContext);