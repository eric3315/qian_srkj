import React, {PureComponent} from 'react';
import {Menu} from 'antd';
import router from 'umi/router';
import logo from '../assets/logo.png';
import style from './header.less';

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
    } else if(window.location.pathname ==="/fitting"){
      current="fitting";
    } else {
      current="test";
    }
    this.setState({ current },()=>{
      router.push(`/${this.state.current}`);
    });
  }

  handleClick=(e)=>{
    console.log('click ', e);
    this.setState({ current: e.key },()=>{
      router.push(`/${this.state.current}`);
    });
  }
  render() {
    const {current}=this.state;
    return (
      <div className={style.wrapper}>
        <div className={style.logo}>
          <img src={logo} alt="图片有误" style={{width: '100%'}}/>
        </div>

        <div className={style.nav}>
          <Menu onClick={this.handleClick} style={{background: 'black', color: 'white',marginRight:'200px'}} selectedKeys={[current]}
                mode="horizontal">
            <Menu.Item key="trend" style={{margin: '0 4px'}}>
              趋势分析
            </Menu.Item>
            <Menu.Item key="design" style={{margin: '0 4px'}}>
              智能设计
            </Menu.Item>
            <Menu.Item key="make" style={{margin: '0 4px'}}>
              智能制版
            </Menu.Item>
            <Menu.Item key="fitting" style={{margin: '0 4px'}}>
              智能试衣
            </Menu.Item>
          </Menu>
          <div style={{margin: '0 4px'}} className={style.myAccount}>
            <span className={style.iconmy}/>
          </div>
        </div>
      </div>
    );
  }
}

export default IntelligentDesign;
