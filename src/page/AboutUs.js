import React, {PureComponent} from 'react';
import NavComponent from '../component/nav';
import {Carousel} from 'antd';
import Footer from "../component/footer";
import CateGory from "../component/cateGory";
import iconFont from '../font/iconfont.less';
import NEW from '../assets/news/new1.png';
import shijue from '../assets/shijue.jpg';
import dashuju from '../assets/dashuju.jpg';
import style from './about.less';
import styles from '../component/category.less'
import styleAs from './aboutAs.less';
import new2 from "../assets/news/new2.png";
import new3 from "../assets/news/new3.png";
import new4 from "../assets/news/new4.png";


class AboutMore extends PureComponent {
  state = {
    style: {},
    showLine: 'all',
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    let width = document.documentElement.offsetWidth;
    let showLine = '';
    if (width > 1024) {
      showLine = 'all';
    } else if (width > 768 && width < 1024) {
      showLine = 'two';
    } else if (width < 768) {
      showLine = 'one';
    }
    this.setState({showLine}, () => {
      this.readerNews();
    });
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    let width = document.documentElement.offsetWidth;
    let showLine = '';
    if (width > 1024) {
      showLine = 'all';
    } else if (width > 768 && width < 1024) {
      showLine = 'two';
    } else if (width < 768) {
      showLine = 'one';
    }
    this.setState({showLine}, () => {
      this.readerNews();
    });
  }

  readerNews() {
    const {showLine} = this.state;
    if (showLine === 'all') {
      let vDOMChildren = [];
      vDOMChildren.push(<li key={Math.random()}>
        <div className={styleAs.coreContent_img}>
          <img src={dashuju} alt=""/>
        </div>
        <div className={styleAs.coreBg}>
          <p className={styleAs.coreContent_option}>大数据技术</p>
          <p className={styleAs.coreContent_about}>
            为传统服装纺织企业的设计、生产和销售提供数字化支撑。关键技术主要包括：数据采集、数据预处理、海量数据存储、数据分析及挖掘、数据的呈现与应用。
          </p>
        </div>

      </li>);
      vDOMChildren.push(<li key={Math.random()}>
        <div className={styleAs.coreContent_img}>
          <img src={NEW} alt=""/>
        </div>
        <div className={styleAs.coreBg}>
          <p className={styleAs.coreContent_option}>知识图谱</p>
          <p className={styleAs.coreContent_about}>
            以结构化的形式描述客观世界中的概念实体及其关系，将互联网信息表达成更接近人类认知世界的形式，提供了一种更好地组织、管理和理解海量信息的能力。知识图谱与大数据和深度学习一起，成为互联网和人工智能发展的核心驱动力之一。
          </p>
        </div>
      </li>);
      vDOMChildren.push(<li key={Math.random()}>
        <div className={styleAs.coreContent_img}>
          <img src={shijue} alt=""/>
        </div>
        <div className={styleAs.coreBg}>
          <p className={styleAs.coreContent_option}>计算机视觉技术</p>
          <p className={styleAs.coreContent_about}>
            是机器学习认知世界的基础，也是最主要的人工智能技术之一。人类认识世界的信息中91%来自视觉，同样计算机视觉成为机器认知世界的基础。随着人工智能技术不断发展，生成对抗网络(GAN, Generative
            Adversarial Networks)的出现成为计算机视觉领域里程碑式的发展，它为解决各种图像预测问题提供了新型工具。
          </p>
        </div>
      </li>);
      return <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
        {vDOMChildren}
      </ul>
    } else if (showLine === 'two' || showLine === 'one') {
      let vDOMChildren = [];
      if (showLine === 'two') {
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={dashuju} alt=""/>
              </div>
              <p className={styleAs.coreContent_option}>大数据技术</p>
              <p className={styleAs.coreContent_about}>
                为传统服装纺织企业的设计、生产和销售提供数字化支撑。关键技术主要包括：数据采集、数据预处理、海量数据存储、数据分析及挖掘、数据的呈现与应用。
              </p>
            </li>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={NEW} alt=""/>
              </div>
              <p className={styleAs.coreContent_option}>知识图谱</p>
              <p className={styleAs.coreContent_about}>
                以结构化的形式描述客观世界中的概念实体及其关系，将互联网信息表达成更接近人类认知世界的形式，提供了一种更好地组织、管理和理解海量信息的能力。知识图谱与大数据和深度学习一起，成为互联网和人工智能发展的核心驱动力之一。
              </p>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={NEW} alt=""/>
              </div>
              <p className={styleAs.coreContent_option}>知识图谱</p>
              <p className={styleAs.coreContent_about}>
                以结构化的形式描述客观世界中的概念实体及其关系，将互联网信息表达成更接近人类认知世界的形式，提供了一种更好地组织、管理和理解海量信息的能力。知识图谱与大数据和深度学习一起，成为互联网和人工智能发展的核心驱动力之一。
              </p>
            </li>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={shijue} alt=""/>
              </div>
              <p className={styleAs.coreContent_option}>计算机视觉技术</p>
              <p className={styleAs.coreContent_about}>
                是机器学习认知世界的基础，也是最主要的人工智能技术之一。人类认识世界的信息中91%来自视觉，同样计算机视觉成为机器认知世界的基础。随着人工智能技术不断发展，生成对抗网络(GAN, Generative
                Adversarial Networks)的出现成为计算机视觉领域里程碑式的发展，它为解决各种图像预测问题提供了新型工具。
              </p>
            </li>
          </ul>
        </div>);
      } else if (showLine === 'one') {
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={dashuju} alt=""/>
              </div>
              <div className={styleAs.coreBg}>
                <p className={styleAs.coreContent_option}>大数据技术</p>
                <p className={styleAs.coreContent_about}>
                  为传统服装纺织企业的设计、生产和销售提供数字化支撑。关键技术主要包括：数据采集、数据预处理、海量数据存储、数据分析及挖掘、数据的呈现与应用。
                </p>
              </div>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={NEW} alt=""/>
              </div>
              <div className={styleAs.coreBg}>
                <p className={styleAs.coreContent_option}>知识图谱</p>
                <p className={styleAs.coreContent_about}>
                  以结构化的形式描述客观世界中的概念实体及其关系，将互联网信息表达成更接近人类认知世界的形式，提供了一种更好地组织、管理和理解海量信息的能力。知识图谱与大数据和深度学习一起，成为互联网和人工智能发展的核心驱动力之一。
                </p>
              </div>
            </li>
          </ul>
        </div>);
        vDOMChildren.push(<div key={Math.random()}>
          <ul className={`${styleAs.coreContent} ${style.clearfix}`}>
            <li>
              <div className={styleAs.coreContent_img}>
                <img src={shijue} alt=""/>
              </div>
              <div className={styleAs.coreBg}>
              <p className={styleAs.coreContent_option}>计算机视觉技术</p>
              <p className={styleAs.coreContent_about}>
                是机器学习认知世界的基础，也是最主要的人工智能技术之一。人类认识世界的信息中91%来自视觉，同样计算机视觉成为机器认知世界的基础。随着人工智能技术不断发展，生成对抗网络(GAN, Generative
                Adversarial Networks)的出现成为计算机视觉领域里程碑式的发展，它为解决各种图像预测问题提供了新型工具。
              </p>
              </div>
            </li>
          </ul>
        </div>);
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

  render() {
    return (
      <div>
        <NavComponent/>
        {/*去除右侧内容*/}
        <div className={style.main}>
          <div className={`${style.banner} ${style.aboutBanner}`} style={{
            marginTop: '131px'
          }}>
            <ul className={`${style.bannerIn}`}>
              <li/>
            </ul>
          </div>
          <div className={`${style.aboutWrapper} ${style.topDistance} ${style.mdTwo} ${styleAs.professWrapper}`}>
            <div className={`${styleAs.profess} ${style.mdTwo} `}>
              <h1>我们是谁</h1>
              <p className={styleAs.describeOption}>Who we are</p>
              <p
                className={styles.descriC}>悦尚科技成立于2019年11月，致力于用最前沿的人工智能技术为服装企业提供AI相关产品及商业解决方案，通过AI赋能助力企业客户及合作伙伴提升商业效率和价值，实现数字化、智能化转型。
                我们将“人工智能”与“行业场景”深度融合，创新应用于服装行业的产品研发和市场运营环节，帮助企业打造符合自身特色的智能制造和智慧商业云平台。</p>
            </div>
          </div>
          <div className={`${style.aboutWrapper} ${styleAs.professWrapper}`}>
            <div className={`${styleAs.profess}`}>
              {/*<h1>业务范畴</h1>*/}
              <div className={styles.categoryWrapper}>
                <div className={styles.cateContent}>
                  <ul className={`${styles.cateContentBox} ${style.clearfix}`}>
                    <li>
                      <h2>业务范畴</h2>
                      <p>基于大数据、知识图谱、计算机视觉等技术，深度链接设计、制造和销售流程。</p>
                    </li>
                    <li>
                      <h2>AI + 制造</h2>
                      <p>研发制造端，提供趋势分析、智能设计、智能制版，以及面料和工艺的智能筛选，显著减少研发周期和成本。</p>
                    </li>
                    <li>
                      <h2>AI + 零售</h2>
                      <p>市场销售端，智能着装展示和风格分析推荐系统，能够显著提升用户体验，通过分布式采集回传系统，可以将消费市场的用户反馈信息化，汇总至智慧商业系统，数据过滤分析后，反哺于设计环节以优化研发生产策略，从而打造服装智造生态闭环。</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styleAs.professWrapper} ${styleAs.proWBox}`}>
            <div className={`${styleAs.profess} ${style.mdTwo}`}>
              <h1>专业团队</h1>
              <p className={styleAs.describeOption}>Professional Team</p>
              <ul className={styleAs.proContent}>
                <li>
                  <div className={styleAs.proContent_img}>
                    <span className={`${iconFont.iconfont} ${iconFont.icon_yuanxiao}`}/>
                  </div>
                  <div className={styleAs.proContent_advantage}>
                    知名院校
                    <p className={styleAs.proContent_about}>
                      麻省理工学院，卡内基梅隆大学，清华大学，香港理工大学，哈尔滨工业大学，南京理工大学等。
                    </p>
                  </div>
                </li>
                <li>
                  <div className={styleAs.proContent_img}>
                    <span className={`${iconFont.iconfont} ${iconFont.icon_gongsi}`}/>
                  </div>
                  <div className={styleAs.proContent_advantage}>
                    知名公司
                    <p className={styleAs.proContent_about}>
                      微软，阿里巴巴，腾讯，百度，华为，小米，京东等。
                    </p>
                  </div>
                </li>
              </ul>
              <ul className={styleAs.proContent}>
                <li>
                  <div className={styleAs.proContent_img}>
                    <span className={`${iconFont.iconfont} ${iconFont.icon_yanfarenyuan}`}/>
                  </div>
                  <div className={styleAs.proContent_advantage}>
                    <p className={styleAs.proContent_aboutOption}>
                      70%以上研发人员
                    </p>
                  </div>
                </li>
                <li>
                  <div className={styleAs.proContent_img}>
                    <span className={`${iconFont.iconfont} ${iconFont.icon_zhuanli}`}/>
                  </div>
                  <div className={styleAs.proContent_advantage}>
                    <p className={styleAs.proContent_aboutOption}>
                      近20项专利申请
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="aboutWrapper professWrapper coreWrapper">
            <div className={`${styleAs.profess} ${style.mdTwo} ${styleAs.topDistance}`}>
              <h1>核心技术</h1>
              <p className={styleAs.describeOption}>Professional Team</p>
              {this.readerNews()}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default AboutMore;
