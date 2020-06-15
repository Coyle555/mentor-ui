# Modal

## Overview

Modal renders an overlay window

| Props                           | Type          | Required              | Description                                                            |
| ------------------------------- | ------------- | --------------------- | ---------------------------------------------------------------------- |
| closeOnOutsideClick             | Boolean       | No                    | Close modal when clicking outside of modal when true. Defaults to true |
| contentStyle                    | Object        | No                    | Style object applied to the content container in the modal             |
| [customClasses](#customClasses) | Object        | No                    | Custom classes that can be applied to components of the modal          |
| display                         | Boolean       | No                    | Display modal when true                                                |
| height                          | String/Number | No                    | Height of the modal                                                    |
| hideCloseButton                 | Boolean       | No                    | Hides the close modal button when true                                 |
| onClose                         | Function      | No                    | Function callback when the modal is closed                             |
| overlayStyle                    | Object        | No                    | Style object applied to the modal container                            |
| width                           | String/Number | No Width of the modal |

### CustomClasses

The following classes can be applied to the modal

- **overlay**(*string*): class name to apply to the modal overlay
- **content**(*string*): class name to apply to the modal content
