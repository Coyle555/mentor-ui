import React from 'react';
import PropTypes from 'prop-types';

import { RecordCount } from './RecordCount';
import { PageDropdown } from './PageDropdown';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';

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
		<div className="table-footer row m-t-sm">
			<div className="col-4">
				<PreviousButton
					hasPrevious={hasPrevious}
					onClick={onPrevious}
				/>
				<NextButton
					hasNext={hasNext}
					onClick={onNext}
				/>
			</div>
			<div className="col-4">
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
