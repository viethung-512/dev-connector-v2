import React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import LazyLoad from 'react-lazyload';
import { defaultImages } from '../../utils/config';

const Avatar = ({ src, ...rest }) => {
  return (
    <LazyLoad placeholder={<AntdAvatar alt='user' src={defaultImages.USER} />}>
      <AntdAvatar alt='user' src={src || defaultImages.USER} {...rest} />
    </LazyLoad>
  );
};

export default Avatar;
