import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { keyEvent as KeyEvent } from 'utils';

export class Portal extends React.Component {

	static propTypes = {
		closeEditMode: PropTypes.func,
		goToNextRecord: PropTypes.func,
		goToPreviousRecord: PropTypes.func
	}

	constructor(props) {
		super(props);

		const editRoot = this.props.node;
		editRoot.style.display = 'flex';
		editRoot.style.justifyContent = 'space-between';
		editRoot.style.alignItems = 'center';

		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		const editRoot = this.props.node;
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

		if (evt.keyCode === KeyEvent.DOM_VK_ESCAPE) {
			event.preventDefault();
			event.stopPropagation();

			this.props.closeEditMode();
		}
	}

	render() {
		return createPortal(this.props.children, this.props.node);
	}
}
