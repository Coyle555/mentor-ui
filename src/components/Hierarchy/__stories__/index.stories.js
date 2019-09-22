import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from 'storybook-utils';

import Tree from '../index';

const IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCNDY3QjdFRDY3MjA2ODExODcxRkE4RjQyQzM2RTYwRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCNTRGMEY1NTk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCNTRGMEY1NDk3NkIxMUUxQjBEQkY2NUVCQzcyNzE0NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQTFBNjQ2QjQyMDY4MTE4NzFGQThGNDJDMzZFNjBEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkI0NjdCN0VENjcyMDY4MTE4NzFGQThGNDJDMzZFNjBEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3q/RKwAAAPpJREFUeNpi/P//PwMtAeOoBSRbYBM10wZIbQRiIRLNegHEoUB85MiydLggExaFE8gwHAQkgHgOuiA2C1Sg9F8sGFd4wsTVgZiTkAW4AEgtIxA/BeJoINYDYhMgvgMVhwE2ZE0sZAQFKJyPI/G/E3IVUYkBij8iGX4YGjS6eIKOKAsYkdR9RBLXJTZciQUdQOyDxHfAEQcMpMYBTPMjIL6MJH4BW6SS4wNY+E5DC+v/UCxHaRyANP8jIP+fkiBiwGcAActJimSyADYL/lJgHkjvL0IWHIHSzGgYF0CWP46es7HFQTrUFfZALEpkfLyDOix3tMocfBYABBgAAAJOxWsvzNoAAAAASUVORK5CYII=';

const tree = [
	{
		children: [
			{
				children: [
					{
						childrenCount: 0,
						expanded: false,
						id: '1-1-1',
						title: '1-1-1',
						subtitle: 'Bar child 2 subtitle',
						data: {}
					},
					{
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
								children: [],
								expanded: false
							}]
						}],
						childrenCount: 1,
						expanded: true,
						id: '1-1-2',
						title: '1-1-2',
						subtitle: 'Bar child subtitle',
						data: {}
					},
					{
						id: '1-1-3',
						title: '1-1-3',
						childrenCount: 0,
						children: [],
						expanded: false
					}
				],
				childrenCount: 3,
				expanded: true,
				id: 'bar',
				title: '1-1',
				subtitle: 'Bar subtitle',
				data: {}
			},
			{
				childrenCount: 1,
				children: [{
					id: '1-2-1',
					expanded: true,
					childrenCount: 3,
					title: '1-2-1',
					children: [{
						id: '1-2-1-1',
						title: '1-2-1-1',
						childrenCount: 0,
						children: [],
						expanded: false
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
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-2',
								title: '1-2-1-2-2-2',
								childrenCount: 0,
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-3',
								title: '1-2-1-2-2-3',
								childrenCount: 0,
								children: [],
								expanded: false
							}, {
								id: '1-2-1-2-2-4',
								title: '1-2-1-2-2-4',
								childrenCount: 0,
								children: [],
								expanded: false
							}]
						}],
					}, {
						id: '1-2-1-3',
						title: '1-2-1-3',
						expanded: false,
						children: [],
						childrenCount: 0
					}], 
				}],
				expanded: true,
				id: 'baz',
				title: '1-2',
				subtitle: 'Baz subtitle',
				data: {}
			}
		],
		childrenCount: 2,
		expanded: true,
		id: '1',
		title: '1',
		subtitle: 'Foo subtitle',
		data: { sample: 'data' }
	},
];

function onExpandNode(node) {
	return [{
		childrenCount: 1,
		expanded: false,
		id: 'expand1',
		title: 'expand1',
		children: [{
			id: 'expand1-child',
			title: 'expand1-child',
			childrenCount: 0,
			children: []
		}]
	}, {
		childrenCount: 0,
		expanded: false,
		id: 'expand1',
		title: 'expand1',
		children: []
	}];
}

function customHandle(node) {
	if (node.level === 1) {
		return <img src={IMAGE} />;
	}

	return null;
}

const customButtons = [
	<button type="button">First button</button>,
	<button type="button">Second button</button>
];

storiesOf('Hierarchy', module)
	.add('General', () => {
		return (
			<div style={{ height: window.innerHeight + 'px' }}>
				<Tree
					canDrag={false}
					customButtons={customButtons}
					customHandle={customHandle}
					onExpandNode={onExpandNode}
					onNodeClick={action('onNodeClick')}
					tree={tree}
				/>
			</div>
		);
	});
