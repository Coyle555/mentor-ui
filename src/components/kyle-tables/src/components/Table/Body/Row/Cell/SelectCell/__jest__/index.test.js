import React from 'react';
import { SelectCell } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default select cell render', () => {
	const tree = renderer.create(<SelectCell />);

	expect(tree).toMatchSnapshot();
});

test('Select cell onBlur callback', () => {
	const onBlur = jest.fn();
	const options = ['foo', 'bar', 'baz'];

	const { getByTestId } = render(
		<SelectCell
			colId="select"
			onBlur={onBlur}
			options={options}
			rowId="rowId"
		/>
	);

	fireEvent.change(getByTestId('select-cell'), { target: { value: 'foo' } });
	fireEvent.blur(getByTestId('select-cell'));

	expect(onBlur).toHaveBeenCalledWith('rowId', { select: 'foo' });
});
