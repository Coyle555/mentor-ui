# Error Page

## Overview

Render an error page based off http status codes. Uses a default error message if no error code 
is passed in. Children can be used down to render extra information about the error.


| Props  | Type                           | Required | Description                                                   |
| ------ | ------------------------------ | -------- | ------------------------------------------------------------- |
| status | [400, 401, 403, 404, 500, 502] | No       | Pass in a status code to display an associated error message. |
