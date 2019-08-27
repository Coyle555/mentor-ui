import React from 'react';
import { createPortal } from 'react-dom';
import { keyEvent as KeyEvent } from 'utils';

export class Portal extends React.Component {

	constructor(props) {
		super(props);

		const editRoot = document.getElementById('mui-table-edit-root');
		editRoot.style.display = 'flex';
		editRoot.style.justifyContent = 'space-between';
		editRoot.style.alignItems = 'center';

		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		const editRoot = document.getElementById('mui-table-edit-root');
		editRoot.style.display = 'none';

		window.removeEventListener('keydown', this.handleKeyDown);
	}

	handleKeyDown = (evt) => {
		if (evt.ctrlKey) {
			if (evt.keyCode === KeyEvent.DOM_VK_LEFT) {
				event.preventDefault();
				event.stopPropagation();

				this.props.goToPreviousRecord();
			}

			if (evt.keyCode === KeyEvent.DOM_VK_RIGHT) {
				event.preventDefault();
				event.stopPropagation();

				this.props.goToNextRecord();
			}
		}
	}

	render() {
		return createPortal(this.props.children, document.getElementById('mui-table-edit-root'));
	}
}
