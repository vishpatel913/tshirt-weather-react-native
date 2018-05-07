import { GET_WEATHER_SUCCESS } from '../actions/types';
import { getHoursFromUnix } from '../helpers/timeHelper';

const INITIAL_STATE = {
  currently: {
    temperature: 0,
    summary: '',
    time: 0
  },
  today: {
    sunriseTime: [],
    sunsetTime: 0,
    sunshine: {
      average: 0,
      max: 0
    }
  },
  hourly: {
    data: []
  },
  daily: {
    summary: '',
    data: [
      {
        summary: '',
      },
      {
        summary: '',
        temperatureHigh: '',
        apparentTemperatureHigh: '',
        cloudCover: '',
        windSpeed: '',
        precipProbability: ''
      }
    ]
  }
};

function calculateAverage(data, attr, number) {
  let total = 0;
  let average = 0;
  for (let i = 0; i < number; i++) {
    let dataObj = data[i];
    let value = dataObj[attr];
    total += value;
  }
  return total / number;
}

function calculateMax(data, attr, number) {
  let total = 0;
  let max = -Infinity;
  for (let i = 0; i < number; i++) {
    let dataObj = data[i];
    let value = dataObj[attr];
    if (value >= max) {
      max = value;
    }
  }
  return max;
}

function calculateMin(data, attr, number) {
  let total = 0;
  let min = Infinity;
  for (let i = 0; i < number; i++) {
    let dataObj = data[i];
    let value = dataObj[attr];
    if (value <= min) {
      min = value;
    }
  }
  return min;
}

function calculateSunshine(data, time) {
  let total = 0;
  let max = -Infinity;
  let i = 0;
  while (data[i].time < time) {
    let value = 1 - data[i].cloudCover;
    total += value;
    if (value >= max) {
      max = value;
    };
    i++;
  }
  return {
    average: total / i,
    max: max
  };
}

export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      const {currently, daily, hourly} = action.payload.data;
      const {
        temperature,
        apparentTemperature,
        summary,
        icon,
        time,
        windSpeed,
        windGust,
        cloudCover,
        humidity,
        precipProbability,
        precipIntensity,
        precipType
      } = currently;
      const loading = false;
      const currentTempRounded = Math.round(temperature);
      const apparentTempRounded = Math.round(apparentTemperature);
      const tempHighRounded = Math.round(daily.data[0].temperatureHigh);
      const tempLowRounded = Math.round(daily.data[0].temperatureLow);
      const sunriseTime = [
        getHoursFromUnix(daily.data[0].sunriseTime),
        getHoursFromUnix(daily.data[1].sunriseTime)
      ];
      const sunsetTime = getHoursFromUnix(daily.data[0].sunsetTime);
      return {
        currently: {
          temperature: currentTempRounded,
          apparentTemperature: apparentTempRounded,
          summary,
          icon,
          time,
          windSpeed,
          windGust,
          humidity: humidity,
          cloudCover: cloudCover,
          precipProbability: precipProbability,
          precipIntensity,
          precipType
        },
        today: {
          sunriseTime,
          sunsetTime,
          sunshine: calculateSunshine(hourly.data, daily.data[0].sunsetTime),
          tempAverage: calculateAverage(hourly.data, 'temperature', 5),
          tempHigh: tempHighRounded,
          tempLow: tempLowRounded,
          appTempAverage: calculateAverage(hourly.data, 'apparentTemperature', 5),
          precipProbAverage: calculateAverage(hourly.data, 'precipProbability', 5),
          precipIntenAverage: calculateMax(hourly.data, 'precipIntensity', 5),
          windSpeedAverage: calculateAverage(hourly.data, 'windSpeed', 5),
          cloudCoverAverage: calculateAverage(hourly.data, 'cloudCover', 5),
          cloudCoverMin: calculateMin(hourly.data, 'cloudCover', 5),
          cloudCoverMax: calculateMax(hourly.data, 'cloudCover', 5)
        },
        hourly: hourly,
        daily: daily,
        loading
      };
    default:
      return state;
  }
};
