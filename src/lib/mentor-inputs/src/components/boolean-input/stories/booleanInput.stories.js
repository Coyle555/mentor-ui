import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BooleanInputComponent } from '../booleanInput';

storiesOf('Boolean input', module)
	.add('Default render', () => <BooleanInputComponent />)
	.add('Required input', () => <BooleanInputComponent required={true} />);
