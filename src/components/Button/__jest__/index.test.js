import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../index';

test('Render default button', () => {
	const tree = renderer.create(<Button>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render blue button', () => {
	const tree = renderer.create(<Button isBlue={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render block button', () => {
	const tree = renderer.create(<Button block={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render light button', () => {
	const tree = renderer.create(<Button isLight={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render light blue button', () => {
	const tree = renderer.create(<Button isBlue={true} isLight={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render outline button', () => {
	const tree = renderer.create(<Button isOutline={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render outline button', () => {
	const tree = renderer.create(<Button isOutline={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render mini button', () => {
	const tree = renderer.create(<Button isMini={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render end cap left button', () => {
	const tree = renderer.create(<Button isLeftEndCap={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render end cap right button', () => {
	const tree = renderer.create(<Button isRightEndCap={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render capless button', () => {
	const tree = renderer.create(<Button isCapless={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render medium button', () => {
	const tree = renderer.create(<Button medium={true}>Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});

test('Render button with custom class', () => {
	const tree = renderer.create(<Button className="bar">Foo</Button>).toJSON();

	expect(tree).toMatchSnapshot();
});
