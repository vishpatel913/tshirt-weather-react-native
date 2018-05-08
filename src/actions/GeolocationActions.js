import { GET_LOCATION_SUCCESS } from './types';
import { GOOGLE_MAPS_KEY } from '../../apikey';
import axios from 'axios';

export const getLocation = ({ latitude, longitude }) => {
  return (dispatch) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_KEY}`)
      .then(response => {
        dispatch({type: GET_LOCATION_SUCCESS, payload: response });
      });
      // TODO: handle api errors here, use catch and alert back to main component
  };
};
