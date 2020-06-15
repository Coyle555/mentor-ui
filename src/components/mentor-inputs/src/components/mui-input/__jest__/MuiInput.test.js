import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, cleanup, render } from '@testing-library/react';
import { MuiInput } from '../index';

const TestStateFullMui = () => {
	const [currVal, setCurrVal] = useState('');

	function notApple(value) {
		if (/\bapple(s)?\b/gi.test(value))
			return 'Apple?? Are you kidding me??!!?';
	}

	return (
		<MuiInput
			label="Don't write 'apple' or 'banana' here"
			customValidator={[notApple]}
			name="test"
			onChange={e => setCurrVal(e.target.value)}
			value={currVal}
		/>
	)
}

afterEach(cleanup);
test('basic mui input render', () => {
	const tree = renderer.create(
		<MuiInput
			label={'Test Input'}
			name="example-mui-input"
			value={''}
		/>).toJSON();
	expect(tree).toMatchSnapshot();
})
it('should render a label', () => {
	const { getByText } = render(
		<MuiInput
			label={'Test Input'}
			name="example-mui-input"
			value={''}
		/>);
	expect(getByText('Test Input')).toBeInTheDocument();
})
it('should render an error message', () => {
	const { getByText, getByTestId, queryByText } = render(
		<TestStateFullMui />
	)

	expect(queryByText('Apple?? Are you kidding me??!!?')).toBeNull();

	fireEvent.change(getByTestId('test-input'), { target: { value: 'apple' } })

	expect(getByText('Apple?? Are you kidding me??!!?')).toBeInTheDocument();
})