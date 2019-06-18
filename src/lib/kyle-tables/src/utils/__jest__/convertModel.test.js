import { convertModel } from '../utils';

const defaultColumn = {
	asyncFilter: undefined,
	category: '',
	collection: false,
	display: true,
	file: undefined,
	hidden: false,
	insertable: false,
	lookup: undefined,
	multiline: false,
	options: undefined,
	required: false,
	tableOnInsert: undefined,
	tokenize: false,
	type: undefined,
	updateable: true
};

test('Converting an invalid model', () => {
	expect(convertModel()).toBe(undefined);
	expect(convertModel(null)).toBe(undefined);
	expect(convertModel('foo')).toBe(undefined);
	expect(convertModel([])).toBe(undefined);
});

test('Converting an empty model', () => {
	expect(convertModel({})).toStrictEqual([]);
});

test('Converting a model with an async filter', () => {
	expect(convertModel({
		foo: { asyncFilter: '/route' }
	}))
	.toStrictEqual([
		Object.assign(
			{},
			defaultColumn,
			{
				asyncFilter: '/route',
				category: 'Foo',
				id: 'foo'
			}
		)
	]);
});

test('Converting a model with a category', () => {
	expect(convertModel({
		foo: { displayName: 'test' }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, { category: 'test', id: 'foo' })
	]);
});

test('Converting a model with a collection', () => {
	expect(convertModel({
		foo: { collection: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			collection: true,
			id: 'foo',
			tokenize: true
		})
	]);
});

test('Converting a model with a display', () => {
	expect(convertModel({
		foo: {}
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, { category: 'Foo', display: true, id: 'foo' })
	]);

	expect(convertModel({
		foo: { hidden: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			display: false,
			id: 'foo',
			hidden: true
		})
	]);

	expect(convertModel({
		foo: { display: false }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, { category: 'Foo', display: false, id: 'foo' })
	]);
});

test('Converting a model with a file upload', () => {
	expect(convertModel({
		foo: { upload: true },
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			file: { image: undefined, path: undefined },
			id: 'foo'
		})
	]);

	expect(convertModel({
		foo: {
			upload: true,
			image: 'bar',
			path: 'baz'
		}
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			file: { image: 'bar', path: 'baz' },
			id: 'foo'
		})
	]);

	expect(convertModel({ foo: {} }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				file: undefined,
				id: 'foo'
			})
		]);
});

test('Converting a model with a hidden key', () => {
	expect(convertModel({ foo: { hidden: true } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				display: false,
				hidden: true,
				id: 'foo'
			})
		]);

	expect(convertModel({ foo: {} }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				hidden: false,
				id: 'foo'
			})
		]);
});

test('Converting a model with an insertable key', () => {
	expect(convertModel({ foo: { insertable: true } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				id: 'foo',
				insertable: true
			})
		]);
});

test('Converting a model with a lookup key', () => {
	expect(convertModel({ foo: { lookup: '/lookuproute' } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				id: 'foo',
				lookup: '/lookuproute'
			})
		]);
});

test('Converting a model with a multiline key', () => {
	expect(convertModel({ foo: { multiline: true } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				id: 'foo',
				multiline: true
			})
		]);
});

test('Converting a model with an options key', () => {
	expect(convertModel({ foo: { enum: ['bar', 'baz'] } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				id: 'foo',
				options: ['bar', 'baz']
			})
		]);
});

test('Converting a model with a required key', () => {
	expect(convertModel({ foo: { required: true } }))
		.toStrictEqual([
			Object.assign({}, defaultColumn, {
				category: 'Foo',
				id: 'foo',
				required: true
			})
		]);
});

test('Converting a model with a drilldown and asyncfilter key', () => {
	expect(convertModel({
		foo: {
			drilldown: true,
			asyncFilter: '/drilldownroute'
		}
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			asyncFilter: '/drilldownroute',
			category: 'Foo',
			id: 'foo',
			tableOnInsert: {
				apiPath: '/drilldownroute',
				name: 'drilldownroute'
			}
		})
	]);

	expect(convertModel({
		foo: { drilldown: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			id: 'foo',
			tableOnInsert: undefined
		})
	]);
});

test('Converting a model with tokenize key', () => {
	expect(convertModel({
		foo: { collection: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			collection: true,
			id: 'foo',
			tokenize: true
		})
	]);

	expect(convertModel({
		foo: { tokenize: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			id: 'foo',
			tokenize: true
		})
	]);
});

test('Converting a model with a type key', () => {
	expect(convertModel({
		foo: { type: 'string' }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			id: 'foo',
			type: 'string'
		})
	]);
});

test('Converting a model with an updateable key', () => {
	expect(convertModel({
		foo: { updateable: true }
	}))
	.toStrictEqual([
		Object.assign({}, defaultColumn, {
			category: 'Foo',
			id: 'foo',
			updateable: true
		})
	]);
});
