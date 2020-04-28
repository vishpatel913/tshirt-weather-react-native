import requests
import os
import json
from urllib.parse import urlencode
from urllib.request import urlretrieve


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
