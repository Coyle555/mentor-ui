import shortid from 'shortid';
import { once } from 'lodash';

import addons, { makeDecorator} from '@storybook/addons';
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events';

// ******************************************************************************
// simulates the behavior of Reacts useState hook for updating state in a story
// ******************************************************************************


let state = [];
let count = -1;


const channel = addons.getChannel();

channel.addListener(STORY_CHANGED, () => {
	state = [];
	count = -1;
});

channel.addListener('FORCE_RE_RENDER_W_NEW_STATE', () => {
	count = -1;
	channel.emit(FORCE_RE_RENDER);
});


export default function useState(initialValue) {
	count += 1;
	if (!state[count]) {
		state[count] = initialValue;
	}

 	const setState = newValue => {
 		
 		if (Object.is(state[count], newValue)) return;
 
 		state[count] = newValue;
 		channel.emit('FORCE_RE_RENDER_W_NEW_STATE');
 		console.log('updating state', state);
 	}

	return [state[count], setState]
}