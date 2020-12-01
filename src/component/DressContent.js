import React, {PureComponent} from 'react';
import StyleListCard from './styleListCard';
import {Select, Form,Row,Col,Pagination} from 'antd';
import sty from './dressContent.less';

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
};
const { Option } = Select;
class DressContent extends PureComponent {

  renderPatternDOM(){
    let vDOM=[];
    const {patternArr}=this.props;
    patternArr.forEach(item=>{
      vDOM.push(
        <Col key={Math.random()} style={{marginLeft: '10px',marginTop: '10px'}}>
          <StyleListCard
            picAddress={item}
            item={item}
            type="pattern"
            handleCoalesceData={this.props.handleCoalesceData}
          />
        </Col>
      )
    });
    return <Row type="flex">{vDOM}</Row>;
  }

  render() {
    const {patternTypeArr,handlePatternTypeChange}=this.props;
    return (<div className={sty.dressBottom}>
        <div className={sty.bottomMain}>
          <Form {...layout}  layout="horizontal" style={{
            marginLeft:"13px"
          }}>
            <Form.Item label="图案分类">
              <Select placeholder="请选择" allowClear  onChange={handlePatternTypeChange}>
                {patternTypeArr.map(item=>{
                  return (
                    <Option key={Math.random()} value={item}>
                      {item}
                    </Option>
                  )
                })
                }
              </Select>
            </Form.Item>
          </Form>
          <div style={{height:'300px',overflowY:'auto'}}>
            {
              this.props.patternArr.length>0 &&
              this.renderPatternDOM()
            }
            {
              this.props.patternArr.length>0 &&
              <Pagination size="small" defaultCurrent={1} total={this.props.patternArr.length} style={{padding:'10px',display:'flex',justifyContent:'center'}} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DressContent;
