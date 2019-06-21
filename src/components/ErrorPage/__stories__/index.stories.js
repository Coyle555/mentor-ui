import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';

import { ErrorPage } from '../index';

import Button from '../../Button/index';

const stories = storiesOf('ErrorPage', module);

[400, 401, 403, 404, 500].forEach(status => 
	stories.add(`status code ${status}`, () => <ErrorPage status={status}/>)
)

stories
	.add('other status codes', () => <ErrorPage status={502} />)
	.add('with children', () => 
		<ErrorPage status={403}>
			<Button block medium isLight >
				Go Back To Where You Belong
			</Button>
		</ErrorPage>
	)