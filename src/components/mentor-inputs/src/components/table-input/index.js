import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import TableInput from './table';

class TableInputButton extends Component {
	
	static propTypes = {
		apiInfo: PropTypes.shape({
			apiPath: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired,
		error: PropTypes.bool,
		onSelectData: PropTypes.func,
		value: PropTypes.string
	}

	static defaultProps = {
		onSelectData: null
	}

	constructor(props) {
		super(props);

		const { value } = this.props;
		let val = value;

		if (typeof value !== 'string') {
			val = String(value);
		}

		// last value checks if the value has changed to fire a select data evt
		this.lastVal = val;

		this.state = {
			hasError: this.checkForError(val),
			tableOpen: false
		};
	}

	checkForError = (value) => {
		const { name, required, validation } = this.props;

		let error = !!required && !value;

		if (!error && !!value && typeof validation === 'function') {
			error = validation(value, name);
		}

		return error;
	}

	openTableInput = () => {
		this.setState({ tableOpen: true });
	}

	closeTableInput = () => {
		this.setState({ tableOpen: false });
	}

	selectData = (data) => {
		const { name, onSelectData } = this.props;

		this.setState({
			hasError: this.checkForError(data),
			tableOpen: false
		}, () => {
			if (typeof onSelectData === 'function') {
				onSelectData(data, name);
			}
		});
	}

	render() {
		const { apiInfo, value } = this.props;
		const { hasError, tableOpen } = this.state;

		const inputClasses = classNames({
			'apm-mi-form-control': true,
			[this.props.className]: !!this.props.className,
			'apm-error-border-color': !!hasError
		});

		return (
			<Fragment>
				{ tableOpen &&
					<TableInput
						apiInfo={apiInfo}
						closeTableInput={this.closeTableInput}
						selectData={this.selectData}
					/>
				}
				<button
					className={inputClasses}
					onClick={this.openTableInput}
					style={{
						color: !!hasError ? '#be1717' : 'inherit',
						whiteSpace: 'nowrap',
						textOverflow: 'ellipsis',
						overflow: 'hidden'
					}}
					type="button"
				>
					{ value || '[Find Record]' }
				</button>
			</Fragment>
		);
	}
}

export default TableInputButton;
