import React, { PureComponent } from "react";
import styles from './tagCard.less';
import duiGou from "../assets/duigou_1.png";

class TagCard extends PureComponent {

  handleMouseDown =async (e)=>{
    e.preventDefault();
    if (e.button === 0) {
      await new Promise(function (resolve) {
        setTimeout(() => {
          resolve('等待0.2秒')
        }, 200);
      });
      const {modelName,themeName,seriesName,data:{type,picCheck,card_info,card_actions}} = this.props;
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
      if(typeof this.props.data.color_value!=="undefined"){
        this.props.handleSeriesOptionsData(type,this.props.data.color_value,newPicCheck,newCardInfo,newCardActions,seriesName,themeName,modelName);
      } else if(typeof this.props.data.img_path!=="undefined"){
        this.props.handleSeriesOptionsData(type,this.props.data.img_path,newPicCheck,newCardInfo,newCardActions,seriesName,themeName,modelName);
      }
    }
  };
  render() {
    const {data:{card_info,card_actions}} = this.props;
    return (
      <div className={styles.product_card} style={{
        paddingLeft: "5px",
        paddingTop: "5px"
      }} onMouseDown={async (e)=>{await this.handleMouseDown(e)}}>
        {
          card_info ==='card_info' &&
          <div className={styles.card_info}>
            {
              typeof this.props.data.color_value!=="undefined" &&
              <div style={{
                background: `${this.props.data.color_value}`,
                width: "50px",
                height: "25px",
                borderRadius: "9px",
                display: "inline-block",
                textAlign: "center",
                color: "#fff",
                fontSize: "10px",
                lineHeight: "24px"
              }}/>
            }
            {
              typeof this.props.data.img_path!=="undefined" &&
              <img src={`${this.props.data.img_path}`} alt="" style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}/>
            }
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
            {
              typeof this.props.data.color_value!=="undefined" &&
              <div style={{
                background: `${this.props.data.color_value}`,
                width: "50px",
                height: "25px",
                borderRadius: "9px",
                display: "inline-block",
                textAlign: "center",
                color: "#fff",
                fontSize: "10px",
                lineHeight: "24px"
              }}/>
            }
            {
              typeof this.props.data.img_path!=="undefined" &&
              <img src={`${this.props.data.img_path}`} alt="" style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}/>
            }
          </div>
        }
        {
          card_actions ==='card_actionsBefore' &&
          <span className={styles.card_actionsBefore}>
               <img src={duiGou} alt=""/>
          </span>
        }
      </div>
    )
  }
}
export default TagCard;

