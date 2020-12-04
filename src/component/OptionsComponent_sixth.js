import React, { PureComponent } from "react";
import {Checkbox,Card,Radio,Row,Col} from 'antd';
import style from "../page/intelligentDesign/design.less";

const RadioGroup = Radio.Group;
class OptionsComponentSixth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, parameters} = item;
        let kouhejianvDOM=[],zhuangshijianvDOM=[],fengevDOM=[],jixianvDOM=[],zhejianvDOM=[],zhuangshivDOM=[];
        parameters.forEach(cur=>{
          let {option_title} = cur;
          if(typeof cur.options!=='undefined' && option_title==='扣合件'){
            cur.options.forEach(item=>{
              kouhejianvDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='装饰件'){
            cur.options.forEach(item=>{
              zhuangshijianvDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='分割'){
            cur.options.forEach(item=>{
              fengevDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='缉线'){
            cur.options.forEach(item=>{
              jixianvDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='褶裥'){
            cur.options.forEach(item=>{
              zhejianvDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          } else if(typeof cur.options!=='undefined' && option_title==='装饰'){
            cur.options.forEach(item=>{
              zhuangshivDOM.push(
                  <Col key={Math.random()} span={8}>
                    <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
                  </Col>)
            });
          }



          // let zhezhouvDOM=[],niukouvDOM=[],lalianvDOM=[];
          // let {option_title,values,options} = cur;
          // if(typeof cur.options!=='undefined' && option_title==='褶皱'){
          //   let optionsArr =cur.options;
          //   optionsArr.forEach(c=>{
          //     zhezhouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
          //   });
          //   vDOM.push(<div key={Math.random()}>
          //     <Card className={style.rightCard} title={
          //       <div>
          //         <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>褶皱</p>
          //       </div>
          //     }
          //       size="small"
          //       headStyle={{color: 'white'}}
          //       bordered={false}
          //       style={{background: "none"}}>
          //       <RadioGroup value={values} onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
          //         {zhezhouvDOM}
          //       </RadioGroup>
          //     </Card>
          //   </div>);
          // }
          // else if(typeof cur.options!=='undefined' && option_title==='纽扣'){
          //   let optionsArr =cur.options;
          //   optionsArr.forEach(c=>{
          //     niukouvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
          //   });
          //   vDOM.push(<div key={Math.random()}>
          //     <Card className={style.rightCard} title={
          //       <div>
          //         <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>纽扣</p>
          //       </div>
          //     }
          //           size="small"
          //           headStyle={{color: 'white'}}
          //           bordered={false}
          //           style={{background: "none"}}>
          //       <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
          //         {niukouvDOM}
          //       </RadioGroup>
          //     </Card>
          //   </div>);
          // }
          // else if(typeof cur.options!=='undefined' && option_title==='拉链'){
          //   let optionsArr =cur.options;
          //   optionsArr.forEach(c=>{
          //     lalianvDOM.push(<Radio key={Math.random()} value={c}>{c}</Radio>,)
          //   });
          //   vDOM.push(<div key={Math.random()}>
          //     <Card className={style.rightCard} title={
          //       <div>
          //         <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>拉链</p>
          //       </div>
          //     }
          //           size="small"
          //           headStyle={{color: 'white'}}
          //           bordered={false}
          //           style={{background: "none"}}>
          //       <RadioGroup value={values}  onChange={(e)=>{this.props.handleOptionsSixth(e.target.value,option_title,step_name,model_name)}}>
          //         {lalianvDOM}
          //       </RadioGroup>
          //     </Card>
          //   </div>);
          // }
        });
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>配件细节</p>
            </div>
          }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>扣合件</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{kouhejianvDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>装饰件</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{zhuangshijianvDOM}</Row></Checkbox.Group>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>工艺细节</p>
            </div>
          }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>分割</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{fengevDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>缉线</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{jixianvDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>褶裥</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{zhejianvDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>装饰</span>
            <Checkbox.Group style={{width:'100%'}}><Row>{zhuangshivDOM}</Row></Checkbox.Group>
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
export default OptionsComponentSixth;
