import React from 'react';
import { createPortal } from 'react-dom';

export class Portal extends React.Component {

	constructor(props) {
		super(props);

		this.el = document.createElement('div');

		document.body.appendChild(this.el);
	}

	componentDidMount() {
		//hide the scrollbar
		document.body.style.setProperty('overflow', 'hidden');
	}

	componentWillUnmount() {
		//bring back scrollbar
		document.body.style.removeProperty('overflow');
		document.body.removeChild(this.el);
	}

	render() {
		return createPortal(this.props.children, this.el);
	}
}