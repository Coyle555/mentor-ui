import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TypeaheadOption } from './Option';

// Typeahead selector is the menu that holds the header
// of the current label and also holds all
// currently viewable options in label
export class TypeaheadSelector extends Component {

	static propTypes = {
		options: PropTypes.array,
		header: PropTypes.string,
		customClasses: PropTypes.object,
		onOptionSelected: PropTypes.func
	}

	static defaultProps = {
		customClasses: {},
		header: '',
		options: []
	}

	componentDidUpdate() {
		const { options, selectedOptionIndex } = this.props;

		if (options.length === 0 || selectedOptionIndex < 0) return;

		const listHeight = parseInt(window.getComputedStyle(this.listRef).height, 10);
		const children = this.listRef.children;
		
		// heights of each child can vary so need height of selected option
		const listItemHeight = parseInt(
			window.getComputedStyle(children[selectedOptionIndex]).height, 10);

		// user has gone above the viewable area so scroll up
		if (children[selectedOptionIndex].offsetTop - listItemHeight < this.listRef.scrollTop) {
			this.listRef.scrollTo(0, children[selectedOptionIndex].offsetTop - listItemHeight);
			return;
		}

		// the user has gone below the viewable area so scroll down
		if ((selectedOptionIndex + 1) * listItemHeight > (listHeight + this.listRef.scrollTop)) {
			// edge case when user goes to the top of the list and then hits
			// up again, we wrap the scroll back to the bottom
			if ((selectedOptionIndex + 1) === options.length) {
				this.listRef.scrollTo(
					0,
					children[selectedOptionIndex].offsetTop - listItemHeight
				);
			} else {
				this.listRef.scrollTo(0, this.listRef.scrollTop + listItemHeight);
			}
		}
	}

	render() {
		const {
			customClasses,
			header,
			onOptionSelected,
			options,
			selectedOptionIndex
		} = this.props;

		let classList = classNames({
			'typeahead-selector': true,
			[customClasses.results]: customClasses.results
		});

		return (
			<div className={classList}>
				<div className="header">{header}</div>
				<ul ref={ref => this.listRef = ref}>
					{ options.map((option, i) => (
						<TypeaheadOption
							onClick={onOptionSelected}
							option={option}
							customClasses={customClasses}
							active={selectedOptionIndex === i}
							key={i}
						/>
					))}
				</ul>
			</div>
		);
	}
};
