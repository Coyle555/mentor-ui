import React from 'react';
import { storiesOf } from '@storybook/react';

import Tree from '../index';

storiesOf('Hierarchy', module)
	.add('General', () => {
		return (
			<Tree 
			/>
		)
	});
