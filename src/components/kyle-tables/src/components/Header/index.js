import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stickyfill from 'stickyfilljs';
import ReactResizeDetector from 'react-resize-detector';

import { Toolbar } from './Toolbar';
import { StructuredQuery } from 'structured-query';

const TOOLBAR_BREAKPOINT = 980;

import './styles.less';

export class Header extends Component {

	static propTypes = {
		filter: PropTypes.object,
		toolbar: PropTypes.object,
	}

	constructor(props) {
		super(props);

		// @isToolbarCollapsed: true when the toolbar needs to be collapsed
		// 	since the width is too small to render; false otherwise
		this.state = {
			isToolbarCollapsed: false
		}
	}

	setIsCollapsedToolbar = (innerWidth, breakpoint) => {
		const { isToolbarCollapsed } = this.state

		if (innerWidth > breakpoint && isToolbarCollapsed) {
			this.setState({ isToolbarCollapsed: false });
		} else if (innerWidth < breakpoint && !isToolbarCollapsed) {
			this.setState({ isToolbarCollapsed: true });
		}
	}

	handleComponentResize = (width, height) => {
		this.setIsCollapsedToolbar(width, TOOLBAR_BREAKPOINT);
	}

	render() {
		const { filter, toolbar } = this.props;
		const { isToolbarCollapsed } = this.state;

		return (
			<ReactResizeDetector
				handleWidth
				onResize={this.handleComponentResize}
			>
				<div
					className="table-header-container"
					ref={ref => this.headerRef = ref}
				>
					<div className="table-header-filter">
						<StructuredQuery
							{...filter}
							customClasses={{ results: 'results-zindex' }}
						/>
					</div>
					<Toolbar
						{...toolbar}
						isToolbarCollapsed={isToolbarCollapsed}
					/>
				</div>
			</ReactResizeDetector>
		 );
	}
};
