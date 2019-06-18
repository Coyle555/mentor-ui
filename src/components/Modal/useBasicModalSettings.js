import { useState } from 'react';

// a hook for applying the props Ive been giving to 90% of the modal instances ive been using

/*
	The function returns an array with:
		1.) Props to create a modal trigger
		2.) All the props to pass to the modal
		3.) A dispatch function to update the state
*/
export const useBasicModalSettings = () => {
	const [ isOpen, setIsOpen ] = useState(false);

	const triggerProps = {
		onClick() {
			setIsOpen(true);
		}
	}

	const modalComponentProps = {
		display: isOpen,
		onClose() {
			setIsOpen(false)
		}
	}

	return [
		triggerProps,
		modalComponentProps,
		setIsOpen
	]
}

/*
	Basic example
	const RandomModal = props => {

		const [ triggerProps, modalProps, setModalOpenState] = useBasicModalSettings();

		return (
			<div>
				<button
					{...triggerProps}
					className="btn"
				>
					Open a modal
				</button>
				<Modal {...modalProps}>
					<h1>Modal Content</h1>
					<button onClick={() => setModalOpenState(false)}>
						Close programatically.
					</button>
				</Modal>
			</div>
		)
	}
*/
