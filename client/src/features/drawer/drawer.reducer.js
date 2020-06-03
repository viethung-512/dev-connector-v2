import { OPEN_DRAWER, CLOSE_DRAWER } from './drawer.constants';

const drawerReducerInitialState = null;

const drawerReducer = (
  state = drawerReducerInitialState,
  { type, payload }
) => {
  switch (type) {
    case OPEN_DRAWER:
      return {
        drawerType: payload.drawerType,
        drawerProps: payload.drawerProps,
      };
    case CLOSE_DRAWER:
      return drawerReducerInitialState;
    default:
      return state;
  }
};

export default drawerReducer;
