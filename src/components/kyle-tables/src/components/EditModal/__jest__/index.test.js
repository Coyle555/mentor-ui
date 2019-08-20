import React from 'react';
import { EditModal } from '../index';
import { cleanup, render, wait } from '@testing-library/react';

describe('Creating edit modal root node', () => {
	const root = document.createElement('div');
	root.id = 'mui-table-edit-root';

	test('Appending the portal to the root node', async () => {
		const { container, queryByText } = await render(<EditModal />, {
			container: document.body.appendChild(root)
		});

		await wait(() => {
			expect(queryByText('Hello World!')).toBeTruthy();
		});
	});
});
