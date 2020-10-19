import React, { PureComponent } from "react";
import { Table, Icon } from 'antd';
import styles from './research.less';

class ResearchTable extends PureComponent {

  render() {
    const { data, handleModelEdit,handleModelDel,handleFollow} = this.props;
    const columns = [
      {
        title: '主题研发名称',
        dataIndex: 'model_name',
        render: (text, record) => {
          return <a onClick={(e)=>{handleFollow(e,record.model_name)}}>{record.model_name}</a>;
        }
      },
      {
        title: '添加时间',
        dataIndex: 'create_time',
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
      },
      {
        title: '操作',
        render: (text, record) => (
          <div>
            <a href="#" title="编辑" onClick={() => handleModelEdit(record)}>
              <Icon type="edit" style={{fontSize: 20, color: '#08c'}}/>
            </a>
            <a href="#" title="删除" onClick={() => handleModelDel(record)} style={{marginLeft: '20px'}}>
              <Icon type="delete" style={{ fontSize: 20, color: '#08c' }} />
            </a>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.standardTable}>
        <Table
          scroll={{x: '100%'}}
          bordered
          rowKey={record => record.key}
          dataSource={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default ResearchTable;
