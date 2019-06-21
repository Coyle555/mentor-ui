import React from 'react';
import { storiesOf, action } from '@storybook/react';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';

import { 
	Dropdown, 
	DropdownTrigger, 
	DropdownContent,
	DropdownMenu, 
	DropdownMenuItem,
} from '../index';

import Button from '../../Button/index';

const CENTERED = {padding: 10, width: '50%', margin: '20px auto'};	

storiesOf('Dropdown', module)
	.addWithJSX('Basic Dropdown Menu', () => {

		return (
			<div style={CENTERED}>
				<Dropdown>
					<DropdownTrigger>
						<p>Dropdown Trigger</p>
					</DropdownTrigger>
					<DropdownMenu>
						<h2 style={{textAlign: 'center'}}>DropdownMenu</h2>
						<DropdownMenuItem>
							Option A
						</DropdownMenuItem>
						<DropdownMenuItem>
							Option B
						</DropdownMenuItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		)
	})
	.addWithJSX('Dropdown Trigger using render props', () => {

			return (
				<div style={{padding: 10}}>
					<Dropdown>
						<DropdownTrigger 
							render={isOpen => 
								<Button medium>
									<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
								</Button>
							}
						/>
						<DropdownMenu>
							<h2 style={{textAlign: 'center'}}>DropdownMenu</h2>
							<DropdownMenuItem>
								Option A
							</DropdownMenuItem>
							<DropdownMenuItem>
								Option B
							</DropdownMenuItem>
						</DropdownMenu>
					</Dropdown>
				</div>
			)		
		})
	.addWithJSX('Custom dropdown content', () => {

			return (
				<div style={CENTERED}>
					<Dropdown>
						<DropdownTrigger 
							render={isOpen => 
								<Button medium>
									<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
								</Button>
							}
						/>
						<DropdownContent style={{border: '1px dotted red', width: 300}}>
							<h2 style={{textAlign: 'center'}}>Custom Dropdown Content</h2>
						</DropdownContent>
					</Dropdown>
				</div>
			)		
		})
