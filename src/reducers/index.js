import { combineReducers } from 'redux';
import WeatherReducer from './WeatherReducer';
import RefreshingReducer from './RefreshingReducer';
import GeolocationReducer from './GeolocationReducer';

export default combineReducers({
    weather: WeatherReducer,
    geolocation: GeolocationReducer,
    refreshing: RefreshingReducer,
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
