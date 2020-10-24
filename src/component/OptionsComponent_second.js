import React, { PureComponent } from "react";
import {Checkbox,Card,Row,Col} from 'antd';
import TagCard from './tagCard';
import style from "../page/intelligentDesign/design.less";

class OptionsComponentSecond extends PureComponent {
  renderDOM(){
    let {parameters,handleOptionsSecond,handleSeriesOptionsData} = this.props;
    let vDOM=[];
    if(parameters.length>0){
      parameters.forEach(item=>{
        let {
          model_name,theme_name,series_name,key,main_color, embellish_color, common_color,
          main_fabric,embellish_fabric,wear_outside_values,
          wear_outside,inner_cloth_values,inner_cloth,silhouette_values,
          silhouette,craft_values,craft,mountings_values,mountings} = item;
        let main_color_vDOM=[],embellish_color_vDOM=[],common_color_vDOM=[],main_fabric_vDOM=[],
          embellish_fabric_vDOM=[],wear_outside_vDOM=[],inner_cloth_vDOM=[],silhouette_vDOM=[],
          craft_vDOM=[],mountings_vDOM=[];
        main_color.forEach(item=>{
          main_color_vDOM.push(
            <TagCard
            data={item}
            key={Math.random()}
            modelName={model_name}
            themeName={theme_name}
            seriesName={series_name}
            handleSeriesOptionsData={handleSeriesOptionsData}
          />)
        });
        embellish_color.forEach(item=>{
          embellish_color_vDOM.push(
            <TagCard
            data={item}
            key={Math.random()}
            modelName={model_name}
            themeName={theme_name}
            seriesName={series_name}
            handleSeriesOptionsData={handleSeriesOptionsData}
          />)
        });
        common_color.forEach(item=>{
          common_color_vDOM.push(
            <TagCard
            data={item}
            key={Math.random()}
            modelName={model_name}
            themeName={theme_name}
            seriesName={series_name}
            handleSeriesOptionsData={handleSeriesOptionsData}
          />)
        });
        main_fabric.forEach(item=>{
          main_fabric_vDOM.push(<TagCard
            data={item}
            key={Math.random()}
            modelName={model_name}
            themeName={theme_name}
            seriesName={series_name}
            handleSeriesOptionsData={handleSeriesOptionsData}
          />)
        });
        embellish_fabric.forEach(item=>{
          embellish_fabric_vDOM.push(<TagCard
            data={item}
            key={Math.random()}
            modelName={model_name}
            themeName={theme_name}
            seriesName={series_name}
            handleSeriesOptionsData={handleSeriesOptionsData}
          />)
        });
        wear_outside.forEach(item=>{
          wear_outside_vDOM.push(
            <Col key={Math.random()} span={8}>
            <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
          </Col>)
        });
        inner_cloth.forEach(item=>{
          inner_cloth_vDOM.push(
            <Col key={Math.random()} span={8}>
              <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
            </Col>)
        });
        silhouette.forEach(item=>{
          silhouette_vDOM.push(
            <Col key={Math.random()} span={8}>
              <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
            </Col>)
        });
        craft.forEach(item=>{
          craft_vDOM.push(
            <Col key={Math.random()} span={8}>
              <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
            </Col>)
        });
        mountings.forEach(item=>{
          mountings_vDOM.push(
            <Col key={Math.random()} span={8}>
              <Checkbox style={{color: '#e2e2e2'}} value={item}>{item}</Checkbox>
            </Col>)
        });
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>颜色组合</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>主流色</span>
            <div>{main_color_vDOM}</div>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>点缀色</span>
            <div>{embellish_color_vDOM}</div>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>常用色</span>
            <div>{common_color_vDOM}</div>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>面料组合</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>主推面料</span>
            <div>{main_fabric_vDOM}</div>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>点缀面料</span>
            <div>{embellish_fabric_vDOM}</div>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>系列品类</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>外穿</span>
            <Checkbox.Group style={{width:'100%'}} value={wear_outside_values}  onChange={(values)=>{handleOptionsSecond(values,"外穿",series_name,theme_name, model_name)}}><Row>{wear_outside_vDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>内搭</span>
            <Checkbox.Group style={{width:'100%'}} value={inner_cloth_values}   onChange={(values)=>{handleOptionsSecond(values,"内搭",series_name,theme_name, model_name)}}><Row>{inner_cloth_vDOM}</Row></Checkbox.Group>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard} title={
            <div>
              <p style={{color: 'white', fontSize: '22px', fontWeight: 'bold', marginBottom: '4px'}}>流行元素</p>
            </div>
          }
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>廓形</span>
            <Checkbox.Group style={{width:'100%'}} value={silhouette_values} onChange={(values)=>{handleOptionsSecond(values,"廓形",series_name,theme_name, model_name)}}><Row>{silhouette_vDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>工艺</span>
            <Checkbox.Group style={{width:'100%'}} value={craft_values}  onChange={(values)=>{handleOptionsSecond(values,"工艺",series_name,theme_name, model_name)}}><Row>{craft_vDOM}</Row></Checkbox.Group>
            <span style={{fontSize: '10px', color: '#dbdbdb'}}>配件</span>
            <Checkbox.Group style={{width:'100%'}} value={mountings_values}  onChange={(values)=>{handleOptionsSecond(values,"配件",series_name,theme_name, model_name)}}><Row>{mountings_vDOM}</Row></Checkbox.Group>
          </Card>
        </div>);
        vDOM.push(<div key={Math.random()}>
          <Card className={style.rightCard}
            size="small"
            headStyle={{color: 'white'}}
            bordered={false}
            style={{background: "none"}}>
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
export default OptionsComponentSecond;
