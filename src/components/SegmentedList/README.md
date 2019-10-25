# Segmented List

## Overview

List of items that can have new items appended to it


Props | Type | Required | Description
----- | ---- | -------- | -----------
items | [element] | Yes | List of items to render. Any valid react element will render
InsertItemComponent | function | No | How to add new items to the list. Takes a react element and has 
*addItem* callback passed down as a prop
title | string | No | Title of the list
