import React, {PureComponent} from 'react';
import HeaderPage from '../component/Header';
import logoIco from '../assets/logo.ico';
import index from './index.less';


class BasicLayout extends PureComponent {
  state = {};

  componentDidMount() {

  }
  initTitle = () => {
    document.title = '悦尚科技';
    let link = document.createElement('link');
    link.setAttribute('type', 'image/x-icon');
    link.setAttribute('rel', 'icon');
    link.setAttribute('href',logoIco);
    document.head.appendChild(link);
  };

  render() {
    const {children} = this.props;
    this.initTitle();
    return (
      <div className={index.container}>
        <div className={index.header}>
          <HeaderPage/>
        </div>
        <div className={index.main}>{children}</div>
      </div>
    );
  }
}

export default BasicLayout;
