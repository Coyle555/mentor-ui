import cn from 'classnames';
import moment from 'moment';
import React, {
	useState,
} from 'react';
import PropTypes from 'prop-types';

import { Calendar } from '../Calendar';
import { Time } from '../Time';
import { TabNav } from 'components/TabNav';
import {
	OptionalControl
} from './components/OptionalControl';
import { composeNamespace } from 'compose-namespace';

import './style.less';

const tabDisabled = {
	cursor: 'default',
	width: '100%'
};

const TAB_LABELS = Object.freeze({
	time: 'Time',
	date: 'Date',
})

const TAB_OPTIONS = Object.freeze([
	{
		label: TAB_LABELS.date,
		iconClass: 'fal fa-calendar-alt',
	},
	{
		label: TAB_LABELS.time,
		iconClass: 'fal fa-clock',
	},
])

export function DatePicker(props) {
	const {
		moment: m,
		className,
		clearInput,
		isDateDisabled,
		handleClose,
		minDate,
		maxDate,
		minHour,
		maxHour,
		minMinute,
		maxMinute,
		saveDate,
		isTimeDisabled,
		onChange,
	} = props;

	const [activeTab, setActiveTab] = useState(isDateDisabled
		? TAB_LABELS.time
		: TAB_LABELS.date
	);

	const cc = composeNamespace('APMDatePicker', className);

	return (
		<div className={cc()}>
			<div className={cn(
				cc('optional-controls'),
			{ [cc('optional-controls-timer-spacer')]: isDateDisabled },
			{ [cc('optional-controls-date-spacer')]: isTimeDisabled })
			}>
				<div className={cc('optional-controls-main')}>
					{ isCallbackValid(saveDate) &&
						<OptionalControl
							onClick={saveDate}
							iconClass='fal fa-save'
						>
							Save
						</OptionalControl>
					}
					{ isCallbackValid(clearInput) &&
						<OptionalControl
							onClick={clearInput}
							iconClass='fal fa-empty-set'
						>
							Clear
						</OptionalControl>
					}
				</div>
				{ isCallbackValid(handleClose) &&
					<OptionalControl
						onClick={handleClose}
						iconClass='fal fa-times'
						className={cc('optional-controls-orphan')}
					/>
				}
			</div>
			{ !isDateDisabled && !isTimeDisabled &&
				<TabNav
					className={cc('nav')}
					tabs={TAB_OPTIONS}
					activeTab={activeTab}
					onClick={onTabClick(setActiveTab)}
				/>
			}
			{ activeTab === TAB_LABELS.date && !isDateDisabled
			&&
				<Calendar
					maxDate={maxDate}
					minDate={minDate}
					moment={m}
					onChange={onChange}
				/>
			}
			{ activeTab === TAB_LABELS.time && !isTimeDisabled
			&&
				<Time
					minHour={minHour}
					maxHour={maxHour}
					minMinute={minMinute}
					maxMinute={maxMinute}
					moment={m}
					onChange={onChange}
				/>
			}
		</div>
	);
};

export function onTabClick(setActiveTab) {
	return (label) => {
		setActiveTab(label);
	};
};

export const isCallbackValid = (callback) => {
	return typeof callback === 'function';
};

DatePicker.propTypes = {
	clearInput: PropTypes.func,
	isDateDisabled: PropTypes.bool,
	handleClose: PropTypes.func,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	minMinute: PropTypes.number,
	maxMinute: PropTypes.number,
	moment: PropTypes.object,
	saveDate: PropTypes.func,
	onChange: PropTypes.func,
	isTimeDisabled: PropTypes.bool
};

DatePicker.defaultProps = {
	clearInput: null,
	isDateDisabled: false,
	handleClose: null,
	minDate: null,
	maxDate: null,
	minHour: 0,
	maxHour: 23,
	minMinute: 0,
	maxMinute: 59,
	moment: new moment(),
	saveDate: null,
	isTimeDisabled: false
};
