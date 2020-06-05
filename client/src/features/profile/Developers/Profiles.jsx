import React from 'react';
import ProfileItem from './ProfileItem';
import { List } from 'antd';

function Profiles({ profiles }) {
  return (
    <List
      locale={{ emptyText: 'No developer profile available' }}
      grid={{ gutter: 16, column: 1 }}
      dataSource={profiles}
      renderItem={profile => (
        <List.Item>
          <ProfileItem profile={profile} />
        </List.Item>
      )}
    />
  );
}

export default Profiles;
