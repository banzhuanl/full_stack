import React from 'react';
import { connect } from 'react-redux';
import Tab2 from '../../layout/Tab2';

//import { browserHistory  } from 'dva/router';
//import { browserHistory  } from 'react-router';
//import {createBrowserHistory } from 'history';
function mapStateToProps(state) {
	return {

	};
}

export class sideA extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);
	}


	handleClick = () => {	
		//const browserHistory = createBrowserHistory();
		//browserHistory.push('/tab1/sideA');
		console.log(this.props);
		this.props.history.push('/tab1/sideA');
	}
	render() {
		return (
			<Tab2 category="tab2" module="sideA" collection_list={['a','b','c']}>
				<div>tab2:sideA<button onClick={this.handleClick}>click</button></div>
			</Tab2>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(sideA)
