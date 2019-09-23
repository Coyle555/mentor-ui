import { findNode } from '../findNode';

test('Finding a node that doesnt exist in the tree', () => {
	expect(findNode({}, { id: 'foo' })).toBeNull();
});

test('Finding a node match', () => {
	expect(findNode({ id: 'foo' }, { id: 'foo' })).toEqual({ id: 'foo' });
	expect(findNode({
		id: 'foo',
		children: [{
			id: 'bar',
			children: [],
		}, {
			id: 'baz',
			children: [{
				id: '1',
				children: [],
			}, {
				id: '2',
				children: [{
					id: '3',
					children: [],
				}]
			}]
		}]
	}, { id: '3' })).toEqual({ id: '3', children: [] });
});
