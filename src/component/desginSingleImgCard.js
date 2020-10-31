import React, { PureComponent } from "react";
import styles from './singleIndex.less';
import duiGou from "../assets/duigou2.png";
import {CloseOutlined} from '@ant-design/icons';

class DesginSingleImgCard extends PureComponent {

  handleMouseDown =async (e)=>{
    e.preventDefault();
    console.info(e.target.nodeName)
    if(e.target.nodeName ==='I'){
      console.info('进来了')
    } else {
      if (e.button === 0) {
        await new Promise(function (resolve) {
          setTimeout(() => {
            resolve('等待0.2秒')
          }, 200);
        });
        let {flag,picCheck,card_info,card_actions,data} = this.props;
        let newPicCheck =picCheck, newCardInfo=card_info, newCardActions=card_actions;
        if(newPicCheck){
          newPicCheck = false;
          newCardInfo='card_info';
          newCardActions='card_actions';
        } else {
          newPicCheck = true;
          newCardInfo='card_infoBefore';
          newCardActions='card_actionsBefore';
        }
        this.props.handleDesignData(data,newPicCheck,newCardInfo,newCardActions,flag);
      }
    }
  };
  render() {
    const {picAddress,card_info,card_actions,flag} = this.props;
    return (
      <div>
        <div className={styles.product_card}  onMouseDown={async (e)=>{await this.handleMouseDown(e)}}>
          {
            card_info ==='card_info' &&
            <div className={styles.card_info}>
                <img src={`${picAddress}`} alt="" style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}/>
            </div>
          }
          {/*{*/}
          {/*  card_info ==='card_info' && flag === "2" &&*/}
          {/*  <span style={{*/}
          {/*    position: "absolute",*/}
          {/*    right: "5px",*/}
          {/*    top: "0px",*/}
          {/*    fontSize: "20px",*/}
          {/*    width: "50px",*/}
          {/*    height: "30px",*/}
          {/*    display: "inline-block",*/}
          {/*    textAlign: "center"*/}
          {/*  }}>*/}
          {/*    <CloseOutlined />*/}
          {/*  </span>*/}
          {/*}*/}
          {
            card_actions ==='card_actions' &&
            <span className={styles.card_actions}>
               <img src={duiGou} alt=""/>
            </span>
          }
          {
            card_info ==='card_infoBefore' &&
            <div className={styles.card_infoBefore}>
              <img src={`${picAddress}`} alt="" style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}/>
            </div>
          }
          {
            card_actions ==='card_actionsBefore' &&
            <span className={styles.card_actionsBefore}>
               <img src={duiGou} alt=""/>
          </span>
          }
        </div>
      </div>

    )
  }
}
export default DesginSingleImgCard;

