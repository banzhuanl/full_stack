import React from 'react';
import { connect } from 'react-redux';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { Layout, Row, Col, Menu, Icon, } from 'antd';
import BasicLayout from './BasicLayout';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function mapStateToProps(state) {
	return {

	};
}

export class Tab1 extends React.PureComponent {
	static propTypes = {
		//name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { category, module, collection_list } = this.props;

    return(
      <BasicLayout category={category}>
        <Sider width={200} style={{}}>
          <Menu
            mode="inline"
            selectedKeys={[module]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="sideA"><Link to="/tab1/sideA">sideA</Link></Menu.Item>
            <Menu.Item key="sideB"><Link to="/tab1/sideB">sideB</Link></Menu.Item>
            <Menu.Item key="sideC"><Link to="/tab1/sideC">sideC</Link></Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 24px 0', height: '100%', minHeight: '500px'}}>
            {this.props.children}
          </Content>
          <Footer>
            <div className='basicLayout-footer'>
              xdata @ 2018
            </div>
          </Footer>
        </Layout>
      </BasicLayout>
    )  
	}
}

export default connect(
	mapStateToProps,
// Implement map dispatch to props
)(Tab1)
