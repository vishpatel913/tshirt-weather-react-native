import { GET_WEATHER_SUCCESS, REFRESH_STARTED, REFRESH_FINISHED } from './types';
import { DARKSKY_API_KEY } from '../../apikey';
import axios from 'axios';

export const getWeather = ({ latitude, longitude }) => {
  return(dispatch) => {
    dispatch({type: REFRESH_STARTED});
    axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}?units=uk2`).then(response => {
      dispatch({type: GET_WEATHER_SUCCESS, payload: response});
      dispatch({type: REFRESH_FINISHED});
    });
    // TODO: handle api errors here, use catch to dispatch to reducer
  };
};
