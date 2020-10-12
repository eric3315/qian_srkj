import React, { PureComponent } from 'react';
import showIMG from '../assets/FY19.jpg';
import NavComponent from '../component/nav';
import Footer from "../component/footer";
import style from './about.less';

class About extends PureComponent {
  state = {

  }
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <NavComponent/>
        <div className={style.main}>
          <div className={`${style.banner} ${style.aboutBannerWrapper}`}>
            <ul className={`${style.bannerIn} ${style.aboutBanner} ${style.mdTwo}`}>
              <li/>
            </ul>
          </div>
          <div className={`${style.aboutWrapper} ${style.mdTwo} ${style.clearfix}`}>
            <div className={`${style.aboutLeft} ${style.medium_3} ${style.columns}`}>
              <div className={style.menuWrapper}>
                <ul className={`${style.layoutsMenu} ${style.level_1}`}>
                  <li className={style.level_1}>
                      <span className={style.nav_link}>
                      <a className={style.selected}> 我们是谁 </a>
                      </span>
                  </li>
                  <li className={style.level_1}>
                      <span className={style.nav_link}>
                      <a> 我们的优势 </a>
                      </span>
                  </li>
                  <li className={style.level_1}>
                      <span className={style.nav_link}>
                      <a> 我们的理念 </a>
                      </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${style.aboutRight} ${style.medium_9} ${style.comnns} ${style.column}`}>
              <div className={`${style.column} ${style.medium_12} ${style.small_12} ${style.large_8}`}>
                <div className={`${style.text_content} ${style.left} ${style.text_generic} ${style.aboutSizeLeft}`}>
                  <h1>Who we are</h1>
                  <p className={style.large_font}>
                    We are one of the world's largest fashion retailers, with
                    eight distinct brands.</p>
                  <p>Inditex is one of the world's largest fashion retailers, with eight brands
                    <a target="_self">Zara</a>
                  </p>
                  <p>The success of our first brand –Zara was followed by
                    international expansion at the end of the
                    1980s and the successive launch of new brands,
                    that now have an integrated model of stores and online.</p>
                </div>
              </div>
              <div className={`${style.column} ${style.small_12} ${style.large_3} ${style.comnns} ${style.aboutSizeRight}`}>
                <div className={`${style.sidebar_share} ${style.clearfix} `}>
                  <h3>Share</h3>
                  <div className={`${style.twitter_share_button} ${style.share_button} ${style.buttonInline}`}>
                    <a href="#"><span>Tweet</span></a>
                  </div>
                  <div className={`${style.fb_share_button} ${style.share_button} ${style.buttonInline}`}>
                    <a href="#">Share</a>
                  </div>
                  <div className={`${style.share_button} ${style.share_button_ln} ${style.buttonInline}`}>
                    <a href="#"><span>Share</span></a>
                  </div>
                </div>
                <div className={style.journal_content_article}>
                  <div className={`${style.sidebar_stats} ${style.row} ${style.line_pattern_bg}`}>
                    <div className={`${style.column} ${style.fontLine}`}>
                      <p className={style.stat_number}>7,469</p>
                      <p className={style.stat_text}>Stores</p>
                    </div>
                    <div className={`${style.column} ${style.fontLine}`}>
                      <p className={style.stat_number}>7,469</p>
                      <p className={style.stat_text}>Stores</p>
                    </div>
                    <div className={`${style.column} ${style.fontLine}`}>
                      <p className={style.stat_number}>7,469</p>
                      <p className={style.stat_text}>Stores</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${style.showWrapper} ${style.clearfix}`}>
            <ul className={style.showImage}>
              <li><a href="#">
                <img src={showIMG} alt=""/>
              </a></li>
              <li><a href="#">
                <img src={showIMG} alt=""/>
              </a>
              </li>
              <li><a href="#"><img src={showIMG} alt=""/></a></li>
            </ul>
          </div>
          <div className={`${style.generic_content} ${style.mdTwo}`}>
            <div className={`${style.text_content} ${style.textOption} ${style.row}`}>
              <div className={style.large_font}>Value beyond profit</div>
              <p>Inditex's shares have been listed on the Madrid stock
                exchange since 2001 and are included
                in blue chip stock indices such as the Ibex 35,
                FTSE Eurotop 100 and the Eurostoxx 600.</p>
              <p>我们的介绍Our 176,000-strong workforce never loses sight of the customer.
                We work to create&nbsp;value beyond profit, putting </p>
            </div>
          </div>
          <div className={`${style.full_bleed_promo} ${style.line_pattern_bg} ${style.mdTwo}`}>
            <div className={`${style.addressWrapper} ${style.row} ${style.flex}`}>
              <div className={`${style.column} ${style.addressLeft}`}>
                <div className={style.inner}>
                  {/*地址图标*/}
                  <img src="" alt=""/>
                  <div className={style.text_content}>
                    <h2 className={style.large_heading}>INDITEX AROUND THE WORLD</h2>
                    <div className={style.medium_font}><p>Look up the key figures about our stores,
                      suppliers and social programmes around the world.&nbsp;</p></div>
                    <a className={style.link}>Find out more</a>
                  </div>
                </div>
              </div>
              <div className={`${style.column} ${style.addressRight}`}>
                <div className={style.worldWrapper}>
                  <div className={style.imgBox}/>
                  {/*<img src={WORLD} alt=""/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}
export default About;
