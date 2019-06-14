// import test from 'tape';
// import React from 'react';
// import { shallow, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

// import Title from '../title';

// configure({ adapter: new Adapter() });

// test('shallow render test of title helper component', (t) => {
// 	const wrapper = shallow(<Title />);

// 	t.equal(wrapper.text(), '',
// 		'Title is not an empty string on default render');

// 	t.equal(wrapper.find('ol.breadcrumb').children().length, 0,
// 		'Breadcrumbs have children on default render with 0 crumbs');

// 	wrapper.setProps({
// 		title: 'test',
// 		breadcrumbs: ['test1', 'test2', 'test3']
// 	});

// 	t.equal(wrapper.find('h2').text(), 'test',
// 		'Title has the wrong text');

// 	t.equal(wrapper.find('ol.breadcrumb').children().length, 3,
// 		'Wrong number of breadcrumb childrens');

// 	t.equal(wrapper.find('li').length, 3,
// 		'Wrong number of li items as breadcrumbs');

// 	t.ok(wrapper.find('li').at(0).equals(
// 		<li>test1</li>),
// 		'First breadcrumb is incorrect');

// 	t.ok(wrapper.find('li').at(1).equals(
// 		<li>test2</li>),
// 		'Second breadcrumb is incorrect');

// 	t.ok(wrapper.find('li').at(2).hasClass('active'),
// 		'Last breadcrumb is not set an li tag set to active class');

// 	t.ok(wrapper.find('li.active').childAt(0).equals(
// 		<strong>test3</strong>),
// 		'Last breadcrumb is not surrounded with <strong> tags');

// 	t.end();
// });
