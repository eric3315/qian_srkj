import React, {PureComponent} from 'react';
import {Menu} from 'antd';
import './header.less';

class IntelligentDesign extends PureComponent {
  state = {
    current: 'mail',
  };
  handleClick=(e)=>{
    console.log('click ', e);
    this.setState({ current: e.key });
  }
  render() {
    const {current}=this.state;
    return (
      <div className="wrapper">
        <div className="logo">
          LOGO
        </div>

        <div className="nav">
          <Menu onClick={this.handleClick} style={{background: 'black', color: 'white'}} selectedKeys={[current]} mode="horizontal" >
            <Menu.Item key="mail">
              趋势分析
            </Menu.Item>
            <Menu.Item key="design">
              智能设计
            </Menu.Item>
            <Menu.Item key="make">
              智能制版
            </Menu.Item>
          </Menu>
        </div>
        <ul className="per">
          <li>我的</li>
        </ul>
      </div>

    );
  }
}

export default IntelligentDesign;
