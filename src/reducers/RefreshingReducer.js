import { REFRESH_STARTED, REFRESH_FINISHED } from '../actions/types';

const INITIAL_STATE = {
  isRefreshing: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH_STARTED:
      return { isRefreshing: true };
    case REFRESH_FINISHED: 
      return { isRefreshing: false };
    default: 
      return state;
  }
};