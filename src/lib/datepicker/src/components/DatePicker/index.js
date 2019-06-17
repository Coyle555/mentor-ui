import cn from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Calendar } from '../Calendar';
import { Time } from '../Time';
import {
	OptionalControl
} from './components/OptionalControl';
import { composeClass } from 'utils';

import './style.less';
import * as utils from './utils';

const tabDisabled = {
	cursor: 'default',
	width: '100%'
};

export class DatePicker extends Component {
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

		const cc = composeClass('APMDatePicker', className);

		return (
			<div className={cc()}>
				<i />
				<div className={cc('optional-controls')}>
					<div className={cc('optional-controls-main')}>
						{ utils.isCallbackValid(saveDate) ||
							<OptionalControl
								onClick={saveDate}
								iconClass='fal fa-save'
							>
								Save
							</OptionalControl>
						}
						{ utils.isCallbackValid(clearInput) &&
							<OptionalControl
								onClick={clearInput}
								iconClass='fal fa-empty-set'
							>
								Clear
							</OptionalControl>
						}
					</div>
					{ utils.isCallbackValid(handleClose) &&
						<OptionalControl
							onClick={saveDate}
							iconClass='fal fa-times'
							className={cc('optional-controls-orphan')}
						/>
					}
				</div>
				<div className={cc('options')}>
					{ !dateDisabled &&
						<button
							className={cn(
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
							className={cn(
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
							className={cn(
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
							display={tab === 'time'}
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

DatePicker.propTypes = {
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

DatePicker.defaultProps = {
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
