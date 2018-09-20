import React from 'react';
import { connect } from 'react-redux';
import Tab1 from '../../layout/Tab1'

function mapStateToProps(state) {
	return {

	};
}

export class sideC extends React.Component {
	static propTypes = {

	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Tab1 category="tab1" module="sideC" collection_list={['a','b','c']}>
				<div>tab1:sideC</div>
			</Tab1>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(sideC)
