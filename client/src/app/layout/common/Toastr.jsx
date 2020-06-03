import React from 'react';
import ReduxToastr from 'react-redux-toastr';

function Toastr(props) {
  return (
    <ReduxToastr
      timeOut={2000}
      newestOnTop={false}
      preventDuplicates
      position='bottom-right'
      getState={state => state.toastr} // This is the default
      transitionIn='fadeIn'
      transitionOut='fadeOut'
      closeOnToastrClick
    />
  );
}

export default Toastr;
