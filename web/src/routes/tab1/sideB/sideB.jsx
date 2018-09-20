import React from 'react';
import { connect } from 'react-redux';
import Tab1 from '../../layout/Tab1'

function mapStateToProps(state) {
	return {

	};
}

export class sideB extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Tab1 category="tab1" module="sideB" collection_list={['a','b','c']}>
				<div>tab1:sideB</div>
			</Tab1>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(sideB)
