import React, {PureComponent} from 'react';
import {MenuUnfoldOutlined} from '@ant-design/icons';
import {Carousel, Drawer} from 'antd';
import router from 'umi/router';
import new1 from '../assets/news/new1.png';
import new2 from '../assets/news/new2.png';
import new3 from '../assets/news/new3.png';
import new4 from '../assets/news/new4.png';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import partner1 from '../assets/partner/partner1.png';
import partner2 from '../assets/partner/partner2.png';
import partner3 from '../assets/partner/partner3.png';
import partner4 from '../assets/partner/partner4.png';
import partner5 from '../assets/partner/partner5.png';
import partner6 from '../assets/partner/partner6.png';
import partner7 from '../assets/partner/partner7.png';
import partner8 from '../assets/partner/partner8.png';
import partner9 from '../assets/partner/partner9.png';
import partner10 from '../assets/partner/partner10.png';

import style from './home.less';
import background1 from "../assets/background/background1.jpg";
import background2 from "../assets/background/background2.jpg";


class Home extends PureComponent {
  state = {
    styleDisplay: 'none',
    showLine: 'all',
    newsList: [
      {
        "articleId": "ed4be2f9-5058-4f62-9c85-6cb93b0c5104",
        "new_title": "当服装遇上AI(人工智能)，未来服装行业会发生怎样的改变？",
        "new_content": "人工智能时代，服装人要顺势而为，抓住这个时代的发展机遇。未来人工智能必定是连接线上和线下的，人工智能最大的优势就是连接不同的场景",
        "news_Time": "2019.12.7",
        "news_Pic": "new1"
      },
      {
        "articleId": "b1ef1f94-37d7-444b-9838-2fbe754c5e4e",
        "new_title": "服装智能制造 | 规划设计决定智能制造系统的成败",
        "new_content": '当今"智能制造、中国制造2025"是一个热门话题，在政府的大力倡导和扶持下，很多制造型企业跃跃欲试想加入其中，想提升自身制造水平',
        "news_Time": "2019.11.21",
        "news_Pic": "new2"
      },
      {
        "articleId": "74cc88de-0c8d-4f49-b85f-06360b0efe05",
        "new_title": "服装智能制造：AI技术颠覆成衣检验",
        "new_content": "中国是服装制造大国，但随着用工成本上升和来自东南亚国家的竞争，国内服装制造企业亟需启动精益管理，实施智能制造改革",
        "news_Time": "2020.1.17",
        "news_Pic": "new3"
      },
      {
        "articleId": "885f14a0-7007-4871-bcbe-bad88976ff31",
        "new_title": "服装智能制造：一分钟让您了解智能制造",
        "new_content": '智能是由“智慧”和“能力”两个词语构成。从感觉到记忆到思维这一过程，称为“智慧”，智慧的结果产生了行为和语言，将行为和语言的表达过程称为“能力”，两者合称为“智能”',
        "news_Time": "2020.3.23",
        "news_Pic": "new4"
      }
    ],
    drawerVisible: false
  }

  componentDidMount() {
    let scrollTop = document.documentElement.scrollTop;  //滚动条滚动高度
    document.documentElement.scrollTop = 0;
    let width = document.documentElement.offsetWidth;
    let showLine = '', styleDisplay = '';
    if (scrollTop > 110) {
      styleDisplay = 'block';
    } else if ((scrollTop === 0)) {
      styleDisplay = 'none';
    }
    if (width > 1200) {
      showLine = 'all';
    } else if (width > 900 && width < 1200) {
      showLine = 'three';
    } else if (width > 640 && width < 900) {
      showLine = 'two';
    } else if (width < 640) {
      showLine = 'one';
    }
    this.setState({showLine, styleDisplay}, () => {
      this.readerNews();
    });
    window.addEventListener('scroll', this.handleScroll); //监听窗口大小改变
    window.addEventListener('resize', this.handleResize);
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
  handleResize = () => {
    let width = document.documentElement.offsetWidth;
    let showLine = '';
    if (width > 1200) {
      showLine = 'all';
    } else if (width > 900 && width < 1200) {
      showLine = 'three';
    } else if (width > 640 && width < 900) {
      showLine = 'two';
    } else if (width < 640) {
      showLine = 'one';
    }
    this.setState({showLine}, () => {
      this.readerNews();
    });
  }
  handleArticle = (articleId) => {
    router.push(`/article?articleId=${articleId}`);
  }
  handlerNav = (val) => {
    if (val === 'home') {
      router.push('/home')
    } else if (val === 'about') {
      router.push('/about')
    } else if (val === 'business') {
      router.push('/business')
    } else if (val === 'investor') {
      router.push('/investor')
    } else if (val === 'corporate') {
      router.push('/corporate')
    }
  }

  readerNews() {
    const {showLine, newsList} = this.state;
    if (showLine === 'all') {
      let vDOMChildren = [];
      newsList.forEach((item) => {
        let {articleId, new_title, new_content, news_Time, news_Pic} = item;
        vDOMChildren.push(<li key={Math.random()}>
          <div className={style.imgWrapper}>
            <a>
              {news_Pic === 'new1' && <img src={new1} alt=""/>}
              {news_Pic === 'new2' && <img src={new2} alt=""/>}
              {news_Pic === 'new3' && <img src={new3} alt=""/>}
              {news_Pic === 'new4' && <img src={new4} alt=""/>}
            </a>
          </div>
          <a onClick={() => {
            this.handleArticle(articleId)
          }}>
            <div className={style.writtenContent}>
              <p className={style.date}>{news_Time}</p>
              <p style={{
                fontWeight: 'bold',
                color: '#000'
              }}>{new_title}</p>
              <p>{new_content}</p>
            </div>
          </a>
        </li>);
      });
      return <ul className={`${style.hot} ${style.clearfix}`}>
        {vDOMChildren}
      </ul>
    } else if (showLine === 'three' || showLine === 'two' || showLine === 'one') {
      let vDOMChildren = [];
      if (showLine === 'three') {
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${style.hot} ${style.clearfix}`}>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new1} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[0].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[0].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[0].new_title}</p>
                  <p>{newsList[0].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new2} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[1].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[1].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[1].new_title}</p>
                  <p>{newsList[1].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new3} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[2].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[2].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[2].new_title}</p>
                  <p>{newsList[2].new_content}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${style.hot} ${style.clearfix}`}>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new2} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[1].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[1].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[1].new_title}</p>
                  <p>{newsList[1].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new3} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[2].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[2].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[2].new_title}</p>
                  <p>{newsList[2].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new4} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[3].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[3].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[3].new_title}</p>
                  <p>{newsList[3].new_content}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>);
      } else if (showLine === 'two') {
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${style.hot} ${style.clearfix}`}>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new1} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[0].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[0].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[0].new_title}</p>
                  <p>{newsList[0].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new2} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[1].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[1].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[1].new_title}</p>
                  <p>{newsList[1].new_content}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${style.hot} ${style.clearfix}`}>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new2} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[1].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[1].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[1].new_title}</p>
                  <p>{newsList[1].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new3} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[2].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[2].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[2].new_title}</p>
                  <p>{newsList[2].new_content}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${style.hot} ${style.clearfix}`}>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new3} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[2].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[2].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[2].new_title}</p>
                  <p>{newsList[2].new_content}</p>
                </div>
              </a>
            </li>
            <li>
              <div className={style.imgWrapper}>
                <a>
                  <img src={new4} alt=""/>
                </a>
              </div>
              <a onClick={() => {
                this.handleArticle(newsList[3].articleId)
              }}>
                <div className={style.writtenContent}>
                  <p className={style.date}>{newsList[3].news_Time}</p>
                  <p style={{
                    fontWeight: 'bold',
                    color: '#000'
                  }}>{newsList[3].new_title}</p>
                  <p>{newsList[3].new_content}</p>
                </div>
              </a>
            </li>
          </ul>
        </div>);
      } else if (showLine === 'one') {
        newsList.forEach((item) => {
          let {articleId, new_title, new_content, news_Time, news_Pic} = item;
          vDOMChildren.push(<div key={Math.random()}>
            <ul className={`${style.hot} ${style.clearfix}`}>
              <li>
                <div className={style.imgWrapper}>
                  <a>
                    {news_Pic === 'new1' && <img src={new1} alt=""/>}
                    {news_Pic === 'new2' && <img src={new2} alt=""/>}
                    {news_Pic === 'new3' && <img src={new3} alt=""/>}
                    {news_Pic === 'new4' && <img src={new4} alt=""/>}
                  </a>
                </div>
                <a onClick={() => {
                  this.handleArticle(articleId)
                }}>
                  <div className={style.writtenContent}>
                    <p className={style.date}>{news_Time}</p>
                    <p style={{
                      fontWeight: 'bold',
                      color: '#000'
                    }}>{new_title}</p>
                    <p>{new_content}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>);
        });
      }
      return <Carousel
        effect="fade"
        dotPosition='top'
        // autoplay
      >
        {vDOMChildren}
      </Carousel>
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
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
    const params = {
      slidesPerView: 1,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
    return (
      <div style={{overflowX: 'hidden'}}>
        {
          this.state.styleDisplay === 'none' &&
          <div className={style.nav}>
            <div className={style.navWrapper}>
              <div className={style.navTopWrapper}>
                <div className={`${style.navInTop} ${style.md} ${style.clearfix}`}>
                  <div className={`${style.languages} ${style.columns} ${style.medium_8}`}>
                    中文
                    {/*<a href="/es/home">Español</a>*/}
                  </div>
                  <div className={`${style.columns} ${style.medium_3} ${style.small_6} ${style.hide_for_small_only} ${style.hideNone}`}>
                    {/*<ul className={`${style.top_nav_menu} ${style.clearfix}`}>*/}
                    {/*  <li className={style.topA}>*/}
                    {/*    <a> 媒体 </a>*/}
                    {/*  </li>*/}
                    {/*  <li className={style.topA}><a*/}
                    {/*    // target="_blank"*/}
                    {/*  > <span> 职业生涯 </span> </a></li>*/}
                    {/*  /!*<li className={style.topA}><a href=""> <span> 联系 </span></a></li>*!/*/}
                    {/*</ul>*/}
                  </div>
                  {/*<ul className="navInRight columns medium-1 clearfix hideNone">*/}
                  {/*  <li><a href="">图标</a></li>*/}
                  {/*  <li className="iconTwo"><a href="">图标</a></li>*/}
                  {/*</ul>*/}
                </div>
              </div>
              <div className={`${style.navInBottom} ${style.md} ${style.clearfix}`}>
                <div className={style.navBottomWrapper}>
                  <a onClick={() => {
                    this.handlerNav('home')
                  }} className={`${style.logo} ${style.columns}`}>
                  </a>
                  <ul className={`${style.navInRight} ${style.columns} ${style.hideNone} ${style.clearfix}`}>
                    <li>
                      <a onClick={() => {
                        this.handlerNav('home')
                      }}>首页</a>
                    </li>
                    <li>
                      <a onClick={() => {
                        this.handlerNav('about')
                      }}>关于我们</a>
                      {/*<ul className={style.jsContent}>*/}
                      {/*  <li>*/}
                      {/*    <span className={style.nav_link}> <a href="" className={style.hidden_sm}> 我们是谁 </a></span>*/}
                      {/*  </li>*/}
                      {/*</ul>*/}
                    </li>
                    {/*<li><a onClick={() => {*/}
                    {/*  this.handlerNav('investor')*/}
                    {/*}}>投资者</a></li>*/}
                    <li><a onClick={() => {
                      this.handlerNav('corporate')
                    }}>联系我们</a></li>
                  </ul>
                  <div className={style.navMobile}>
                    <a className={style.navMobileH} onClick={this.showDrawer}><MenuUnfoldOutlined/></a>
                    <Drawer
                      placement="right"
                      closable={false}
                      onClose={this.onDrawerClose}
                      visible={this.state.drawerVisible}
                    >

                      <ul className={`${style.layoutsMenu}`}>
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
                              <a onClick={() => {
                                this.handlerNav('home')
                              }}>首页</a>
                            </span>
                        </li>
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('about')
                            }}>关于我们</a>
                            </span>
                        </li>
                        {/*<li className={style.level_1}>*/}
                        {/*  <span className={style.nav_link}>*/}
                        {/*  <a onClick={() => {*/}
                        {/*    this.handlerNav('investor')*/}
                        {/*  }}>投资者</a>*/}
                        {/*  </span>*/}
                        {/*</li>*/}
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
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
          <div className={`${style.nav} ${style.scrolled}`}>
            <div className={style.navWrapper}>
              <div className={`${style.navInBottom} ${style.md} ${style.clearfix}`}>
                <div className={style.navBottomWrapper}>
                  <a onClick={() => {
                    this.handlerNav('home')
                  }} className={`${style.logo} ${style.columns}`}>
                  </a>
                  <ul className={`${style.navInRight} ${style.columns} ${style.hideNone} ${style.clearfix}`}>
                    <li>
                      <a onClick={() => {
                        this.handlerNav('home')
                      }}>首页</a>
                    </li>
                    <li>
                      <a onClick={() => {
                        this.handlerNav('about')
                      }}>关于我们</a>
                    </li>
                    {/*<li><a onClick={() => {*/}
                    {/*  this.handlerNav('investor')*/}
                    {/*}}>投资者</a></li>*/}
                    <li><a onClick={() => {
                      this.handlerNav('corporate')
                    }}>联系我们</a></li>
                  </ul>
                  <div className={style.navMobile}>
                    <a className={style.navMobileH} onClick={this.showDrawer}><MenuUnfoldOutlined/></a>
                    <Drawer
                      title="Basic Drawer"
                      placement="right"
                      closable={false}
                      onClose={this.onDrawerClose}
                      visible={this.state.drawerVisible}
                    >
                      <ul className={`${style.layoutsMenu}`}>
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
                              <a onClick={() => {
                                this.handlerNav('home')
                              }}>首页</a>
                            </span>
                        </li>
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
                            <a onClick={() => {
                              this.handlerNav('about')
                            }}>关于我们</a>
                            </span>
                        </li>
                        {/*<li className={style.level_1}>*/}
                        {/*    <span className={style.nav_link}>*/}
                        {/*    <a onClick={() => {*/}
                        {/*      this.handlerNav('investor')*/}
                        {/*    }}>投资者</a>*/}
                        {/*    </span>*/}
                        {/*</li>*/}
                        <li className={style.level_1}>
                            <span className={style.nav_link}>
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
        <Swiper {...params}>
          <div>
            <div className={style.banner}>
              <img src={background1} alt="" style={{
                width: '100%',
                height: '100%'
              }}/>
            </div>
          </div>
          <div>
            <div className={style.banner}>
              <img src={background2} alt="" style={{
                width: '100%',
                height: '100%'
              }}/>
            </div>
          </div>
        </Swiper>

        <div className={`${style.main} ${style.md}`}>
          <div className={style.mainWrapper}>
            <div className={style.minContent}>
              <h2 className={style.FY}>关于我们</h2>
              <h3 style={{marginTop: "-20px", marginBottom: '30px',color:'#b3b3b3',fontSize:'1rem'}}>About Us</h3>
              <p className={style.dateT} style={{textAlign: 'left'}}><span
                style={{fontSize: '20px', fontWeight: 'bold', color: '#000000', verticalAlign: 'unset'}}>悦尚科技</span>成立于2019年11月，致力于用最前沿的人工智能技术为服装企业提供AI相关产品及商业解决方案，通过AI赋能助力企业客户及合作伙伴提升商业效率和价值，实现数字化、智能化转型。
                我们将人工智能与行业场景深度融合，创新应用于服装行业的产品研发和市场运营环节，帮助企业打造符合自身需求的智能制造和智慧商业云平台。
              </p>
              <p>
                <p className={style.dateT} style={{fontWeight: '500',textAlign: 'left'}}>
                  在研发制造端，提供趋势分析、智能设计、智能制版，以及面料和工艺的智能筛选，显著减少研发周期和成本；
                </p>
                <p className={style.dateT} style={{textIndent: '32px',textAlign: 'left'}}>
                  在市场销售端，智能着装展示和风格分析推荐系统，能够显著提升用户体验，通过分布式采集回传系统，可以将消费市场的用户反馈信息化，汇总至智慧商业系统，数据过滤分析后，反哺于设计环节以优化研发生产策略，从而打造服装智造生态闭环。
                </p>
              </p>

            </div>
          </div>
          <div className={`${style.latestNews} ${style.topDistance}`}>
            <div className={style.lateTitle}>
              <h1>最新新闻</h1>
              <h3 style={{marginTop: "-20px", marginBottom: '30px',color:'#b3b3b3',textAlign:'center'}}>News</h3>
            </div>
            {this.readerNews()}
          </div>
          <div className={style.mainWrapper}>
            <div className={style.minContent}>
              <h2 className={style.FY}>公司理念</h2>
              <h3 style={{marginTop: "-20px", marginBottom: '30px',color:'#b3b3b3',textAlign:'center',fontSize:'1rem'}}>Company Philosophy</h3>
              <div>
                <ul className={`${style.fyWrapper} ${style.clearfix}`}>
                  <li className={`${style.clearfix}`}>
                    <p style={{fontSize: ' 28px', marginRight: '4px'}}><span>口号</span> <strong>·</strong> <span
                      style={{color: '#ffffff', background: '#e1331d'}}>SLOGAN</span></p>
                    <div className={style.lineBox}></div>
                    <p style={{fontSize:' 16px',color:' #000000'}}>发现时尚，定义时尚</p>
                    <div className={style.lineBox} style={{marginBottom:'0'}}></div>
                  </li>
                  <li className={`${style.clearfix}`}>
                    <p style={{fontSize: ' 28px', marginRight: '4px'}}><span>使命</span> <strong>·</strong> <span
                      style={{color: '#ffffff', background: '#e1331d'}}>MISSION</span></p>
                    <div className={style.lineBox}></div>
                    <p style={{fontSize:' 16px',color:' #000000'}}>连接人与时尚，让世界更加美好</p>
                    <div className={style.lineBox} style={{marginBottom:'0'}}></div>
                  </li>
                  <li className={`${style.clearfix}`}>
                    <p style={{fontSize: ' 28px', marginRight: '4px'}}><span>愿景</span> <strong>·</strong> <span
                      style={{color: '#ffffff', background: '#e1331d'}}>VISION</span></p>
                    <div className={style.lineBox}></div>
                    {/*<p style={{fontSize:' 13px',color:' #000000'}}>成为最有吸引力的公司</p>*/}
                    <p style={{fontSize:' 16px',color:' #000000'}}>成为最有吸引力的公司</p>
                    <p style={{fontSize:' 16px',color:' #000000'}}>包含用户想要的一切时尚产品和信息</p>
                    <div className={style.lineBoxTwo} style={{marginBottom:'0'}}></div>
                  </li>
                </ul>
                {/*<div className={style.lineAll}></div>*/}
              </div>
            </div>
          </div>
          <div className={`${style.peoWrapper} ${style.liNbg} ${style.clearfix}`}>
            <div className={`${style.perRightOption}`}>
              <ul className={`${style.perRightOptionWrapper}`}>
                <li>
                 <span>以用户为中心</span>
                  提供最佳的用户体验，设计、完善每个产品功能，呈现给用户快速、准确且易用的服务。
                </li>
                <li>
                  <span>合作</span>
                  开放沟通，信息共享，鼓励褒奖，互助成长。
                </li>
                <li>
                  <span>专注</span>
                  聚焦我们的产品和服务，不断挑战困难进行探索。
                </li>
                <li>
                  <span>创新</span>
                  保持打破传统的心态，寻找有效并合理的创新方式。
                </li>
                <li>
                  <span>卓越</span>
                  追求更好，让提供的所有服务超出人们的预期
                </li>
              </ul>

            </div>
          </div>
          <div className={`${style.ourBrands} ${style.topDistance}`}>
            <div className={style.lateTitle}>
              <h1>合作伙伴</h1>
              <h3 style={{marginTop: "-20px", marginBottom: '30px',color:'#b3b3b3',textAlign:'center',fontSize:'1rem'}}>Cooperative Partner</h3>
            </div>
            {/*<div className={`${style.ourOptionWrapper} ${style.md}`}>*/}
            {/*  <p className={style.ourOption}>*/}
            {/*    这八个品牌都有独特的个性和专属的设计团队，他们对客户了如指掌。他们有自由发展风格和服装，创造正确的吸引力-我们所有的品牌是统一的做生意的方式。*/}
            {/*  </p>*/}
            {/*</div>*/}
            <ul className={`${style.ourBrandsLog} ${style.clearfix}`}>
              <li>
                <div className={style.imgWrapper}>
                  <img src={partner1} alt=""/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper}>
                  <img src={partner2} alt=""/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper}>
                  <img src={partner3} alt=""/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper}>
                  <img src={partner4} alt=""/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                  <img src={partner5} alt="" style={{height:'70%', width:'60%'}}/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                 <img src={partner6} alt="" style={{height:'70%', width:'60%'}}/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                  <img src={partner9} alt="" style={{height:'70%', width:'80%'}}/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                  <img src={partner10} alt="" style={{height:'70%', width:'55%'}}/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                  <img src={partner7} alt="" style={{height:'70%', width:'60%'}}/>
                </div>
              </li>
              <li>
                <div className={style.imgWrapper} style={{height: '13rem'}}>
                  <img src={partner8} alt="" style={{height:'70%', width:'60%'}}/>
                </div>
              </li>
            </ul>
          </div>
          {/*我们的承诺*/}
          <div className={style.mainWrapper} style={{paddingTop: '50px'}}>
            <div className={style.minContent}>
              <h2 className={style.FY}>我们的承诺</h2>
              <h3 style={{marginTop: "-20px", marginBottom: '30px',color:'#b3b3b3',textAlign:'center',fontSize:'1rem'}}>Our commitment</h3>
              {/*<h3 style={{marginTop: "-20px", marginBottom: '30px'}}>人工智能、 数字化、 创新化</h3>*/}
              <p  className={`${style.dateT} ${style.sizeDateT}`}>
                {/*<span style={{fontSize: '20px', fontWeight: 'bold', color: '#000000', verticalAlign: 'unset'}}>悦尚科技</span>*/}
                基于大数据云计算、知识图谱和计算机视觉等信息技术，结合传统的纺织行业经验和标准，研制出具备自主知识产权的人工智能系统。
                包括服装行业产品的智能设计和智能制版开发，打造云工厂与线上电子商务及线下实体的互动机制，从而解决国内纺织企业偏向中低端制造、
                同质化和利润率低等问题，助力纺织企业从中国制造向中国“智造”转型。
              </p>
              <br/>
              <p>
                <p className={style.dateT} style={{fontWeight: '500',textAlign:'left'}}/>
                <br/>
              </p>

            </div>
          </div>



          {/*<div className={`${style.Investors} ${style.md} ${style.topDistance}`}>*/}
          {/*  <div className={style.lateTitle}>*/}
          {/*    <h1>投资者</h1>*/}
          {/*  </div>*/}
          {/*  <div className={`${style.InvestorsWrapper} ${style.md} ${style.clearfix}`}>*/}
          {/*    <ul>*/}
          {/*      <li>*/}
          {/*        <div className={style.imgWrapper}>*/}
          {/*          <a ><img src={FY19} alt=""/></a>*/}
          {/*        </div>*/}
          {/*        <a >*/}
          {/*          <div className={style.writtenContent}>*/}
          {/*            <p className={style.date}>18 March 2020</p>*/}
          {/*            <p> Dialogue with stakeholders allows us to identify the 10 most relevant*/}
          {/*              issues of our*/}
          {/*              sustainable*/}
          {/*              strategy to creating ecomonic, social and environmental value. We are*/}
          {/*              giving detail of the*/}
          {/*              advances*/}
          {/*              achieved, aligned to the United Nations 2030 Agenda for Sustainable*/}
          {/*              Development </p>*/}
          {/*            <p>FIND OUT MORE</p>*/}
          {/*          </div>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*      <li>*/}
          {/*        <div className={style.imgWrapper}>*/}
          {/*          <a ><img src={FY19} alt=""/></a>*/}
          {/*        </div>*/}
          {/*        <a >*/}
          {/*          <div className={style.writtenContent}>*/}
          {/*            <p className={style.date}>18 March 2020</p>*/}
          {/*            <p> Dialogue with stakeholders allows us to identify the 10 most relevant*/}
          {/*              issues of our*/}
          {/*              sustainable*/}
          {/*              strategy to creating ecomonic, social and environmental value. We are*/}
          {/*              giving detail of the*/}
          {/*              advances*/}
          {/*              achieved, aligned to the United Nations 2030 Agenda for Sustainable*/}
          {/*              Development </p>*/}
          {/*            <p>FIND OUT MORE</p>*/}
          {/*          </div>*/}
          {/*        </a>*/}
          {/*      </li>*/}
          {/*    </ul>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className={`${style.footer} ${style.topDistance}`}>
          {/*<div className={style.footerWrapper}>*/}
          {/*  <ul className={`${style.footer_nav} ${style.clearfix}`}>*/}
          {/*    <li><a> <span> 法律 </span> </a></li>*/}
          {/*    <li><a> <span> 隐私政策 </span> </a></li>*/}
          {/*    <li><a> <span> 可访问性 </span> </a></li>*/}
          {/*    <li><a>*/}
          {/*      <span> 检举流程 </span> </a></li>*/}
          {/*    <li><a > <span> </span> </a></li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*<p className={style.copyright}>©<span>xxxxx</span></p>*/}
          {/*<div className={style.itc}>*/}
          {/*  <div className={style.itc_register}>*/}
          {/*    <img className={style.icon_icp} style={{width: "20px", height: "20px"}}/>*/}
          {/*    <a target="_blank">京网安备 xxxxxxxxxxxxxx号</a>*/}
          {/*  </div>*/}
          {/*  <div className={style.itc_icp}>*/}
          {/*    <a target="_blank" href="http://beian.miit.gov.cn">京ICP备xxxxxxxxx号-x</a>*/}
          {/*  </div>*/}
          {/*</div>*/}

        </div>
      </div>
    );
  }
}

export default Home;
