import React, { PureComponent } from "react";
import styles from './styleListCard.less';

class StyleListCard extends PureComponent {

  handleMouseDown =async (e)=>{
    e.preventDefault();
    console.info('双击进入');
    const {item,type} = this.props;
    this.props.handleCoalesceData(item,type);
  };
  render() {
    const {picAddress} = this.props;
    return (
      <div>
        <div className={styles.product_card}  onDoubleClick={async (e)=>{await this.handleMouseDown(e)}}>
          <div className={styles.card_info}>
            <div style={{
              width:'100%',
              height: "150px",
              textAlign: 'center',
              borderBottom: '1px solid #d6d2d2'
            }}>
              <img src={`${picAddress}`} alt="" style={{
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}/>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
export default StyleListCard;

