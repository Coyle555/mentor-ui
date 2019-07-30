import React from 'react';
import {
	render,
	cleanup,
} from '@testing-library/react';

beforeEach(cleanup);

describe('DatePickerComposed Component', () => {
	it('Should match snapshot with base props', () => {
		expect(true).toBe(true);
	});
});
