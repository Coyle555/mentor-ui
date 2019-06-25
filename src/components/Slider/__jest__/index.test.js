import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
	getByTestId,
} from '@testing-library/react';

import {
	Slider,
	calcHandlePos,
	getHandleStyle,
	getValueWidthStyle,
	normalizer,
	onMove,
	KNOB_SIZE,
	BORDER_OFFSET,
} from 'components/Slider';

beforeEach(cleanup);

describe('Slider component', () => {
	it('Should default render', () => {
		const { container } = render(<Slider />);

		expect(container).toMatchSnapshot();
	});

	it('Should match snapshot with className prop', () => {
		const className = "RidelsMPA";
		const { container } = render(
			<Slider
				className={className}
			/>
		);

		expect(container).toMatchSnapshot();
	});
});
