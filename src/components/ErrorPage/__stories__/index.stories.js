import React from 'react';
import { storiesOf, action } from '@storybook/react';

import { ErrorPage } from '../index';

import Button from '../../Button/index';

const stories = storiesOf('ErrorPage', module);

[400, 401, 403, 404, 500].forEach(status => 
	stories.addWithJSX(`status code ${status}`, () => <ErrorPage status={status}/>)
)

stories
	.addWithJSX('other status codes', () => <ErrorPage status={502} />)
	.addWithJSX('with children', () => 
		<ErrorPage status={403}>
			<Button block medium isLight >
				Go Back To Where You Belong
			</Button>
		</ErrorPage>
	)