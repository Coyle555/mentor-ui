import React from 'react';
import { createPortal } from 'react-dom';

export class Portal extends React.Component {

	constructor(props) {
		super(props);

		const editRoot = document.getElementById('mui-table-edit-root');
		editRoot.style.display = 'flex';
		editRoot.style.justifyContent = 'space-between';
		editRoot.style.alignItems = 'center';
	}

	componentWillUnmount() {
		const editRoot = document.getElementById('mui-table-edit-root');
		editRoot.style.display = 'none';
	}

	render() {
		return createPortal(this.props.children, document.getElementById('mui-table-edit-root'));
	}
}
