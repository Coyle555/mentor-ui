import cn from 'classnames';
import Moment from 'moment';
import React, {
	useState,
	useRef,
	useEffect,
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

export const TYPES = Object.freeze({
	time: 'time',
	date: 'date',
	datetime: 'datetime',
});

const TAB_OPTIONS = Object.freeze([
	{
		label: TYPES.date,
		iconClass: 'fal fa-calendar-alt',
	},
	{
		label: TYPES.time,
		iconClass: 'fal fa-clock',
	},
]);

const DEFAULT_FORMAT_MASKS = Object.freeze({
	[TYPES.datetime]: 'YYYY-MM-DD HH:mm',
	[TYPES.date]: 'YYYY-MM-DD',
	[TYPES.time]: 'HH:mm'
});


export function DatePicker(props) {
	const {
		className,
		format,
		type,
		moment,
		clearInput,
		handleClose,
		minDate,
		maxDate,
		minHour,
		maxHour,
		minMinute,
		maxMinute,
		saveDate,
		onChange,
	} = props;

	const [activeTab, setActiveTab] = useState(
		getInitialType(TYPES, type)
	);


	const [m, setM] = useState(moment ? moment : new Moment());

	const [isDateDisabled, isTimeDisabled] = getIsDisabled(
		TYPES,
		type,
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
							onClick={onClearCallback(
								clearInput,
								setM,
								Moment,
							)}
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
			{ activeTab === TYPES.date && !isDateDisabled
			&&
				<Calendar
					maxDate={maxDate}
					minDate={minDate}
					moment={m}
					onChange={onChangeCallback(
						onChange,
						DEFAULT_FORMAT_MASKS[type],
						setM,
					)}
				/>
			}
			{ activeTab === TYPES.time && !isTimeDisabled
			&&
				<Time
					minHour={minHour}
					maxHour={maxHour}
					minMinute={minMinute}
					maxMinute={maxMinute}
					moment={m}
					onChange={onChangeCallback(
						onChange,
						DEFAULT_FORMAT_MASKS[type],
						setM,
					)}
				/>
			}
		</div>
	);
};

const getIsDisabled = (types, type) => {
	return [
		type === TYPES.time,
		type === TYPES.date,
	]
}

export function getInitialType(types, type) {
	switch (type) {
		case types.datetime:
			return types.date;
		case types.date:
			return types.date;
		case types.time:
			return types.time;
		default:
			return types.date;
	};
};

export function onChangeCallback(
	onChange,
	mask,
	setM,
) {
	return (moment) => {
		const value = moment.format(mask);

		setM(moment.clone());
		onChange(value);
	}
}

export function onClearCallback(
	onClear,
	setM,
	Moment,
) {
	return () => {
		onClear();
		setM(new Moment());
	}
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
	handleClose: PropTypes.func,
	minDate: PropTypes.string,
	maxDate: PropTypes.string,
	minHour: PropTypes.number,
	maxHour: PropTypes.number,
	minMinute: PropTypes.number,
	maxMinute: PropTypes.number,
	saveDate: PropTypes.func,
	onChange: PropTypes.func,
	type: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
	clearInput: null,
	handleClose: null,
	minDate: null,
	maxDate: null,
	minHour: 0,
	maxHour: 23,
	minMinute: 0,
	maxMinute: 59,
	saveDate: null,
};
