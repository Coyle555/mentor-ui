import React from 'react';
import { createPortal } from 'react-dom';
//https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html


class Portal extends React.Component {

  constructor(props) {
    super(props);
    this.root = document.querySelector('#modal-root');
    this.el = document.createElement('div');
  }
  
  componentDidMount() {
    this.root.appendChild(this.el);
  }

  componentWillUnmount() {
    this.root.removeChild(this.el);
  }

  render() {
    return createPortal(
      this.props.children,
      this.el,
    );
  }
}


export default class extends React.Component {

	state = { hasError: false, info: '', error: '' };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ 
    	hasError: true,
    	info: info.componentStack,
    	error: error.message
    });
  }

  render() {
  	if (!this.state.hasError) return this.props.children;
  	
  	return (
  		<Portal>
	  		<div className="apm-modal-overlay"
	  			style={{backgroundColor: '#fff', overflow: 'scroll'}}
	  		>
	  			<div className="container" style={{marginTop: 30, width: '65%'}}>
						<div className="panel panel-danger">
						  <div className="panel-heading" style={{textAlign: 'center'}}>
						    <h2>Something went wrong.</h2>
              </div>
              <div className="panel-body">
                <h2>{this.state.error}</h2>
              </div>
            </div>
            <div className="center-block">              
              {
                this.state.info.split('\n').map((line, i) => {
                  return <p key={i}> {line} </p>
                })
              }
            </div>               
          </div> 
        </div>
  		</Portal>
  		
  	)
  }
}
