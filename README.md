# mentor-ui

## Code style guideline

## Component Organization Standard
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
└─ components
   ├─ SubComponentA
   └─ SubComponentB
      └─ same structure as single component etc...
```
