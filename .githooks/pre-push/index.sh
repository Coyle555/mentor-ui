#!/bin/bash

# before pushing to master branch rebuild the storybook docs 
if [$push_command =~ 'master']; then 
	echo 'Rebuilding storybook docs'
	exit 1
	build-storybook -c ../.storybook -o docs && cp ../README.md ../docs/index.md
fi

exit 0
