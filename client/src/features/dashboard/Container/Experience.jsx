import React, { Fragment } from 'react';
import { Table, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatRowData } from '../../../app/utils/helper';

const { Title, Text } = Typography;

const ExperienceActions = ({ deleteExperience, deleteLoading }) => (
  <Button
    type='primary'
    danger
    shape='circle'
    icon={<DeleteOutlined />}
    onClick={deleteExperience}
    loading={deleteLoading}
  />
);

function Experience({
  experience,
  addExperience,
  deleteExperience,
  loading,
  exId,
}) {
  const columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      key: 'actions',
      render: item => (
        <ExperienceActions
          deleteExperience={() => deleteExperience(item._id)}
          deleteLoading={item._id === exId ? loading : false}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Title level={2} className='dashboard-container__title'>
        Experience Credentials
      </Title>
      {experience.length > 0 ? (
        <Table
          bordered
          dataSource={formatRowData(experience)}
          columns={columns}
          pagination={false}
        />
      ) : (
        <Text>
          You don't have any experience, create{' '}
          <Button type='link' style={{ padding: 0 }} onClick={addExperience}>
            {' '}
            here
          </Button>
        </Text>
      )}
    </Fragment>
  );
}

export default Experience;
