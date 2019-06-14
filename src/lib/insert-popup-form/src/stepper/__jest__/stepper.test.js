import React from 'react';
import { Stepper } from '../stepper';
import renderer from 'react-test-renderer';

test('Default render of a stepper', () => {
	const tree = renderer.create(<Stepper />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Stepper with steps', () => {
	const tree = renderer.create(
		<Stepper steps={[{ id: 'foo' }, { id: 'bar' }]} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Stepper with steps and an active step', () => {
	const tree = renderer.create(
		<Stepper activeStep={0} steps={[{ id: 'foo' }, { id: 'bar' }]} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
