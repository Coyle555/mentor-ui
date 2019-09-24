import { convertTree } from '../convertTree';

test('Converting a tree with no nodes', () => {
	expect(convertTree()).toEqual([]);
	expect(convertTree([])).toEqual([]);
});

test('Converting a tree with one node' , () => {
	const tree = [{
		expanded: false,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		level: 0,
		parent: null,
		hasSibling: false
	}]);
});

test('Converting a tree with one branch' , () => {
	const tree = [{
		childrenCount: 1,
		expanded: true,
		id: 'foo',
		children: [{
			childrenCount: 1,
			expanded: true,
			id: 'bar',
			children: [{
				childrenCount: 1,
				expanded: true,
				id: 'baz',
				children: [{
					childrenCount: 1,
					expanded: true,
					id: 'node4',
					children: [{
						expanded: false,
						id: 'node5',
						children: 0
					}]
				}]
			}],
		}],
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 1,
		expanded: true,
		level: 0,
		parent: null,
		descendants: 4,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 1,
		expanded: true,
		level: 1,
		parent: 0,
		descendants: 3,
		hasSibling: false
	}, {
		id: 'baz',
		childrenCount: 1,
		expanded: true,
		level: 2,
		parent: 1,
		descendants: 2,
		hasSibling: false
	}, {
		id: 'node4',
		childrenCount: 1,
		expanded: true,
		level: 3,
		parent: 2,
		descendants: 1,
		hasSibling: false
	}, {
		id: 'node5',
		childrenCount: 0,
		expanded: false,
		level: 4,
		parent: 3,
		descendants: 0,
		hasSibling: false
	}]);
});

test('Converting tree with an expanded child', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 1,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 1,
		expanded: true,
		level: 0,
		parent: null,
		descendants: 1,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		level: 1,
		descendants: 0,
		hasSibling: false,
		parent: 0
	}]);
});

test('Converting tree with no expanded child', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 1,
		expanded: false,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 1,
		descendants: 0,
		expanded: false,
		level: 0,
		parent: null,
		hasSibling: false
	}]);
});

test('Converting tree with multiple expanded children', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [],
			childrenCount: 0,
			expanded: false
		}, {
			id: 'baz',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 2,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 2,
		expanded: true,
		level: 0,
		descendants: 2,
		parent: null,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 0,
		expanded: false,
		descendants: 0,
		hasSibling: true,
		level: 1,
		parent: 0
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		hasSibling: false,
		descendants: 0,
		level: 1,
		parent: 0
	}]);
});

test('Converting a tree with a depth of 3', () => {
	const tree = [{
		children: [{
			id: 'bar',
			children: [{
				id: 'child4',
				childrenCount: 0,
				children: [],
				expanded: false,
			}],
			childrenCount: 1,
			expanded: true
		}, {
			id: 'baz',
			children: [],
			childrenCount: 0,
			expanded: false
		}],
		childrenCount: 2,
		expanded: true,
		id: 'foo',
	}];

	expect(convertTree(tree)).toEqual([{
		id: 'foo',
		childrenCount: 2,
		expanded: true,
		descendants: 3,
		level: 0,
		parent: null,
		hasSibling: false
	}, {
		id: 'bar',
		childrenCount: 1,
		expanded: true,
		descendants: 1,
		level: 1,
		hasSibling: true,
		parent: 0
	}, {
		id: 'child4',
		childrenCount: 0,
		expanded: false,
		hasSibling: false,
		descendants: 0,
		level: 2,
		parent: 1
	}, {
		id: 'baz',
		childrenCount: 0,
		expanded: false,
		level: 1,
		hasSibling: false,
		descendants: 0,
		parent: 0
	}]);
});

test('Very large tree', () => {
	const tree = [{
		childrenCount: 2,
		expanded: true,
		id: '1',
		title: '1',
		subtitle: 'Foo subtitle',
		data: {},
		children: [
			{
				childrenCount: 3,
				expanded: true,
				id: 'bar',
				title: '1-1',
				subtitle: 'Bar subtitle',
				data: {},
				children: [
					{
						childrenCount: 0,
						expanded: false,
						id: '1-1-1',
						title: '1-1-1',
						subtitle: 'Bar child 2 subtitle',
						data: {},
						children: [],
					},
					{
						childrenCount: 1,
						expanded: true,
						id: '1-1-2',
						title: '1-1-2',
						subtitle: 'Bar child subtitle',
						data: {},
						children: [{
							childrenCount: 1,
							expanded: true,
							id: '1-1-2-1',
							title: '1-1-2-1',
							data: {},
							children: [{
								id: '1-1-2-1-1',
								title: '1-1-2-1-1',
								childrenCount: 0,
								expanded: false,
								children: [],
							}]
						}],
					},
					{
						id: '1-1-3',
						title: '1-1-3',
						childrenCount: 0,
						expanded: false,
						children: [],
					}
				],
			},
			{
				childrenCount: 1,
				expanded: true,
				id: 'baz',
				title: '1-2',
				subtitle: 'Baz subtitle',
				data: {},
				children: [{
					id: '1-2-1',
					expanded: true,
					childrenCount: 3,
					title: '1-2-1',
					children: [{
						id: '1-2-1-1',
						title: '1-2-1-1',
						childrenCount: 0,
						expanded: false,
						children: [],
					}, {
						id: '1-2-1-2',
						title: '1-2-1-2',
						childrenCount: 2,
						expanded: true,
						children: [{
							id: '1-2-1-2-1',
							title: '1-2-1-2-1',
							childrenCount: 0,
							expanded: false,
							children: []
						}, {
							id: '1-2-1-2-2',
							title: '1-2-1-2-2',
							childrenCount: 4,
							expanded: true,
							children: [{
								id: '1-2-1-2-2-1',
								title: '1-2-1-2-2-1',
								childrenCount: 0,
								expanded: false,
								children: [],
							}, {
								id: '1-2-1-2-2-2',
								title: '1-2-1-2-2-2',
								childrenCount: 0,
								expanded: false,
								children: [],
							}, {
								id: '1-2-1-2-2-3',
								title: '1-2-1-2-2-3',
								childrenCount: 0,
								expanded: false,
								children: [],
							}, {
								id: '1-2-1-2-2-4',
								title: '1-2-1-2-2-4',
								childrenCount: 0,
								expanded: false,
								children: [],
							}]
						}],
					}, {
						id: '1-2-1-3',
						title: '1-2-1-3',
						expanded: false,
						childrenCount: 0,
						children: [],
					}], 
				}],
			}
		],
	}];

	expect(convertTree(tree)).toEqual([{
		childrenCount: 2,
		parent: null,
		data: {},
		descendants: 17,
		expanded: true,
		hasSibling: false,
		id: '1',
		level: 0,
		subtitle: 'Foo subtitle',
		title: '1'
	}, {
		childrenCount: 3,
		data: {},
		descendants: 5,
		expanded: true,
		hasSibling: true,
		id: 'bar',
		level: 1,
		parent: 0,
		subtitle: 'Bar subtitle',
		title: '1-1'
	}, {
		childrenCount: 0,
		data: {},
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-1-1',
		level: 2,
		parent: 1,
		subtitle: 'Bar child 2 subtitle',
		title: '1-1-1'
	}, {
		childrenCount: 1,
		data: {},
		descendants: 2,
		expanded: true,
		hasSibling: true,
		id: '1-1-2',
		level: 2,
		parent: 1,
		subtitle: 'Bar child subtitle',
		title: '1-1-2'
	}, {
		childrenCount: 1,
		data: {},
		descendants: 1,
		expanded: true,
		hasSibling: false,
		id: '1-1-2-1',
		level: 3,
		parent: 3,
		title: '1-1-2-1'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		id: '1-1-2-1-1',
		level: 4,
		parent: 4,
		title: '1-1-2-1-1'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		id: '1-1-3',
		level: 2,
		parent: 1,
		title: '1-1-3'
	}, {
		childrenCount: 1,
		data: {},
		descendants: 10,
		expanded: true,
		hasSibling: false,
		id: 'baz',
		level: 1,
		parent: 0,
		subtitle: 'Baz subtitle',
		title: '1-2'
	}, {
		childrenCount: 3,
		descendants: 9,
		expanded: true,
		hasSibling: false,
		id: '1-2-1',
		level: 2,
		parent: 7,
		title: '1-2-1'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-2-1-1',
		level: 3,
		parent: 8,
		title: '1-2-1-1'
	}, {
		childrenCount: 2,
		descendants: 6,
		expanded: true,
		hasSibling: true,
		id: '1-2-1-2',
		level: 3,
		parent: 8,
		title: '1-2-1-2'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-2-1-2-1',
		level: 4,
		parent: 10,
		title: '1-2-1-2-1'
	}, {
		childrenCount: 4,
		descendants: 4,
		expanded: true,
		hasSibling: false,
		id: '1-2-1-2-2',
		level: 4,
		parent: 10,
		title: '1-2-1-2-2'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-2-1-2-2-1',
		level: 5,
		parent: 12,
		title: '1-2-1-2-2-1'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-2-1-2-2-2',
		level: 5,
		parent: 12,
		title: '1-2-1-2-2-2'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: true,
		id: '1-2-1-2-2-3',
		level: 5,
		parent: 12,
		title: '1-2-1-2-2-3'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		id: '1-2-1-2-2-4',
		level: 5,
		parent: 12,
		title: '1-2-1-2-2-4'
	}, {
		childrenCount: 0,
		descendants: 0,
		expanded: false,
		hasSibling: false,
		id: '1-2-1-3',
		level: 3,
		parent: 8,
		title: '1-2-1-3'
	}]);
});
