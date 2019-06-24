import React from 'react';
import { storiesOf } from '@storybook/react';

import { Slider } from '../';

const containerStyles = {
	width: '100%',
    maxWidth: '30vw',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
}

storiesOf('Slider', module)
	.addDecorator(fn =>
		<div style={containerStyles}>
			{fn()}
		</div>
	)
	.add('general', () =>
		<Slider
			className="u-slider-time"
			onChange={() => {}}
		/>
	)
