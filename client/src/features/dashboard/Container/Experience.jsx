import React, { Fragment } from 'react';
import { Table, Typography, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatRowData } from '../../../app/utils/helper';
import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

const { Title, Text } = Typography;

const ExperienceActions = ({
  deleteExperience,
  exLoadingTypes,
  loadingElm,
}) => (
  <LoadingButton
    type='primary'
    danger
    shape='circle'
    icon={<DeleteOutlined />}
    onClick={deleteExperience}
    loadingTypes={exLoadingTypes}
    loadingElm={loadingElm}
  />
);

function Experience({
  experience,
  addExperience,
  deleteExperience,
  exLoadingTypes,
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
          exLoadingTypes={exLoadingTypes}
          loadingElm={item._id}
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
