import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
} from '@testing-library/react';

import { OptionalControl } from '../';

beforeEach(cleanup);

describe('OptionalControl component', () => {
	it('Should default render', () => {
		const { container } = render(
			<OptionalControl
				onClick={() => {}}
				iconClass='fal fa-home'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should render a child string', () => {
		const { container } = render(
			<OptionalControl
				onClick={() => {}}
				iconClass='fal fa-home'
			>
				Meditation
			</OptionalControl>
		);

		expect(container).toMatchSnapshot();
	});

	it('Should render overriding className', () => {
		const { container } = render(
			<OptionalControl
				onClick={() => {}}
				iconClass='fal fa-home'
				className='monosacharides'
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('onClick prop should be onvoked on click', () => {
		const mockOnClick = jest.fn((oof) => 'rab');
		const { getByText } = render(
			<OptionalControl
				onClick={mockOnClick}
				iconClass='fal fa-home'
			>
				{'me\'od'}
			</OptionalControl>

		);

		fireEvent.click(getByText('me\'od'));

		expect(mockOnClick).toHaveBeenCalledTimes(1);
		expect(mockOnClick.mock.results[0].value)
			.toEqual('rab');
	});
});
