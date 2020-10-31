import React, { PureComponent } from "react";
import {Card,Radio} from 'antd';
import style from "../page/intelligentDesign/design.less";

const RadioGroup = Radio.Group;
class OptionsComponentSixth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, parameters} = item;
        parameters.forEach(cur=>{
          let zhezhouvDOM=[],niukouvDOM=[],lalianvDOM=[];
          let {option_title,values} = cur;
          if(typeof cur.options!=='undefined' && option_title==='褶皱'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              zhezhouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
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
                <RadioGroup value={values} onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
                  {zhezhouvDOM}
                </RadioGroup>
              </Card>
            </div>);
          } else if(typeof cur.options!=='undefined' && option_title==='纽扣'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              niukouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
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
                <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
                  {niukouvDOM}
                </RadioGroup>
              </Card>
            </div>);
          } else if(typeof cur.options!=='undefined' && option_title==='拉链'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              lalianvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
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
                <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
                  {lalianvDOM}
                </RadioGroup>
              </Card>
            </div>);
          }
        });
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
export default OptionsComponentSixth;
