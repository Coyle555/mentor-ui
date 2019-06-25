import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, optionsKnob as options } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { action } from 'storybook-utils';
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
	.addDecorator(withInfo)
	.add('DropdownTrigger using render props', () => {

			return (
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
			)		
		})
	.add('Basic Dropdown Menu', () => {

		return (
			
			<Dropdown>
				<DropdownTrigger>
					<span style={{cursor: 'pointer', border: '1px solid'}}>Click here to open the dropdown</span>
				</DropdownTrigger>
				<DropdownMenu>
					<h2 style={{textAlign: 'center'}}>DropdownMenu</h2>
					<DropdownMenuItem
						onClick={action('clicked option #1')}
						iconClass="fas fa-hand-spock"
					>
						Live Long and Prosper
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={action('clicked option #2')}
						iconClass="fas fa-search-dollar"
						style={{ color: 'green' }}
					>
						Search for money
					</DropdownMenuItem>
					<span className="APMDropdown-menu-item-separator"/>
					<DropdownMenuItem
						onClick={action('clicked option #3')}
						className="custom-class"
						iconClass="fas fa-balance-scale-right"

					>
						Tip the scales of justice
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
		)
	})
	.add('On the far left of the screen', () => {

		return (
			
			<Dropdown>
				<DropdownTrigger>
					<span style={{cursor: 'pointer', border: '1px solid'}}>Click here to open the dropdown</span>
				</DropdownTrigger>
				<DropdownMenu>
					<h2 style={{textAlign: 'center'}}>DropdownMenu</h2>
					<DropdownMenuItem
						onClick={action('clicked option #1')}
						iconClass="fas fa-hand-spock"
					>
						Live Long and Prosper
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={action('clicked option #2')}
						iconClass="fas fa-search-dollar"
						style={{ color: 'green' }}
					>
						Search for money
					</DropdownMenuItem>
					<span className="APMDropdown-menu-item-separator"/>
					<DropdownMenuItem
						onClick={action('clicked option #3')}
						className="custom-class"
						iconClass="fas fa-balance-scale-right"

					>
						Tip the scales of justice
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
		)
	})	
	.add('On the far right of the screen', () => {

		return (
			<div style={{position: 'relative',float: 'right', marginTop: 40}}>
			<Dropdown>
				<DropdownTrigger>
					<span style={{cursor: 'pointer', border: '1px solid'}}>Open</span>
				</DropdownTrigger>
				<DropdownMenu>
					<h2 style={{textAlign: 'center'}}>DropdownMenu</h2>
					<DropdownMenuItem
						onClick={action('clicked option #1')}
						iconClass="fas fa-hand-spock"
					>
						Live Long and Prosper
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={action('clicked option #2')}
						iconClass="fas fa-search-dollar"
						style={{ color: 'green' }}
					>
						Search for money
					</DropdownMenuItem>
					<span className="APMDropdown-menu-item-separator"/>
					<DropdownMenuItem
						onClick={action('clicked option #3')}
						className="custom-class"
						iconClass="fas fa-balance-scale-right"

					>
						Tip the scales of justice
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
			</div>
		)
	})		
	.add('Displaying content by default', () => {

		return (
			
			<Dropdown openOnMount>
				<DropdownTrigger>
					<span style={{cursor: 'pointer', border: '1px solid'}}>Dropdown Trigger</span>
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
		)
	})	
	.add('Custom dropdown content', () => {

			return (				
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
			)		
		})
	.add('Multiple dropdowns', () => 
			<div style={{ display: 'flex', width: 300, padding: 5, flexWrap: 'wrap' }}>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#fff'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 1</h2>
					</DropdownContent>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#ffe'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 2</h2>
					</DropdownContent>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#ff6'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 3</h2>
					</DropdownContent>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#fff'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 4</h2>
					</DropdownContent>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#ffe'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 5</h2>
					</DropdownContent>
				</Dropdown>
				<Dropdown>
					<DropdownTrigger 
						render={isOpen =>
							<Button medium>
								<i className={`fas fa-caret-${isOpen ? 'down' : 'up'}`}/>
							</Button>								
						}
					/>
					<DropdownContent style={{border: '1px dotted red', width: 300, background: '#ff6'}}>
						<h2 style={{textAlign: 'center'}}>Custom Dropdown Content 6</h2>
					</DropdownContent>
				</Dropdown>														
			</div>
			
	)	
