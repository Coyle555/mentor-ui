# mentor-ui

## Component Folder Organization Standard
- Component folders should be Capitalized to denote it is a React Component. NOTE: folders containing components should be lowercase.
- Any subcomponents should be exported from the main component file.

#### Component Folder Contents
- `index.test.js`: component unit tests.
- `index.story.js`: storybook use cases for component.
- `index.js`: all component logic, so imports should look like `import { Component } from 'src/Component';`.
- `utils.js`: standalone helper methods for the component which can easily be imported for testing.
- `style.less`: all component styles except for globals (such as colors and grid helpers).
- `component/`: optional subcomponet folder.

#### A single component
```
Component
├─ __jest__
│  └─ index.test.js
├─ __story__
│  └─ index.story.js
├─ index.js
├─ utils.js
└─ style.less
```

#### A component with sub components
```
Component
├─ __jest__
│  └─ index.test.js
├─ __story__
│  └─ index.story.js
├─ index.js
├─ utils.js
├─ style.less
└─ components // this is not a react component so it's lowercase
   ├─ SubComponentA
   └─ SubComponentB
      └─ same structure as single component etc...
```

## Code style guideline (JavaScript)
* AirBnB JavaScript Styleguide (https://github.com/airbnb/javascript)
* Tabs (4 spaces) for indentation
* Trailing commas
```
	const movies = {
   		batmanBegins,
	}
```
* Destructor props at the top of the render function
```
	return (
		const {
			onClick,
         	color,
      	} = props;
   	)
```
* Max length should be 61 characters for lines

## Code style guideline (less/css)
* Component classes should be capitalized and prefixed with APM such as `APMComponent`.
* `&` parent selector is should be used liberally to match css structure with its coresponding jsx component.
* All element classes that make up a component should be prefixed with the root component classname *(see example below).
* pseudo selectors are at the bottom of the component parent class.
* media queries and animations should generally be at the bottom of the file.
* Non-component specific classes should be lowercase such as utility classes etc (`.contianer .grid .mr-5`).

#### Example Button Component (JSX)
```
import composeClass from 'composeClass';

export const Button = (props) => {
	const {
		label,
	} = props;
	
	const cc = composeClass('APMButton');
	
	return (
		<button className={cc()}>
			<i className={cc('icon')} />
			<span className={cc('label')}>{label}</span>
		</button>
	);
};
```

#### Example Button Component (Rendered)
```
<button class="APMButton">
	<i class="APMButton-icon"></i>
	<span class="APMButton-label">Back<span>
</button>
```

#### Example Button Component (less/css)
```
.APMButton {
	background-color: gray;
	border-radius: 3px;
	
	&-icon {
		font-size: 18px;
		margin-right: 8px;
		
		&:hover {
			color: blue;
		}
	}
	
	&-label {
		font-size: 16px;
	}
	
	// pseudo selectors are always at the bottom
	&:hover {
		cursor: pointer;
	}
	
	&:active {
		background-color: dark-gray;
		outline: none;
	}
}
```
