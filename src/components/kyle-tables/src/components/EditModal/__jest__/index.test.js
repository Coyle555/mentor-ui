jest.mock('../Form', () => {
	return { Form: props => <div>{JSON.stringify(props)}</div> };
});

import React from 'react';
import { EditModal } from '../index';
import { cleanup, fireEvent, render, wait } from '@testing-library/react';

const root = document.createElement('div');
root.id = 'mui-table-edit-root';

describe('Creating edit modal root node', () => {
	test('Edit mode disabled', () => {
		const { container } = render(<EditModal editMode={false} />, {
			container: document.body.appendChild(root)
		});

		expect(container.style.display).toBe('none');
	});

	test('Edit mode enabled', () => {
		const { container } = render(<EditModal editMode={true} />, {
			container: document.body.appendChild(root)
		});

		expect(container.style.display).toBe('block');
	});

	test('Toggling edit mode', () => {
		const { container, rerender } = render(<EditModal editMode={true} />, {
			container: document.body.appendChild(root)
		});

		expect(container.style.display).toBe('block');

		rerender(<EditModal editMode={false} />);
		expect(container.style.display).toBe('none');
	});
});

describe.only('Moving back and forth on records', () => {
	test('Can go to next record', () => {
		const data = [{ foo: 'foo' }, { bar: 'bar' }];
		const { queryByText } = render(<EditModal data={data} editMode={true} />, {
			container: document.body.appendChild(root)
		});

		expect(queryByText('Next Record')).toBeTruthy();
	});

	test.only('Clicking to go to next record', () => {
		const data = [{ foo: 'foo' }, { bar: 'bar' }];
		const { debug, queryByText } = render(<EditModal data={data} editMode={true} />, {
			container: document.body.appendChild(root)
		});

		debug();
		fireEvent.click(queryByText('Next Record'));
	});
});
