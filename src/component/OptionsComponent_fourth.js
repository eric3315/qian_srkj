import React, { PureComponent } from "react";
import {Card} from 'antd';
import ProgressComponent from './ProgressComponent';
import SliderComponent from './SliderComponent';
import style from "../page/intelligentDesign/design.less";

class OptionsComponentFourth extends PureComponent {
  renderDOM(){
    let {data} = this.props;
    let vDOM=[];
    if(data.length>0){
      data.forEach(item=>{
        let {model_name, step_name, parameters} = item;
        console.info(JSON.stringify(item));
        let yisheng_changduVDOM=[],yisheng_songliangVDOM=[],xiaosheng_changduVDOM=[],xiaosheng_songliangVDOM=[],jianxing_kuanduVDOM=[],yaobu_yaogaoVDOM=[],yaobu_songliangVDOM=[];
        parameters.forEach(cur=>{
            let {option_title,option_type,values} = cur;
            if(option_title ==='衣身_长度'){
                yisheng_changduVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="长度"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='衣身_松量'){
                yisheng_songliangVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="松量"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='袖身_长度'){
                xiaosheng_changduVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="长度"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='袖身_松量'){
                xiaosheng_songliangVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="松量"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='肩型_宽度'){
                jianxing_kuanduVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="宽度"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='腰部_腰高'){
                yaobu_yaogaoVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="腰高"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            } else if(option_title ==='腰部_松量'){
                yaobu_songliangVDOM.push(
                    <div key={Math.random()}>
                        <SliderComponent
                            marks={{10: '',20: '',30: ''}}
                            cardinal={10}
                            min={10}
                            max={30}
                            sliderValue={values}
                            unit="%"
                            optionTitle="松量"
                            modelName={model_name}
                            stepName={step_name}
                            handleOptionsFourth={this.props.handleOptionsFourth}
                        />
                    </div>
                );
            }





            // if(option_title ==='衣身_长度' && option_type ==='进度条'){
            //   lenVDOM.push(
            //     <div key={Math.random()}>
            //       <ProgressComponent
            //         optionTitle={option_title}
            //         values={values}
            //         modelName={model_name}
            //         stepName={step_name}
            //         handleOptionsFourth={this.props.handleOptionsFourth}
            //       />
            //     </div>
            //   );
            // } else if(option_title ==='肩部' && option_type ==='进度条'){
            //   jiebuvDOM.push(
            //     <div key={Math.random()}>
            //       <ProgressComponent
            //         optionTitle={option_title}
            //         values={values}
            //         modelName={model_name}
            //         stepName={step_name}
            //         handleOptionsFourth={this.props.handleOptionsFourth}
            //       />
            //     </div>
            //   );
            // } else if(option_title ==='腰头' && option_type ==='进度条'){
            //   yaotouvDOM.push(
            //     <div key={Math.random()}>
            //       <ProgressComponent
            //         optionTitle={option_title}
            //         values={values}
            //         modelName={model_name}
            //         stepName={step_name}
            //         handleOptionsFourth={this.props.handleOptionsFourth}
            //       />
            //     </div>
            //   );
            // } else if(option_title ==='底摆' && option_type ==='进度条'){
            //   dibaivDOM.push(
            //     <div key={Math.random()}>
            //       <ProgressComponent
            //         optionTitle={option_title}
            //         values={values}
            //         modelName={model_name}
            //         stepName={step_name}
            //         handleOptionsFourth={this.props.handleOptionsFourth}
            //       />
            //     </div>
            //   );
            //  }
        });
          // =[],=[],=[]
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>衣身</p>
            </div>
          }
                size="small"
                headStyle={{color: 'white'}}
                bordered={false}
                style={{background: "none"}}>
              <div>{yisheng_changduVDOM}</div>
              <div>{yisheng_songliangVDOM}</div>
          </Card>
        </div>);
         vDOM.push(<div key={Math.random()}>
              <Card className={style.rightCard} title={
                  <div>
                      <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>袖身</p>
                  </div>
              }
                    size="small"
                    headStyle={{color: 'white'}}
                    bordered={false}
                    style={{background: "none"}}>
                  <div>{xiaosheng_changduVDOM}</div>
                  <div>{xiaosheng_songliangVDOM}</div>
              </Card>
          </div>);
          vDOM.push(<div key={Math.random()}>
              <Card className={style.rightCard} title={
                  <div>
                      <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>肩型</p>
                  </div>
              }
                    size="small"
                    headStyle={{color: 'white'}}
                    bordered={false}
                    style={{background: "none"}}>
                  <div>{jianxing_kuanduVDOM}</div>
              </Card>
          </div>);
          vDOM.push(<div key={Math.random()}>
              <Card className={style.rightCard} title={
                  <div>
                      <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>腰部</p>
                  </div>
              }
                    size="small"
                    headStyle={{color: 'white'}}
                    bordered={false}
                    style={{background: "none"}}>
                  <div>{yaobu_yaogaoVDOM}</div>
                  <div>{yaobu_songliangVDOM}</div>
              </Card>
          </div>);
        // vDOM.push(<div key={Math.random()}>
        //     <Card className={style.rightCard} title={
        //       <div>
        //         <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>肩型</p>
        //         <span style={{fontSize: '10px', color: '#dbdbdb'}}>局部松紧尺度与廓形相关，将限制调整的尺寸</span>
        //       </div>
        //     }
        //           size="small"
        //           headStyle={{color: 'white'}}
        //           bordered={false}
        //           style={{background: "none"}}>
        //       <div>{jiebuvDOM}</div>
        //       <div>{yaotouvDOM}</div>
        //       <div>{dibaivDOM}</div>
        //     </Card>
        //   </div>);
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
export default OptionsComponentFourth;
