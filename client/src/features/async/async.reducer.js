import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from './async.constants';

const asyncReducerInitialState = {
  loading: false,
  type: null,
  elmId: null,
  errors: null,
};
const asyncReducer = (state = asyncReducerInitialState, { type, payload }) => {
  switch (type) {
    case ASYNC_ACTION_START:
      const { actionType, elmId } = payload;

      return {
        ...state,
        loading: true,
        type: actionType,
        elmId: elmId,
        errors: null,
      };
    case ASYNC_ACTION_FINISH:
      return asyncReducerInitialState;
    case ASYNC_ACTION_ERROR:
      return {
        ...asyncReducerInitialState,
        errors: payload.err,
      };
    default:
      return state;
  }
};

export default asyncReducer;
