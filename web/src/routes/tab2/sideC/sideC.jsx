import React from 'react';
import { connect } from 'react-redux';
import Tab2 from '../../layout/Tab2'

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
			<Tab2 category="tab2" module="sideC" collection_list={['a','b','c']}>
				<div>tab2:sideC</div>
			</Tab2>
		);
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(sideC)
