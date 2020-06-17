import React from 'react';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingIcon } from '../Icons';

const LoadingGrid = ({ loadingTypes, loadingElm, children }) => {
  const { loading, type, elmId } = useSelector(state => state.async);
  let spinning;

  if (loadingElm) {
    spinning =
      loadingTypes.find(loadingType => loadingType === type) &&
      elmId === loadingElm
        ? loading
        : false;
  } else {
    spinning = loadingTypes.find(loadingType => loadingType === type)
      ? loading
      : false;
  }

  return (
    <Spin indicator={LoadingIcon} spinning={spinning}>
      {children}
    </Spin>
  );
};

export default LoadingGrid;
