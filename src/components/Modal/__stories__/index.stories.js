import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { action, configureActions } from '@storybook/addon-actions';
import { withKnobs, optionsKnob, number, boolean, text } from '@storybook/addon-knobs';


import { Modal } from '../index';

import Button from '../../Button';

const optionsConfig = {
	display: 'display',
	fullScreenToggle: 'fullScreenToggle',
}

//options returns an array of strings
const formatProps = (selectedOptions = []) => 
	selectedOptions.reduce((obj, curr) => ({ ...obj, [curr]: true }), {});


storiesOf('Modal', module)
	.addDecorator(withKnobs)
	.addWithJSX('general', () => {


		return (
			<React.Fragment>
				<p>Go to the Knobs tab below to toggle the modal's visibility.</p>
				<Modal 
					closeOnOutsideClick={boolean('closeOnOutsideClick', true)}
					display={boolean('display', false)}
					fullScreenToggle={boolean('fullScreenToggle', false)}
					hideCloseButton={boolean('hideCloseButton', false)}
					onClose={() => alert('props.onClose function was invoked.')}
					height={number('Override height', null)}
					width={number('Override width', null)}
				>
					<p>Modal Content</p>
				</Modal>
			</React.Fragment>
		)
	})
	.addWithJSX('nested modals', () => {


		return (
			<React.Fragment>
				<p>Go to the Knobs tab below to toggle the modal's visibility.</p>
				<Modal 
					closeOnOutsideClick={boolean('closeOnOutsideClick', true)}
					display={boolean('display outer modal', false)}
					// fullScreenToggle={boolean('fullScreenToggle', false)}
					hideCloseButton
					onClose={() => alert('outer modal\'s props.onClose function was invoked.')}
					height={200}
					width={200}
				>
					<p>Modal 1 Content</p>
					<Modal 
						display={boolean('display inner modal', true)}
						overlayStyle={{ background: 'none' }}
						height={400}
						onClose={() => alert('inner modal\'s props.onClose function was invoked.')}
						fullScreenToggle
						hideCloseButton
						width={400}
					>
						<p>Modal 2 Content</p>
					</Modal>
				</Modal>
			</React.Fragment>
		)
	})	