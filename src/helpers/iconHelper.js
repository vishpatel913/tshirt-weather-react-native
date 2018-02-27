export const getIconSource = ( icon ) => {
  switch ( icon ) {
    case 'clear-day':
      return require( '../../assets/icons/sunny.svg' );
    case 'clear-night':
      return require( '../../assets/icons/moon.svg' );
    case 'partly-cloudy-day':
      return require( '../../assets/icons/cloudy-day.svg' );
    case 'partly-cloudy-night':
      return require( '../../assets/icons/cloudy-night.svg' );
    case 'cloudy':
      return require( '../../assets/icons/cloudy.svg' );
    case 'rain':
      return require( '../../assets/icons/rain.svg' );
    case 'snow':
      return require( '../../assets/icons/snow.svg' );
    case 'sleet':
      return require( '../../assets/icons/sleet.svg' );
    case 'wind':
      return require( '../../assets/icons/windy.svg' );
    case 'fog':
      return require( '../../assets/icons/fog.svg' );
    case 'showers':
      return require( '../../assets/icons/showers.svg' );
    case 'hail':
      return require( '../../assets/icons/hail.svg' );
    case 'thunderstorm':
      return require( '../../assets/icons/thunderstorm.svg' );
    case 'sunrise':
      return require( '../../assets/icons/sunrise.svg' );
    case 'sunset':
      return require( '../../assets/icons/sunset.svg' );
    case 'temperature':
      return require( '../../assets/icons/thermometer.svg' );
    case 'wind-speed':
      return require( '../../assets/icons/wind.svg' );
    case 'humidity':
      return require( '../../assets/icons/humidity.svg' );
    case 'raindrops':
      return require( '../../assets/icons/raindrops.svg' );
    case 'cloud-cover':
      return require( '../../assets/icons/cloud.svg' );
    case 'umbrella':
      return require( '../../assets/icons/umbrella.svg' );
    case 'snowflake':
      return require( '../../assets/icons/snowflake.svg' );
    case 'warning':
      return require( '../../assets/icons/warning.svg' );
    case 'refresh':
      return require( '../../assets/icons/refresh.svg' );
    default:
      return require( '../../assets/icons/na.svg' );
  }
};
