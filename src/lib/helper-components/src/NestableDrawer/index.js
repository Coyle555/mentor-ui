import React, {
	useContext,
	useRef,
	useState,
	useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { CSSTransition } from 'react-transition-group';

import {
	actionTypes,
	toggleDrawer,
	openSubDrawer,
} from '../NestedDrawers/actions';
import { DrawerDispatch } from '../NestedDrawers';

import './index.less';

const rootDrawer = 'rootDrawer';
const subDrawer = 'subDrawer';

export const drawerTypes = {
	root: rootDrawer,
	sub: subDrawer
};

function calcHeight(childCount, activeChildId) {
	if (childCount === 0)
		return 0
	const subDrawerTabHeight = 33;
	const offset = activeChildId ? 32 : 18;
	return `${childCount * subDrawerTabHeight + offset}px`
}

const NestableDrawer = React.memo(({
	children,
	drawerType,
	isOpen,
	isActive,
	label,
	iconClass,
	dataTip,
	DynamicChild,
	isMini,
	onClickCallback,
	parentIds,
	id,
}) => {
	const dispatch = useContext(DrawerDispatch);
	const dynamicChildRef = useRef(null);
	const prevIsOpen = useRef(null);
	const prevChildCountRef = useRef(null);
	const [innerHeight, setInnerHeight] = useState('0px');

	useEffect(() => {
		if (dynamicChildRef.current) {
			const node = dynamicChildRef.current;

			if (innerHeight === '0px') {
				const height = getHeightForNode(node);
				setInnerHeight(`${height}px`);
			}
		}
	}, [])

	function onClick(event) {
		event.preventDefault();
		event.stopPropagation();

		if (onClickCallback) {
			onClickCallback();
		}

		if (drawerType === drawerTypes.root) {
			dispatch(toggleDrawer(actionTypes.ROOT_CLICKED, id));
		} else {
			dispatch(toggleDrawer(actionTypes.SUB_CLICKED, id));
		}
	}

	function renderChildren() {
		if (DynamicChild) {
			return (
				<div ref={dynamicChildRef}>
					<DynamicChild />
				</div>
			)
		}
		if (parentIds)
			return giveChildrenId([ id, ...parentIds], children)
		return giveChildrenId([id], children)
	}

	let [childCount, activeChildId] = children ? countChildren(children) : [0, false]

	const isConnected = drawerType;
	const isRoot = drawerType === drawerTypes.root;

	useEffect(() => {
		if (!prevIsOpen.current && isOpen && activeChildId) {
			dispatch(openSubDrawer(activeChildId));
		}
		prevIsOpen.current = isOpen;
	}, [isOpen])

	if (prevChildCountRef.current !== childCount && !DynamicChild) {
		prevChildCountRef.current = childCount;
		setInnerHeight(calcHeight(childCount, activeChildId));
	}

	return (
		<div className={cn(
			"APMNestableDrawer-bg",
		  { "APMNestableDrawer-bg-is-root": isRoot },
			)}
			data-tip={dataTip}>
			<div className={cn(
				"APMNestableDrawer",
			  { "APMNestableDrawer-is-root-open": isRoot && isOpen },
			  { "APMNestableDrawer-not-is-root": !isRoot },
			  { "APMNestableDrawer-is-active": isActive },
			  { "APMNestableDrawer-is-mini": isMini },
			)}>
				<div
					className={cn(
						"APMNestableDrawer-label-container",
					  { "APMNestableDrawer-label-container-is-root": isRoot },
					  { "APMNestableDrawer-label-container-is-open": isOpen },
					  { "APMNestableDrawer-label-container-is-active": isActive },
					)}
					onClick={onClick}>
					<div className="APMNestableDrawer-label-block">
						{ iconClass && <i className={cn(
							"APMNestableDrawer-label-block-icon",
							iconClass,
						)}></i> }
						<span className="APMNestableDrawer-label">{label}</span>
					</div>
					<i className={cn(
						"APMNestableDrawer-label-icon",
						"far fa-angle-left",
					  { "APMNestableDrawer-label-icon-active": isOpen }
						)}
					>
					</i>
				</div>
				<CSSTransition
					in={isOpen}
					timeout={400}
					classNames="APMNestableDrawer-inner"
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
							className="APMNestableDrawer-inner"
						>
							{renderChildren()}
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

function countChildren(children) {
	let count = 0;
	let activeChildId;
	const fragmentChildren = skipFragment(children);

	if (Array.isArray(fragmentChildren)) {
		fragmentChildren.forEach(child => {
			if (child.props.type === 'NestableDrawer') {
				const el = skipFragment(child)

				if (!el.props.children) {
					count ++
					return
				}

				const fragmentChildren = el.props.children.props.children;

				if (Array.isArray(fragmentChildren)) {
					fragmentChildren.forEach(subChild => {
						if (subChild.props.type === 'DrawerLink' && subChild.props.isActive) {
							count += fragmentChildren.length;
							activeChildId = child.props.id;
						}
					})
				}

				if (fragmentChildren)
					count++;

			} else {
				count++;
			}
		})
	} else if (fragmentChildren) {
		count++;
	}

	return [count, activeChildId];
}

function skipFragment(child) {
	const isFragment = React.Children.count(child) === 1
		&& child.type.toString() === 'Symbol(react.fragment)'
	return isFragment ? child.props.children : child
}

function isFragment(el) {
	return el.type.toString() === 'Symbol(react.fragment)'
}

function giveChildrenId(ids, children) {
	const fragmentChildren = children.props.children;

	if (Array.isArray(fragmentChildren)) {
		const newChildren = fragmentChildren.map(child => {
			if (child.props.parentIds)
				return React.cloneElement(child, { parentIds: [ ...ids, ...child.props.parentIds]});
			return React.cloneElement(child, { parentIds: [...ids] });
		})
		return React.createElement(
			React.Fragment,
			[],
			newChildren,
		)
	} else {
		return React.Children.map(children, child => {
			if (child.props.parentIds)
				return React.cloneElement(child, { parentIds: [ ...ids, ...child.props.parentIds] });
			return React.cloneElement(child, { parentIds: [ ...ids ] });
		})
	}
}

NestableDrawer.defaultProps = {
	type: 'NestableDrawer'
}

NestableDrawer.propTypes = {
	children: PropTypes.node,
	drawerType: PropTypes.string,
	isOpen: PropTypes.bool,
	isActive: PropTypes.bool,
	label: PropTypes.string,
	iconClass: PropTypes.string,
	dataTip: PropTypes.string,
	DynamicChild: PropTypes.func,
	isMini: PropTypes.bool,
	onClickCallback: PropTypes.func,
	parentIds: PropTypes.array,
	id: PropTypes.string,
}

export default NestableDrawer;
