import React from 'react';
import {
	render,
	cleanup,
	fireEvent,
	getByTestId,
} from 'react-testing-library';

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
});
