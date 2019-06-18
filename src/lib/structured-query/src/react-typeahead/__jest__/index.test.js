jest.mock('../tokenizer/index', () => {
	return { Tokenizer: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { StructuredFilter } from '../index';
import renderer from 'react-test-renderer';

describe('Prepping options', () => {

	test('List of string options', () => {
		const instance = renderer.create(
			<StructuredFilter options={['foo', 'bar', 'baz']} />
		).getInstance();

		expect(instance.searchTokens).toEqual([]);
		expect(instance.optionsMap).toEqual({});
	});

	test('List of options with string options in each', () => {
		const instance = renderer.create(
			<StructuredFilter
				options={[
					{ name: 'foo', options: ['a'] },
					{ name: 'bar', options: ['1'] }, 
					{ name: 'baz' }
				]} 
			/>
		).getInstance();

		expect(instance.searchTokens).toEqual([]);
		expect(instance.optionsMap).toEqual({ 1: '1', a: 'a' });
	});

	test('List of options with object options in each', () => {
		const instance = renderer.create(
			<StructuredFilter
				options={[
					{ name: 'foo', options: [{ name: 'a' }] },
					{ name: 'bar', options: [{ name: '1' }] }, 
					{ name: 'baz', options: [{ name: 'test' }]}
				]} 
			/>
		).getInstance();

		expect(instance.searchTokens).toEqual([]);
		expect(instance.optionsMap).toEqual({
			'a': { name: 'a' },
			'1': { name: '1' },
			'test': { name: 'test' }
		});
	});
});

describe('Async filter conversions', () => {

	test('List of options with async filter', () => {
		const options = [{ name: 'foo', asyncFilter: '/foo' }];

		const instance = renderer.create(
			<StructuredFilter options={options} />
		).getInstance();

		expect(instance.searchTokens).toEqual([]);
		expect(instance.optionsMap).toEqual({});
		expect(typeof options[0].asyncFilter).toBe('function');
	});

	test('Resolving the async filter returns list of strings', async () => {
		const asyncFilter = jest.fn(value => Promise.resolve(['foo', 'bar', 'baz']));
		const options = [{ name: 'foo', asyncFilter }];

		const instance = renderer.create(
			<StructuredFilter options={options} />
		).getInstance();

		await options[0].asyncFilter('test', []);
		expect(instance.optionsMap).toEqual({ foo: 'foo', bar: 'bar', baz: 'baz' });
	});

	test('Resolving the async filter returns list of objects', async () => {
		const asyncFilter = jest.fn(value => Promise.resolve([
			{ name: 'foo' },
			{ name: 'bar' },
			{ name: 'baz' }
		]));
		const options = [{ name: 'foo', asyncFilter }];

		const instance = renderer.create(
			<StructuredFilter options={options} />
		).getInstance();

		await options[0].asyncFilter('test', []);
		expect(instance.optionsMap).toEqual({
			foo: { name: 'foo' },
			bar: { name: 'bar' },
			baz: { name: 'baz' }
		});
	});
});
