import React from 'react';
import { connect } from 'react-redux';
import Tab2 from '../../layout/Tab2'

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
			<Tab2 category="tab2" module="sideB" collection_list={['a','b','c']}>
				<div>tab2:sideB</div>
			</Tab2>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(sideB)
