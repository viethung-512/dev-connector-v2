import React, { Fragment } from 'react';
import { Typography, Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatRowData } from '../../../app/utils/helper';

const { Title, Text } = Typography;

const EducationActions = ({ deleteEducation, deleteLoading }) => (
  <Button
    type='primary'
    danger
    shape='circle'
    icon={<DeleteOutlined />}
    onClick={deleteEducation}
    loading={deleteLoading}
  />
);

function Education({
  education,
  addEducation,
  deleteEducation,
  loading,
  edId,
}) {
  const columns = [
    {
      title: 'School',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      key: 'actions',
      render: item => (
        <EducationActions
          deleteEducation={() => deleteEducation(item._id)}
          deleteLoading={item._id === edId ? loading : false}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Title level={2} className='dashboard-container__title'>
        Education Credentials
      </Title>
      {education.length > 0 ? (
        <Table
          bordered
          dataSource={formatRowData(education)}
          columns={columns}
          pagination={false}
        />
      ) : (
        <Text>
          You don't have any education, create{' '}
          <Button type='link' style={{ padding: 0 }} onClick={addEducation}>
            here
          </Button>
        </Text>
      )}
    </Fragment>
  );
}

export default Education;
