import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from './calendar';
import Time from './time';

const tabDisabled = {
	cursor: 'default',
	width: '100%'
};

export default class InputMoment extends Component {
	
	static propTypes = {
		clearInput: PropTypes.func,
		dateDisabled: PropTypes.bool,
		handleClose: PropTypes.func,
		minHour: PropTypes.number,
		maxHour: PropTypes.number,
		minMinute: PropTypes.number,
		maxMinute: PropTypes.number,
		saveDate: PropTypes.func,
		timeDisabled: PropTypes.bool
	};

	static defaultProps = {
		clearInput: null,
		dateDisabled: false,
		handleClose: null,
		minDate: null,
		maxDate: null,
		minHour: 0,
		maxHour: 23,
		minMinute: 0,
		maxMinute: 59,
		saveDate: null,
		timeDisabled: false
	};

	state = {
		tab: 'date'
	};

	componentDidMount() {
		if (this.props.dateDisabled) {
			this.setState({ tab: 'time' });
		}
	}

	handleClickTab = (e, tab) => {
		e.preventDefault();
		this.setState({ tab: e.target.name });
	};

	render() {
		const { tab } = this.state;

		const {
			moment: m,
			className,
			clearInput,
			dateDisabled,
			handleClose,
			minDate,
			maxDate,
			minHour,
			maxHour,
			minMinute,
			maxMinute,
			saveDate,
			timeDisabled
		} = this.props;
		const cls = cx('m-input-moment', className);

		return (
			<div className={cls}>
				<div className="m-b-xs">
					{ typeof saveDate === 'function' &&
						<span
							className="apm-cursor-p m-r-sm"
							onClick={saveDate}
						>
							<i className="fal fa-save m-r-xs" style={{ marginRight: '3px' }} />
							Save
						</span>
					}
					{ typeof clearInput === 'function' &&
						<span
							className="apm-cursor-p"
							onClick={clearInput}
						>
							<i className="fal fa-empty-set" style={{ marginRight: '3px' }} />
							Clear
						</span>
					}
					{ typeof handleClose === 'function' &&
						<span
							className="apm-cursor-p apm-color-red pull-right"
							onClick={handleClose}
						>
							<i className="fal fa-times" style={{ marginRight: '3px' }} />
						</span>
					}
				</div>
				<div className="options">
					{ !dateDisabled &&
						<button
							className={cx(
								'im-btn',
								{ 'is-active': tab === 'date' }
							)}
							name="date"
							onClick={this.handleClickTab}
							style={timeDisabled
								? tabDisabled
								: {}
							}
							type="button"
						>
							<i className="fal fa-calendar-alt fa-sm m-r-xs" />
							Date
						</button>
					}
					{ !timeDisabled && 
						<button
							className={cx(
								'im-btn',
								{ 'is-active': tab === 'time' }
							)}
							name="time"
							onClick={this.handleClickTab}
							style={dateDisabled
								? tabDisabled
								: {}
							}
							type="button"
						>
							<i className="fal fa-clock fa-sm m-r-xs" />
							Time
						</button>
					}
				</div>
				<div className="tabs">
					{ !dateDisabled && 
						<Calendar
							className={cx(
								'tab',
								{ 'is-active': tab === 'date' }
							)}
							maxDate={maxDate}
							minDate={minDate}
							moment={m}
							onChange={this.props.onChange}
						/>
					}
					{ !timeDisabled && 
						<Time
							className={cx(
								'tab',
								{ 'is-active': tab === 'time' }
							)}
							minHour={minHour}
							maxHour={maxHour}
							minMinute={minMinute}
							maxMinute={maxMinute}
							moment={m}
							onChange={this.props.onChange}
						/>
					}
				</div>
			</div>
		);
	}
}
