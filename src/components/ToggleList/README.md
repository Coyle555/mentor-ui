# Toggle List

## Overview

List of items where each item can be toggled opened and closed


Props | Type | Required | Description
----- | ---- | -------- | -----------
[list](#list) | [Object] | **Yes** | List of items to render
[customClasses](#customClasses) | Object | No | Custom classes that can be applied to the title or content of a list item
expanded | Boolean | No | List items will be expanded when true

### List

List of items to render. Each list item object has the following shape

- **content**(*string | element*) **REQUIRED**: Content to render for the list item
- **title**(*string*) **REQUIRED**: Title of the list item to render

### CustomClasses

The following keys apply a css class to different parts of the list

- **content**: class for the container of the content
- **title**: class for the container of the title
