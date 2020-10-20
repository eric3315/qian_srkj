import React, {PureComponent} from 'react';
import {Menu} from 'antd';
import logo from '../assets/logo.png';
import './header.less';
import image_1 from "../assets/image_1.png";

class IntelligentDesign extends PureComponent {
  state = {
    current: '',
  };
  componentDidMount() {
    let current='';
    if(window.location.pathname ==="/design" || window.location.pathname ==="/follow"){
      current="design";
    } else if(window.location.pathname ==="/trend"){
      current="trend";
    } else if(window.location.pathname ==="/make"){
      current="make";
    }
    this.setState({current})
  }

  handleClick=(e)=>{
    console.log('click ', e);
    this.setState({ current: e.key });
  }
  render() {
    const {current}=this.state;
    return (
      <div className="wrapper">
        <div className="logo">
          <img src={logo} alt="图片有误" style={{width: '100%'}}/>
        </div>

        <div className="nav">
          <Menu onClick={this.handleClick} style={{background: 'black', color: 'white'}} selectedKeys={[current]} mode="horizontal" >
            <Menu.Item key="trend">
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
