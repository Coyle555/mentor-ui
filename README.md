# mentor-ui

## Code style guideline

## Component Organization Standard
- Component folders should be Capitalized to denote it is a React Component.
- NOTE: folders containing components should be lowercase.
- `index.test.js`: component unit tests
- `index.story.js`: storybook use cases for component
- `index.js`: all component logic, so imports should look like `import { Component } from 'src/Component';`.
- `utils.js`: standalone helper methods for the component which can easily be imported for testing.
- `style.less`: all component styles except for globals (such as colors and grid helpers).

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
