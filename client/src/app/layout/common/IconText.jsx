import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const IconText = ({ icon: Icon, text, ...rest }) => (
  <Text {...rest}>
    {Icon && <Icon style={{ marginRight: 8 }} />}

    {text}
  </Text>
);

export default IconText;
