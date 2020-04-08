import OpenWeatherService from './openWeather';
import {mockCurrentResponse} from './mocks';

const ws = new OpenWeatherService({lat: 7, lng: 12});
const mocks = {
  get: jest.fn(),
};
ws.get = mocks.get;

describe('[GoogleMaps.getGeocoding]', () => {
  let response;
  beforeEach(async () => {
    mocks.get.mockReturnValueOnce(mockCurrentResponse);
    response = await ws.getCurrentData();
  });

  it('returns an object with the correct keys', () => {
    expect(Object.keys(response)).toEqual(
      expect.arrayContaining([
        'coords',
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

  // it('returns the geocoding data in the correct format', () => {
  //   expect(response).toEqual(
  //     expect.objectContaining({
  //       address: '66 Sisters Ave, London SW11 5SN, UK',
  //       area: 'London',
  //       borough: 'London Borough of Wandsworth',
  //       county: 'Greater London',
  //       postalArea: 'London SW11, UK',
  //     }),
  //   );
  // });
});
