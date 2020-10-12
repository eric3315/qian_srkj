import React, { PureComponent } from 'react';
import { Map, Marker } from 'react-amap';
import NavComponent from '../component/nav';
import Footer from "../component/footer";
import style from '../page/aboutPublic.less';
import styles from '../page/details.less';
import stySize from '../page/sizeMap.less'

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
          <div className={`${style.mdTwo} ${style.clearfix}`}>
            <div className={`${style.aboutRight}  ${style.comnns} ${style.column}  ${styles.large_3}`}>
              <div className={`${style.column} ${style.medium_12} ${style.small_12} ${style.large_8} ${styles.large_8Inver}`} style={{
                marginTop: "235px"
              }}>
                <ul className={`${style.mapBox} ${style.clearfix}`}>
                  <li>
                    <div className={`${style.text_content} ${style.left} ${style.text_generic} ${styles.aboutSizeLeft}`}>
                      <p>办公地点：常州市武进区常武中路18号常州科教城惠研楼北楼4层2409</p>
                      <p>商业合作：business@ifashion.ai</p>
                      <p>人才招聘:   hr@ifashion.ai</p>
                    </div>
                  </li>
                  <li>
                    <div style={{width:'800px'}}>
                    <div className={stySize.sizeMap} style={{width: '100%', height: 400,border:'1px dashed lightBlue',}}>
                      <Map amapkey="597fd80e44959d9cf9f84dbce9f7bdc8" zoom={18} center={{longitude: 119.962856, latitude: 31.683684}}>
                        <Marker position={{longitude: 119.962856, latitude: 31.683684}} />
                      </Map>
                    </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}
export default Corporate;
