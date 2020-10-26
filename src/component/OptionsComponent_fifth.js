import React, { PureComponent } from "react";
import {Card,Radio} from 'antd';
import ProgressComponent from './ProgressComponent';
import style from "../page/intelligentDesign/design.less";

const RadioGroup = Radio.Group;
class OptionsComponentFifth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, kaijin_value,lingzi_value,koudai_value, parameters} = item;
        let kaijinvDOM=[],lingzivDOM=[],koudaivDOM=[];
        parameters.forEach(cur=>{
          let {option_title,option_type,values} = cur;
          if(typeof cur.options!=='undefined' && option_title==='开襟'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              kaijinvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='领子'){
            let optionsArr =cur.options;
            optionsArr.forEach(c=>{
              lingzivDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
            });
          } else {
            if(option_title ==='口袋'){
              let optionsArr =cur.options;
              optionsArr.forEach(c=>{
                koudaivDOM.push(
                  <div key={Math.random()}>
                    <div>
                      <Radio key={Math.random()} value={c.children_title}>{c.children_title}</Radio>
                    </div>
                    <div>
                      <ProgressComponent
                        optionTitle={c.children_title}
                        values={c.values}
                      />
                    </div>
                  </div>
                );
              });
            }
          }
        });
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>开襟</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <RadioGroup value={kaijin_value}>
              {kaijinvDOM}
            </RadioGroup>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>领子</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <RadioGroup value={lingzi_value}>
              {lingzivDOM}
            </RadioGroup>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>口袋</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <RadioGroup value={koudai_value}>
              {koudaivDOM}
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
