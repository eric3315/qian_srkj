import React, {PureComponent} from 'react';
import style from './category.less'

class CATEGORY extends PureComponent {
  state = {
    style: {}
  };

  render() {
    return (
      <div className={style.categoryWrapper} style={{marginTop: '200px'}}>
        <div className={style.cateContent}>
          <ul className={`${style.cateContentBox} ${style.clearfix}`}>
            <li>
              <h1>业务范畴</h1>
              <p>基于大数据、知识图谱、计算机视觉等技术，深度链接设计、制造和销售流程。</p>
            </li>
            <li>
              <h1>AI + 制造</h1>
              <p>研发制造端，提供趋势分析、智能设计、智能制版，以及面料和工艺的智能筛选，显著减少研发周期和成本。</p>
            </li>
            <li>
              <h1>AI + 零售</h1>
              <p>市场销售端，智能着装展示和风格分析推荐系统，能够显著提升用户体验，通过分布式采集回传系统，可以将消费市场的用户反馈信息化，汇总至智慧商业系统，数据过滤分析后，反哺于设计环节以优化研发生产策略，从而打造服装智造生态闭环。</p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default CATEGORY;
