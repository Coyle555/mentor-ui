import React from 'react';
import PropTypes from 'prop-types';

import { RecordCount } from './display-records/recordCount';
import { PageDropdown } from './pageDropdown';
import { NextButton } from './nextButton';
import { PreviousButton } from './previousButton';

import './styles.less';

export const TableFooter = ({
	currentPage,
	entriesViewable,
	onGetPage,
	onNext,
	onPrevious,
	pageSize,
	recordCount
}) => {
	if (recordCount === 0) {
		return null;
	}

	const hasNext = ((currentPage * pageSize) < recordCount);
	const hasPrevious = (currentPage > 1);

	return (
		<div className="table-footer m-t-sm">
			<div >
				<PreviousButton
					hasPrevious={hasPrevious}
					onClick={onPrevious}
				/>
				<NextButton
					hasNext={hasNext}
					onClick={onNext}
				/>
			</div>
			<div className="text-center">
				<RecordCount
					currentPage={currentPage}
					entriesViewable={entriesViewable}
					pageSize={pageSize}
					recordCount={recordCount}
				/>
			</div>
			<PageDropdown
				currentPage={currentPage}
				onChange={onGetPage}
				pageSize={pageSize}
				recordCount={recordCount}
			/>
		</div>
	);
};

TableFooter.propTypes = {
	currentPage: PropTypes.number,
	entriesViewable: PropTypes.number,
	onGetPage: PropTypes.func,
	onNext: PropTypes.func,
	onPrevious: PropTypes.func,
	pageSize: PropTypes.number,
	recordCount: PropTypes.number,
};

TableFooter.defaultProps = {
	currentPage: 1,
	pageSize: 25,
	recordCount: 0
};
