import React, { useState } from 'react';
import { storiesOf, action } from '@storybook/react';

import { Hamburger } from '../index';
import Button from '../../Button';


storiesOf('Hamburger', module)
	.add('open', () => <Hamburger isOpen />)
	.add('not open', () => <Hamburger />)
	.add('basic example', () => {

		const Example = props => {
				const [open, setOpen] = useState(false);
				return (
					<Button 
						isOutline
						onClick={() => setOpen(!open)}
					>
						<Hamburger isOpen={open}/>
					</Button>
				)			
			}

			return <Example />
	})