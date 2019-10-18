import React from 'react';
import { storiesOf } from '@storybook/react';

import ToggleList from '../index';

storiesOf('Toggle List', module)
	.add('general', () => {
		return (
			<ToggleList
				expanded={true}
				list={[
					{ title: 'Foo', content: 'Foo content' },
					{ title: 'Bar', content: 'Bar content' },
					{ title: 'React Element', content: <div>React Element</div> }
				]}
			/>
		);
	});
