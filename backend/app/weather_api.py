import json
import requests
import os
from functools import reduce
from urllib.parse import urlencode
from .clothing import calculate_clothing

deg_unit = '\u00b0C'


class WeatherAPI:
    def __init__(self, coords):
        if not all(coords.values()):
            raise ValueError('Location not supplied')

        self.base_url = 'https://api.climacell.co/v3/weather'
        self.base_params = {
            'apikey': os.environ['CLIMACELL_API_KEY'],
            'lat': coords['lat'],
            'lon': coords['lon'],
            'unit_system': 'si',
        }
        self.generic_fields = ['temp', 'feels_like', 'dewpoint', 'humidity', 'wind_speed', 'wind_direction',
                               'baro_pressure', 'precipitation', 'precipitation_type', 'sunrise', 'sunset',
                               'visibility', 'cloud_cover', 'moon_phase', 'weather_code']
        self.header = {'content-type': 'application/json'}

    def get(self, endpoint, params):
        qstr = urlencode(params)
        api_url = '%s/%s?%s' % (self.base_url, endpoint, qstr)
        response = requests.get(api_url, headers=self.header)
        response = response.json()
        return response

    def get_current(self):
        params = self.base_params
        params['fields'] = ','.join(self.generic_fields)
        response = self.get('realtime', params)

        return self.normalize_weather(response)

    def get_hourly(self):
        params = self.base_params
        params['fields'] = ','.join(
            self.generic_fields + ['precipitation_probability'])
        response = self.get('forecast/hourly', params)

        normalized_response = [self.normalize_weather(
            h, del_coords=True) for h in response]
        return normalized_response

    def get_daily(self):
        params = self.base_params
        fields = self.generic_fields + \
            ['precipitation_probability', 'precipitation_accumulation']
        remove_fields = ['dewpoint', 'precipitation_type',
                         'cloud_cover', 'moon_phase']

        fields = [f for f in fields if f not in remove_fields]
        params['fields'] = ','.join(fields)
        response = self.get('forecast/daily', params)

        for d in response:
            del d['lat']
            del d['lon']
            for key, value in d.items():
                if isinstance(value, list):
                    d[key] = self.normalize_min_max(value, key)

        return response

    @staticmethod
    def normalize_weather(dict, del_coords=False):
        if del_coords:
            del dict['lat']
            del dict['lon']
        dict['precipitation_type']['value'] = dict['precipitation_type']['value'].replace(
            ' ', '_')
        for k in ['temp', 'feels_like', 'dewpoint']:
            dict[k]['units'] = deg_unit

        clothing = calculate_clothing(
            dict['temp']['value'], dict['cloud_cover']['value'])
        dict['clothing_upper'] = {'value': clothing['upper']}
        dict['clothing_lower'] = {'value': clothing['lower']}

        return dict

    @staticmethod
    def normalize_min_max(list, key):
        normalized_dict = {}
        tk = 'observation_time'
        for m in list:
            min_max_key = reduce(lambda a, b: a if a !=
                                 tk else b, m.keys())
            if min_max_key in m:
                normalized_dict[min_max_key] = m[min_max_key]
                normalized_dict[min_max_key][tk] = m[tk]
                if key in ['temp', 'feels_like']:
                    normalized_dict[min_max_key]['units'] = deg_unit

        return normalized_dict
