import { GET_WEATHER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  currently: {
    temperature: 0,
    apparentTemperature: 0,
    summary: '',
    icon: '',
    time: 0
  },
  hourly: {
    data: []
  },
  daily: {
    summary: '',
    data: []
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      const { currently, daily, hourly } = action.payload.data;
      const { temperature,
              apparentTemperature,
              summary,
              icon,
              time,
              windSpeed,
              windGust,
              cloudCover,
              visibility,
              precipProbability
            } = currently;
      const loading = false;
      const currentTempRounded = Math.round(temperature);
      const apparentTempRounded = Math.round(apparentTemperature);
      return {
        currently: {
          temperature: currentTempRounded,
          apparentTemperature: apparentTempRounded,
          summary,
          icon,
          time,
          windSpeed,
          windGust,
          cloudCover: cloudCover*100,
          visibility,
          precipProbability: precipProbability*100
        },
        hourly: hourly,
        daily: daily,
        loading
      };
    default:
      return state;
  }
};
