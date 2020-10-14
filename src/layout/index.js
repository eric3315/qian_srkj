import React, { PureComponent } from 'react';
import index from './index.less';

class BasicLayout extends PureComponent {
  state={

  };
  componentDidMount () {

  }


  initTitle=()=>{
    document.title = 'Galaxy';
    let link = document.createElement('link');
    link.setAttribute('type','image/x-icon');
    link.setAttribute('rel','icon');
    // link.setAttribute('href',logoIco);
    document.head.appendChild(link);
  };
  render() {
    const { children } = this.props;
    this.initTitle();
    return (
      <div className={index.container}>
        <div style={{marginLeft:" 10px", width: '100%',height:'100vh', overflow: 'auto'}} className={index.right}> { children }</div>
      </div>
    );
  }
}

export default BasicLayout;
