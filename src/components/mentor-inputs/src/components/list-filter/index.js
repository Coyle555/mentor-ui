import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../styles/index.less';
import ListFilter from './components/ListFilter';

export class ListFilterLayer extends Component {

	static propTypes = {
		customFilter: PropTypes.func,
		onMatch: PropTypes.func,
		options: PropTypes.arrayOf(
			 PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })
			])
		)
	}

	static defaultProps = {
		customFilter: null,
		onMatch: null,
		options: []
	}

	constructor(props) {
		super(props);

		let customFilter = null;
		let map = {};

		if (typeof this.props.customFilter === 'function') {
			customFilter = this.prepCustomFilter(this.props.customFilter);
		} else {
			map = this.prepOptionsList(this.props.options);
		}

		this.optionsMap = map;
		this.state = {
			customFilter,
			options: Object.keys(map)
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.options !== nextProps.options && !this.props.customFilter) {
			const map = this.prepOptionsList(nextProps.options);

			this.optionsMap = map;
			this.setState({ options: Object.keys(map) });
		}
	}

	// convert token values back to their proper option values before sending 
	// them along
	onMatch = (option, inputName) => {
		const { onMatch } = this.props;

		if (!!this.optionsMap[option]) {
			option = this.optionsMap[option];
		}

		if (typeof onMatch === 'function') {
			onMatch(option, inputName);
		}
	}

	// prep options that have an enumered options list or an async filter to be
	// mapped from string -> (object|string) if it exists
	prepOptionsList = (options) => {
		const map = {};

		options.forEach((opt, i) => {
			if (opt && typeof opt === 'object') {
				map[opt.name] = opt;
			} else {
				map[opt] = opt;
			}
		});

		return map;
	}

	prepCustomFilter = (origCustomFilter) => {
		return (value) => {
			return new Promise((resolve, reject) => {
				resolve(origCustomFilter(value));
			}).then(options => {
				this.mapNewOptions(options);
				return Object.keys(this.optionsMap);
			})
			.catch(err => console.log(err, err.stack));
		}
	}

	// map new options received on the response of an async filter
	mapNewOptions = (options = []) => {
		this.optionsMap = {};

		options.forEach((option, i) => {
			if (typeof option === 'object') {
				this.optionsMap[option.name] = Object.assign({}, option);
			} else {
				this.optionsMap[option] = option;
			}
		});
	}

	render() {
		const { customFilter, options } = this.state;

		return (
			<ListFilter
				{...this.props}
				customFilter={customFilter}
				options={options}
				onMatch={this.onMatch}
			/>
		);
	}
}

export default ListFilterLayer;
