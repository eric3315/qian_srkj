import React, { PureComponent } from 'react';
import NavComponent from '../component/nav';
import Footer from "../component/footer";
import style from '../page/aboutPublic.less';
import styles from '../page/details.less';


class Corporate extends PureComponent {
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
            <div className={`${style.aboutLeft} ${style.medium_3} ${style.columns} ${styles.large_8} ${styles.aboutLeftDetail} `}>
              <div className={style.menuWrapper}>
                <ul className={`${style.layoutsMenu} ${style.level_1}`}>
                  <li className={style.level_1}>
                      <span className={style.nav_link}>
                      <h2 className={style.selected}> 新闻详情标题 </h2>
                      </span>
                  </li>
                  <li className={style.level_1}>
                      <span className={style.nav_link}>
                      <a> 投资者和股东 </a>
                      </span>
                  </li>

                </ul>
              </div>
            </div>
            <div className={`${style.aboutRight} ${style.medium_9} ${style.comnns} ${style.column}  ${styles.large_3}`}>
              <div className={`${style.column} ${style.medium_12} ${style.small_12} ${style.large_8} ${styles.large_8Inver}`}>
                <div className={`${style.text_content} ${style.left} ${style.text_generic} ${styles.aboutSizeLeft}`}>
                  <h1>投资者关系</h1>
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
              <div className={`${style.column} ${style.small_12} ${style.large_3} ${style.comnns} ${style.aboutSizeRight} ${styles.large_3Inver}`}>
                <div className={style.journal_content_article}>
                  <div className={`${style.sidebar_stats} ${style.row} ${style.line_pattern_bg} ${styles.fontLineInver}`}>
                    <div className={`${style.column} ${style.fontLine} `}>
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
          <div className={`${styles.showWrapperDetail}`}>
            <ul className={`${styles.showImage}`}>
              <li/>
            </ul>
          </div>
          <div className={`${style.generic_content} ${style.mdTwo}`}>
            <div className={`${style.text_content} ${style.textOption} ${style.row} ${styles.textOptionInves}`}>
              <div className={style.large_font}>Value beyond profit</div>
              <p>Inditex's shares have been listed on the Madrid stock
                exchange since 2001 and are included
                in blue chip stock indices such as the Ibex 35,
                FTSE Eurotop 100 and the Eurostoxx 600.</p>
              <p>我们的介绍Our 176,000-strong workforce never loses sight of the customer.
                We work to create&nbsp;value beyond profit, putting </p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}
export default Corporate;
