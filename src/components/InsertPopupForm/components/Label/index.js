import React from 'react';
import PropTypes from 'prop-types';

export const Label = ({ label, required }) => (
	<div className="row">
		<div className="col-2"/>
		<div className="col-7">
			<label className="label">
				{label}
			</label>
		</div>
		<div className="col-1 text-right">
			{ !!required &&
				<label className="required-input">
					Required
				</label> 
			}
		</div>
	</div>
);

Label.propTypes = {
	label: PropTypes.string,
	required: PropTypes.bool
};

Label.defaultProps = {
	label: ''
};
