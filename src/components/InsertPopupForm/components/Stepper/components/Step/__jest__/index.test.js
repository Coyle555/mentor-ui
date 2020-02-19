import React from 'react';
import { Step } from '../index';
import renderer from 'react-test-renderer';
import { cleanup, fireEvent, render } from '@testing-library/react';

afterEach(cleanup);

test('Default render of a step', () => {
	const tree = renderer.create(<Step />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render of a step with a title', () => {
	const tree = renderer.create(<Step step={{ title: 'foo' }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has an error', () => {
	const tree = renderer.create(<Step step={{ title: 'foo', error: true }} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that is active', () => {
	const tree = renderer.create(<Step activeStep={5} index={5} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has been completed with no error', () => {
	const tree = renderer.create(<Step activeStep={5} index={4} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step with a custom width', () => {
	const tree = renderer.create(<Step width="50%" />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a previous step', () => {
	const tree = renderer.create(<Step hasPrevStep={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a previous step and an active step', () => {
	const tree = renderer.create(<Step activeStep={5} hasPrevStep={true} index={5} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a previous step and an inactive(default) step', () => {
	const tree = renderer.create(<Step activeStep={5} hasPrevStep={true} index={15} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a next step', () => {
	const tree = renderer.create(<Step hasNextStep={true} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a next step and an active step', () => {
	const tree = renderer.create(<Step activeStep={5} hasNextStep={true} index={4} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that has a next step and an inactive(default) step', () => {
	const tree = renderer.create(<Step activeStep={5} hasNextStep={true} index={5} />).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step gets activated with a click event', () => {
	const onClick = jest.fn();

	const { container } = render(<Step index={1} onClick={onClick} />);

	fireEvent.click(container.querySelector('div.stepper-step-circle'));
	expect(onClick).toHaveBeenCalledWith(1);
});

test('Step that links to prev step', () => {
	const tree = renderer.create(
		<Step hasPrevStep={true} step={{ linkPrev: true }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Step that links to next step', () => {
	const tree = renderer.create(
		<Step hasNextStep={true} step={{ linkNext: true }} />
	).toJSON();

	expect(tree).toMatchSnapshot();
});
