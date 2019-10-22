import React, {
	useState,
	} from 'react';
import { storiesOf } from '@storybook/react';

import { TabNav } from '../';

const containerStyles = {
	width: '100%',
    maxWidth: '30vw',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
}

const tabs = [
	{
		label: 'roots',
		iconClass: 'fal fa-carrot',
	},
	{
		label: 'veggies',
		iconClass: 'fal fa-leaf-oak',
	},
];

storiesOf('TabNav', module)
	.addDecorator(fn =>
		<div style={containerStyles}>
			{fn()}
		</div>
	)
	.add('general', () => (
		<WrapperState
			render={(handleClick, activeTab) => (
				<TabNav
					tabs={tabs}
					activeTab={activeTab || 'roots'}
					onClick={handleClick}
				/>
			)}
		/>
	));

function WrapperState(props) {
	const [activeTab, setActiveTab] = useState();
	const handleClick = (label) => setActiveTab(label);
	const { render } = props;

	return render(handleClick, activeTab);
}
