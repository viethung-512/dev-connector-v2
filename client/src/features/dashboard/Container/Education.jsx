import React, { Fragment } from 'react';
import { Typography, Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { formatRowData } from '../../../app/utils/helper';
import LoadingButton from '../../../app/layout/common/loading/LoadingButton';

const { Title, Text } = Typography;

const EducationActions = ({ deleteEducation, edLoadingTypes, loadingElm }) => (
  <LoadingButton
    type='primary'
    danger
    shape='circle'
    icon={<DeleteOutlined />}
    onClick={deleteEducation}
    loadingTypes={edLoadingTypes}
    loadingElm={loadingElm}
  />
);

function Education({
  education,
  addEducation,
  deleteEducation,
  edLoadingTypes,
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
          edLoadingTypes={edLoadingTypes}
          // loadingElm={item._id}
          loadingElm={item._id}
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
