import json
import requests
import os
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

        normalized_response = response
        for d in response:
            del d['lat']
            del d['lon']
            for key, value in d.items():
                if isinstance(value, list):
                    d[key] = self.normalize_min_max(value)

                    if key in ['temp', 'feels_like']:
                        d[key]['min']['units'] = deg_unit
                        d[key]['max']['units'] = deg_unit

        return normalized_response

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
    def normalize_min_max(list):
        dict = {}
        for i in list:
            if 'min' in i:
                dict['min'] = i['min']
                dict['min']['observation_time'] = i['observation_time']
            if 'max' in i:
                dict['max'] = i['max']
                dict['max']['observation_time'] = i['observation_time']

        return dict
