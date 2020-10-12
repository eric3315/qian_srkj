import React, {PureComponent} from 'react';
import footer from './footer.less';

class Footer extends PureComponent {
  state = {
    style: {}
  };

  render() {
    return (
      <div>
        <div className={`${footer.footer} ${footer.topDistance}`}>
          {/*<div className={footer.footerWrapper}>*/}
          {/*  <ul className={`${footer.footer_nav} ${footer.clearfix}`}>*/}
          {/*    <li><a href="#"> <span> 法律 </span> </a></li>*/}
          {/*    <li><a href="#"> <span> 隐私政策 </span> </a></li>*/}
          {/*    <li><a href="#"> <span> 可访问性 </span> </a></li>*/}
          {/*    <li><a href="#">*/}
          {/*      <span> 检举流程 </span> </a></li>*/}
          {/*    <li><a href="#"> <span> </span> </a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<p className={footer.copyright}>*/}
          {/*  © <span>xxxxx</span>*/}
          {/*</p>*/}
        </div>
      </div>
    );
  }
}

export default Footer;
