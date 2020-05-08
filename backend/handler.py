import json
import requests
import os
from urllib.parse import urlencode
from urllib.request import urlretrieve
# from app.weather_api import WeatherAPI


class WeatherAPI:
    def __init__(self, coords):
        self.api_url_base = 'https://api.openweathermap.org/data/2.5'
        params = {
            'lat': coords['lat'],
            'lon': coords['lon'],
            'appid': os.environ['OPEN_WEATHER_API_KEY'],
            'units': 'metric',
        }
        self.qstr = urlencode(params)
        self.header = {'content-type': 'application/json'}

    def get(self, endpoint):
        api_url = '{0}/{1}?{2}'.format(self.api_url_base, endpoint, self.qstr)
        response = requests.get(api_url, headers=self.header)
        response = response.json()

        return response


def main(event, context):
    params = event['queryStringParameters']
    coords = {
        'lat': params['lat'],
        'lon': params['lon']
    }
    weather_api = WeatherAPI(coords)

    current = weather_api.get('weather')
    data = weather_api.get('onecall')

    data['country'] = current['sys']['country']
    data['location'] = current['name']
    data['current']['temp_max'] = current['main']['temp_max']
    data['current']['temp_min'] = current['main']['temp_min']

    if hasattr(params, 'export'):
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'w') as outfile:
            outfile.write("export default ")
        with open('../src/services/weather/mocks/tempGeneratedResponse.ts', 'a') as outfile:
            json.dump(data, outfile)

    response = {
        "statusCode": 200,
        "body": json.dumps(data)
    }

    return response
