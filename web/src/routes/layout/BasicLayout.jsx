import React, { Component, PropTypes } from 'react';
import { Link, Route, Redirect, Switch } from 'dva/router';
import { LocaleProvider, Layout, Row, Col, Menu, Icon } from 'antd';
import cookie from 'js-cookie';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import style from './BasicLayout.less';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends Component{
  static defaultProps={

  };
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }
  render(){
    const { category } = this.props;
    return(
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Header style={{background:'#fff', padding: 0,}}>
            <Row className="basicLayout_header">
              <Col xs={24} sm={24} md={6} lg={5} xl={5} xxl={4}>
                <Link to="/home" className="basicLayout_logo">
                  <img src={require('../../assets/favicon.png')}/>
                  dva_web
                </Link>
              </Col>
              <Col xs={0} sm={0} md={18} lg={19} xl={19} xxl={20}>
                <Menu
                  className="basicLayout_menu"
                  mode="horizontal"
                  selectedKeys={[category]}
                >
                  <Menu.Item key="tab1" >
                    <Link to="/tab1/sideA">Tab1</Link>
                  </Menu.Item>
                  <Menu.Item key="tab2" >
                    <Link to="/tab2/sideA">Tab2</Link>
                  </Menu.Item>
                  <Menu.SubMenu title={(<div><span >{cookie.get('username') || '匿名用户'}</span><Icon type='setting' style={{fontSize:'16px',marginLeft:'15px'}} /></div>)} style={{float:'right'}}>
                  </Menu.SubMenu>
                  <Menu.Item key='help' style={{float:'right'}}>
                    <a href='https://lark.alipay.com/shenma/xdata' target='_blank'><Icon type='question-circle-o' />帮助</a>
                  </Menu.Item>
                </Menu>
              </Col>
            </Row>
          </Header>
          <Layout>
            {this.props.children}
          </Layout>
        </Layout>
      </LocaleProvider>
    )
  }
}

export default BasicLayout
