import React, { PureComponent } from 'react';
import { Card } from 'antd';

class IntelligentDesign extends PureComponent {

  render() {
    return (
      <Card  bordered={false} bodyStyle={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 5,
      }}>
        IntelligentDesign
      </Card>
    );
  }
}
export default IntelligentDesign;
