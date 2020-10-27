import React, { PureComponent } from "react";
import styles from './singleIndex.less';
import duiGou from "../assets/duigou2.png";

class DesginSingleImgCard extends PureComponent {

  handleMouseDown =async (e)=>{
    e.preventDefault();
    if (e.button === 0) {
      await new Promise(function (resolve) {
        setTimeout(() => {
          resolve('等待0.2秒')
        }, 200);
      });
      let {series_name,picCheck,card_info,card_actions,id} = this.props;
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
      // this.props.handleSeriesData(id,series_name,newPicCheck,newCardInfo,newCardActions);
    }
  };
  render() {
    const {picAddress,card_info,card_actions} = this.props;
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

