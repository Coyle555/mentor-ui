import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

import '../src/styles/index.less';

setAddon(JSXAddon);
// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
