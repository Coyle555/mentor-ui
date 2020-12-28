import React from 'react';
import PropTypes from 'prop-types';

export const Label = ({ htmlFor, label, required }) => (
	<div className="row">
		<div className="col-2" />
		<div className="col-7">
			<label className="label" htmlFor={htmlFor} >
				{label}
			</label>
		</div>
		<div className="col-1 text-right">
			{!!required &&
				<label className="required-input">
					Required
				</label>
			}
		</div>
	</div>
);

Label.propTypes = {
	label: PropTypes.string,
	required: PropTypes.bool,
	htmlFor: PropTypes.string
};

Label.defaultProps = {
	label: ''
};
