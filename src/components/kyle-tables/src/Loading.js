import React from 'react';

const MENTOR_LOGO_LEFT_PATH = "M 0,200 v 200 h 39 39 v -88.32 c 0,-52.457 0.148,-88.474 0.364,-88.7 0.452,-0.473 1.202,-44.76 1.606,-94.914 l 0.03,-3.734 0.9,1.076 c 1.66507,2.62974 67.30297,66.16423 68.25108,66.95795 0.45858,0.73769 3.627,1.0352 4.84363,0.56794 2.47529,-1.95604 36.86313,-41.98317 38.81136,-44.27433 4.74599,-4.52232 -0.51279,-7.4618 -2.21342,-9.93159 C 188.80969,135.92414 63.639195,4.4253259 57.376547,-0.11122888 L -1.6749927,-0.06203677 0,200"
const MENTOR_LOGO_RIGHT_PATH = "M 330.7417,0.01981344 C 326.35671,4.7924267 167.09994,197.80398 164.48899,200.55076 c -1.36169,1.55463 -1.16506,4.70413 -0.169,6.151 0.63368,1.06232 31.70999,34.79199 35.70675,39.32451 1.79131,1.98312 8.95044,3.24974 12.451,-0.036 2.73399,-3.11948 104.79355,-117.51423 109.27659,-121.68521 0.1076,14.23648 0.10245,39.80001 0.20567,58.89494 -0.047,1.87 -0.057,51.415 -0.023,110.1 L 322,400 h 39 39 V 200 0 h -34.553 c -1.24717,0 -33.6817,0.00251564 -34.7053,0.01981344"

// A loading component to show to the user while data is retrieved
export const Loading = (props) => (
	<div className="table-loading">
		<svg width="50" height="50" viewBox="0 0 50 50" style={{overflow: 'visible'}}>
			<circle
				cx="25"
				cy="25"
				r="25"
				fill="none"
				stroke="#8dc63f"
				strokeWidth="4"
				strokeDasharray="125, 10, 10, 10"
			>
				<animateTransform
					attributeName="transform"
					attributeType="XML"
					type="rotate"
					from="0 25 25"
					to="360 25 25"
					dur="0.75s"
					repeatCount="indefinite"
				/>
			</circle>
			<circle
				cx="25"
				cy="25"
				r="18"
				fill="#8dc63f"
			/>
			<path
				d={MENTOR_LOGO_LEFT_PATH}
				transform="translate(15, 15) scale(0.05)"
				fill="#003852"
			/>
			<path
				d={MENTOR_LOGO_RIGHT_PATH}
				transform="translate(15, 15) scale(0.05)"
				fill="white"
			/>
		</svg>
	</div>
);
