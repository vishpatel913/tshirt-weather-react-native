import { GET_WEATHER_SUCCESS } from '../actions/types';
import { getHoursFromUnix } from '../helpers/timeHelper';

const INITIAL_STATE = {
  currently: {
    temperature: 0,
    apparentTemperature: 0,
    summary: '',
    time: 0
  },
  today: {
    sunriseTime: [],
    sunsetTime: 0,
    sunshine: {
      average: 0,
      max: 0,
    },
  },
  hourly: {
    data: []
  },
  daily: {
    summary: '',
    data: []
  }
};

function calculateAverage(data, attr, number) {
  var total = 0;
  var average = 0;
  for (var i = 0; i < number; i++) {
    var dataObj = data[i];
    var value = dataObj[attr];
    total += value;
  }
  return total / number;
}

function calculateMax(data, attr, number) {
  var total = 0;
  var max = -Infinity;
  for (var i = 0; i < number; i++) {
    var dataObj = data[i];
    var value = dataObj[attr];
    if (value >= max) {
      max = value;
    }
  }
  return max;
}

function calculateMin(data, attr, number) {
  var total = 0;
  var min = Infinity;
  for (var i = 0; i < number; i++) {
    var dataObj = data[i];
    var value = dataObj[attr];
    if (value <= min) {
      min = value;
    }
  }
  return min;
}

function calculateSunshine(data, time) {
  var total = 0;
  var max = -Infinity;
  var i = 0;
  while (data[i].time < time) {
    var value = 1 - data[i].cloudCover;
    total += value;
    if (value >= max) {
      max = value;
    };
    i++;
  }
  return { average: total/i, max: max };
}


export default(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WEATHER_SUCCESS:
      const { currently, daily, hourly } = action.payload.data;
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
      const sunriseTime = [getHoursFromUnix(daily.data[0].sunriseTime), getHoursFromUnix(daily.data[1].sunriseTime)];
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
          averageTemp: calculateAverage(hourly.data, 'temperature', 5),
          averageAppTemp: calculateAverage(hourly.data, 'apparentTemperature', 5),
          averageWindSpeed: calculateAverage(hourly.data, 'windSpeed', 5),
          averagePrecipProb: calculateAverage(hourly.data, 'precipProbability', 5),
          averageCloud: calculateAverage(hourly.data, 'cloudCover', 5),
          minCloud: calculateMin(hourly.data, 'cloudCover', 5),
          maxCloud: calculateMax(hourly.data, 'cloudCover', 5),
          maxPrecipInten: calculateMax(hourly.data, 'precipIntensity', 5),
        },
        hourly: hourly,
        daily: daily,
        loading
      };
    default:
      return state;
  }
};
