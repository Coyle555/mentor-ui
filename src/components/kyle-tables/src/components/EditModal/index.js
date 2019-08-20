import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import { Form } from './Form';

export class EditModal extends Component {

	componentDidUpdate(prevProps) {
		const editRoot = document.getElementById('mui-table-edit-root');

		if (this.props.editMode) {
			editRoot.style.display = 'block';
		} else {
			editRoot.style.display = 'none';
		}
	}
	
	render() {
		return createPortal(
			<Form />,
			document.getElementById('mui-table-edit-root')
		);
	}
}
