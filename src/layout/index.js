import { Component } from 'react';
import logo from '../assets/ifash.ico';
import './reset.min.css';
import './index.less'

class BasicLayout extends Component {

  initTitle=()=>{
    let link = document.createElement('link');
    link.setAttribute('type','image/x-icon');
    link.setAttribute('rel','icon');
    link.setAttribute('href',logo);
    document.head.appendChild(link);
  };
  render() {
    const { children} = this.props;
    this.initTitle();
    return children;
  }
}

export default BasicLayout;
