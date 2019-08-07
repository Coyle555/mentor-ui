import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tokenizer } from './tokenizer/index';
import './structured-filter.less';

export class StructuredQuery extends Component {

	static propTypes = {
		onTokenAdd: PropTypes.func,
		options: PropTypes.arrayOf(
			 PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
			])
		)
	}

	static defaultProps = {
		onTokenAdd: null,
		options: []
	}

	constructor(props) {
		super(props);

		this.optionsMap = this.prepOptions(this.props.options);
		this.searchTokens = [];
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.options !== nextProps.options) {
			this.optionsMap = this.prepOptions(nextProps.options);
		}
	}

	// convert token values back to their proper option values before sending 
	// them along
	onTokenAdd = (searchTokens) => {
		const { onTokenAdd, options } = this.props;
		this.searchTokens = searchTokens;

		searchTokens = searchTokens.map(token => {
			if (!!token.value && !!this.optionsMap[token.value]) {
				token.value = this.optionsMap[token.value];
				return token;
			}

			return token;
		});

		if (typeof onTokenAdd === 'function') {
			onTokenAdd(searchTokens);
		}
	}

	// convert token values back to their proper option values before sending 
	// them along
	onTokenRemove = (searchTokens) => {
		const { onTokenRemove, options } = this.props;
		this.searchTokens = searchTokens;

		searchTokens = searchTokens.map(token => {
			if (!!token.value && !!this.optionsMap[token.value]) {
				token.value = this.optionsMap[token.value];
				return token;
			}

			return token;
		});

		if (typeof onTokenRemove === 'function') {
			onTokenRemove(searchTokens);
		}
	}

	// prep options that have an enumered options list or an async filter to be
	// mapped from string -> (object|string) if it exists
	prepOptions = (options) => {
		const map = {};

		options.forEach(option => {
			if (option.asyncFilter) {
				option.asyncFilter = this.asyncFilter(option.asyncFilter);
			} else if (option.options) {
				option.options.forEach((opt, i) => {
					if (!opt) return;

					if (typeof opt === 'object') {
						map[opt.name] = opt;
						option.options[i] = opt.name;
					} else {
						map[opt] = opt;
					}
				});
			}
		});

		return map;
	}

	asyncFilter = (origAsyncFilter) => {
		return (value, tokens) => {
			return new Promise((resolve, reject) => {
				resolve(origAsyncFilter(value));
			}).then(options => {
				this.mapNewOptions(options, tokens);

				return options;
			});
		}
	}

	// map new options received on the response of an async filter
	mapNewOptions = (options, tokens = []) => {
		const oldOptions = {};

		// resetting the selected options requires us to save the old
		// token values before assigning the new ones
		this.searchTokens.forEach(tkn => {
			if (typeof tkn.value === 'object' && !!this.optionsMap[tkn.value.name]) {
				oldOptions[tkn.value.name] = this.optionsMap[tkn.value.name];
			} else if (!!this.optionsMap[tkn.value]) {
				oldOptions[tkn.value] = this.optionsMap[tkn.value];
			}
		});

		this.optionsMap = Object.assign({}, oldOptions);

		options.forEach((option, i) => {
			if (typeof option === 'object') {
				this.optionsMap[option.name] = option;
				options[i] = option.name;
			} else {
				this.optionsMap[option] = option;
			}
		});
	}
	
	render() {
		return (
			<Tokenizer
				{...this.props}
				onTokenAdd={this.onTokenAdd}
				onTokenRemove={this.onTokenRemove}
			/>
		);
	}
}
