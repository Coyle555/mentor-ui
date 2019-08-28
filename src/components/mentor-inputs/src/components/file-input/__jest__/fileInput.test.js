import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, cleanup } from '@testing-library/react';

import FileInput from '../fileInput';

test('Default file input', () => {
	const tree = renderer.create(<FileInput onDrop={() => {}} />).toJSON();

	expect(tree).toMatchSnapshot();
});
