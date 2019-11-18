# Segmented List

## Overview

List of items that can have new items appended to it


Props | Type | Required | Description
----- | ---- | -------- | -----------
[customClasses](#customClasses) | Object | No | Change styling of components in the list
items | [element] | Yes | List of items to render. Any valid react element will render
InsertItemComponent | function | No | How to add new items to the list. Takes a react element and has an *addItem* callback function passed down as a prop
insertOrientation | ["after", "before"] | No | Determines where to place the component for inserting a new item if provided. Defaults to after.
title | string | No | Title of the list

### CustomClasses

Classes can be applied to the following:

- **container**: Segmented list container
- **list**: Container for just the list
- **listItem**: An individual list item
- **title**: Container for just the title
