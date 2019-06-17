# mentor-ui

*Component Organization*
* [Component Folder Organization Standard](#Component-Folder-Organization-Standard)
* [Component Folder Contents](#Component-folder-contents)
* [A single component](#A-single-component)
* [A component with sub components](#A-component-with-sub-components)

*JavaScript style guidelines*
* [Code style guideline (JavaScript)](#Code-style-guideline-(JavaScript))
* [Code import guidelines](#Code-import-guidelines)
* [Code export guidelines](#Code-export-guidelines)

*CSS style guidelines and component structure guidelines*
* [Code style guideline (less/css)](#Code-style-guideline-(less/css))
* [Example Button Component (JSX)](#Example-Button-Component-(JSX))
* [Example Button Component (Rendered)](#Example-Button-Component-(Rendered))
* [Example Button Component (less/css)](#Example-Button-Component-(less/css))

## Component Folder Organization Standard
- Component folders should be Capitalized to denote it is a React Component. NOTE: folders containing components should be lowercase.
- Any subcomponents should be exported from the main component file.

#### Component folder contents
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
* AirBnB JavaScript Styleguide (https://github.com/airbnb/javascript).
* Tabs (4 spaces) for indentation.
* Trailing commas.
```
	const movies = {
   		batmanBegins,
	}
```
* Destructor props at the top of the render function.
```
	return (
		const {
			onClick,
         	color,
      	} = props;
   	)
```
* Max length should be 61 characters for lines.

#### Code import guidelines
* External dependencies imported at the top of the file.
* Internal dependencies imported following external dependencies and a linebreak.
* Stylesheet imported following internal dependencies and a linebreak or utils.js.
```
import React from 'react';
import cn from 'classnames';

import { ComponentA } from './components/ComponentA';

import './utils.js';
import './style.less';
```
#### Code export guidelines
* Named imports should be renamed to uppercase alphabet letters at the top of the file.
* Then export original named import as a constant at the bottom of the file.
```
import { ComponentA as A } from './src/ComponentA';
import { ComponentB as B } from './src/ComponentB';
import { ComponentC as C } from './src/ComponentC';

export const ComponentA = A;
export const ComponentB = B;
export const ComponentC = C;
```

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
