import React, {PureComponent} from 'react';
import {MenuUnfoldOutlined} from '@ant-design/icons';
import {Carousel, Drawer} from 'antd';
import router from 'umi/router';
import nav from './nav.less';

class Nav extends PureComponent {
  state = {
    style: {},
    styleDisplay: 'none',
    drawerVisible: false
  };
  componentDidMount() {
    let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
    let styleDisplay = '';
    if (scrollTop > 110) {
      styleDisplay = 'block';
    } else if ((scrollTop === 0)) {
      styleDisplay = 'none';
    }
    this.setState({styleDisplay});
    window.addEventListener('scroll', this.handleScroll); //监听窗口大小改变
  }
  handleScroll = () => {
    //滚动条高度
    let _this = this;
    let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
    if (scrollTop > 110) {
      _this.setState({styleDisplay: 'block'});
    } else if ((scrollTop === 0)) {
      _this.setState({styleDisplay: 'none'});
    }
  }
  handlerNav=(val)=>{
    if(val==='home'){
      router.push('/home')
    } else if(val==='about'){
      router.push('/about')
    } else if(val==='business'){
      router.push('/business')
    } else if(val==='investor'){
      router.push('/investor')
    } else if(val==='corporate'){
      router.push('/corporate')
    }
  }

  showDrawer = () => {
    this.setState({
      drawerVisible: true,
    });
  };
  onDrawerClose = () => {
    this.setState({
      drawerVisible: false,
    });
  };
  render() {
    return (
      <div>
        {
          this.state.styleDisplay === 'none' &&
          <div className={nav.navPublicBox}>
            <div className={nav.navWrapper}>
              <div className={nav.navTopWrapper}>
                <div className={`${nav.navInTop} ${nav.mdTwo} ${nav.clearfix}`}>
                  <div className={`${nav.languages} ${nav.navPublic} ${nav.columns} ${nav.medium_8}`} style={{
                    color: 'black'
                  }}>
                    中文
                    {/*<a href="/es/home">Español</a>*/}
                  </div>
                  <div className={`${nav.columns} ${nav.medium_3} ${nav.small_6} ${nav.hide_for_small_only}`}>
                    {/*<ul className={`${nav.top_nav_menu} ${nav.navPublicMenu} ${nav.clearfix}`}>*/}
                    {/*  <li className={nav.topA}><a href="#"> 媒体 </a></li>*/}
                    {/*  <li className={nav.topA}><a href="#" target="_blank"> <span> 职业生涯 </span> </a>*/}
                    {/*  </li>*/}
                    {/*</ul>*/}
                  </div>
                </div>
              </div>
              <div className={`${nav.navInBottom} ${nav.navInBottomPublic} ${nav.mdTwo} ${nav.clearfix}`}>
                <div className={`${nav.navPublicWrapperLogo}`}>
                  <a onClick={()=>{this.handlerNav('home')}} className={`${nav.logo} ${nav.columns}`}/>
                  <ul className={`${nav.navInRight} ${nav.navPublicRight} ${nav.columns}  ${nav.hideNone} ${nav.clearfix}`}>
                    <li>
                      <a onClick={()=>{this.handlerNav('home')}}>首页</a>
                    </li>
                    <li className={nav.selected}>
                      <a onClick={()=>{this.handlerNav('about')}}>关于我们</a>
                      {/*<ul className={nav.jsContent}>*/}
                      {/*  <li>*/}
                      {/*      <span className={nav.nav_link}> <a href="#" className={nav.hidden_sm}> 我们是谁 </a></span>*/}
                      {/*  </li>*/}
                      {/*</ul>*/}
                    </li>
                    {/*<li><a  onClick={()=>{this.handlerNav('investor')}}>投资者</a></li>*/}
                    <li><a  onClick={()=>{this.handlerNav('corporate')}}>联系我们</a></li>
                  </ul>
                  <div className={nav.navMobile}>
                    <a className={nav.navMobileH} onClick={this.showDrawer}><MenuUnfoldOutlined/></a>
                    <Drawer
                      placement="right"
                      closable={false}
                      onClose={this.onDrawerClose}
                      visible={this.state.drawerVisible}
                    >

                      <ul className={`${nav.layoutsMenu}`}>
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                              <a onClick={() => {
                                this.handlerNav('home')
                              }}>首页</a>
                            </span>
                        </li>
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('about')
                            }}>关于我们</a>
                            </span>
                        </li>
                        {/*<li className={nav.level_1}>*/}
                        {/*  <span className={nav.nav_link}>*/}
                        {/*  <a onClick={() => {*/}
                        {/*    this.handlerNav('investor')*/}
                        {/*  }}>投资者</a>*/}
                        {/*  </span>*/}
                        {/*</li>*/}
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('corporate')
                            }}>联系我们</a>
                            </span>
                        </li>
                      </ul>
                    </Drawer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          this.state.styleDisplay === 'block' &&
          <div className={`${nav.navPublicBox} ${nav.scrolled}`}>
            <div className={nav.navWrapper}>
              <div className={nav.navTopWrapper}>
                <div className={`${nav.navInTop} ${nav.mdTwo} ${nav.clearfix}`}>
                  <div className={`${nav.columns} ${nav.medium_3} ${nav.small_6} ${nav.hide_for_small_only}`}>
                    {/*<ul className={`${nav.top_nav_menu} ${nav.navPublicMenu} ${nav.clearfix}`}>*/}
                    {/*  <li className={nav.topA}><a href="#"> 媒体 </a></li>*/}
                    {/*  <li className={nav.topA}><a href="#" target="_blank"> <span> 职业生涯 </span> </a>*/}
                    {/*  </li>*/}
                    {/*</ul>*/}
                  </div>
                </div>
              </div>
              <div className={`${nav.navInBottom} ${nav.navInBottomPublic} ${nav.mdTwo} ${nav.clearfix}`}>
                <div className={`${nav.navPublicWrapperLogo}`}>
                  <a onClick={()=>{this.handlerNav('home')}} className={`${nav.logo} ${nav.columns}`}/>
                  <ul className={`${nav.navInRight} ${nav.navPublicRight} ${nav.columns}  ${nav.hideNone} ${nav.clearfix}`}>
                    <li>
                      <a onClick={()=>{this.handlerNav('home')}}>首页</a>
                    </li>
                    <li className={nav.selected}>
                      <a onClick={()=>{this.handlerNav('about')}}>关于我们</a>
                      {/*<ul className={nav.jsContent}>*/}
                      {/*  <li>*/}
                      {/*      <span className={nav.nav_link}> <a href="#" className={nav.hidden_sm}> 我们是谁 </a></span>*/}
                      {/*  </li>*/}
                      {/*</ul>*/}
                    </li>
                    {/*<li><a  onClick={()=>{this.handlerNav('investor')}}>投资者</a></li>*/}
                    <li><a  onClick={()=>{this.handlerNav('corporate')}}>联系我们</a></li>
                  </ul>
                  <div className={nav.navMobile}>
                    <a className={nav.navMobileH} onClick={this.showDrawer}><MenuUnfoldOutlined/></a>
                    <Drawer
                      placement="right"
                      closable={false}
                      onClose={this.onDrawerClose}
                      visible={this.state.drawerVisible}
                    >

                      <ul className={`${nav.layoutsMenu}`}>
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                              <a onClick={() => {
                                this.handlerNav('home')
                              }}>首页</a>
                            </span>
                        </li>
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('about')
                            }}>关于我们</a>
                            </span>
                        </li>
                        {/*<li className={nav.level_1}>*/}
                        {/*  <span className={nav.nav_link}>*/}
                        {/*  <a onClick={() => {*/}
                        {/*    this.handlerNav('investor')*/}
                        {/*  }}>投资者</a>*/}
                        {/*  </span>*/}
                        {/*</li>*/}
                        <li className={nav.level_1}>
                            <span className={nav.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('corporate')
                            }}>联系我们</a>
                            </span>
                        </li>
                      </ul>
                    </Drawer>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Nav;
