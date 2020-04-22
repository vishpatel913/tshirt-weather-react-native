import OpenWeatherService from './openWeather';
import { mockCurrentResponse } from './mocks';

const ws = new OpenWeatherService({ lat: 7, lon: 12 });
const mocks = {
  get: jest.fn(),
};
ws.get = mocks.get;

describe('[GoogleMaps.getGeocoding]', () => {
  let response: {};
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(mockCurrentResponse);
    response = await ws.getCurrentData();
  });

  it('returns an object with the correct keys', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining([
        'main',
        'description',
        'icon',
        'temp',
        'feels_like',
        'temp_min',
        'temp_max',
        'pressure',
        'humidity',
        'visibility',
        'wind_speed',
        'wind_deg',
        'clouds',
        'timestamp',
        'location',
        'country',
      ]),
    );
  });
});
