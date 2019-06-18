import React, {
	useRef,
	useState,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { composeClass } from 'utils/composeClass';
import { CSSTransition } from 'react-transition-group';

import './index.less';

export const DrawerContext = React.createContext(null)

const Drawer = React.memo(({
	className,
	style,
	label,
	iconClass,
	dataTip,
	DynamicChild,
	id,
	labelContainerStyle
}) => {
	const [innerHeight, setInnerHeight] = useState('0px');
	const [isOpen, setIsOpen] = useState(false);
	const dynamicChildRef = useRef(null);
	const innerRef = useRef(null);

	useEffect(() => {
		updateHeight();
	}, [DynamicChild]);

	function updateHeight() {
		if (dynamicChildRef.current) {
			const node = dynamicChildRef.current;
			const height = getHeightForNode(node)

			if (isOpen && innerRef.current)
				innerRef.current.style.height = `${height}px`;

			setInnerHeight(`${height}px`);
		}
	}

	function toggleDrawer() {
		setIsOpen((prevState) => !prevState);
	}

	function resetHeight() {
		updateHeight();
	}

	function renderChildren(state) {
		
		return (
			<div ref={dynamicChildRef}>
				<DrawerContext.Provider value={resetHeight}>
					<DynamicChild />
				</DrawerContext.Provider>
			</div>
		)
	}

	const cc = composeClass('APMDrawer', className)

	return (
		<div className={cc('bg')} data-tip={dataTip}>
			<div className={cn(
				cc(),
			  { [cc('is-open')]: isOpen },
			)}>
				<div
					className={cn(
						cc('label-container'),
					  { [cc('label-container-is-open')]: isOpen },
					)}
					onClick={toggleDrawer}
					style={labelContainerStyle}
				>
					<div className={cc('label-block')}>
						{ iconClass && <i className={cn(
							[cc('label-block-icon')],
							iconClass,
						)}></i> }
						<span className={cc('label')}>{label}</span>
					</div>
					<i className={cn(
						cc('label-icon'),
						"far fa-angle-left",
					  { [cc('label-icon-active')]: isOpen }
						)}
					>
					</i>
				</div>
				<CSSTransition
					in={isOpen}
					timeout={400}
					classNames="APMDrawer-inner"
					appear
					onEnter={(node) => {
						node.style.height = '0px';
						node.style.display = 'block';
					}}
					onEntering={(node) => {
						node.style.height = innerHeight;
					}}
					onExiting={(node) => {
						node.style.height = '0px';
					}}
					>
					{ (state) => (
						<div
							className={cc('inner')}
							ref={innerRef}
						>
							{renderChildren(state)}
						</div>
						)
					}
				</CSSTransition>
			</div>
		</div>
	)
});

function getHeightForNode(node) {
	const s = document.createElement('div')

	s.appendChild(node.cloneNode(true));
	s.style.display = 'block';
	s.style.position = 'absolute';
	s.style.left = '-10000px';
	document.body.appendChild(s);

	const height = s.clientHeight
	document.body.removeChild(s);

	return height
}

Drawer.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	iconClass: PropTypes.string,
	dataTip: PropTypes.string,
	DynamicChild: PropTypes.func,
	id: PropTypes.string,
}

export default Drawer;
