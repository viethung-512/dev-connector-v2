import React from 'react';
import LazyLoad from 'react-lazyload';

import { defaultImages } from '../../utils/config';

function Image({ src, ...rest }) {
  return (
    <LazyLoad
      placeholder={<img {...rest} alt='main' src={defaultImages.ARTICLE} />}
    >
      <img {...rest} alt='main' src={src || defaultImages.ARTICLE} />
    </LazyLoad>
  );
}

export default Image;
