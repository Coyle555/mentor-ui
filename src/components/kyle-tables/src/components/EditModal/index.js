import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

export class EditModal extends Component {

	constructor(props) {
		super(props);

		const editRoot = document.getElementById('mui-table-edit-root');
		this.el = document.createElement('div');

		editRoot.appendChild(this.el);
	}

	componentDidUpdate(prevProps) {
		const editRoot = document.getElementById('mui-table-edit-root');

		if (this.props.editMode) {
			editRoot.style.zIndex = 2;
		} else {
			editRoot.style.zIndex = -1;
		}
	}

	componentWillUnmount() {
		const editRoot = document.getElementById('mui-table-edit-root');
		editRoot.removeChild(this.el);
	}
	
	render() {
		return createPortal(<div>Hello World!</div>, this.el);
	}
}
