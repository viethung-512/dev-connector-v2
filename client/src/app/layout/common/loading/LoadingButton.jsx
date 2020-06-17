import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'antd';

const LoadingButton = ({
  loadingTypes = [],
  loadingElm,
  children,
  ...rest
}) => {
  const { loading, type, elmId } = useSelector(state => state.async);
  let spinning;

  if (loadingElm) {
    spinning =
      loadingTypes.find(loadingType => loadingType === type) &&
      loadingElm === elmId
        ? loading
        : false;
  } else {
    spinning = loadingTypes.find(loadingType => loadingType === type)
      ? loading
      : false;
  }

  return (
    <Button {...rest} loading={spinning}>
      {children}
    </Button>
  );
};

export default LoadingButton;
