import {
  GET_LOCATION_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  location: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      const address_components = action.payload.data.results[0].address_components;
      const city = address_components[3].long_name;

      return { city };
    default:
      return state;
  }
};
