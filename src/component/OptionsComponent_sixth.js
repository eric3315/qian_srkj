import React, { PureComponent } from "react";
import {Card,Radio} from 'antd';
import style from "../page/intelligentDesign/design.less";

const RadioGroup = Radio.Group;
class OptionsComponentFifth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, zhezhou_value,niukou_value,lalian_value, parameters} = item;
        let zhezhouvDOM=[],niukouvDOM=[],lalianvDOM=[];
        parameters.forEach(cur=>{
          let {option_title} = cur;
          if(typeof cur.options!=='undefined' && option_title==='褶皱'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              zhezhouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='纽扣'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              niukouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='拉链'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              lalianvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
          }
        });
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>褶皱</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <RadioGroup value={zhezhou_value}>
              {zhezhouvDOM}
            </RadioGroup>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>纽扣</p>
            </div>
          }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
            <RadioGroup value={niukou_value}>
              {niukouvDOM}
            </RadioGroup>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>拉链</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <RadioGroup value={lalian_value}>
              {lalianvDOM}
            </RadioGroup>
          </Card>
        </div>);
      });
    }
    return vDOM;
  }
  render() {
    return (
      <div>
        {this.renderDOM()}
      </div>
    );
  }
}
export default OptionsComponentFifth;
