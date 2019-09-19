import React from 'react';
import { Label } from '../index';
import renderer from 'react-test-renderer';

test('Default render of insert form label', () => {
	const tree = renderer.create(<Label />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render with a custom label', () => {
	const tree = renderer.create(<Label label="Foo" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render with a required label', () => {
	const tree = renderer.create(<Label required={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});
